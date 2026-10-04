import React, { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { readImage } from "../services/images.js";
import { imageUrl } from "../data/demoData.js";
export default function ImageUpload({
  images,
  onChange,
  single = false,
  onBusy,
}) {
  const [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function upload(e) {
    const files = [...e.target.files];
    if (!files.length) return;
    setBusy(true);
    onBusy?.(true);
    setError("");
    try {
      const results = await Promise.all(
        files.slice(0, single ? 1 : 6 - images.length).map(readImage),
      );
      onChange(single ? results : [...images, ...results]);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      onBusy?.(false);
      e.target.value = "";
    }
  }
  return (
    <div className="image-upload">
      <div className="image-previews">
        {images.map((src, i) => (
          <div key={i}>
            <img src={imageUrl(src)} alt={"已选图片 " + (i + 1)} />
            <button
              type="button"
              className="image-remove"
              aria-label={"移除图片 " + (i + 1)}
              onClick={() => onChange(images.filter((_, j) => i !== j))}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <label className="upload-control">
        <ImagePlus size={20} />
        {busy ? "正在处理图片…" : single ? "上传梦想图片" : "添加图片"}
        <input
          type="file"
          aria-label={single ? "上传梦想图片" : "添加图片"}
          accept="image/jpeg,image/png,image/webp"
          multiple={!single}
          onChange={upload}
          disabled={busy || (!single && images.length >= 6)}
        />
      </label>
      <p className="notice">
        JPG / PNG / WebP · 每张不超过 10MB{!single ? " · 最多 6 张" : ""}
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
