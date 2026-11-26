import { useEffect, useMemo, useRef, useState } from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaArrowDownLong, FaClapperboard, FaPalette, FaWandMagicSparkles } from "react-icons/fa6";
import { SiClaude, SiDavinciresolve, SiGooglegemini, SiSuno } from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";

const projects = [
  {
    slug: "rain-beast",
    title: "雨兽",
    englishTitle: "RAIN BEAST",
    type: "叙事短片",
    englishType: "NARRATIVE SHORT",
    role: "导演 · AI视觉总监",
    englishRole: "DIRECTOR · AI VISUAL DIRECTOR",
    description: "用 AI 影像构建雨夜、猛兽与人物危机交织的类型化寓言。",
    englishDescription: "A genre fable built from rain, beasts and human crisis through AI-assisted imagery.",
    accent: "#6643ff",
  },
  {
    slug: "invisible-shield",
    title: "静默防线",
    englishTitle: "THE INVISIBLE SHIELD",
    type: "公共安全悬疑短片",
    englishType: "PUBLIC-SAFETY THRILLER",
    role: "制作人",
    englishRole: "PRODUCER",
    description: "从口岸、人群、可疑包裹到技术识别与截查，形成层层加压的程序性悬疑。",
    englishDescription: "A procedural thriller moving from a crowded port to detection, interception and arrest.",
    accent: "#8368ff",
  },
  {
    slug: "xiu-mian",
    title: "修面",
    englishTitle: "XIU MIAN",
    type: "剧情短片",
    englishType: "DRAMA SHORT",
    role: "AI设计师 · 执行者 · 摄影助理",
    englishRole: "AI DESIGNER · EXECUTION · CAMERA ASSISTANT",
    description: "在克制的现实空间中，以影像与现场执行完成一段关于人物关系的情绪叙事。",
    englishDescription: "A restrained human drama shaped through visual design, on-set execution and camera support.",
    accent: "#9b86ff",
  },
  {
    slug: "tao-gu",
    title: "陶骨",
    englishTitle: "TAO GU",
    type: "AI音乐影像",
    englishType: "AI MUSIC VISUAL",
    role: "制作人",
    englishRole: "PRODUCER",
    description: "以泥、火、釉与手艺人的执念为视觉母题，建立温暖而克制的工艺叙事。",
    englishDescription: "A tactile visual poem shaped by clay, fire, glaze and the persistence of craft.",
    accent: "#7454ff",
  },
  {
    slug: "xiwang-jinan",
    title: "喜旺 × 济南文旅",
    englishTitle: "XIWANG × JINAN CITY",
    type: "文旅品牌广告",
    englishType: "CITY & BRAND FILM",
    role: "制作人",
    englishRole: "PRODUCER",
    description: "用年轻双人漫游串联泉水、老街、城市地标与食品体验，完成文旅和品牌的双重表达。",
    englishDescription: "A youthful city journey connecting Jinan culture, everyday travel and a food-brand story.",
    accent: "#a18dff",
  },
  {
    slug: "silent-embrace",
    title: "默默的怀抱",
    englishTitle: "SILENT EMBRACE",
    type: "节日传播影像",
    englishType: "SEASONAL SOCIAL FILM",
    role: "制作人",
    englishRole: "PRODUCER",
    description: "以亲近、轻盈的日常情绪承载母爱主题，面向新媒体完成节日内容表达。",
    englishDescription: "A warm, accessible Mother's Day story designed for social-media communication.",
    accent: "#c0b4ff",
  },
].map((project) => ({
  ...project,
  poster: `/media/${project.slug}.jpg`,
  video: `/media/${project.slug}.mp4`,
  coverPoster: `/media/cover-${project.slug}.jpg`,
  coverVideo: `/media/cover-${project.slug}.mp4`,
  overviewPoster: `/media/overview-${project.slug}.jpg`,
  overviewVideo: `/media/overview-${project.slug}.mp4`,
  selectedPoster: `/media/selected-${project.slug}.jpg`,
  selectedVideo: `/media/selected-${project.slug}.mp4`,
}));

const PROJECT_PREVIEW_INTERVAL = 8000;

const selectedProjects = [
  ...projects,
  {
    slug: "xiaoban",
    title: "小半",
    englishTitle: "XIAOBAN",
    type: "音乐录像",
    englishType: "MUSIC VIDEO",
    role: "剪辑 · 混音 · 后期包装",
    englishRole: "EDITING · SOUND MIXING · POST-PRODUCTION FINISHING",
    description: "用教室、走廊与放学后的片段剪成一支校园 MV。我负责剪辑、混音和全部后期包装，原始素材由他人拍摄。",
    englishDescription: "Classrooms, corridors and moments after school come together in this music video. I handled editing, sound mixing and all post-production finishing using footage shot by others.",
    poster: "/media/xiaoban.jpg",
    video: "/media/xiaoban.mp4",
    selectedPoster: "/media/xiaoban.jpg",
    selectedVideo: "/media/selected-xiaoban.mp4",
  },
];

const socialProfiles = [
  {
    platform: "小红书",
    englishPlatform: "REDNOTE",
    name: "Janus 李",
    handleLabel: "小红书号",
    handle: "4147214699",
    focus: "AI影像 · 摄影纪实 · 学习记录",
    englishFocus: "AI VISUALS · PHOTOGRAPHY · LEARNING NOTES",
    instruction: "复制账号后，在小红书 App 内搜索",
    englishInstruction: "COPY THE ID AND SEARCH IN THE REDNOTE APP",
    accent: "#6643ff",
    cover: "/media/social-rednote-cover.jpg",
    detail: "/media/social-rednote-detail.jpg",
    mediaLabel: "AI影像实验 / AI VISUAL STUDIES",
  },
  {
    platform: "抖音",
    englishPlatform: "DOUYIN",
    name: "陆小果",
    handleLabel: "抖音号",
    handle: "21091L",
    focus: "AIGC · 英语 · 运动 · 城市内容",
    englishFocus: "AIGC · ENGLISH · SPORTS · CITY STORIES",
    instruction: "复制账号后，在抖音 App 内搜索",
    englishInstruction: "COPY THE ID AND SEARCH IN THE DOUYIN APP",
    accent: "#8368ff",
    cover: "/media/social-douyin-cover.jpg",
    detail: "/media/social-douyin-detail.jpg",
    mediaLabel: "城市与短内容 / CITY & SHORT FORM",
  },
  {
    platform: "X",
    englishPlatform: "X / TWITTER",
    name: "Janus Li AI",
    handleLabel: "账号",
    handle: "@Januslixxx23",
    focus: "影视观察 · AIGC · 策划与作品集",
    englishFocus: "FILM NOTES · AIGC · CREATIVE PORTFOLIO",
    instruction: "打开公开主页",
    englishInstruction: "OPEN THE PUBLIC PROFILE",
    href: "https://x.com/Januslixxx23",
    accent: "#b7aaff",
    cover: "/media/social-x-cover.jpg",
    detail: "/media/social-x-detail.jpg",
    mediaLabel: "影视观察与过程 / FILM NOTES & PROCESS",
  },
];

