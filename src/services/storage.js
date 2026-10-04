// The only browser persistence adapter. Replace this module for a future API.
const DB_NAME = "opc-road",
  STORE = "app",
  KEY = "state";
let opening;
function database() {
  if (!opening)
    opening = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(
          new Error("此浏览器不支持本地数据库，请使用新版 Chrome 或 Safari。"),
        );
        return;
      }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE);
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => {
          db.close();
          opening = null;
        };
        resolve(db);
      };
      request.onerror = () => {
        opening = null;
        reject(new Error("无法打开本地数据库，请检查浏览器隐私设置后重试。"));
      };
      request.onblocked = () => {
        opening = null;
        reject(
          new Error(
            "数据库升级被其他标签页阻挡，请关闭其他 OPC之路页面后重试。",
          ),
        );
      };
    });
  return opening;
}
export async function load() {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(KEY);
    request.onsuccess = () => {
      const value = request.result;
      if (
        value &&
        (!Array.isArray(value.dreams) ||
          !Array.isArray(value.journals) ||
          !Array.isArray(value.ideas))
      ) {
        reject(new Error("本地记录格式异常。为保护已有数据，应用没有覆盖它。"));
        return;
      }
      resolve(
        value
          ? {
              ...value,
              progressEvents: value.progressEvents || [],
              imageEvents: value.imageEvents || [],
            }
          : null,
      );
    };
    request.onerror = () =>
      reject(new Error("读取本地记录失败，请刷新后重试。"));
  });
}
export async function persist(state) {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(state, KEY);
    tx.oncomplete = () => resolve();
    tx.onabort = () =>
      reject(
        new Error(
          tx.error?.name === "QuotaExceededError"
            ? "浏览器存储空间不足，请减少图片大小后重试。"
            : "保存失败，修改尚未写入。请检查浏览器存储设置后重试。",
        ),
      );
    tx.onerror = () => {};
  });
}
