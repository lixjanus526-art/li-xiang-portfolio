import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mediaRoot = path.join(root, "public", "media");
const projectSlugs = [
  "rain-beast",
  "invisible-shield",
  "xiu-mian",
  "tao-gu",
  "xiwang-jinan",
  "silent-embrace",
];
const expectedMediaFiles = new Set([
  ...projectSlugs.flatMap((slug) => [`${slug}.jpg`, `${slug}.mp4`]),
  ...projectSlugs.flatMap((slug) => [
    `cover-${slug}.jpg`,
    `cover-${slug}.mp4`,
    `overview-${slug}.jpg`,
    `overview-${slug}.mp4`,
    `selected-${slug}.jpg`,
    `selected-${slug}.mp4`,
  ]),
  "rain-beast-fight.jpg",
  "rain-beast-fight.mp4",
  "social-field-notes.jpg",
  "social-field-notes.mp4",
  "social-ai-craft.jpg",
  "social-ai-craft.mp4",
  "social-city-stories.jpg",
  "social-city-stories.mp4",
  "social-rednote-cover.jpg",
  "social-rednote-detail.jpg",
  "social-douyin-cover.jpg",
  "social-douyin-detail.jpg",
  "social-x-cover.jpg",
  "social-x-detail.jpg",
  "portrait.jpg",
]);

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const slug of projectSlugs) {
  for (const extension of ["jpg", "mp4"]) {
    const file = path.join(mediaRoot, `${slug}.${extension}`);
    try {
      await access(file);
      const fileStat = await stat(file);
      const minimumSize = extension === "mp4" ? 100_000 : 10_000;
      assert(fileStat.size >= minimumSize, `${slug}.${extension} is unexpectedly small`);
    } catch {
      failures.push(`Missing media asset: ${slug}.${extension}`);
    }
  }
}

for (const slug of projectSlugs) {
  for (const variant of ["cover", "overview", "selected"]) {
    for (const extension of ["jpg", "mp4"]) {
      const fileName = `${variant}-${slug}.${extension}`;
      try {
        const fileStat = await stat(path.join(mediaRoot, fileName));
        const minimumSize = extension === "mp4" ? 100_000 : 10_000;
        assert(fileStat.size >= minimumSize, `${fileName} is unexpectedly small`);
      } catch {
        failures.push(`Missing media asset: ${fileName}`);
      }
    }
  }
}

for (const fileName of ["rain-beast-fight.jpg", "rain-beast-fight.mp4"]) {
  try {
    const fileStat = await stat(path.join(mediaRoot, fileName));
    assert(fileStat.size >= (fileName.endsWith(".mp4") ? 500_000 : 20_000), `${fileName} is unexpectedly small`);
  } catch {
    failures.push(`Missing media asset: ${fileName}`);
  }
}

const portrait = path.join(mediaRoot, "portrait.jpg");
try {
  assert((await stat(portrait)).size >= 50_000, "portrait.jpg is unexpectedly small");
} catch {
  failures.push("Missing portrait.jpg");
}

const appSource = await readFile(path.join(root, "src", "App.jsx"), "utf8");
const styleSource = await readFile(path.join(root, "src", "styles.css"), "utf8");
const indexSource = await readFile(path.join(root, "index.html"), "utf8");
const hostingConfig = JSON.parse(await readFile(path.join(root, ".openai", "hosting.json"), "utf8"));

