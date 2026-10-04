import React, { useState } from "react";
import { Search, ArrowUpRight, Trash2, Check, Lightbulb } from "lucide-react";
import { PageTitle, AddButton, Empty } from "../components/UI.jsx";
import Modal from "../components/Modal.jsx";
import ImageUpload from "../components/ImageUpload.jsx";
import { imageUrl } from "../data/demoData.js";
function IdeaEditor({ idea, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(
      idea || { title: "", content: "", images: [], tags: [] },
    ),
    [tags, setTags] = useState(idea?.tags.join("，") || ""),
    [busy, setBusy] = useState(false);
  const field = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Modal title={idea ? "灵感详情" : "捕捉一个灵感"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...form,
            title:
              form.title.trim() ||
              form.content.trim().slice(0, 28) ||
              "图片灵感",
            tags: [
              ...new Set(
                tags
                  .split(/[,，\n]/)
                  .map((x) => x.trim())
                  .filter(Boolean),
              ),
            ].slice(0, 12),
          });
        }}
      >
        <label className="field">
          标题
          <input
            maxLength={80}
            value={form.title}
            onChange={(e) => field("title", e.target.value)}
            placeholder="给这个念头起个名字"
          />
        </label>
        <label className="field">
          灵感内容
          <textarea
            rows={5}
            maxLength={20000}
            value={form.content}
            onChange={(e) => field("content", e.target.value)}
            placeholder="一句话、一个想法，或一个新的可能…"
          />
        </label>
        <label className="field">
          标签
          <input
            maxLength={250}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="产品，生活，旅行（用逗号分隔）"
          />
        </label>
        <ImageUpload
          images={form.images}
          onChange={(images) => field("images", images)}
          onBusy={setBusy}
        />
        <div className="form-actions">
          {idea && (
            <button
              type="button"
              className="button danger"
              onClick={() => onDelete(idea.id)}
            >
              <Trash2 size={16} />
              删除
            </button>
          )}
          <button type="button" className="button" onClick={onClose}>
            取消
          </button>
          <button
            className="button primary"
            disabled={
              busy ||
              (!form.title.trim() &&
                !form.content.trim() &&
                !form.images.length)
            }
          >
            <Check size={16} />
            保存灵感
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default function IdeaBox({ data, save, remove }) {
  const [query, setQuery] = useState(""),
    [sort, setSort] = useState("newest"),
    [editing, setEditing] = useState(null);
  const ideas = data.ideas
    .filter((i) =>
      [i.title, i.content, ...i.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
    )
    .sort((a, b) =>
      sort === "newest"
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt),
    );
  return (
    <>
      <PageTitle
        title="创意箱"
        subtitle="让散落的念头，有一个自己的角落。"
        action={<AddButton onClick={() => setEditing({})}>新增灵感</AddButton>}
      />
      <div className="idea-toolbar">
        <label className="search">
          <Search size={18} />
          <input
            aria-label="搜索灵感"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索想法、内容或标签"
          />
          {query && (
            <button aria-label="清空搜索" onClick={() => setQuery("")}>
              ×
            </button>
          )}
        </label>
        <select
          aria-label="时间排序"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">最新在前</option>
          <option value="oldest">最早在前</option>
        </select>
      </div>
      <div className="idea-wall">
        <div className="idea-wall-heading">
          <Lightbulb size={24} />
          <span>Little ideas. Big possibilities.</span>
          <span>{ideas.length} 个灵感</span>
        </div>
        <div className="idea-grid">
          {ideas.map((idea, i) => (
            <button
              key={idea.id}
              className={"idea-note paper idea-tone-" + (i % 4)}
              onClick={() => setEditing(idea)}
              style={{ "--angle": (i % 2 ? -1.5 : 1) + "deg" }}
            >
              <span className="tape" />
              {idea.images[0] && (
                <img
                  className="idea-image"
                  src={imageUrl(idea.images[0])}
                  alt={idea.title}
                />
              )}
              <time>
                {new Date(idea.createdAt).toLocaleDateString("zh-CN", {
                  month: "2-digit",
                  day: "2-digit",
                })}
                {idea.demo ? " · 演示" : ""}
              </time>
              <h2>{idea.title}</h2>
              <p>{idea.content}</p>
              <div className="idea-tags">
                {idea.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
              <ArrowUpRight size={19} className="note-arrow" />
            </button>
          ))}
        </div>
        {!ideas.length && (
          <Empty>
            {query
              ? "没有找到这个灵感，试试其他词。"
              : "把第一个念头放进来。文字、图片，都可以。"}
          </Empty>
        )}
        <p className="wall-quote">不必完整，先记下来。</p>
      </div>
      {editing && (
        <IdeaEditor
          key={editing.id || "new"}
          idea={editing.id ? editing : null}
          onClose={() => setEditing(null)}
          onSave={async (r) => {
            if (await save("ideas", r)) setEditing(null);
          }}
          onDelete={async (id) => {
            if (await remove("ideas", id)) setEditing(null);
          }}
        />
      )}
    </>
  );
}
