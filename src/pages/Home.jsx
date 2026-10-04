import React from "react";
import { ArrowUpRight, Star, LockKeyhole } from "lucide-react";
import { entries, asset, ProgressList } from "../components/UI.jsx";
import { localDate } from "../data/demoData.js";
import { monthlyStats } from "../services/stats.js";
export default function Home({ data }) {
  const month = localDate().slice(0, 7),
    stats = monthlyStats(data, month);
  const days = Math.max(
    1,
    Math.floor(
      (new Date(localDate() + "T00:00:00") -
        new Date(data.startedAt + "T00:00:00")) /
        86400000,
    ) + 1,
  );
  return (
    <>
      <section className="home-hero dark">
        <div className="hero-copy">
          <h1>
            OPC之路<span>超级个体成长之路</span>
          </h1>
          <div className="yellow-line" />
          <p>
            记录 · 思考 · 行动
            <br />
            让理想的自己，一点点靠近。
          </p>
          <div className="day-note paper">
            今天，是梦想的第 <strong>{String(days).padStart(3, "0")}</strong> 天{" "}
            <Star size={21} />
          </div>
        </div>
        <div className="hero-art">
          <img src={asset("mascot.png")} alt="TONK 主角色与小怪兽" />
          <span className="art-caption">MORE THAN A DREAM.</span>
        </div>
      </section>
      <section className="entry-grid">
        {entries.map(({ id, label, description, Icon }) => (
          <a className="entry paper" key={id} href={"#" + id}>
            <Icon size={30} />
            <div>
              <h2>{label}</h2>
              <p>{description}</p>
            </div>
            <ArrowUpRight size={18} />
          </a>
        ))}
      </section>
      <div className="home-lower">
        <section className="home-progress paper">
          <div className="section-heading">
            <h2>梦想正在发生</h2>
            <a href="#dreams">
              去梦想板 <ArrowUpRight size={14} />
            </a>
          </div>
          {data.dreams.length ? (
            <ProgressList dreams={data.dreams.slice(0, 4)} />
          ) : (
            <p>在梦想板写下第一个梦想。</p>
          )}
          <p className="small-quote">“每一个小小的行动，都算数。”</p>
        </section>
        <section className="home-stats dark">
          <div className="section-heading">
            <h2>{new Date().getMonth() + 1}月 · 活动数据</h2>
            <Star size={19} />
          </div>
          <div className="stats-four">
            {[
              [stats.journalDays, "记录天数"],
              [stats.progress, "推进次数"],
              [stats.ideas, "收集灵感"],
              [stats.images, "上传图片"],
            ].map(([n, l]) => (
              <div key={l}>
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <a href="#review">
            看看这个月的自己 <ArrowUpRight size={16} />
          </a>
        </section>
      </div>
      <p className="footer-note">
        <LockKeyhole size={13} />
        记录保存在当前浏览器 · 初始内容为可编辑的演示数据
      </p>
    </>
  );
}
