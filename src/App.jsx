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
import { createStatusCard } from "./cardExport.js";
import { questions, roles, contextOptions } from "./content.js";
import { scoreAnswers } from "./scoring.js";

const sessionKey = "todays-creature-draft-v2";
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
        今日物种<small>STATUS INCIDENT OFFICE</small>
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
      <span className="eyebrow">THIS IS A STATUS REPORT, NOT A DIAGNOSIS</span>
      <h2>
        先查一下后台。
        <br />
        别急着重装整个人生。
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
        梗对准事情，不对准答题的人。
        <br />
        报告没写到的部分，不必自己补一份检讨。
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
    // Question wording changed in v2; do not reinterpret an old partial draft.
    try {
      sessionStorage.removeItem("todays-creature-draft-v1");
    } catch {
      /* Storage is optional. */
    }
  }, []);

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
  async function shareHome() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    try {
      await navigator.clipboard.writeText(url.href);
      setNotice("网站链接已复制。后台吵的朋友可以来登记了。");
    } catch {
      setNotice("复制暂不可用，可以从地址栏复制网站地址。");
    }
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
    try {
      const blob = await createStatusCard(
        result.role,
        resultArt.current.querySelector("svg"),
      );
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `今日物种-${result.role.name}.png`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setNotice("工牌已生成。不建议拿去找老板加薪。");
    } catch {
      setNotice("工牌导出失败，试试复制分享链接。");
    } finally {
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
              状态档案 <span>↗</span>
            </button>
            <button onClick={() => scrollSection("how")}>办理流程</button>
            <button onClick={() => setModal("about")}>报告使用说明</button>
          </nav>
          <button className="header-cta" onClick={() => start()}>
            登记我的状态 <ArrowUpRight size={17} />
          </button>
        </div>
      </header>

      {screen === "home" && (
        <main>
          <section className="hero page-width">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="live-dot" /> 生活系统 · 非正式状态登记处
              </div>
              <h1>
                人在。
                <br />
                <span>状态不在。</span>
              </h1>
              <p className="hero-description">
                先把「我没事」放旁边。
                <br />
                12 道题，查查最近哪个后台在偷跑。
                <br />
                <strong>不发优秀证明，发一张你的状态工牌。</strong>
              </p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => start()}>
                  查一下我的后台 <ArrowUpRight size={22} />
                </button>
                <span className="time-note">
                  约 3 分钟
                  <br />
                  无需登录，不交周报。
                </span>
              </div>
              {draft && (
                <button className="resume-link" onClick={() => start(true)}>
                  草稿没丢，继续上次的状态登记 <ArrowRight size={15} />
                </button>
              )}
              <div className="hero-footnote">
                <span className="office-stamp">非绩效考核</span>
                <span>学生 / 职场 / 家庭 / 创业 / 待定，都收。</span>
              </div>
              <button className="home-share text-link" onClick={shareHome}>
                <Copy size={14} /> 复制网站链接，发给后台也很吵的人
              </button>
            </div>
            <div
              className="hero-art"
              aria-label="脑内后台故障弹窗与荒诞办公室角色插画"
            >
              <div className="window-chrome">
                <span className="mono">BRAIN_TASK_MANAGER.exe</span>
                <span aria-hidden="true">_ □ ×</span>
              </div>
              <div className="art-heading">
                <span>后台会议未正常结束</span>
                <span className="mono">CASE / 03:00</span>
              </div>
              <span className="art-sticker">
                甲方：生活
                <br />
                诉求：再来一件事
              </span>
              <div className="hero-owl">
                <Creature id="night-owl" title="脑内仍在开会的加班角色" />
              </div>
              <div className="hero-cactus">
                <Creature id="cactus" title="准备礼貌拒收新任务的角色" />
              </div>
              <span className="floating-label label-owl">
                人已下班。脑子打卡了吗？
              </span>
              <span className="floating-label label-cactus">礼貌缓存不足</span>
              <div className="process-list">
                <div>
                  <span>反刍刚才那句话</span>
                  <em>循环中</em>
                </div>
                <div>
                  <span>今晚想清楚整个人生</span>
                  <em>建议延后</em>
                </div>
                <div>
                  <span>喝水，先下线</span>
                  <em>可以执行</em>
                </div>
              </div>
              <span className="art-bottom">
                角色档案样例 · 非实时监测 <span>今日物种 / INTERNAL USE</span>
              </span>
            </div>
          </section>
          <div className="manifesto-strip">
            <div>
              <span className="mono">SYSTEM NOTICE</span>
              <span className="strip-divider" />
              <strong>暂停不需要三个人审批。</strong>
              <span>人生后台，也该有个退出按钮。</span>
              <span className="notice-cross" aria-hidden="true">
                ×
              </span>
            </div>
          </div>
          <section className="species-section page-width" id="species">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  EMPLOYEES OF THE MENTAL BACKGROUND
                </span>
                <h2>
                  谁的后台，<span>还在上班？</span>
                </h2>
              </div>
              <p>
                以下为状态嘴替。
                <br />
                请对号入座，暂不追究责任。
              </p>
            </div>
            <div className="species-grid">
              {["night-owl", "jellyfish", "cactus", "duck"].map((id) => {
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
                        {item.statusCode || "STATE / FILE"}
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
              })}
            </div>
            <div className="species-after">
              <span>8 份状态档案，按近两周的回答匹配。没有永久编制。</span>
              <button className="text-link" onClick={() => setModal("all")}>
                查看全部状态档案 <ArrowRight size={17} />
              </button>
            </div>
          </section>
          <section className="how-section page-width" id="how">
            <div className="how-intro">
              <span className="eyebrow">PLEASE DO NOT WRITE A SELF-REVIEW</span>
              <h2>
                填的是近况。
                <br />
                不用写成<span>述职报告。</span>
              </h2>
              <p>
                选你最近的真实反应。
                <br />
                「听起来比较像好人」的答案，这次不用。
              </p>
              <button className="text-link" onClick={() => setModal("about")}>
                这份报告怎么生成的 <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="how-steps">
              <article>
                <span className="step-number">01</span>
                <div>
                  <h3>登记后台现状</h3>
                  <p>
                    醒来还有多少电？闲下来脑子在干嘛？这里只问生活，不问你未来五年的战略布局。
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">02</span>
                <div>
                  <h3>领取状态工牌</h3>
                  <p>
                    一个有点欠的角色，几个不端着的词条。为什么匹配到它，报告里有依据。
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">03</span>
                <div>
                  <h3>关掉一个多余后台</h3>
                  <p>
                    不给人生开药方。比如今天少接一件事，或者别在凌晨两点给自己写差评。
                  </p>
                </div>
              </article>
            </div>
          </section>
          <section className="closing page-width">
            <span className="closing-star" aria-hidden="true">
              !
            </span>
            <div>
              <h2>
                人生这破系统，
                <br />
                至少给个说明书吧。
              </h2>
              <p>先登记。不用当场修好自己。</p>
            </div>
            <button className="button dark" onClick={() => start()}>
              提交我的近况 <ArrowUpRight size={21} />
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
                SELECT YOUR CURRENT LIFE DEPARTMENT
              </span>
              <h1>
                最近的你，
                <br />
                在哪个生活部门？
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
                提交，看看后台 <ArrowRight size={20} />
              </button>
              <p className="quiz-note">
                按最近两周的真实感受回答。没有“应该”选的答案。
              </p>
            </div>
          ) : (
            <div className="question-panel" key={question.id}>
              <span className="eyebrow">
                回答近两周就行。不要开始自我检讨。
              </span>
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
                  {step === 11 ? "生成我的状态工牌" : "下一题"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
              <p className="quiz-note">
                {step === 11
                  ? "登记完毕。接下来只讲状态，不评优秀员工。"
                  : "答案只保留在当前标签页，不会上传。想改随时返回。"}
              </p>
            </div>
          )}
        </main>
      )}

      {screen === "loading" && (
        <main className="loading-page page-width" ref={mainRef} tabIndex={-1}>
          <div className="loading-creature">
            <Creature id="duck" title="等待报告的临时窗口" />
          </div>
          <span className="eyebrow">正在整理后台记录。此处没有经理审批。</span>
          <h1>
            本人暂离。
            <br />
            报告马上回来。
          </h1>
          <p>没有人生建议大会。只有一份近况报告。</p>
        </main>
      )}

      {(screen === "result" || screen === "shared") && role && (
        <main className="result-page page-width" ref={mainRef} tabIndex={-1}>
          <div className="result-topline">
            <span className="eyebrow">
              {screen === "shared"
                ? "A SHARED INCIDENT REPORT"
                : "YOUR STATUS REPORT / NO PERFORMANCE REVIEW"}
            </span>
            <button className="text-link" onClick={() => start()}>
              <RotateCcw size={16} />{" "}
              {screen === "shared" ? "测测我的状态" : "重新登记"}
            </button>
          </div>
          {screen === "shared" && (
            <p className="shared-note">
              这是朋友分享的状态工牌，不包含私人答案。你的后台情况，需要自己登记。
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
                <span>有效期：近两周</span>
              </div>
              <div ref={resultArt}>
                <Creature id={role.id} title={role.name} />
              </div>
              <span className="portrait-sticker">
                {role.statusCode || role.tags[0]}
              </span>
              <span className="portrait-footnote">
                仅作状态嘴替，不作绩效证明。
              </span>
            </div>
            <div className="result-copy">
              <span className="eyebrow">
                {screen === "shared" ? "本档案登记为" : "你的后台岗位，暂定为"}
              </span>
              <h1>{role.name}</h1>
              <p className="result-en mono">{role.en}</p>
              <div className="result-tags">
                {role.tags.map((tag) => (
                  <span key={tag}># {tag}</span>
                ))}
              </div>
              <h2>{role.roast || role.tagline}</h2>
              <div className="system-notice">
                <span className="mono">SYSTEM NOTICE</span>
                <p>{role.systemNotice || role.roast}</p>
              </div>
              <p className="result-description">{role.description}</p>
              <div className="comfort-note">
                <span className="comfort-heading">本窗口意见</span>
                <p>{role.comfort}</p>
                <span>— 本窗口不提供人生 KPI</span>
              </div>
              <div className="result-actions">
                <button
                  className="button primary"
                  onClick={saveCard}
                  disabled={saving}
                >
                  <Download size={18} />
                  {saving ? "正在制牌…" : "保存我的状态工牌"}
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
                <span className="eyebrow">
                  MATCHING EVIDENCE / NO MYSTICISM
                </span>
                <h2>
                  不是凭空开嘴。
                  <br />
                  下面是匹配依据。
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
                              metric.key === "pressure" ? "#ff9068" : "#365dea",
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
            <span className="tiny-label">LOW-COST WORKAROUND</span>
            <div>
              <h2>临时处理方案：先少跑一个进程。</h2>
              <p>{role.tinyAction}</p>
              <p className="do-not">
                <strong>今日先别：</strong>
                {role.doNot}
              </p>
              {screen === "result" && (
                <small>
                  {contextOptions.find((c) => c.id === context)?.label}
                  部门也不用一次处理所有工单。挑一个最便宜的小动作。
                </small>
              )}
            </div>
            <button
              className={`button ${actionDone ? "done" : "outline"}`}
              onClick={() => setActionDone(!actionDone)}
            >
              {actionDone ? (
                <>
                  <Check size={19} /> 这个方案，已暂存
                </>
              ) : (
                <>
                  <Heart size={19} /> 先暂存这个方案
                </>
              )}
            </button>
          </section>
          <p className="result-end">
            报告到这里。别顺手给自己开个整改大会。
            <span>生活已经够爱开会了。</span>
          </p>
        </main>
      )}

      {!isQuiz && (
        <footer className="site-footer page-width">
          <div>
            <span className="footer-brand">
              <Asterisk size={19} /> 今日物种
            </span>
            <p>生活后台很吵。本窗口替你说两句。</p>
          </div>
          <div>
            <span className="mono">OFFLINE IS A VALID STATUS.</span>
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
                ? "完整状态档案"
                : modal.name
          }
        >
          {modal === "about" ? (
            <InfoContent />
          ) : modal === "all" ? (
            <div className="all-species">
              <span className="eyebrow">
                8 BACKGROUND JOBS. ZERO PERMANENT LABELS.
              </span>
              <h2>状态岗位档案</h2>
              <p>没有最佳员工。只有最近被生活安排的不同岗位。</p>
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
              <span className="eyebrow">档案预览 · 尚未登记你的回答</span>
              <h2>{modal.name}</h2>
              <h3>{modal.tagline}</h3>
              <p>{modal.description}</p>
              <blockquote>{modal.comfort}</blockquote>
              <button className="button primary" onClick={() => start()}>
                生成我的状态工牌 <ArrowUpRight size={19} />
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
