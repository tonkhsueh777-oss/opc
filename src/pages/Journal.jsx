import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  Square,
  MessageCircle,
  CheckSquare,
  Lightbulb,
  Star,
  History,
  Save,
  Trash2,
  Link,
  ArrowUpRight,
} from "lucide-react";
import { PageTitle, asset } from "../components/UI.jsx";
import ImageUpload from "../components/ImageUpload.jsx";
import { localDate } from "../data/demoData.js";
const prompts = [
  [
    "content",
    "今天发生了什么？",
    "把今天值得记住的一刻写下来。",
    MessageCircle,
  ],
  ["completed", "今天完成了什么？", "再小的完成，也值得记录。", CheckSquare],
  ["ideas", "今天想到什么？", "一个念头、一个灵感、一个新的可能。", Lightbulb],
  [
    "progressNote",
    "今天离梦想更近的一件事",
    "今天的哪一步，让你靠近了理想的自己？",
    Star,
  ],
];
const empty = (date) => ({
  date,
  content: "",
  completed: "",
  ideas: "",
  progressNote: "",
  dreamId: "",
  images: [],
});
export default function Journal({ data, save, remove, onDirty }) {
  const [date, setDate] = useState(localDate()),
    [form, setForm] = useState(
      () => data.journals.find((j) => j.date === date) || empty(date),
    ),
    [busy, setBusy] = useState(false),
    [recording, setRecording] = useState(false),
    [speechMessage, setSpeechMessage] = useState(""),
    [target, setTarget] = useState("content"),
    [dirty, setDirty] = useState(false);
  const recognition = useRef(null);
  useEffect(() => {
    onDirty(dirty);
  }, [dirty]);
  useEffect(() => () => onDirty(false), []);
  const record = data.journals.find((j) => j.date === date);
  useEffect(() => {
    setForm(record || empty(date));
    setDirty(false);
  }, [date, record]);
  useEffect(() => () => recognition.current?.abort(), []);
  useEffect(() => {
    const handler = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
  function field(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  }
  function changeDate(value) {
    if (!value) return;
    if (dirty && !window.confirm("当前日记尚未保存。要放弃修改并切换日期吗？"))
      return;
    recognition.current?.abort();
    setDate(value);
  }
  function speech() {
    if (recording) {
      recognition.current?.stop();
      return;
    }
    const API = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!API) {
      setSpeechMessage("此浏览器暂不支持语音转文字，请直接在下方输入。");
      return;
    }
    try {
      const instance = new API();
      instance.lang = "zh-CN";
      instance.interimResults = false;
      instance.continuous = false;
      instance.onstart = () => {
        setRecording(true);
        setSpeechMessage("正在聆听，点击按钮结束。");
      };
      instance.onresult = (e) => {
        const text = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join("");
        setForm((f) => ({
          ...f,
          [target]: f[target] + (f[target] ? "\n" : "") + text,
        }));
        setDirty(true);
        setSpeechMessage("已转成文字，请检查后保存。");
      };
      instance.onerror = (e) =>
        setSpeechMessage(
          e.error === "not-allowed"
            ? "麦克风权限未开启，请继续使用文字输入。"
            : "语音未能完成，请直接输入文字或稍后重试。",
        );
      instance.onend = () => setRecording(false);
      recognition.current = instance;
      instance.start();
    } catch {
      setSpeechMessage("语音暂不可用，请直接输入文字。");
      setRecording(false);
    }
  }
  const valid = prompts.some(([key]) => form[key].trim()) || form.images.length;
  const history = [...data.journals].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  return (
    <>
      <PageTitle title="今日日记" subtitle="记录此刻，让想法落地生根。" />
      <div className="journal-layout">
        <div>
          <div className="journal-date">
            <strong>{date.replaceAll("-", ".")}</strong>
            <input
              type="date"
              aria-label="日记日期"
              value={date}
              max="9999-12-31"
              onChange={(e) => changeDate(e.target.value)}
            />
          </div>
          <section className="voice-area">
            <div className="voice-copy">
              记录此刻，
              <br />
              让想法落地生根。
            </div>
            <div className="tiny-mascot">
              <img src={asset("mascot.png")} alt="TONK 日记伙伴" />
            </div>
            <button
              className={"microphone " + (recording ? "recording" : "")}
              aria-label={recording ? "结束录音" : "点击开始录音"}
              onClick={speech}
            >
              {recording ? <Square size={35} /> : <Mic size={45} />}
            </button>
            <strong>{recording ? "点击结束录音" : "点击开始录音"}</strong>
            <p>支持语音转文字</p>
            {speechMessage && (
              <p className="speech-message" role="status">
                {speechMessage}
              </p>
            )}
          </section>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              recognition.current?.stop();
              if (await save("journals", form)) setDirty(false);
            }}
          >
            <div className="journal-prompts">
              {prompts.map(([key, title, placeholder, Icon]) => (
                <label className="journal-prompt paper" key={key}>
                  <span>
                    <Icon size={21} />
                    <strong>{title}</strong>
                    <span className="prompt-dots">···</span>
                  </span>
                  <textarea
                    aria-label={title}
                    rows={2}
                    value={form[key]}
                    maxLength={20000}
                    onFocus={() => setTarget(key)}
                    onChange={(e) => field(key, e.target.value)}
                    placeholder={placeholder}
                  />
                </label>
              ))}
            </div>
            <label className="field dream-link">
              <span>
                <Link size={16} />
                关联梦想
              </span>
              <select
                value={form.dreamId}
                onChange={(e) => field("dreamId", e.target.value)}
              >
                <option value="">暂不关联</option>
                {data.dreams.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </label>
            <ImageUpload
              images={form.images}
              onChange={(images) => field("images", images)}
              onBusy={setBusy}
            />
            <div className="form-actions">
              {record && (
                <button
                  type="button"
                  className="button danger"
                  onClick={async () => {
                    if (await remove("journals", record.id)) {
                      setForm(empty(date));
                      setDirty(false);
                    }
                  }}
                >
                  <Trash2 size={16} />
                  删除日记
                </button>
              )}
              <button className="button primary" disabled={!valid || busy}>
                <Save size={17} />
                {record ? "保存修改" : "保存日记"}
              </button>
            </div>
            <p className="notice journal-save-note">
              {dirty
                ? "尚未保存 · 写完记得点击保存"
                : record
                  ? "这一天已记录 · 可以继续编辑"
                  : "给今天留下一个小小的印记。"}
            </p>
          </form>
        </div>
        <aside className="journal-history paper">
          <div className="section-heading">
            <h2>
              <History size={20} />
              历史记录
            </h2>
            <span>{history.length} 天</span>
          </div>
          {history.length ? (
            history.map((j) => (
              <button
                className={j.date === date ? "selected" : ""}
                key={j.id}
                onClick={() => changeDate(j.date)}
              >
                <time>
                  {j.date.replaceAll("-", ".")}
                  {j.demo && <small>演示</small>}
                </time>
                <p>
                  {j.content ||
                    j.completed ||
                    j.ideas ||
                    j.progressNote ||
                    "图片日记"}
                </p>
                <ArrowUpRight size={15} />
              </button>
            ))
          ) : (
            <p className="notice">第一篇日记，等你来写。</p>
          )}
          <div className="history-quote">
            每一天，
            <br />
            都是故事的一页。
          </div>
        </aside>
      </div>
    </>
  );
}
