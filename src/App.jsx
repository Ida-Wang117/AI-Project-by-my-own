import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Download,
  Heart,
  RotateCcw,
  X,
  Sparkles,
  CornerDownRight,
  Asterisk,
} from "lucide-react";
import Creature from "./Creature.jsx";
import { questions, roles, contextOptions } from "./content.js";
import { scoreAnswers } from "./scoring.js";

const sessionKey = "todays-creature-draft-v1";
const letters = ["A", "B", "C", "D"];

function readShared() {
  return roles.find(
    (role) => role.id === new URLSearchParams(window.location.search).get("r"),
  );
}
function readDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(sessionKey) || "null");
    if (!draft || !contextOptions.some((c) => c.id === draft.context))
      return null;
    const answers = {};
    for (const [key, value] of Object.entries(draft.answers || {})) {
      if (
        questions[Number(key)] &&
        Number.isInteger(value) &&
        questions[Number(key)].options[value]
      )
        answers[key] = value;
    }
    return { context: draft.context, answers };
  } catch {
    return null;
  }
}

function Brand({ onClick }) {
  return (
    <button className="brand" onClick={onClick} aria-label="今日物种首页">
      <span className="brand-star">
        <Asterisk size={52} strokeWidth={2.3} />
      </span>
      <span>
        今日物种<small>TODAY'S CREATURE</small>
      </span>
    </button>
  );
}

function Modal({ children, onClose, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const prior = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      prior?.focus?.();
    };
  }, []);
  return (
    <dialog
      className="dialog"
      ref={ref}
      aria-label={label}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <button
        className="icon-button dialog-close"
        aria-label="关闭"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}

function InfoContent() {
  return (
    <div className="info-content">
      <span className="eyebrow">A MIRROR, NOT A LABEL</span>
      <h2>
        给状态取个名字。
        <br />
        别给自己判个终身。
      </h2>
      <p>
        今日物种是一份原创的生活状态小测，观察最近两周的精力、压力、方向感和支持感。它不会测出“真正的你”，也没有能力预测职业或诊断心理问题。
      </p>
      <h3>怎么匹配的？</h3>
      <p>
        12 道题，每个维度 3 道，每个回答按 0–3
        分映射。我们优先看高负荷和低余量，再看方向与支持，匹配 8
        个状态角色。结果页会展示匹配理由。它是透明的规则匹配，还没有经过心理量表验证。
      </p>
      <h3>你的回答去哪儿了？</h3>
      <p>
        只留在当前浏览器标签页，方便中途回来继续；不上传、不调用
        AI、不需要登录。生成结果后即清除草稿。分享链接只包含角色名称对应的编号，不包含回答、身份或维度数据。
      </p>
      <div className="note-box">
        梗对事，不对人。你不是有问题的那一个。
        <br />
        有时候，是今天同时打开的窗口太多了。
      </div>
    </div>
  );
}