const learningGoals = [
  {
    index: "01 / 2028",
    zh: "硕士研究生申请与作品集准备",
    en: "MASTER'S APPLICATION & PORTFOLIO PREPARATION",
  },
  {
    index: "02 / CRAFT",
    zh: "学习实拍与 AI 结合",
    en: "LIVE-ACTION PRODUCTION × AI WORKFLOWS",
  },
  {
    index: "03 / IP",
    zh: "学习 AI 赋能个人 IP 自媒体创作",
    en: "AI-POWERED PERSONAL IP & CREATOR PRACTICE",
  },
];

const selfEvaluation = [
  {
    index: "01 / FOUNDATION",
    headlineZh: "传统影视底座，导演训练为骨架",
    headlineEn: "CRAFT AS THE FOUNDATION",
    zh: "具备跨文化学习背景与导演专业训练；熟悉传统影视后期，在叙事、节奏与现场协作中稳扎稳打。",
    en: "Cross-cultural learning and directing training, grounded in practical post-production craft.",
  },
  {
    index: "02 / ADAPTATION",
    headlineZh: "把新工具，快速转成生产力",
    headlineEn: "TOOLS INTO WORKFLOWS",
    zh: "熟练运用 Kling、Codex、Suno 等多模态 AI 工具，完成视听预演、风格测试与创作闭环。",
    en: "Fast at translating emerging multimodal AI tools into dependable audiovisual workflows.",
  },
  {
    index: "03 / GROWTH",
    headlineZh: "以研究能力，持续向更远处生长",
    headlineEn: "RESEARCH, THEN GROWTH",
    zh: "具备英语应用与学术检索能力；计划于 2026 年赴澳门科技大学交换，参与剧组并统筹 AI 制作板块，同时推进 2028 研究生申请作品集。",
    en: "Combining English research, film theory and AI practice through a 2026 exchange at Macau University of Science and Technology, crew collaboration, AI production coordination and a 2028 postgraduate portfolio.",
  },
];

const professionalSkills = [
  {
    index: "01",
    title: "影视后期与制作",
    englishTitle: "POST-PRODUCTION & DIT",
    description: "熟悉非线性编辑、多机位剪辑、DIT 素材管理、基础调色，以及晚会、演讲等大型活动内容制作。",
    englishDescription: "Non-linear editing, multicam workflows, DIT asset management, basic grading and live-event content.",
    tools: "EDITING · MULTICAM · DIT · COLOR",
  },
  {
    index: "02",
    title: "生成式 AI 工作流",
    englishTitle: "GENERATIVE AI WORKFLOWS",
    description: "使用前沿 AI 生产力工具完成影视预演、提示词优化、风格测试与创作闭环，熟练应用 Codex AI Agent。",
    englishDescription: "AI-assisted previsualization, prompt iteration, style testing and production loops with Codex AI Agent.",
    tools: "CODEX · AI AGENT · PREVIS",
  },
  {
    index: "03",
    title: "视频与动画生成",
    englishTitle: "VIDEO & ANIMATION GENERATION",
    description: "熟练使用可灵、即梦进行分镜生成、镜头测试与动态预演，把抽象创意转化为可讨论的画面。",
    englishDescription: "Storyboard generation, shot testing and motion previsualization with Kling and Jimeng.",
    tools: "KLING · JIMENG · STORYBOARD",
  },
  {
    index: "04",
    title: "视觉与音频资产",
    englishTitle: "VISUAL & AUDIO ASSETS",
    description: "掌握 Lovart 图像生成与 Suno 音乐、音效生成逻辑，为项目快速建立统一的视听资产方向。",
    englishDescription: "Image generation with Lovart and music or sound development with Suno.",
    tools: "LOVART · SUNO · ASSET DIRECTION",
  },
  {
    index: "05",
    title: "大语言模型与研究",
    englishTitle: "LLM & RESEARCH",
    description: "使用 Gemini、ChatGPT 优化脚本、辅助学术检索与英文文献翻译，掌握提示词工程、文献计量与学术追踪。",
    englishDescription: "Script development, academic search, translation, prompt engineering and research tracking.",
    tools: "GEMINI · CHATGPT · RESEARCH",
  },
  {
    index: "06",
    title: "英语与跨文化沟通",
    englishTitle: "ENGLISH & CROSS-CULTURAL",
    description: "CET-4 491 分，具备良好口语沟通能力，可阅读外文技术文档、软件说明及影视与 AI 相关材料。",
    englishDescription: "CET-4 491 with practical spoken English and confident reading of technical documentation.",
    tools: "CET-4 491 · DOCUMENTATION · COMMUNICATION",
  },
];

