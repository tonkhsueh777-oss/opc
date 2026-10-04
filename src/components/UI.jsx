import React from "react";
import {
  Target,
  NotebookPen,
  Lightbulb,
  ChartNoAxesColumn,
  ArrowUpRight,
  House,
  Plus,
  X,
  ArrowLeft,
} from "lucide-react";
export const entries = [
  {
    id: "dreams",
    label: "梦想板",
    short: "梦想",
    description: "把想象变成看得见的目标",
    Icon: Target,
  },
  {
    id: "journal",
    label: "今日日记",
    short: "日记",
    description: "记录真实的自己",
    Icon: NotebookPen,
  },
  {
    id: "ideas",
    label: "创意箱",
    short: "灵感",
    description: "收集灵感与想法",
    Icon: Lightbulb,
  },
  {
    id: "review",
    label: "月度复盘",
    short: "复盘",
    description: "看见成长的轨迹",
    Icon: ChartNoAxesColumn,
  },
];
export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
export function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? "light" : ""}`}>
      <img src={asset("tonk-logo.png")} alt="TONK" />
    </span>
  );
}
export function Header({ route }) {
  return (
    <header className="header">
      <a href="#home" aria-label="TONK 首页">
        <Logo light />
      </a>
      <span className="header-name">
        OPC之路 <span>/</span> 梦想成长系统
      </span>
      <a href="#home" className="home-link">
        <House size={17} /> <span>首页</span>
      </a>
    </header>
  );
}
export function BottomNav({ route }) {
  return (
    <nav className="bottom-nav" aria-label="主要导航">
      {entries.map(({ id, short, Icon }) => (
        <a
          href={"#" + id}
          key={id}
          className={id === route ? "active" : ""}
          aria-current={id === route ? "page" : undefined}
        >
          <Icon size={23} />
          <span>{short}</span>
        </a>
      ))}
    </nav>
  );
}
export function PageTitle({ title, subtitle, action }) {
  return (
    <div className="page-title">
      <div>
        <a href="#home" className="back">
          <ArrowLeft size={16} /> OPC之路
        </a>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
export function AddButton({ children, onClick }) {
  return (
    <button className="button primary" onClick={onClick}>
      <Plus size={19} />
      {children}
    </button>
  );
}
export function ProgressBar({ value }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="梦想进度"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span style={{ width: value + "%" }} />
    </div>
  );
}
export function ProgressList({ dreams }) {
  return (
    <div className="progress-list">
      {dreams.map((d) => (
        <a href="#dreams" key={d.id}>
          <span>{d.title}</span>
          <ProgressBar value={d.progress} />
          <strong>{d.progress}%</strong>
        </a>
      ))}
    </div>
  );
}
export function Empty({ children }) {
  return (
    <div className="empty">
      <Target size={28} />
      <p>{children}</p>
    </div>
  );
}
