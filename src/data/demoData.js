export const categories = ["TONK品牌", "理想生活", "身体状态", "旅行"];
export const localDate = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
export function makeDemo() {
  const today = localDate();
  const base = new Date();
  base.setDate(1);
  const createdAt = base.toISOString();
  const date = localDate(base);
  return {
    version: 1,
    startedAt: today,
    dreams: [
      {
        id: "demo-brand",
        title: "TONK 品牌",
        description:
          "做一个有影响力的品牌。\n让更多人看见 TONK，成为超级个体的代表。",
        image: "assets/studio.jpg",
        progress: 68,
        category: "TONK品牌",
        createdAt,
        layout: { x: 0, y: 0, width: 1, rotation: -3 },
        demo: true,
      },
      {
        id: "demo-life",
        title: "理想生活",
        description:
          "自由的时间，喜欢的人在一起。\n给自己一个有光、有植物的家。",
        image: "assets/life.jpg",
        progress: 45,
        category: "理想生活",
        createdAt,
        layout: { x: 0, y: 0, width: 1, rotation: 3 },
        demo: true,
      },
      {
        id: "demo-body",
        title: "身体状态",
        description: "每周运动三次。\n拥有更好的精力、更专注的自己。",
        image: "assets/gym.jpg",
        progress: 60,
        category: "身体状态",
        createdAt,
        layout: { x: 0, y: 0, width: 1, rotation: 2 },
        demo: true,
      },
      {
        id: "demo-travel",
        title: "旅行计划",
        description: "去山里，去海边，去没去过的地方。\n下一站：阿尔卑斯。",
        image: "assets/mountains.jpg",
        progress: 30,
        category: "旅行",
        createdAt,
        layout: { x: 0, y: 0, width: 1, rotation: -2 },
        demo: true,
      },
    ],
    journals: [
      {
        id: "demo-journal",
        date,
        content: "给自己留一点时间，认真看看想去的方向。",
        completed: "完成了第一版品牌草图。",
        ideas: "把小怪兽做成可以收藏的系列。",
        progressNote: "迈出第一步，就已经很棒了。",
        dreamId: "demo-brand",
        images: [],
        createdAt,
        demo: true,
      },
    ],
    ideas: [
      {
        id: "demo-idea-1",
        title: "把梦想装进口袋",
        content: "做一套小小的梦想贴纸，让每一天的行动都有一个标记。",
        images: [],
        tags: ["产品", "TONK"],
        createdAt,
        demo: true,
      },
      {
        id: "demo-idea-2",
        title: "慢一点，也没关系",
        content: "收集那些让我想要停下来的一刻。光、树影、刚出炉的面包。",
        images: ["assets/mountains.jpg"],
        tags: ["生活", "灵感"],
        createdAt,
        demo: true,
      },
      {
        id: "demo-idea-3",
        title: "一个周末的迷你冒险",
        content: "不需要很远。搭上一班没坐过的公交，在终点散步。",
        images: [],
        tags: ["旅行"],
        createdAt,
        demo: true,
      },
    ],
    progressEvents: [],
    imageEvents: [],
  };
}
export function imageUrl(value) {
  return value?.startsWith("assets/")
    ? import.meta.env.BASE_URL + value
    : value;
}
