import React, { useState } from "react";
import { Star, ArrowUpRight, Trash2, Check } from "lucide-react";
import {
  PageTitle,
  AddButton,
  ProgressBar,
  Empty,
  Logo,
  asset,
} from "../components/UI.jsx";
import Modal from "../components/Modal.jsx";
import ImageUpload from "../components/ImageUpload.jsx";
import { categories, imageUrl } from "../data/demoData.js";
function DreamEditor({ dream, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(
      dream || {
        title: "",
        description: "",
        image: "",
        progress: 0,
        category: categories[0],
      },
    ),
    [busy, setBusy] = useState(false);
  const field = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  return (
    <Modal title={dream ? "梦想详情" : "写下一个梦想"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...form, title: form.title.trim() });
        }}
      >
        <label className="field">
          梦想名称
          <input
            required
            maxLength={60}
            value={form.title}
            onChange={(e) => field("title", e.target.value)}
            placeholder="那个让你想行动的梦想"
          />
        </label>
        <label className="field">
          分类
          <select
            value={form.category}
            onChange={(e) => field("category", e.target.value)}
          >
            {categories.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="field">
          梦想描述
          <textarea
            rows={4}
            maxLength={4000}
            value={form.description}
            onChange={(e) => field("description", e.target.value)}
            placeholder="为什么想实现它？下一步可以做什么？"
          />
        </label>
        <div className="field">
          <div className="range-label">
            <label htmlFor="dream-progress">当前进度</label>
            <strong>{form.progress}%</strong>
          </div>
          <input
            id="dream-progress"
            type="range"
            min="0"
            max="100"
            value={form.progress}
            onChange={(e) => field("progress", Number(e.target.value))}
          />
        </div>
        <ImageUpload
          single
          images={form.image ? [form.image] : []}
          onChange={(imgs) => field("image", imgs[0] || "")}
          onBusy={setBusy}
        />
        <div className="form-actions">
          {dream && (
            <button
              type="button"
              className="button danger"
              onClick={() => onDelete(dream.id)}
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
            disabled={busy || !form.title.trim()}
          >
            <Check size={16} />
            保存梦想
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default function DreamBoard({ data, save, remove }) {
  const [filter, setFilter] = useState("全部"),
    [editing, setEditing] = useState(null);
  const dreams = data.dreams.filter(
    (d) => filter === "全部" || d.category === filter,
  );
  return (
    <>
      <PageTitle
        title="梦想板"
        subtitle="把想象钉在这里，把行动带进生活。"
        action={<AddButton onClick={() => setEditing({})}>新增梦想</AddButton>}
      />
      <div className="category-tabs" role="group" aria-label="梦想分类">
        {["全部", ...categories].map((c) => (
          <button
            key={c}
            aria-pressed={filter === c}
            className={filter === c ? "selected" : ""}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <section className="cork-board">
        <div className="board-note">
          <span>Good things take time.</span>
          <Star size={26} />
        </div>
        <div className="dream-grid">
          {dreams.map((d, i) => (
            <button
              key={d.id}
              className={"dream-card paper tone-" + (i % 4)}
              style={{ "--angle": (d.layout?.rotation || 0) + "deg" }}
              onClick={() => setEditing(d)}
            >
              <span className="pin" />
              <div className="dream-photo">
                {d.image ? (
                  <img src={imageUrl(d.image)} alt={d.title} />
                ) : (
                  <div className="no-photo">
                    <Star size={40} />
                    <span>从一个念头开始</span>
                  </div>
                )}
              </div>
              <div className="dream-label">
                <span className="dream-name">{d.title}</span>
                <ArrowUpRight size={18} />
              </div>
              <p>{d.description || "你的梦想，值得被看见。"}</p>
              <div className="dream-progress">
                <ProgressBar value={d.progress} />
                <strong>{d.progress}%</strong>
              </div>
              {d.demo && <span className="demo-label">演示梦想</span>}
            </button>
          ))}
        </div>
        {!dreams.length && <Empty>这里还有空位。写下你的下一个梦想吧。</Empty>}
        <div className="board-footer">
          <Logo />
          <div className="monster-sticker">
            <img src={asset("mascot.png")} alt="TONK 小怪兽贴纸" />
          </div>
          <span>MAKE IT HAPPEN.</span>
        </div>
      </section>
      <p className="footer-note">点击照片查看详情、编辑或修改进度。</p>
      {editing && (
        <DreamEditor
          key={editing.id || "new"}
          dream={editing.id ? editing : null}
          onClose={() => setEditing(null)}
          onSave={async (r) => {
            if (await save("dreams", r)) setEditing(null);
          }}
          onDelete={async (id) => {
            if (await remove("dreams", id)) setEditing(null);
          }}
        />
      )}
    </>
  );
}