const toolkit = [
  {
    name: "Claude",
    category: "创作协作 / AI ASSISTANT",
    Icon: SiClaude,
    color: "#d97757",
  },
  {
    name: "DaVinci Resolve",
    category: "调色 · DIT / COLOR",
    Icon: SiDavinciresolve,
    color: "#d8d2ff",
  },
  {
    name: "Codex",
    category: "AI AGENT",
    Icon: TbBrandOpenai,
    color: "#ffffff",
  },
  {
    name: "ChatGPT",
    category: "脚本 · 提示词 / LLM",
    Icon: BsChatSquareDotsFill,
    color: "#a98fff",
  },
  {
    name: "Gemini",
    category: "检索 · 翻译 / RESEARCH",
    Icon: SiGooglegemini,
    color: "#8ab4f8",
  },
  {
    name: "Kling AI",
    category: "视频生成 / VIDEO",
    Icon: FaClapperboard,
    color: "#b8a8ff",
  },
  {
    name: "即梦 AI",
    category: "分镜 · 动态预演 / PREVIS",
    Icon: FaWandMagicSparkles,
    color: "#d3c9ff",
  },
  {
    name: "Lovart",
    category: "视觉资产 / VISUALS",
    Icon: FaPalette,
    color: "#c5b8ff",
  },
  {
    name: "Suno",
    category: "音乐 · 音效 / AUDIO",
    Icon: SiSuno,
    color: "#f2eeff",
  },
];

const socialMotionClips = [
  {
    title: "电台实习",
    englishTitle: "STUDIO INTERNSHIP",
    image: "/media/social-field-notes.jpg",
    alt: "济南电视台演播厅控制室实习现场",
  },
  {
    title: "现场掌机",
    englishTitle: "ON-SET CAMERA",
    image: "/media/social-ai-craft.jpg",
    alt: "短片修面拍摄现场掌机工作视角",
  },
  {
    title: "视觉动捕",
    englishTitle: "VISUAL MOCAP",
    image: "/media/social-city-stories.jpg",
    alt: "动作捕捉替补与演员现场画面",
  },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function useElementInView(ref, initialValue = false) {
  const [inView, setInView] = useState(initialValue);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const updateFromBounds = () => {
      const bounds = element.getBoundingClientRect();
      setInView(bounds.bottom > 0 && bounds.top < window.innerHeight);
    };

    updateFromBounds();

    if (typeof window.IntersectionObserver === "function") {
      const observer = new window.IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold: 0.05 },
      );
      observer.observe(element);
      return () => observer.disconnect();
    }

    let animationFrame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateFromBounds);
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [ref]);

  return inView;
}

async function copyToClipboard(value) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  }
}

function BilingualLabel({ zh, en, className = "" }) {
  return (
    <span className={`bilingual ${className}`.trim()}>
      <span className="bilingual-zh">{zh}</span>
      <span className="bilingual-en" lang="en">{en}</span>
    </span>
  );
}