for (const requiredText of [
  "个人计划与学习目的",
  "硕士研究生申请与作品集准备",
  "学习实拍与 AI 结合",
  "学习 AI 赋能个人 IP 自媒体创作",
  "自我评价",
  "具备跨文化学习背景与导演专业训练",
  "吉林动画学院 · 2024级戏剧影视导演（后期制作方向）",
  "AI视觉",
  "新媒体运营",
  "摄影摄像与现场执行",
  "传统影视底座，导演训练为骨架",
  "把新工具，快速转成生产力",
  "以研究能力，持续向更远处生长",
  "计划于 2026 年赴澳门科技大学交换，参与剧组并统筹 AI 制作板块",
  "专业技能",
  "影视后期与制作",
  "生成式 AI 工作流",
  "视频与动画生成",
  "视觉与音频资产",
  "大语言模型与研究",
  "英语与跨文化沟通",
  "CET-4 491",
  "熟悉的软件与 AI 应用",
  "Claude",
  "DaVinci Resolve",
  "Kling AI",
  "即梦 AI",
  "Lovart",
  "Suno",
  "toolkit-grid",
  "选择作品媒体预览",
  "onSelectProject",
  "aria-pressed",
  "coverVideo",
  "overviewVideo",
  "selectedVideo",
  "PROJECT_PREVIEW_INTERVAL = 8000",
  "\"far-right\"",
  "\"far-left\"",
  "\"back\"",
  "InteractiveCover",
  "互动影像封面",
  "MOVING IMAGE ARCHIVE",
  "MOVE THE CURSOR TO EXPLORE",
  "SCROLL TO PORTFOLIO",
  "cover-trail-canvas",
  "updateActiveSection",
  "SectionNav",
  "section-nav",
  "导演 · AI视觉总监",
  "AI设计师 · 执行者 · 摄影助理",
  "制作人",
  "PRODUCER",
  "LxxxSerendipity",
  "lixjanus526@gmail.com",
  "4147214699",
  "21091L",
  "@Januslixxx23",
  "#/social",
  "social-field-notes.jpg",
  "social-ai-craft.jpg",
  "social-city-stories.jpg",
  "电台实习",
  "现场掌机",
  "视觉动捕",
  "<SocialSection />",
  "social-motion",
  "social-card-media",
  "useElementInView",
  "typeof window.IntersectionObserver",
  "hoverPaused",
  "focusPaused",
  "复制失败，请手动复制",
]) {
  assert(appSource.includes(requiredText), `Missing required content: ${requiredText}`);
}

assert(!appSource.includes("codex-clipboard"), "Source must not embed account screenshots");
assert(!appSource.includes("social-field-notes.mp4"), "Creative field notes must use the user-supplied still image");
assert(!appSource.includes("social-ai-craft.mp4"), "On-set camera note must use the user-supplied still image");
assert(!appSource.includes("social-city-stories.mp4"), "Visual mocap note must use the user-supplied still image");
assert((appSource.match(/className="english-copy" lang="en"/g) ?? []).length >= 9, "Independent English copy should declare lang=en");
assert(styleSource.includes("@media (max-width: 767px)"), "Missing mobile responsive styles");
assert(styleSource.includes(".interactive-cover"), "Missing immersive interactive cover styles");
assert(styleSource.includes(".monitor-far-right"), "Missing far-right monitor layer");
assert(styleSource.includes(".monitor-far-left"), "Missing far-left monitor layer");
assert(styleSource.includes(".monitor-back"), "Missing back monitor layer");
assert(styleSource.includes("@media (hover: none), (pointer: coarse)"), "Missing coarse-pointer cover fallback");
assert(styleSource.includes("@media (prefers-reduced-motion: reduce)"), "Missing reduced-motion fallback");
assert(styleSource.includes("--page: #f5f4f8"), "Missing violet-white canvas token");
assert(styleSource.includes("--surface: #0a0910"), "Missing near-black media-frame token");
assert(styleSource.includes("--cyan: #6643ff"), "Missing violet interaction token");
assert(indexSource.includes("MOVING IMAGE ARCHIVE · 影像作品集"), "Missing anonymous document title");
assert(!indexSource.includes("<title>李想"), "The opening document title must not reveal personal information");
assert(indexSource.includes('property="og:image" content="/og.png"'), "Missing Open Graph preview image");
assert(indexSource.includes('name="twitter:card" content="summary_large_image"'), "Missing large Twitter/X preview card metadata");
assert(hostingConfig.project_id === "appgprj_6a5c34e4b64c81919adb3e6a584c0bb9", "Unexpected Sites project id");

try {
  assert((await stat(path.join(root, "public", "og.png"))).size >= 100_000, "og.png is unexpectedly small");
} catch {
  failures.push("Missing public/og.png");
}

const publicFiles = await readdir(path.join(root, "public"), { recursive: true });
assert(
  !publicFiles.some((file) => /codex-clipboard|profile-screenshot|account-screenshot/i.test(file)),
  "Static social-account screenshots must not be published",
);

const publishedMediaFiles = await readdir(mediaRoot);
assert(
  publishedMediaFiles.length === expectedMediaFiles.size
    && publishedMediaFiles.every((file) => expectedMediaFiles.has(file)),
  `public/media must contain only the ${expectedMediaFiles.size} approved portfolio and social assets`,
);

if (failures.length) {
  console.error(`Verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Verification passed: content, integrated social section, responsive styles, and the exact ${expectedMediaFiles.size}-asset media whitelist are present.`);
}
