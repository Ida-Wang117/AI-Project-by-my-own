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
  CornerDownRight,
  Asterisk,
} from "lucide-react";
import Creature from "./Creature.jsx";
import BlindBox from "./BlindBox.jsx";
import { createStatusCard } from "./cardExport.js";
import {
  questions as baseQuestions,
  roles as baseRoles,
  contextOptions as baseContexts,
} from "./content.js";
import { scoreAnswers } from "./scoring.js";
import {
  createShareUrl,
  getContent,
  languageKey,
  normalizeLanguage,
  readLanguage,
  translate,
} from "./i18n.js";
const sessionKey = "todays-creature-draft-v2";
const letters = ["A", "B", "C", "D"];
function readShared() {
  return baseRoles.find(
    (role) => role.id === new URLSearchParams(window.location.search).get("r"),
  );
}
function readDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(sessionKey) || "null");
    if (!draft || !baseContexts.some((c) => c.id === draft.context))
      return null;
    const answers = {};
    for (const [key, value] of Object.entries(draft.answers || {})) {
      if (
        baseQuestions[Number(key)] &&
        Number.isInteger(value) &&
        baseQuestions[Number(key)].options[value]
      )
        answers[key] = value;
    }
    return {
      context: draft.context,
      answers,
    };
  } catch {
    return null;
  }
}
function Brand({ onClick, t }) {
  return (
    <button className="brand" onClick={onClick} aria-label={t("今日物种首页")}>
      <span className="brand-star">
        <Asterisk size={52} strokeWidth={2.3} />
      </span>
      <span>
        {t("今日物种")}
        <small>STATUS INCIDENT OFFICE</small>
      </span>
    </button>
  );
}
function Modal({ children, onClose, label, t }) {
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
        aria-label={t("关闭")}
        onClick={onClose}
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}
function InfoContent({ t }) {
  return (
    <div className="info-content">
      <span className="eyebrow">THIS IS A STATUS REPORT, NOT A DIAGNOSIS</span>
      <h2>
        {t("先查一下后台。")}
        <br />
        {t("别急着重装整个人生。")}
      </h2>
      <p>
        {t(
          "今日物种是一份原创的生活状态小测，观察最近两周的精力、压力、方向感和支持感。它不会测出“真正的你”，也没有能力预测职业或诊断心理问题。",
        )}
      </p>
      <h3>{t("怎么匹配的？")}</h3>
      <p>
        {t(
          "12 道题，每个维度 3 道，每个回答按 0–3 分映射。我们优先看高负荷和低余量，再看方向与支持，匹配 8 个状态角色。结果页会展示匹配理由。它是透明的规则匹配，还没有经过心理量表验证。",
        )}
      </p>
      <h3>{t("你的回答去哪儿了？")}</h3>
      <p>
        {t(
          "答案只留在当前浏览器标签页，方便中途回来继续；不上传、不调用 AI、不需要登录。生成结果后即清除草稿。分享链接只包含角色编号和显示语言，不包含回答、身份或维度数据。只有语言偏好会保存在这台设备上。",
        )}
      </p>
      <div className="note-box">
        {t("梗对准事情，不对准答题的人。")}
        <br />
        {t("报告没写到的部分，不必自己补一份检讨。")}
      </div>
    </div>
  );
}
export default function App() {
  const [language, setLanguage] = useState(() => {
    let stored;
    try {
      stored = localStorage.getItem(languageKey);
    } catch {
      /* Optional preference. */
    }
    return readLanguage({
      search: window.location.search,
      stored,
      browserLanguage: navigator.language,
    });
  });
  const { questions, roles, contextOptions } = getContent(language);
  const t = (key, values) => translate(language, key, values);
  const initialRole = readShared();
  const [screen, setScreen] = useState(initialRole ? "shared" : "home");
  const [context, setContext] = useState("student");
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(
    initialRole
      ? {
          role: initialRole,
          metrics: [],
          evidence: [],
        }
      : null,
  );
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState("");
  const [actionDone, setActionDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const resultArt = useRef(null);
  const mainRef = useRef(null);
  const draft = readDraft();
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title =
      language === "zh"
        ? "今日物种 · 人在，状态不在。"
        : "Today's Creature · Here in body. Elsewhere in brain.";
    const description =
      "人在，状态不在。12 道题，拆一盒状态盲盒：短名字、欠嘴锐评、三步具体建议。梗对生活，不对你。";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translate(language, description));
    try {
      localStorage.setItem(languageKey, language);
    } catch {
      /* Optional preference. */
    }
    // Keep the address-bar fallback as private as the generated share link.
    window.history.replaceState(
      {},
      "",
      createShareUrl(window.location.href, language, readShared()?.id),
    );
  }, [language]);
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
      const linkedLanguage = normalizeLanguage(
        new URLSearchParams(window.location.search).get("lang"),
      );
      if (linkedLanguage) setLanguage(linkedLanguage);
      setScreen(role ? "shared" : "home");
      if (role)
        setResult({
          role,
          metrics: [],
          evidence: [],
        });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    if (screen !== "home")
      mainRef.current?.focus({
        preventScroll: true,
      });
  }, [screen, step]);
  useEffect(() => {
    if (screen !== "quiz") return;
    try {
      sessionStorage.setItem(
        sessionKey,
        JSON.stringify({
          context,
          answers,
        }),
      );
    } catch {
      /* Storage is optional. */
    }
  }, [answers, context, screen]);
  useEffect(() => {
    if (screen !== "loading") return;
    const timer = window.setTimeout(() => {
      const calculated = scoreAnswers(answers, language);
      setResult(calculated);
      setScreen("unboxing");
      setActionDone(false);
      try {
        sessionStorage.removeItem(sessionKey);
      } catch {
        /* Storage is optional. */
      }
      window.history.pushState(
        {},
        "",
        createShareUrl(window.location.href, language, calculated.role.id),
      );
    }, 900);
    return () => window.clearTimeout(timer);
  }, [screen, answers, language]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);
  function home() {
    setScreen("home");
    setModal(null);
    window.history.pushState(
      {},
      "",
      createShareUrl(window.location.href, language),
    );
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
    window.history.pushState(
      {},
      "",
      createShareUrl(window.location.href, language),
    );
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
          document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
          }),
        30,
      );
    } else
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
  }
  async function shareHome() {
    const url = createShareUrl(window.location.href, language);
    try {
      await navigator.clipboard.writeText(url);
      setNotice(t("网站链接已复制。后台吵的朋友可以来登记了。"));
    } catch {
      setNotice(t("复制暂不可用，可以从地址栏复制网站地址。"));
    }
  }
  async function share() {
    const url = createShareUrl(window.location.href, language, result.role.id);
    try {
      await navigator.clipboard.writeText(url);
      setNotice(t("链接已复制。只分享物种，不分享你的回答。"));
    } catch {
      setNotice(t("复制暂不可用，可以直接复制地址栏中的结果链接。"));
    }
  }
  async function saveCard() {
    setSaving(true);
    try {
      const blob = await createStatusCard(
        role,
        resultArt.current.querySelector("svg"),
        language,
      );
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download =
        language === "zh"
          ? `今日物种-${role.name}.png`
          : `Todays-Creature-${role.id}.png`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setNotice(t("盲盒卡已保存。别拿去当绩效证明。"));
    } catch {
      setNotice(t("盲盒卡导出失败，试试复制分享链接。"));
    } finally {
      setSaving(false);
    }
  }
  const report =
    screen === "result" && result ? scoreAnswers(answers, language) : result;
  const role = roles.find((item) => item.id === report?.role.id);
  const modalRole =
    typeof modal === "object" && modal
      ? roles.find((item) => item.id === modal.id)
      : null;
  const question = questions[step];
  const isQuiz =
    screen === "quiz" || screen === "loading" || screen === "unboxing";
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand onClick={home} t={t} />
          <nav aria-label={t("网站导航")}>
            <button onClick={() => scrollSection("species")}>
              {t("状态档案")}
              <span>↗</span>
            </button>
            <button onClick={() => scrollSection("how")}>
              {t("办理流程")}
            </button>
            <button onClick={() => setModal("about")}>
              {t("报告使用说明")}
            </button>
          </nav>
          <div
            className="language-switch"
            role="group"
            aria-label={t("切换语言")}
          >
            {[
              { id: "zh", label: "中文" },
              { id: "en", label: "EN" },
            ].map((item) => (
              <button
                key={item.id}
                lang={item.id === "zh" ? "zh-CN" : "en"}
                aria-pressed={language === item.id}
                onClick={() => {
                  setLanguage(item.id);
                  setNotice("");
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="header-cta" onClick={() => start()}>
            {t("登记我的状态")}
            <ArrowUpRight size={17} />
          </button>
        </div>
      </header>

      {screen === "home" && (
        <main>
          <section className="hero page-width">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="live-dot" />
                {t("生活系统 \xB7 非正式状态登记处")}
              </div>
              <h1>
                {t("人在。")}
                <br />
                <span>{t("状态不在。")}</span>
              </h1>
              <p className="hero-description">
                {t("先把「我没事」放旁边。")}
                <br />
                {t("12 道题，查查最近哪个后台在偷跑。")}
                <br />
                <strong>{t("拆个状态盲盒，看看谁在加班。")}</strong>
              </p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => start()}>
                  {t("查一下我的后台")}
                  <ArrowUpRight size={22} />
                </button>
                <span className="time-note">
                  {t("约 3 分钟")}
                  <br />
                  {t("无需登录，不交周报。")}
                </span>
              </div>
              {draft && (
                <button className="resume-link" onClick={() => start(true)}>
                  {t("草稿没丢，继续上次的状态登记")}
                  <ArrowRight size={15} />
                </button>
              )}
              <div className="hero-footnote">
                <span className="office-stamp">{t("非绩效考核")}</span>
                <span>{t("学生 / 职场 / 家庭 / 创业 / 待定，都收。")}</span>
              </div>
              <button className="home-share text-link" onClick={shareHome}>
                <Copy size={14} />
                {t("复制网站链接，发给后台也很吵的人")}
              </button>
            </div>
            <div
              className="hero-art"
              aria-label={t("脑内后台故障弹窗与荒诞办公室角色插画")}
            >
              <div className="window-chrome">
                <span className="mono">BRAIN_TASK_MANAGER.exe</span>
                <span aria-hidden="true">_ □ ×</span>
              </div>
              <div className="art-heading">
                <span>{t("后台会议未正常结束")}</span>
                <span className="mono">CASE / 03:00</span>
              </div>
              <span className="art-sticker">
                {t("甲方：生活")}
                <br />
                {t("诉求：再来一件事")}
              </span>
              <div className="hero-owl">
                <BlindBox id="night-owl" title={t("脑内仍在开会的加班角色")} />
              </div>
              <div className="hero-cactus">
                <BlindBox id="cactus" title={t("准备礼貌拒收新任务的角色")} />
              </div>
              <span className="floating-label label-owl">
                {t("人已下班。脑子打卡了吗？")}
              </span>
              <span className="floating-label label-cactus">
                {t("礼貌缓存不足")}
              </span>
              <div className="process-list">
                <div>
                  <span>{t("反刍刚才那句话")}</span>
                  <em>{t("循环中")}</em>
                </div>
                <div>
                  <span>{t("今晚想清楚整个人生")}</span>
                  <em>{t("建议延后")}</em>
                </div>
                <div>
                  <span>{t("喝水，先下线")}</span>
                  <em>{t("可以执行")}</em>
                </div>
              </div>
              <span className="art-bottom">
                {t("角色档案样例 \xB7 非实时监测")}
                <span>{t("今日物种 / INTERNAL USE")}</span>
              </span>
            </div>
          </section>
          <div className="manifesto-strip">
            <div>
              <span className="mono">SYSTEM NOTICE</span>
              <span className="strip-divider" />
              <strong>{t("暂停不需要三个人审批。")}</strong>
              <span>{t("人生后台，也该有个退出按钮。")}</span>
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
                  {t("谁的后台，")}
                  <span>{t("还在上班？")}</span>
                </h2>
              </div>
              <p>
                {t("以下为状态嘴替。")}
                <br />
                {t("请对号入座，暂不追究责任。")}
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
                    style={{
                      "--card-color": item.color,
                    }}
                  >
                    <div className="species-image">
                      <span className="card-index mono">
                        {item.statusCode || "STATE / FILE"}
                      </span>
                      <BlindBox id={id} title={item.name} />
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
              <span>
                {t("8 份状态档案，按近两周的回答匹配。没有永久编制。")}
              </span>
              <button className="text-link" onClick={() => setModal("all")}>
                {t("查看全部状态档案")}
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
          <section className="how-section page-width" id="how">
            <div className="how-intro">
              <span className="eyebrow">PLEASE DO NOT WRITE A SELF-REVIEW</span>
              <h2>
                {t("填的是近况。")}
                <br />
                {t("不用写成")}
                <span>{t("述职报告。")}</span>
              </h2>
              <p>
                {t("选你最近的真实反应。")}
                <br />
                {t("「听起来比较像好人」的答案，这次不用。")}
              </p>
              <button className="text-link" onClick={() => setModal("about")}>
                {t("这份报告怎么生成的")}
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="how-steps">
              <article>
                <span className="step-number">01</span>
                <div>
                  <h3>{t("登记后台现状")}</h3>
                  <p>
                    {t(
                      "醒来还有多少电？闲下来脑子在干嘛？这里只问生活，不问你未来五年的战略布局。",
                    )}
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">02</span>
                <div>
                  <h3>{t("拆开状态盲盒")}</h3>
                  <p>{t("一只盲盒角色，一句欠嘴锐评，三步能动手的建议。")}</p>
                </div>
              </article>
              <article>
                <span className="step-number">03</span>
                <div>
                  <h3>{t("关掉一个多余后台")}</h3>
                  <p>
                    {t(
                      "不给人生开药方。比如今天少接一件事，或者别在凌晨两点给自己写差评。",
                    )}
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
                {t("人生这破系统，")}
                <br />
                {t("至少给个说明书吧。")}
              </h2>
              <p>{t("先登记。不用当场修好自己。")}</p>
            </div>
            <button className="button dark" onClick={() => start()}>
              {t("提交我的近况")}
              <ArrowUpRight size={21} />
            </button>
          </section>
        </main>
      )}

      {screen === "quiz" && (
        <main className="quiz-page page-width" ref={mainRef} tabIndex={-1}>
          <div className="quiz-topline">
            <button className="text-link" onClick={home}>
              <ArrowLeft size={17} />
              {t("暂时放下")}
            </button>
            <span className="mono">
              {step === -1
                ? "FIRST, SAY HELLO."
                : `QUESTION ${String(step + 1).padStart(2, "0")} / 12`}
            </span>
          </div>
          <div
            className="quiz-progress"
            role="progressbar"
            aria-label={t("已回答 {count} 道，共 12 道", {
              count: Object.keys(answers).length,
            })}
            aria-valuemin={0}
            aria-valuemax={12}
            aria-valuenow={Object.keys(answers).length}
          >
            <span
              style={{
                width: `${((step + 1) / 12) * 100}%`,
              }}
            />
          </div>
          {step === -1 ? (
            <div className="context-panel">
              <span className="eyebrow">
                SELECT YOUR CURRENT LIFE DEPARTMENT
              </span>
              <h1>
                {t("最近的你，")}
                <br />
                {t("在哪个生活部门？")}
              </h1>
              <p>
                {t(
                  "选一个最接近的就好。身份不影响评分，只用来让话说得更贴近你。",
                )}
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
                {t("提交，看看后台")}
                <ArrowRight size={20} />
              </button>
              <p className="quiz-note">
                {t("按最近两周的真实感受回答。没有“应该”选的答案。")}
              </p>
            </div>
          ) : (
            <div className="question-panel" key={question.id}>
              <span className="eyebrow">
                {t("回答近两周就行。不要开始自我检讨。")}
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
                        setAnswers((prev) => ({
                          ...prev,
                          [step]: index,
                        }))
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
                  <ArrowLeft size={17} />
                  {t("上一步")}
                </button>
                <button
                  className="button primary"
                  onClick={next}
                  disabled={answers[step] === undefined}
                >
                  {step === 11 ? t("生成我的状态盲盒") : t("下一题")}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
              <p className="quiz-note">
                {step === 11
                  ? t("登记完毕。接下来只讲状态，不评优秀员工。")
                  : t("答案只保留在当前标签页，不会上传。想改随时返回。")}
              </p>
            </div>
          )}
        </main>
      )}

      {screen === "loading" && (
        <main className="loading-page page-width" ref={mainRef} tabIndex={-1}>
          <div className="loading-creature">
            <Creature id="duck" title={t("等待报告的临时窗口")} />
          </div>
          <span className="eyebrow">
            {t("正在整理后台记录。此处没有经理审批。")}
          </span>
          <h1>
            {t("本人暂离。")}
            <br />
            {t("报告马上回来。")}
          </h1>
          <p>{t("没有人生建议大会。只有一份近况报告。")}</p>
        </main>
      )}

      {screen === "unboxing" && (
        <main className="unboxing-page page-width" ref={mainRef} tabIndex={-1}>
          <span className="eyebrow">STATE BOX / READY TO OPEN</span>
          <h1>{t("状态已装盒。")}</h1>
          <p>{t("里面装着近两周的你，附赠一句欠嘴点评。")}</p>
          <div className="mystery-box" aria-hidden="true">
            <div className="box-lid">
              <span>PULL TO OPEN</span>
            </div>
            <div className="box-front">
              <span className="box-series">TODAY'S CREATURE / SERIES 01</span>
              <strong>?</strong>
              <span className="box-barcode" />
              <span>HANDLE WITH ATTITUDE</span>
            </div>
            <div className="box-side">STATUS INSIDE</div>
          </div>
          <button
            className="button primary"
            onClick={() => setScreen("result")}
          >
            {t("拆开看看")}
            <ArrowUpRight size={22} />
          </button>
          <p className="unboxing-note">
            {t("按你的回答装盒。开盒只揭晓，不重新抽签。")}
          </p>
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
              {screen === "shared" ? t("测测我的状态") : t("重新登记")}
            </button>
          </div>
          {screen === "shared" && (
            <p className="shared-note">
              {t(
                "这是朋友拆出的状态盲盒，不包含私人答案。你的盒子，得自己回答问题来拆。",
              )}
            </p>
          )}
          <div className="result-grid">
            <div
              className="result-portrait"
              style={{
                backgroundColor: role.color,
              }}
            >
              <div className="portrait-top mono">
                <span>
                  SPECIMEN /{" "}
                  {String(
                    roles.findIndex((item) => item.id === role.id) + 1,
                  ).padStart(2, "0")}
                </span>
                <span>{t("有效期：近两周")}</span>
              </div>
              <div ref={resultArt}>
                <BlindBox id={role.id} title={role.name} />
              </div>
              <span className="portrait-sticker">
                {role.statusCode || role.tags[0]}
              </span>
              <span className="portrait-footnote">
                {t("仅作状态嘴替，不作绩效证明。")}
              </span>
            </div>
            <div className="result-copy">
              <span className="eyebrow">
                {screen === "shared" ? t("朋友拆出的是") : t("你拆到的是")}
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
                <span className="comfort-heading">{t("本窗口意见")}</span>
                <p>{role.comfort}</p>
                <span>{t("— 本窗口不提供人生 KPI")}</span>
              </div>
              <div className="result-actions">
                <button
                  className="button primary"
                  onClick={saveCard}
                  disabled={saving}
                >
                  <Download size={18} />
                  {saving ? t("正在制卡…") : t("保存我的盲盒卡")}
                </button>
                <button className="button outline" onClick={share}>
                  <Copy size={18} />
                  {t("复制分享链接")}
                </button>
              </div>
            </div>
          </div>
          <section className="tiny-action action-plan">
            <span className="tiny-label">SMALL MOVES / NO LIFE OVERHAUL</span>
            <div>
              <div className="action-plan-heading">
                <h2>{t("今天就做这三步。")}</h2>
                <span className="action-duration">{role.actionDuration}</span>
              </div>
              <p className="action-intro">{role.tinyAction}</p>
              <ol className="action-steps">
                {role.actionSteps.map((item, index) => (
                  <li key={index}>
                    <span className="action-step-number">0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="do-not">
                <strong>{t("今日先别：")}</strong>
                {role.doNot}
              </p>
              {screen === "result" && (
                <small>
                  {t(
                    "{department}部门也不用一次处理所有工单。挑一个最便宜的小动作。",
                    {
                      department:
                        contextOptions.find((c) => c.id === context)?.label ||
                        "",
                    },
                  )}
                </small>
              )}
            </div>
            <button
              className={`button ${actionDone ? "done" : "outline"}`}
              onClick={() => setActionDone(!actionDone)}
            >
              {actionDone ? (
                <>
                  <Check size={19} />
                  {t("这个方案，已暂存")}
                </>
              ) : (
                <>
                  <Heart size={19} />
                  {t("先暂存这个方案")}
                </>
              )}
            </button>
          </section>
          {screen === "result" && (
            <details className="matching-details">
              <summary>
                {t("为什么拆到这只？")}
                <ArrowRight size={17} />
              </summary>
              <section className="reflection">
                <div>
                  <span className="eyebrow">
                    MATCHING EVIDENCE / NO MYSTICISM
                  </span>
                  <h2>
                    {t("不是凭空开嘴。")}
                    <br />
                    {t("下面是匹配依据。")}
                  </h2>
                  <p>
                    {t("这是回答的规则映射，不是专业量表。")}
                    <br />
                    {t("条形只表示当前选择的倾向，没有好坏排名。")}
                  </p>
                  <button
                    className="text-link"
                    onClick={() => setModal("about")}
                  >
                    {t("看看匹配怎么来的")}
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="reflection-details">
                  <div className="metric-grid">
                    {report.metrics.map((metric) => (
                      <div className="metric" key={metric.key}>
                        <div>
                          <span>{metric.label}</span>
                          <span>
                            {metric.value < 34
                              ? t("偏低")
                              : metric.value < 67
                                ? t("居中")
                                : t("偏高")}
                          </span>
                        </div>
                        <div className="metric-track">
                          <span
                            style={{
                              width: `${metric.value}%`,
                              background:
                                metric.key === "pressure"
                                  ? "#ff9068"
                                  : "#365dea",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <ul className="evidence-list">
                    {report.evidence.map((text, index) => (
                      <li key={index}>
                        <CornerDownRight size={17} />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </details>
          )}
          <p className="result-end">
            {t("报告到这里。别顺手给自己开个整改大会。")}
            <span>{t("生活已经够爱开会了。")}</span>
          </p>
        </main>
      )}

      {!isQuiz && (
        <footer className="site-footer page-width">
          <div>
            <span className="footer-brand">
              <Asterisk size={19} />
              {t("今日物种")}
            </span>
            <p>{t("生活后台很吵。本窗口替你说两句。")}</p>
          </div>
          <div>
            <span className="mono">OFFLINE IS A VALID STATUS.</span>
            <button onClick={() => setModal("about")}>
              {t("使用说明 \xB7 隐私")}
            </button>
            <span className="copyright">
              © {new Date().getFullYear()} {t("今日物种 \xB7 原创状态小测")}
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
          t={t}
          label={
            modal === "about"
              ? t("使用说明与隐私")
              : modal === "all"
                ? t("完整状态档案")
                : modalRole.name
          }
        >
          {modal === "about" ? (
            <InfoContent t={t} />
          ) : modal === "all" ? (
            <div className="all-species">
              <span className="eyebrow">
                8 BACKGROUND JOBS. ZERO PERMANENT LABELS.
              </span>
              <h2>{t("状态岗位档案")}</h2>
              <p>{t("没有最佳员工。只有最近被生活安排的不同岗位。")}</p>
              <div>
                {roles.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setModal(item)}
                    style={{
                      background: item.color,
                    }}
                  >
                    <BlindBox id={item.id} title={item.name} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="species-detail">
              <div
                style={{
                  background: modalRole.color,
                }}
              >
                <BlindBox id={modalRole.id} title={modalRole.name} />
              </div>
              <span className="eyebrow">
                {t("档案预览 \xB7 尚未登记你的回答")}
              </span>
              <h2>{modalRole.name}</h2>
              <h3>{modalRole.tagline}</h3>
              <p>{modalRole.description}</p>
              <blockquote>{modalRole.comfort}</blockquote>
              <button className="button primary" onClick={() => start()}>
                {t("生成我的状态盲盒")}
                <ArrowUpRight size={19} />
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