export default function App() {
  const initialRole = readShared();
  const [screen, setScreen] = useState(initialRole ? "shared" : "home");
  const [context, setContext] = useState("student");
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(
    initialRole ? { role: initialRole, metrics: [], evidence: [] } : null,
  );
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState("");
  const [actionDone, setActionDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const resultArt = useRef(null);
  const mainRef = useRef(null);
  const draft = readDraft();

  useEffect(() => {
    const onPop = () => {
      const role = readShared();
      setScreen(role ? "shared" : "home");
      if (role) setResult({ role, metrics: [], evidence: [] });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (screen !== "home") mainRef.current?.focus({ preventScroll: true });
  }, [screen, step]);

  useEffect(() => {
    if (screen !== "quiz") return;
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify({ context, answers }));
    } catch {
      /* Storage is optional. */
    }
  }, [answers, context, screen]);

  useEffect(() => {
    if (screen !== "loading") return;
    const timer = window.setTimeout(() => {
      const calculated = scoreAnswers(answers);
      setResult(calculated);
      setScreen("result");
      setActionDone(false);
      try {
        sessionStorage.removeItem(sessionKey);
      } catch {
        /* Storage is optional. */
      }
      const url = new URL(window.location.href);
      url.searchParams.set("r", calculated.role.id);
      window.history.pushState({}, "", url);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [screen, answers]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function home() {
    setScreen("home");
    setModal(null);
    if (window.location.search)
      window.history.pushState({}, "", window.location.pathname);
  }
  function start(resume = false) {
    setModal(null);
    setNotice("");
    const saved = resume ? readDraft() : null;
    setAnswers(saved?.answers || {});
    setContext(saved?.context || contextOptions[0].id);
    setStep(
      saved
        ? Math.min(
            questions.findIndex(
              (_, index) => saved.answers[index] === undefined,
            ) < 0
              ? 11
              : questions.findIndex(
                  (_, index) => saved.answers[index] === undefined,
                ),
            11,
          )
        : -1,
    );
    setScreen("quiz");
    if (window.location.search)
      window.history.pushState({}, "", window.location.pathname);
  }
  function next() {
    if (step === -1) {
      setStep(0);
      return;
    }
    if (answers[step] === undefined) return;
    if (step === questions.length - 1) setScreen("loading");
    else setStep(step + 1);
  }
  function scrollSection(id) {
    if (screen !== "home") {
      home();
      window.setTimeout(
        () =>
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
        30,
      );
    } else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  async function share() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("r", result.role.id);
    try {
      await navigator.clipboard.writeText(url.href);
      setNotice("链接已复制。只分享物种，不分享你的回答。");
    } catch {
      setNotice("复制暂不可用，可以直接复制地址栏中的结果链接。");
    }
  }
  async function saveCard() {
    setSaving(true);
    let imageUrl;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 900;
      canvas.height = 1250;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#f8f6ee";
      ctx.fillRect(0, 0, 900, 1250);
      ctx.fillStyle = result.role.color;
      ctx.beginPath();
      ctx.roundRect(55, 140, 790, 565, 40);
      ctx.fill();
      ctx.strokeStyle = "#f4613d";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(75 - 15 * Math.cos(angle), 68 - 15 * Math.sin(angle));
        ctx.lineTo(75 + 15 * Math.cos(angle), 68 + 15 * Math.sin(angle));
        ctx.stroke();
      }
      ctx.fillStyle = "#f4613d";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText("今日物种", 108, 80);
      ctx.fillStyle = "#66685f";
      ctx.font = "18px monospace";
      ctx.fillText(
        "MY CURRENT STATE · " + new Date().toLocaleDateString("zh-CN"),
        58,
        115,
      );
      const svg = resultArt.current.querySelector("svg");
      imageUrl = URL.createObjectURL(
        new Blob([new XMLSerializer().serializeToString(svg)], {
          type: "image/svg+xml;charset=utf-8",
        }),
      );
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });
      ctx.drawImage(img, 220, 150, 460, 450);
      ctx.textAlign = "center";
      ctx.fillStyle = "#30312e";
      ctx.font = "bold 43px sans-serif";
      ctx.fillText(result.role.name, 450, 650);
      ctx.textAlign = "left";
      ctx.font = "21px sans-serif";
      ctx.fillStyle = "#828777";
      ctx.fillText(role.tags.map((tag) => "# " + tag).join("     "), 70, 755);
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#30312e";
      let y = 813;
      const writeLines = (text, lineHeight, maxWidth) => {
        let line = "";
        for (const character of text) {
          if (ctx.measureText(line + character).width > maxWidth) {
            ctx.fillText(line, 70, y);
            y += lineHeight;
            line = character;
          } else line += character;
        }
        if (line) {
          ctx.fillText(line, 70, y);
          y += lineHeight;
        }
      };
      writeLines(result.role.tagline, 46, 760);
      y += 28;
      ctx.font = "25px sans-serif";
      ctx.fillStyle = "#63645e";
      writeLines(result.role.comfort, 40, 760);
      ctx.fillStyle = "#a6a698";
      ctx.fillRect(70, 1145, 760, 1);
      ctx.font = "21px sans-serif";
      ctx.fillStyle = "#63645e";
      ctx.fillText(
        "这是当下的状态，不是你的全部。明天可以是另一种。",
        70,
        1185,
      );
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Card export failed");
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `今日物种-${result.role.name}.png`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setNotice("状态卡已生成。今天这只小家伙，归你了。");
    } catch {
      setNotice("图片保存暂时失败，试试复制分享链接。");
    } finally {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      setSaving(false);
    }
  }

  const role = result?.role;
  const question = questions[step];
  const isQuiz = screen === "quiz" || screen === "loading";

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand onClick={home} />
          <nav aria-label="网站导航">
            <button onClick={() => scrollSection("species")}>
              物种图鉴 <span>↗</span>
            </button>
            <button onClick={() => scrollSection("how")}>这是怎么玩的</button>
            <button onClick={() => setModal("about")}>关于这面镜子</button>
          </nav>
          <button className="header-cta" onClick={() => start()}>
            照照今天的自己 <ArrowUpRight size={17} />
          </button>
        </div>
      </header>

      {screen === "home" && (
        <main>
          <section className="hero page-width">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="live-dot" /> 人生不必分类，状态可以命名。
              </div>
              <h1>
                你最近，
                <br />
                <span>
                  怎么个事儿？
                  <svg viewBox="0 0 430 20" aria-hidden="true">
                    <path d="M4 12Q170 -1 423 8M25 18Q229 4 410 14" />
                  </svg>
                </span>
              </h1>
              <p className="hero-description">
                是凌晨开会的脑子，还是电量见底的灵魂？
                <br />
                做个小测试，领养一只<span>「此刻的你」。</span>
                <br />
                嘴欠一点，懂你一点。
              </p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => start()}>
                  看看我是什么物种 <ArrowUpRight size={22} />
                </button>
                <span className="time-note">
                  约 3 分钟
                  <br />
                  不用注册，不用装正常。
                </span>
              </div>
              {draft && (
                <button className="resume-link" onClick={() => start(true)}>
                  你的镜子还在这里，继续上次的测试 <ArrowRight size={15} />
                </button>
              )}
              <div className="hero-footnote">
                <span className="mini-faces">
                  <i>◡</i>
                  <i>◡</i>
                  <i>◡</i>
                </span>
                <span>不贴人格标签。只接住今天的你。</span>
              </div>
            </div>
            <div
              className="hero-art"
              aria-label="凌晨脑内放映员、信号漂流小蜗牛与礼貌炸毛仙人掌的手绘插画"
            >
              <span className="art-grid" />
              <div className="art-heading">
                <span>精神状态观察站</span>
                <span className="mono">EST. TODAY</span>
              </div>
              <span className="art-sticker">
                不一定优秀
                <br />
                但一定是珍稀物种。
              </span>
              <div className="hero-owl">
                <Creature id="night-owl" title="戴着耳机的困困小猫头鹰" />
                <span className="floating-label label-owl">
                  脑子：我再开个会。
                </span>
              </div>
              <div className="hero-snail">
                <Creature id="snail" title="背着金黄小壳的蜗牛" />
                <span className="floating-label label-snail">
                  慢点，也算移动。
                </span>
              </div>
              <div className="hero-cactus">
                <Creature id="cactus" title="有点炸毛的仙人掌" />
                <span className="floating-label label-cactus">
                  别碰，正在加载。
                </span>
              </div>
              <span className="doodle-star star-one">
                <Asterisk size={48} strokeWidth={2.3} />
              </span>
              <span className="doodle-star star-two">✦</span>
              <svg
                className="doodle-arrow"
                viewBox="0 0 100 70"
                aria-hidden="true"
              >
                <path d="M5 12q59 -18 56 35q-1 23 -24 12q-19 -14 39 -10m-8 -9l14 10 -14 9" />
              </svg>
              <span className="art-bottom">
                一份当下状态说明书 <span>© 今日物种</span>
              </span>
            </div>
          </section>
          <div className="manifesto-strip">
            <div>
              <Sparkles size={20} />
              <span>不是 MBTI，也不决定你是谁。</span>
              <span className="strip-divider" />
              只是问一句：<strong>最近辛苦了吧？</strong>
              <span className="strip-doodle">: )</span>
            </div>
          </div>
          <section className="species-section page-width" id="species">
            <div className="section-heading">
              <div>
                <span className="eyebrow">MEET YOUR CURRENT SELF</span>
                <h2>
                  总有一只，<span>懂你的破防。</span>
                </h2>
              </div>
              <p>
                先认识几位精神状态代言人。
                <br />
                对号入座可以，永久入住就不必了。
              </p>
            </div>
            <div className="species-grid">
              {["jellyfish", "cactus", "snail", "night-owl"].map(
                (id, index) => {
                  const item = roles.find((r) => r.id === id);
                  return (
                    <button
                      className="species-card"
                      key={id}
                      onClick={() => setModal(item)}
                      style={{ "--card-color": item.color }}
                    >
                      <div className="species-image">
                        <span className="card-index mono">
                          SPECIMEN / 0{index + 1}
                        </span>
                        <Creature id={id} title={item.name} />
                        <span className="species-arrow">
                          <ArrowUpRight size={21} />
                        </span>
                      </div>
                      <div className="species-text">
                        <span className="tag">{item.tags[0]}</span>
                        <h3>{item.name}</h3>
                        <p>{item.tagline}</p>
                      </div>
                    </button>
                  );
                },
              )}
            </div>
            <div className="species-after">
              <span>一共 8 种状态。今天是哪一只，由你的回答决定。</span>
              <button className="text-link" onClick={() => setModal("all")}>
                翻翻完整图鉴 <ArrowRight size={17} />
              </button>
            </div>
          </section>
          <section className="how-section page-width" id="how">
            <div className="how-intro">
              <span className="eyebrow">NO RIGHT ANSWERS HERE</span>
              <h2>
                先别急着变好。
                <br />
                先看看<span>怎么了。</span>
              </h2>
              <p>
                没有标准答案，也没有隐藏的“优秀选项”。
                <br />
                这一次，不用答成别人想要的样子。
              </p>
              <button className="text-link" onClick={() => setModal("about")}>
                这面镜子的使用说明 <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="how-steps">
              <article>
                <span className="step-number">01</span>
                <div>
                  <h3>说说最近的你</h3>
                  <p>
                    12
                    道生活小问题。关于睡醒的电量、脑内弹窗，和偶尔不知道往哪儿走。
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">02</span>
                <div>
                  <h3>领养你的状态物种</h3>
                  <p>
                    一张有点欠的画像，几个有点准的词条。每个匹配，都有来自回答的理由。
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">03</span>
                <div>
                  <h3>带走一句话，和一个小动作</h3>
                  <p>不喊“你一定可以”。今天能少为难自己一点，就已经很可以。</p>
                </div>
              </article>
            </div>
          </section>
          <section className="closing page-width">
            <span className="closing-star">
              <Asterisk size={54} strokeWidth={2.3} />
            </span>
            <div>
              <h2>生活已经够会出题了。</h2>
              <p>这里不考你。这里陪你。</p>
            </div>
            <button className="button dark" onClick={() => start()}>
              来，照一照 <ArrowUpRight size={21} />
            </button>
          </section>
        </main>
      )}

      {screen === "quiz" && (
        <main className="quiz-page page-width" ref={mainRef} tabIndex={-1}>
          <div className="quiz-topline">
            <button className="text-link" onClick={home}>
              <ArrowLeft size={17} /> 暂时放下
            </button>
            <span className="mono">
              {step === -1
                ? "FIRST, SAY HELLO."
                : `QUESTION ${String(step + 1).padStart(2, "0")} / 12`}
            </span>
          </div>
          <div
            className="quiz-progress"
            aria-label={`已回答 ${Object.keys(answers).length} 道，共 12 道`}
          >
            <span style={{ width: `${((step + 1) / 12) * 100}%` }} />
          </div>
          {step === -1 ? (
            <div className="context-panel">
              <span className="eyebrow">
                EVERYDAY LIFE, DIFFERENT SAVE FILES
              </span>
              <h1>
                最近的你，
                <br />
                在哪个生活副本？
              </h1>
              <p>
                选一个最接近的就好。身份不影响评分，只用来让话说得更贴近你。
              </p>
              <div className="context-options">
                {contextOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setContext(item.id)}
                    className={context === item.id ? "selected" : ""}
                    aria-pressed={context === item.id}
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                    {context === item.id && <Check size={18} />}
                  </button>
                ))}
              </div>
              <button className="button primary" onClick={next}>
                好，开始照照自己 <ArrowRight size={20} />
              </button>
              <p className="quiz-note">
                按最近两周的真实感受回答。没有“应该”选的答案。
              </p>
            </div>
          ) : (
            <div className="question-panel" key={question.id}>
              <span className="eyebrow">只说近两周，不用总结一生。</span>
              <h1>{question.title}</h1>
              <p className="question-aside">{question.aside}</p>
              <fieldset className="answer-options">
                <legend className="sr-only">{question.title}</legend>
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className={answers[step] === index ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={index}
                      checked={answers[step] === index}
                      onChange={() =>
                        setAnswers((prev) => ({ ...prev, [step]: index }))
                      }
                    />
                    <span className="answer-letter">{letters[index]}</span>
                    <span>{option.text}</span>
                    {answers[step] === index && <Check size={19} />}
                  </label>
                ))}
              </fieldset>
              <div className="quiz-bottom">
                <button className="text-link" onClick={() => setStep(step - 1)}>
                  <ArrowLeft size={17} /> 上一步
                </button>
                <button
                  className="button primary"
                  onClick={next}
                  disabled={answers[step] === undefined}
                >
                  {step === 11 ? "认领我的今日物种" : "下一题"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
              <p className="quiz-note">
                {step === 11
                  ? "就到这里。接下来，不打分，只照镜子。"
                  : "答案只保留在当前标签页，不会上传。想改随时返回。"}
              </p>
            </div>
          )}
        </main>
      )}

      {screen === "loading" && (
        <main className="loading-page page-width" ref={mainRef} tabIndex={-1}>
          <div className="loading-creature">
            <Creature id="sprout" title="正在整理回答的小芽" />
          </div>
          <span className="eyebrow">正在把你的回答，拼成一面小镜子。</span>
          <h1>
            人类太复杂。
            <br />
            先变可爱一下。
          </h1>
          <p>不算命，不下判决。只是整理一下最近的你。</p>
        </main>
      )}

      {(screen === "result" || screen === "shared") && role && (
        <main className="result-page page-width" ref={mainRef} tabIndex={-1}>
          <div className="result-topline">
            <span className="eyebrow">
              {screen === "shared"
                ? "A LITTLE POSTCARD FROM A FRIEND"
                : "YOUR CURRENT STATE, WITH A FACE"}
            </span>
            <button className="text-link" onClick={() => start()}>
              <RotateCcw size={16} />{" "}
              {screen === "shared" ? "测测我的状态" : "重新照一照"}
            </button>
          </div>
          {screen === "shared" && (
            <p className="shared-note">
              这是一张被分享的物种卡，不是你的测试结果。你是哪一只，来自己照照看。
            </p>
          )}
          <div className="result-grid">
            <div
              className="result-portrait"
              style={{ backgroundColor: role.color }}
            >
              <div className="portrait-top mono">
                <span>
                  SPECIMEN /{" "}
                  {String(
                    roles.findIndex((item) => item.id === role.id) + 1,
                  ).padStart(2, "0")}
                </span>
                <span>限定：此刻</span>
              </div>
              <div ref={resultArt}>
                <Creature id={role.id} title={role.name} />
              </div>
              <span className="portrait-sticker">{role.tags[0]}</span>
              <span className="portrait-footnote">
                这不是你的一生，只是最近的一页。
              </span>
            </div>
            <div className="result-copy">
              <span className="eyebrow">
                {screen === "shared" ? "这个物种是" : "最近两周，你有点像"}
              </span>
              <h1>{role.name}</h1>
              <p className="result-en mono">{role.en}</p>
              <div className="result-tags">
                {role.tags.map((tag) => (
                  <span key={tag}># {tag}</span>
                ))}
              </div>
              <h2>{role.tagline}</h2>
              <p className="result-description">{role.description}</p>
              <div className="comfort-note">
                <Heart size={19} />
                <p>{role.comfort}</p>
                <span>— 来自一只懂你的小东西</span>
              </div>
              <div className="result-actions">
                <button
                  className="button primary"
                  onClick={saveCard}
                  disabled={saving}
                >
                  <Download size={18} />
                  {saving ? "正在画卡片…" : "保存我的状态卡"}
                </button>
                <button className="button outline" onClick={share}>
                  <Copy size={18} /> 复制分享链接
                </button>
              </div>
            </div>
          </div>
          {screen === "result" && (
            <section className="reflection">
              <div>
                <span className="eyebrow">WHY THIS LITTLE CREATURE?</span>
                <h2>
                  有点准，是因为
                  <br />
                  它听了你的回答。
                </h2>
                <p>
                  这是回答的规则映射，不是专业量表。
                  <br />
                  条形只表示当前选择的倾向，没有好坏排名。
                </p>
                <button className="text-link" onClick={() => setModal("about")}>
                  看看匹配怎么来的 <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="reflection-details">
                <div className="metric-grid">
                  {result.metrics.map((metric) => (
                    <div className="metric" key={metric.key}>
                      <div>
                        <span>{metric.label}</span>
                        <span>
                          {metric.value < 34
                            ? "偏低"
                            : metric.value < 67
                              ? "居中"
                              : "偏高"}
                        </span>
                      </div>
                      <div className="metric-track">
                        <span
                          style={{
                            width: `${metric.value}%`,
                            background:
                              metric.key === "pressure" ? "#ed9d81" : "#9fae96",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="evidence-list">
                  {result.evidence.map((text, index) => (
                    <li key={index}>
                      <CornerDownRight size={17} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
          <section className="tiny-action">
            <span className="tiny-label">TODAY'S TINY QUEST</span>
            <div>
              <h2>今天，就做这一件小事。</h2>
              <p>{role.tinyAction}</p>
              {screen === "result" && (
                <small>
                  {contextOptions.find((c) => c.id === context)?.label}
                  副本也允许暂停。进度条不用今天全拉满。
                </small>
              )}
            </div>
            <button
              className={`button ${actionDone ? "done" : "outline"}`}
              onClick={() => setActionDone(!actionDone)}
            >
              {actionDone ? (
                <>
                  <Check size={19} /> 给自己记一朵小花
                </>
              ) : (
                <>
                  <Heart size={19} /> 我愿意试一小下
                </>
              )}
            </button>
          </section>
          <p className="result-end">
            你可以同时很累、很迷茫，也很值得被好好对待。
            <span>它们不冲突。</span>
          </p>
        </main>
      )}

      {!isQuiz && (
        <footer className="site-footer page-width">
          <div>
            <span className="footer-brand">
              <Asterisk size={19} /> 今日物种
            </span>
            <p>一面有点嘴欠，但站在你这边的镜子。</p>
          </div>
          <div>
            <span className="mono">LESS LABELS. MORE LITTLE HUGS.</span>
            <button onClick={() => setModal("about")}>使用说明 · 隐私</button>
            <span className="copyright">
              © {new Date().getFullYear()} 今日物种 · 原创状态小测
            </span>
          </div>
        </footer>
      )}
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          {notice}
        </div>
      )}
      {modal && (
        <Modal
          onClose={() => setModal(null)}
          label={
            modal === "about"
              ? "使用说明与隐私"
              : modal === "all"
                ? "完整物种图鉴"
                : modal.name
          }
        >
          {modal === "about" ? (
            <InfoContent />
          ) : modal === "all" ? (
            <div className="all-species">
              <span className="eyebrow">8 CREATURES. A LOT OF FEELINGS.</span>
              <h2>今天的物种图鉴</h2>
              <p>哪只都有可爱之处。没有“最好”的物种。</p>
              <div>
                {roles.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setModal(item)}
                    style={{ background: item.color }}
                  >
                    <Creature id={item.id} title={item.name} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="species-detail">
              <div style={{ background: modal.color }}>
                <Creature id={modal.id} title={modal.name} />
              </div>
              <span className="eyebrow">图鉴预览 · 不是你的测试结果</span>
              <h2>{modal.name}</h2>
              <h3>{modal.tagline}</h3>
              <p>{modal.description}</p>
              <blockquote>{modal.comfort}</blockquote>
              <button className="button primary" onClick={() => start()}>
                看看我是哪一只 <ArrowUpRight size={19} />
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
