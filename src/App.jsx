import React, { useState, useEffect, useRef } from "react";
import { Header, BottomNav } from "./components/UI.jsx";
import Home from "./pages/Home.jsx";
import DreamBoard from "./pages/DreamBoard.jsx";
import Journal from "./pages/Journal.jsx";
import IdeaBox from "./pages/IdeaBox.jsx";
import MonthlyReview from "./pages/MonthlyReview.jsx";
import { makeDemo } from "./data/demoData.js";
import { saveRecord, deleteRecord } from "./services/records.js";
import { load, persist } from "./services/storage.js";
const routes = ["home", "dreams", "journal", "ideas", "review"];
const getRoute = () =>
  routes.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
export default function App() {
  const [route, setRoute] = useState(getRoute),
    [data, setData] = useState(null),
    [error, setError] = useState(""),
    [message, setMessage] = useState(""),
    [undo, setUndo] = useState(null),
    [saving, setSaving] = useState(false);
  const current = useRef(null),
    routeRef = useRef(route),
    dirty = useRef(false),
    busy = useRef(false);
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        let value = await load();
        if (!value) {
          value = makeDemo();
          await persist(value);
        }
        if (live) {
          current.current = value;
          setData(value);
        }
      } catch (e) {
        if (live) setError(e.message);
      }
    })();
    return () => {
      live = false;
    };
  }, []);
  useEffect(() => {
    const change = () => {
      const next = getRoute();
      if (next === routeRef.current) return;
      if (
        dirty.current &&
        !window.confirm("当前日记尚未保存。要放弃修改并离开吗？")
      ) {
        history.replaceState(null, "", "#" + routeRef.current);
        return;
      }
      dirty.current = false;
      routeRef.current = next;
      setRoute(next);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setUndo(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  async function commit(next, text, previous = null) {
    if (busy.current) return false;
    busy.current = true;
    setSaving(true);
    setMessage("");
    setUndo(null);
    try {
      await persist(next);
      current.current = next;
      setData(next);
      setError("");
      setUndo(previous);
      setMessage(text);
      return true;
    } catch (e) {
      setError(e.message);
      window.alert(e.message);
      return false;
    } finally {
      busy.current = false;
      setSaving(false);
    }
  }
  const save = (type, record) =>
    commit(saveRecord(current.current, type, record), "已保存到此浏览器");
  const remove = (type, id) =>
    commit(
      deleteRecord(current.current, type, id),
      "已删除 · 可以撤销",
      current.current,
    );
  const onDirty = (value) => {
    dirty.current = value;
  };
  return (
    <div className={"app " + (saving ? "saving" : "")} aria-busy={saving}>
      <Header route={route} />
      <main className={"main " + (route === "review" ? "review" : "")}>
        {error && (
          <div className="error-banner" role="alert">
            {error}
            {!data && (
              <button className="button" onClick={() => location.reload()}>
                重试
              </button>
            )}
          </div>
        )}
        {!data ? (
          <div className="loading">
            {error ? "记录没有被覆盖。" : "正在打开你的梦想记录…"}
          </div>
        ) : route === "home" ? (
          <Home data={data} />
        ) : route === "dreams" ? (
          <DreamBoard data={data} save={save} remove={remove} />
        ) : route === "journal" ? (
          <Journal data={data} save={save} remove={remove} onDirty={onDirty} />
        ) : route === "ideas" ? (
          <IdeaBox data={data} save={save} remove={remove} />
        ) : (
          <MonthlyReview data={data} />
        )}
      </main>
      <BottomNav route={route} />
      {message && (
        <div className="toast" role="status">
          {message}
          {undo && (
            <button onClick={() => commit(undo, "已恢复记录")}>撤销</button>
          )}
        </div>
      )}
      {saving && (
        <div className="saving-status" role="status">
          正在保存…
        </div>
      )}
    </div>
  );
}
