import React, { useState } from "react";
import {
  CalendarDays,
  Star,
  ChartNoAxesColumn,
  Lightbulb,
  Image,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { ProgressList, asset, Empty } from "../components/UI.jsx";
import { localDate } from "../data/demoData.js";
import { monthlyStats } from "../services/stats.js";
export default function MonthlyReview({ data }) {
  const [month, setMonth] = useState(localDate().slice(0, 7));
  const date = new Date(month + "-01T12:00:00");
  const english = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const stats = monthlyStats(data, month);
  return (
    <div className="review-page">
      <div className="review-toolbar">
        <a href="#home">
          <ArrowLeft size={16} />
          月度复盘
        </a>
        <input
          aria-label="复盘月份"
          type="month"
          value={month}
          onChange={(e) => {
            if (e.target.value) setMonth(e.target.value);
          }}
        />
      </div>
      <section className="review-hero">
        <h1>MY {english}</h1>
        <h2>{date.getMonth() + 1}月复盘</h2>
        <div className="review-note paper">
          比上个月更靠近，
          <br />
          我想成为的自己。
        </div>
        <div className="review-art">
          <img src={asset("mascot.png")} alt="TONK 成长伙伴" />
        </div>
      </section>
      <section className="review-metrics">
        {[
          [CalendarDays, stats.journalDays, "记录天数"],
          [Star, stats.dreams, "新增梦想"],
          [ChartNoAxesColumn, stats.progress, "梦想推进"],
          [Lightbulb, stats.ideas, "收集灵感"],
          [Image, stats.images, "上传图片"],
        ].map(([Icon, n, l]) => (
          <div key={l}>
            <Icon size={23} />
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </section>
      <div className="review-body">
        <section className="review-progress paper">
          <div className="section-heading">
            <h2>梦想推进进度</h2>
            <Star size={20} />
          </div>
          {data.dreams.length ? (
            <ProgressList dreams={data.dreams} />
          ) : (
            <Empty>写下梦想后，在这里看见进度。</Empty>
          )}
          <p className="notice">
            当前进度{data.dreams.some((d) => d.demo) ? " · 包含演示记录" : ""}
            <br />
            推进次数统计每次保存的进度调整；图片统计上传次数。
          </p>
        </section>
        <section className="review-reflection paper">
          <span className="quote-mark">“</span>
          <h2>
            慢慢来，
            <br />
            每一步都在靠近。
          </h2>
          <p>
            这个月，你记录了 {stats.journalDays} 天，
            <br />
            收集了 {stats.ideas} 个灵感。
            <br />
            回头看一看，那些微小的行动，
            <br />
            正在成为你的路。
          </p>
          <span className="keep-going">Keep Going!</span>
        </section>
      </div>
      <section className="ai-soon">
        <Sparkles size={20} />
        <div>
          <h2>AI 月度复盘</h2>
          <p>未来，让记录带来更多洞察。</p>
        </div>
        <span>Coming Soon</span>
      </section>
      <p className="review-footnote">
        仅根据当前浏览器本地数据统计 · 无 AI API
      </p>
    </div>
  );
}