function InteractiveCover({ onEnter, onOpenProject }) {
  const coverRef = useRef(null);
  const trailCanvasRef = useRef(null);
  const lensVideoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleVersion, setCycleVersion] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));
  const inView = useElementInView(coverRef, true);
  const activeProject = projects[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || !inView || hoverPaused || focusPaused) return undefined;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
      setCycleVersion((current) => current + 1);
    }, PROJECT_PREVIEW_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [cycleVersion, focusPaused, hoverPaused, inView, reducedMotion]);

  useEffect(() => {
    const video = lensVideoRef.current;
    if (!video) return;
    if (inView && !reducedMotion) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [activeIndex, inView, reducedMotion]);

  useEffect(() => {
    const cover = coverRef.current;
    const canvas = trailCanvasRef.current;
    if (!cover || !canvas || reducedMotion) return undefined;

    const context = canvas.getContext("2d");
    let animationFrame = 0;
    let points = [];
    let pixelRatio = 1;

    const resizeCanvas = () => {
      const bounds = cover.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const onPointerMove = (event) => {
      const bounds = cover.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const normalizedX = (x / bounds.width - 0.5) * 2;
      const normalizedY = (y / bounds.height - 0.5) * 2;
      cover.style.setProperty("--cover-tilt-x", `${normalizedY * -3.2}deg`);
      cover.style.setProperty("--cover-tilt-y", `${normalizedX * 4.2}deg`);
      cover.style.setProperty("--cover-shift-x", `${normalizedX * 16}px`);
      cover.style.setProperty("--cover-shift-y", `${normalizedY * 12}px`);
      points.push({ x, y, createdAt: performance.now() });
      if (points.length > 28) points = points.slice(-28);
      if (!animationFrame) animationFrame = window.requestAnimationFrame(drawTrail);
    };

    const onPointerLeave = () => {
      cover.style.setProperty("--cover-tilt-x", "0deg");
      cover.style.setProperty("--cover-tilt-y", "0deg");
      cover.style.setProperty("--cover-shift-x", "0px");
      cover.style.setProperty("--cover-shift-y", "0px");
    };

    const drawTrail = (now) => {
      animationFrame = 0;
      const bounds = cover.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);
      points = points.filter((point) => now - point.createdAt < 620);

      if (points.length > 1) {
        context.lineCap = "round";
        context.lineJoin = "round";
        for (let index = 1; index < points.length; index += 1) {
          const previous = points[index - 1];
          const current = points[index];
          const age = Math.min(1, (now - current.createdAt) / 620);
          const opacity = (1 - age) * (index / points.length) * 0.78;
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(current.x, current.y);
          context.strokeStyle = `rgba(102, 67, 255, ${opacity})`;
          context.lineWidth = Math.max(1, 10 * (1 - age));
          context.stroke();
        }

        const latest = points[points.length - 1];
        const latestAge = Math.min(1, (now - latest.createdAt) / 620);
        context.beginPath();
        context.arc(latest.x, latest.y, 4 + 7 * (1 - latestAge), 0, Math.PI * 2);
        context.fillStyle = `rgba(245, 231, 91, ${(1 - latestAge) * 0.9})`;
        context.fill();
      }

      if (points.length) animationFrame = window.requestAnimationFrame(drawTrail);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    cover.addEventListener("pointermove", onPointerMove, { passive: true });
    cover.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      cover.removeEventListener("pointermove", onPointerMove);
      cover.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  const selectProject = (index) => {
    setActiveIndex(index);
    setCycleVersion((current) => current + 1);
  };

  const moveSelection = (direction) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
    setCycleVersion((current) => current + 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSelection(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSelection(1);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      onOpenProject(activeProject);
    }
  };

  return (
    <section
      className="interactive-cover"
      ref={coverRef}
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false);
      }}
      aria-label="互动影像封面，使用左右方向键切换作品，按回车打开项目"
    >
      <canvas className="cover-trail-canvas" ref={trailCanvasRef} aria-hidden="true" />

      <header className="cover-topbar">
        <span className="cover-wordmark">MOVING IMAGE ARCHIVE</span>
        <span className="cover-mode">FILM · AI VISUALS · NEW MEDIA</span>
        <button className="cover-enter-top" type="button" onClick={onEnter}>
          进入作品 / ENTER
        </button>
      </header>

      <div className="cover-media-field" aria-hidden="true">
        {projects.map((project, index) => (
          <figure
            className={`cover-media-panel cover-media-panel-${index + 1} ${index === activeIndex ? "is-active" : ""}`}
            key={project.slug}
          >
            <img src={project.coverPoster} alt="" />
          </figure>
        ))}
      </div>

      <div className="cover-focus-system">
        <div className="cover-orbit cover-orbit-outer" aria-hidden="true" />
        <div className="cover-orbit cover-orbit-inner" aria-hidden="true" />
        <button
          className="cover-lens"
          type="button"
          onClick={() => onOpenProject(activeProject)}
          aria-label={`打开项目 ${activeProject.title} / ${activeProject.englishTitle}`}
        >
          <video
            ref={lensVideoRef}
            key={activeProject.slug}
            src={activeProject.coverVideo}
            poster={activeProject.coverPoster}
            muted
            loop
            autoPlay={inView && !reducedMotion}
            playsInline
            preload={inView ? "auto" : "metadata"}
          />
          <span className="cover-lens-shade" aria-hidden="true" />
          <span className="cover-current-project">
            <span>{activeProject.title}</span>
            <small>{activeProject.englishTitle}</small>
          </span>
        </button>
        <div className="cover-display-title" aria-hidden="true">
          <span>MOVING</span>
          <span>IMAGE</span>
        </div>
      </div>

      <div className="cover-project-controls" aria-label="选择首屏作品预览">
        {projects.map((project, index) => (
          <button
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            aria-label={`预览 ${project.title} / ${project.englishTitle}`}
            aria-pressed={index === activeIndex}
            onClick={() => selectProject(index)}
            key={project.slug}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className="cover-guidance">
        <p>
          <span>移动光标，探索影像场域</span>
          <small>MOVE THE CURSOR TO EXPLORE</small>
        </p>
        <button className="cover-scroll-action" type="button" onClick={onEnter}>
          <FaArrowDownLong aria-hidden="true" />
          <span>
            向下进入作品集
            <small>SCROLL TO PORTFOLIO</small>
          </span>
        </button>
        <p className="cover-counter">
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <small>INTERACTIVE FILM INDEX</small>
        </p>
      </div>
    </section>
  );
}

function SectionNav() {
  const items = [
    { id: "portfolio", zh: "作品总览", en: "PORTFOLIO" },
    { id: "works", zh: "精选项目", en: "SELECTED WORK" },
    { id: "about", zh: "个人介绍", en: "ABOUT" },
    { id: "capabilities", zh: "专业技能", en: "CAPABILITIES" },
    { id: "social", zh: "社交主页", en: "SOCIAL" },
    { id: "contact", zh: "联系方式", en: "CONTACT" },
  ];
  const [active, setActive] = useState("portfolio");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    let animationFrame = 0;
    const updateActiveSection = () => {
      const activationLine = window.scrollY + Math.min(Math.max(window.innerHeight * 0.24, 140), 260);
      let currentSection = "portfolio";
      sections.forEach((section) => {
        if (section.offsetTop <= activationLine) currentSection = section.id;
      });
      setActive(currentSection);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const openItem = (item) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(item.id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav className="section-nav" aria-label="页面分区导航">
      {items.map((item) => (
        <button
          type="button"
          className={active === item.id ? "is-active" : ""}
          aria-current={active === item.id ? "location" : undefined}
          onClick={() => openItem(item)}
          key={item.id}
        >
          <span>{item.zh}</span>
          <small>{item.en}</small>
        </button>
      ))}
    </nav>
  );
}

function MonitorRig({
  activeIndex,
  progress,
  inView,
  reducedMotion,
  onHoverChange,
  onFocusChange,
  onSelectProject,
}) {
  const videoRefs = useRef([]);
  const rigExit = reducedMotion ? 0 : clamp((progress - 0.2) / 0.18);
  const scale = 1 - rigExit * 0.12;
  const shiftX = rigExit * -14;
  const shiftY = rigExit * -2;

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex && inView && !reducedMotion) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, inView, reducedMotion]);

  return (
    <div
      className="monitor-rig"
      style={{
        transform: `translate3d(calc(-50% + ${shiftX}vw), calc(-50% + ${shiftY}vh), 0) scale(${scale})`,
        opacity: 1 - rigExit,
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocusCapture={() => onFocusChange(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onFocusChange(false);
      }}
      aria-label="作品动态预览"
    >
      <div className="rig-shadow" aria-hidden="true" />
      {projects.map((project, index) => {
        const relative = (index - activeIndex + projects.length) % projects.length;
        const slot = relative === 0
          ? "front"
          : relative === 1
            ? "right"
            : relative === 2
              ? "far-right"
              : relative === 3
                ? "back"
                : relative === 4
                  ? "far-left"
                  : "left";
        const isFront = slot === "front";
        return (
          <article
            className={`monitor monitor-${slot}`}
            style={{ "--project-accent": project.accent }}
            key={project.slug}
            aria-current={isFront ? "true" : undefined}
            aria-label={`${isFront ? "正在播放" : "候选预览"}：${project.title} / ${project.englishTitle}`}
          >
            <div className="monitor-surface">
              <video
                ref={(video) => {
                  videoRefs.current[index] = video;
                }}
                src={project.overviewVideo}
                poster={project.overviewPoster}
                muted
                loop
                autoPlay={isFront && inView && !reducedMotion}
                playsInline
                preload={isFront && inView ? "auto" : "metadata"}
              />
              <div className="monitor-shade" />
              <div className="monitor-caption">
                <span className="monitor-count">{String(index + 1).padStart(2, "0")}</span>
                <BilingualLabel zh={project.title} en={project.englishTitle} />
              </div>
            </div>
            {!isFront && (
              <button
                className="monitor-select"
                type="button"
                onClick={() => onSelectProject(index)}
                aria-label={`切换到 ${project.title} / ${project.englishTitle}`}
              />
            )}
          </article>
        );
      })}
      <div className="rig-index" role="group" aria-label="选择作品媒体预览">
        {projects.map((project, index) => (
          <button
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            aria-label={`选择第 ${index + 1} 项，共 ${projects.length} 项：${project.title} / ${project.englishTitle}`}
            aria-pressed={index === activeIndex}
            onClick={() => onSelectProject(index)}
            key={project.slug}
          />
        ))}
      </div>
    </div>
  );
}

function ScrollStory({ onOpenProject, onNavigate }) {
  const storyRef = useRef(null);
  const cinematicVideoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [cycleVersion, setCycleVersion] = useState(0);
  const cycleTimerRef = useRef(null);
  const [mobileLayout, setMobileLayout] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches
  ));
  const [reducedMotion, setReducedMotion] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const updateLayout = () => setMobileLayout(mediaQuery.matches);
    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    if (cycleTimerRef.current) {
      window.clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
    if (!inView || hoverPaused || focusPaused || reducedMotion) return undefined;
    cycleTimerRef.current = window.setTimeout(() => {
      cycleTimerRef.current = null;
      setActiveIndex((current) => (current + 1) % projects.length);
      setCycleVersion((current) => current + 1);
    }, PROJECT_PREVIEW_INTERVAL);
    return () => {
      if (cycleTimerRef.current) {
        window.clearTimeout(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };
  }, [inView, hoverPaused, focusPaused, reducedMotion, cycleVersion]);

  const selectProjectPreview = (index) => {
    if (cycleTimerRef.current) {
      window.clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
    setActiveIndex(index);
    setCycleVersion((current) => current + 1);
  };

  useEffect(() => {
    const video = cinematicVideoRef.current;
    if (!video) return;
    if (inView && progress > 0.28 && progress < 0.9 && !reducedMotion) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [activeIndex, inView, progress, reducedMotion]);

  useEffect(() => {
    let animationFrame = 0;
    const updateProgress = () => {
      if (!storyRef.current) return;
      const story = storyRef.current;
      const total = Math.max(1, story.offsetHeight - window.innerHeight);
      const nextProgress = clamp((window.scrollY - story.offsetTop) / total);
      const storyRect = story.getBoundingClientRect();
      setProgress(nextProgress);
      setInView(storyRect.top < window.innerHeight && storyRect.bottom > 0);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const introFade = reducedMotion ? 1 : 1 - clamp((progress - 0.12) / 0.09);
  const statementReveal = reducedMotion ? 1 : clamp((progress - 0.14) / 0.11);
  const statementExit = reducedMotion ? 0 : clamp((progress - 0.37) / 0.18);
  const frameReveal = reducedMotion ? 1 : clamp((progress - 0.3) / 0.15);
  const frameFill = reducedMotion ? 0 : clamp((progress - 0.46) / 0.2);
  const kineticReveal = reducedMotion ? 0 : clamp((progress - 0.61) / 0.08);
  const kineticScatter = reducedMotion ? 0 : clamp((progress - 0.7) / 0.14);
  const frameExit = reducedMotion ? 0 : clamp((progress - 0.82) / 0.12);
  const reveal = reducedMotion ? 1 : clamp((progress - 0.84) / 0.1);
  const splitOpacity = reducedMotion ? 1 : clamp((progress - 0.83) / 0.08);
  const selectedProject = projects[activeIndex];
  const identityHidden = !mobileLayout && reveal < 0.08;
  const frameScale = 0.82 + frameReveal * 0.18 + frameFill * 0.58 - frameExit * 0.42;
  const frameRotate = (1 - frameReveal) * -5 + frameFill * 5;
  const frameTranslateY = (1 - frameReveal) * 76;
  const frameTranslateX = frameExit * -17;

  return (
    <section
      className="scroll-story"
      id="portfolio"
      ref={storyRef}
      data-carousel-active={inView && !hoverPaused && !focusPaused && !reducedMotion}
      aria-label="作品与个人信息滚动序章"
    >
      <div className="story-stage">
        <a className="skip-intro" href="#works">跳过片头 / SKIP INTRO</a>

        <div className="intro-copy" style={{ opacity: introFade }}>
          <BilingualLabel zh="作品总览" en="WORK INDEX" className="intro-title" />
          <span className="intro-counter">01—06</span>
          <button className="text-action" type="button" onClick={() => document.querySelector("#works")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}>
            <BilingualLabel zh="进入作品档案" en="ENTER THE ARCHIVE" />
          </button>
        </div>

        <div
          className="story-statement"
          style={{
            opacity: statementReveal * (1 - statementExit),
            transform: `translate3d(0, ${(1 - statementReveal) * 18 - statementExit * 12}vh, 0)`,
          }}
          aria-hidden={statementReveal < 0.08 || statementExit > 0.92}
        >
          <span className="story-statement-kicker">DIRECTING · AI VISUALS · PRODUCTION</span>
          <p>
            <span>让想象，</span>
            <span>成为可以抵达的现场。</span>
          </p>
          <small>TURNING IMAGINATION INTO A PLACE YOU CAN ENTER.</small>
        </div>

        <MonitorRig
          activeIndex={activeIndex}
          inView={inView && progress < 0.42}
          progress={progress}
          reducedMotion={reducedMotion}
          onHoverChange={setHoverPaused}
          onFocusChange={setFocusPaused}
          onSelectProject={selectProjectPreview}
        />

        <button
          className="cinematic-frame"
          type="button"
          onClick={() => onOpenProject(selectedProject)}
          aria-label={`打开项目 ${selectedProject.title} / ${selectedProject.englishTitle}`}
          aria-hidden={frameReveal < 0.08}
          tabIndex={frameReveal > 0.1 || reducedMotion ? 0 : -1}
          style={{
            opacity: frameReveal,
            borderRadius: `${Math.round((1 - frameFill) * 28)}px`,
            transform: `translate3d(calc(-50% + ${frameTranslateX}vw), calc(-50% + ${frameTranslateY}vh), 0) rotate(${frameRotate}deg) scale(${frameScale})`,
          }}
        >
          <video
            ref={cinematicVideoRef}
            key={selectedProject.slug}
            src={selectedProject.overviewVideo}
            poster={selectedProject.overviewPoster}
            muted
            loop
            playsInline
            preload={inView ? "auto" : "metadata"}
          />
          <span className="cinematic-frame-shade" aria-hidden="true" />
          <span className="cinematic-frame-meta">
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <BilingualLabel zh={selectedProject.title} en={selectedProject.englishTitle} />
            <span>VIEW PROJECT ↗</span>
          </span>
        </button>

        <div
          className="kinetic-title"
          style={{ opacity: kineticReveal * (1 - frameExit) }}
          aria-hidden="true"
        >
          <span style={{ transform: `translate3d(${-kineticScatter * 48}vw, 0, 0)` }}>让故事</span>
          <span style={{ transform: `translate3d(${kineticScatter * 46}vw, 0, 0)` }}>脱离画框</span>
          <span
            className="kinetic-title-wide"
            style={{
              letterSpacing: `${kineticScatter * 0.22}em`,
              transform: `scale(${1 + kineticScatter * 0.75})`,
            }}
          >
            进入现场
          </span>
          <small>STORIES BREAK THE FRAME · ENTER THE SCENE</small>
        </div>

        <div className="scroll-cue" style={{ opacity: introFade }}>
          <BilingualLabel zh="向下滚动" en="SCROLL TO REVEAL" />
          <span className="scroll-progress-line"><span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} /></span>
        </div>

        <div className="split-divider" style={{ opacity: splitOpacity }} aria-hidden="true" />

        <section
          className="identity-panel"
          style={{ opacity: reveal, transform: `translate3d(${(1 - reveal) * 54}px, 0, 0)` }}
          aria-hidden={identityHidden}
          inert={identityHidden}
        >
          <nav className="identity-nav" aria-label="主导航">
            <button type="button" onClick={() => document.querySelector("#works")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}>作品 / WORK</button>
            <button type="button" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}>关于 / ABOUT</button>
            <button type="button" onClick={() => onNavigate("social")}>社交 / SOCIAL</button>
          </nav>

          <div className="identity-head">
            <figure className="portrait-frame">
              <img src="/media/portrait.jpg" alt="李想个人形象照" />
            </figure>
            <div className="identity-copy">
              <BilingualLabel zh="李想" en="LI XIANG" className="identity-name" />
              <BilingualLabel zh="导演 · AI视觉 · 新媒体内容" en="DIRECTOR · AI VISUALS · NEW MEDIA" className="identity-role" />
            </div>
          </div>

          <div className="learning-panel">
            <BilingualLabel zh="个人计划与学习目的" en="PLAN & LEARNING GOALS" className="panel-title" />
            <div className="learning-goals">
              {learningGoals.map((goal) => (
                <article className="learning-goal" key={goal.index}>
                  <span>{goal.index}</span>
                  <BilingualLabel zh={goal.zh} en={goal.en} />
                </article>
              ))}
            </div>
          </div>

          <button className="active-project" type="button" onClick={() => onOpenProject(selectedProject)}>
            <span className="active-project-kicker">当前主屏 / NOW PLAYING</span>
            <BilingualLabel zh={selectedProject.title} en={selectedProject.englishTitle} />
            <span className="active-project-action">查看作品 / VIEW PROJECT</span>
          </button>
        </section>

        <div className="story-progress" aria-hidden="true">
          <span>00</span>
          <div><i style={{ transform: `scaleY(${progress})` }} /></div>
          <span>100</span>
        </div>
      </div>
    </section>
  );
}

function ProjectArchive({ onOpenProject }) {
  const filters = [
    { key: "all", zh: "全部", en: "ALL" },
    { key: "narrative", zh: "叙事", en: "NARRATIVE" },
    { key: "ai", zh: "AI影像", en: "AI VISUALS" },
    { key: "brand", zh: "品牌内容", en: "BRAND" },
  ];
  const [filter, setFilter] = useState("all");
  const [activePreviewSlug, setActivePreviewSlug] = useState(projects[0].slug);
  const [reducedMotion, setReducedMotion] = useState(() => (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));
  const archiveRef = useRef(null);
  const inView = useElementInView(archiveRef);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const visibleProjects = useMemo(() => selectedProjects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "narrative") return ["rain-beast", "invisible-shield", "xiu-mian"].includes(project.slug);
    if (filter === "ai") return ["rain-beast", "tao-gu", "silent-embrace"].includes(project.slug);
    return ["xiwang-jinan", "silent-embrace"].includes(project.slug);
  }), [filter]);

  return (
    <section className="archive" id="works" ref={archiveRef}>
      <header className="section-header">
        <div>
          <span className="section-index">02 / 06</span>
          <BilingualLabel zh="精选作品" en="SELECTED WORKS" className="section-title" />
        </div>
        <p>从导演、AI 视觉到剪辑与混音，按项目查看创作分工与作品。</p>
      </header>

      <div className="filter-bar" role="group" aria-label="作品分类">
        {filters.map((item) => (
          <button
            type="button"
            aria-pressed={filter === item.key}
            className={filter === item.key ? "is-active" : ""}
            onClick={() => setFilter(item.key)}
            key={item.key}
          >
            {item.zh} / {item.en}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <button
            className="project-card"
            type="button"
            onClick={() => onOpenProject(project)}
            onMouseEnter={() => setActivePreviewSlug(project.slug)}
            onFocus={() => setActivePreviewSlug(project.slug)}
            key={project.slug}
          >
            <div className="project-media">
              {inView && !reducedMotion && activePreviewSlug === project.slug && (
                <video
                  src={project.selectedVideo}
                  poster={project.selectedPoster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              )}
              <img src={project.selectedPoster} alt={`${project.title}作品画面`} />
              <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="project-meta">
              <BilingualLabel zh={project.title} en={project.englishTitle} className="project-title" />
              <BilingualLabel zh={project.type} en={project.englishType} className="project-type" />
              {project.role && <BilingualLabel zh={project.role} en={project.englishRole} className="project-role" />}
              <span className="project-view">查看项目 / VIEW CASE</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function AboutSection({ onNavigate }) {
  return (
    <section className="about" id="about">
      <header className="section-header">
        <div>
          <span className="section-index">03 / 06</span>
          <BilingualLabel zh="关于我" en="ABOUT" className="section-title" />
        </div>
      </header>
      <div className="about-grid">
        <figure className="about-portrait">
          <img src="/media/portrait.jpg" alt="李想半身形象照" />
        </figure>
        <div className="about-statement">
          <p>以导演思维统筹叙事，以 AI 视觉拓展世界，并从制片到现场执行把创意可靠落地。</p>
          <p className="english-copy" lang="en">I shape stories with a director's eye, extend them through AI visuals, and carry ideas into dependable production.</p>
        </div>
        <dl className="about-facts">
          <div>
            <dt>教育经历 / EDUCATION</dt>
            <dd>吉林动画学院 · 2024级戏剧影视导演（后期制作方向）</dd>
            <dd className="english-copy" lang="en">Jilin Animation Institute · Film & TV Directing (Post-production), Class of 2024</dd>
          </div>
          <div>
            <dt>工作方法 / WORKING STYLE</dt>
            <dd>稳扎稳打 · 有目标有志向 · 可信任</dd>
            <dd className="english-copy" lang="en">STEADY · AMBITIOUS · TRUSTWORTHY</dd>
          </div>
          <div>
            <dt>工作方向 / FOCUS</dt>
            <dd className="focus-list">
              <span><b>01</b><em>AI视觉</em></span>
              <span><b>02</b><em>新媒体运营</em></span>
              <span><b>03</b><em>摄影摄像与现场执行</em></span>
            </dd>
            <dd className="english-copy" lang="en">AI VISUALS · NEW MEDIA OPERATIONS · CAMERA & ON-SET EXECUTION</dd>
          </div>
        </dl>
        <button className="outlined-action" type="button" onClick={() => onNavigate("social")}>查看社交主页 / OPEN SOCIAL DESK</button>
      </div>
      <div className="evaluation-section">
        <div className="evaluation-heading">
          <span className="section-index">PROFESSIONAL PROFILE</span>
          <BilingualLabel zh="自我评价" en="SELF EVALUATION" className="evaluation-title" />
          <p>不是泛泛的形容词，而是我进入项目后可以被验证的工作方式。</p>
          <p className="english-copy" lang="en">A concise account of how I learn, collaborate and turn new tools into production outcomes.</p>
        </div>
        <div className="evaluation-list">
          {selfEvaluation.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <div className="evaluation-copy">
                <BilingualLabel zh={item.headlineZh} en={item.headlineEn} className="evaluation-headline" />
                <p>{item.zh}</p>
                <p className="english-copy" lang="en">{item.en}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section className="capabilities" id="capabilities">
      <header className="capabilities-header">
        <div>
          <span className="section-index">04 / 06</span>
          <BilingualLabel zh="核心技能" en="CORE CAPABILITIES" className="capabilities-title" />
        </div>
        <div className="capabilities-intro">
          <span>WHAT I CAN DELIVER</span>
          <p>我的核心能力来自导演训练、影视后期、AI 工作流与跨文化研究：把概念快速变成可讨论、可执行、可交付的画面。</p>
          <p className="english-copy" lang="en">Directing, post-production, AI workflows and research — connected into dependable visual outcomes.</p>
        </div>
      </header>
      <div className="capability-grid">
        {professionalSkills.map((skill) => (
          <article className="capability-card" key={skill.index}>
            <div className="capability-card-top">
              <span>能力 {skill.index}</span>
              <span>CAPABILITY {skill.index}</span>
            </div>
            <BilingualLabel zh={skill.title} en={skill.englishTitle} className="capability-title" />
            <strong>{skill.tools}</strong>
            <p>{skill.description}</p>
            <p className="english-copy" lang="en">{skill.englishDescription}</p>
          </article>
        ))}
      </div>
      <div className="toolkit-panel">
        <header className="toolkit-header">
          <div>
            <span>SOFTWARE / TOOLKIT</span>
            <h3>熟悉的软件与 AI 应用</h3>
          </div>
          <p>覆盖剪辑、调色、预演、图像、音乐、脚本与研究。</p>
        </header>
        <div className="toolkit-grid">
          {toolkit.map(({ name, category, Icon, color }) => (
            <article className="toolkit-card" key={name}>
              <Icon aria-hidden="true" style={{ color }} />
              <strong>{name}</strong>
              <span>{category}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onNavigate }) {
  const [copied, setCopied] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const copyText = async (value, label) => {
    const didCopy = await copyToClipboard(value);
    if (!didCopy) {
      setCopied("");
      setCopyStatus(`${label}复制失败，请手动复制`);
      return;
    }
    setCopied(label);
    setCopyStatus(`${label}联系方式已复制`);
    window.setTimeout(() => {
      setCopied("");
      setCopyStatus("");
    }, 2600);
  };

  return (
    <footer className="contact" id="contact">
      <span className="section-index">06 / 06</span>
      <BilingualLabel zh="一起完成下一件作品" en="LET'S MAKE THE NEXT STORY" className="contact-title" />
      <div className="contact-actions">
        <a href="mailto:lixjanus526@gmail.com">lixjanus526@gmail.com</a>
        <button type="button" onClick={() => copyText("LxxxSerendipity", "微信")}>微信 LxxxSerendipity · {copied === "微信" ? "已复制 / COPIED" : "复制 / COPY"}</button>
        <button type="button" onClick={() => onNavigate("social")}>社交主页 / SOCIAL DESK</button>
      </div>
      <span className="visually-hidden" role="status" aria-live="polite">
        {copyStatus}
      </span>
      <div className="footer-line">
        <span>LI XIANG PORTFOLIO · 2026</span>
        <span>JINAN / CHANGCHUN · CHINA</span>
      </div>
    </footer>
  );
}

function SocialSection() {
  const [copied, setCopied] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const copyHandle = async (profile) => {
    const didCopy = await copyToClipboard(profile.handle);
    if (!didCopy) {
      setCopied("");
      setCopyStatus(`${profile.platform}账号复制失败，请手动复制`);
      return;
    }
    setCopied(profile.platform);
    setCopyStatus(`${profile.platform}账号已复制`);
    window.setTimeout(() => {
      setCopied("");
      setCopyStatus("");
    }, 2600);
  };

  return (
    <section className="social-page" id="social">
      <section className="social-intro">
        <div className="social-intro-copy">
          <span className="section-index">05 / 06 · SOCIAL DESK</span>
          <BilingualLabel zh="持续更新的创作现场" en="LIVE CREATIVE CHANNELS" className="social-title" />
          <p>这里不复制平台主页，而是用真实工作照片记录演播厅、现场掌机与视觉动捕实践。</p>
          <p className="english-copy" lang="en">A field notebook of studio work, on-set camera operation and visual motion-capture practice.</p>
        </div>
        <div className="social-motion" aria-label="创作现场图片预览">
          {socialMotionClips.map((clip, index) => (
            <figure
              className="social-motion-frame"
              style={{ "--motion-index": index, "--motion-image": `url("${clip.image}")` }}
              key={clip.englishTitle}
            >
              <img src={clip.image} alt={clip.alt} />
              <figcaption>
                <span>0{index + 1}</span>
                <BilingualLabel zh={clip.title} en={clip.englishTitle} />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <div className="social-ticker" aria-hidden="true">
        <div>
          <span>DIRECTING / 导演叙事</span>
          <span>AI VISUALS / AI 视觉</span>
          <span>CITY STORIES / 城市内容</span>
          <span>PROCESS NOTES / 创作过程</span>
          <span>DIRECTING / 导演叙事</span>
          <span>AI VISUALS / AI 视觉</span>
          <span>CITY STORIES / 城市内容</span>
          <span>PROCESS NOTES / 创作过程</span>
        </div>
      </div>
      <section className="social-grid" aria-label="社交平台账号">
        {socialProfiles.map((profile, index) => (
          <article className="social-card" style={{ "--social-accent": profile.accent, "--delay": `${index * 90}ms` }} key={profile.platform}>
            <div className="social-card-top">
              <span className="social-number">0{index + 1}</span>
              <BilingualLabel zh={profile.platform} en={profile.englishPlatform} className="social-platform" />
            </div>
            <div className="social-card-media">
              <img className="social-card-cover" src={profile.cover} alt={`${profile.platform}内容方向作品画面`} />
              <img className="social-card-detail" src={profile.detail} alt="" aria-hidden="true" />
              <span>{profile.mediaLabel}</span>
            </div>
            <div className="social-profile">
              <h2>{profile.name}</h2>
              <span>{profile.handleLabel} · {profile.handle}</span>
            </div>
            <BilingualLabel zh={profile.focus} en={profile.englishFocus} className="social-focus" />
            <div className="social-actions">
              <button type="button" onClick={() => copyHandle(profile)}>
                {copied === profile.platform ? "已复制 / COPIED" : "复制账号 / COPY ID"}
              </button>
              {profile.href ? (
                <a href={profile.href} target="_blank" rel="noreferrer">
                  打开主页 / OPEN PROFILE
                  <span className="visually-hidden">（新窗口打开）</span>
                </a>
              ) : (
                <span><BilingualLabel zh={profile.instruction} en={profile.englishInstruction} /></span>
              )}
            </div>
          </article>
        ))}
      </section>
      <span className="visually-hidden" role="status" aria-live="polite">
        {copyStatus}
      </span>
      <footer className="social-footer">
        <span>内容会继续更新，网站只保存稳定的账号入口。</span>
        <span className="english-copy" lang="en">CHANNELS EVOLVE; THE DIRECTORY STAYS CLEAN.</span>
      </footer>
    </section>
  );
}

function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!project || !dialogRef.current) return;
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      aria-label={`${project.title} / ${project.englishTitle}`}
    >
      <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()}>关闭 / CLOSE</button>
      <div className="dialog-media">
            <video src={project.video} poster={project.poster} controls autoPlay={project.slug !== "xiaoban"} muted={project.slug !== "xiaoban"} playsInline preload="metadata" />
      </div>
      <div className="dialog-content">
        <BilingualLabel zh={project.title} en={project.englishTitle} className="dialog-title" />
        <BilingualLabel zh={project.type} en={project.englishType} className="project-type" />
        {project.role && <BilingualLabel zh={project.role} en={project.englishRole} className="dialog-role" />}
        <p>{project.description}</p>
        <p className="english-copy" lang="en">{project.englishDescription}</p>
      </div>
    </dialog>
  );
}

function HomePage({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <main className="home-page">
      <InteractiveCover
        onEnter={() => onNavigate("home")}
        onOpenProject={setSelectedProject}
      />
      <SectionNav />
      <ScrollStory onOpenProject={setSelectedProject} onNavigate={onNavigate} />
      <ProjectArchive onOpenProject={setSelectedProject} />
      <AboutSection onNavigate={onNavigate} />
      <CapabilitiesSection />
      <SocialSection />
      <ContactSection onNavigate={onNavigate} />
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}

export function App() {
  const navigate = (target) => {
    const sectionId = target === "home" ? "portfolio" : target;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (window.location.hash !== "#/") return undefined;
    window.history.scrollRestoration = "manual";
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const legacySocialLink = window.location.hash === "#/social";
    if (!legacySocialLink) return undefined;

    window.history.replaceState(null, "", "#/");
    const revealSocial = () => {
      document.getElementById("social")?.scrollIntoView({ behavior: "auto", block: "start" });
    };
    const frame = window.requestAnimationFrame(revealSocial);
    const timeout = window.setTimeout(revealSocial, 360);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  return <HomePage onNavigate={navigate} />;
}
