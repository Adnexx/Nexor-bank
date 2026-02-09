import { useEffect, useRef, useState } from "react";
import { useLang } from "./i18n/useLang";
import { setGoogleLang } from "./utils/googleTranslate";
import { AuthModal } from "./components/UI/AuthModal";
import { Modal } from "./components/UI/Modal";
import { Home } from "./pages/Home";
import { Pricing } from "./pages/Pricing";
import { Security } from "./pages/Security";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { BudgetControl } from "./pages/BudgetControl";
import { FinancialTarget } from "./pages/FinancialTarget";
import { FinanceAnalysis } from "./pages/FinanceAnalysis";
import "./index.css";
import "./styles.css";

export default function App() {
  function LangSelect({ lang, onChange }) {
    const [open, setOpen] = useState(false);

    const items = [
      { code: "ru", label: "Русский" },
      { code: "en", label: "English" },
      { code: "uz", label: "O'zbek" },
    ];

    const current = items.find(i => i.code === lang) || items[0];

    useEffect(() => {
      const onDoc = (e) => {
        if (!e.target.closest(".langSelect")) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return (
      <div className="langSelect notranslate" translate="no">
        <button
          className="langTrigger"
          type="button"
          translate="no"
          onClick={() => setOpen(o => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <span className="langGlobe">🌐</span>
          <span className="langLabel">{current.label}</span>
          <span className="langChevron">▾</span>
        </button>

        {open && (
          <div className="langMenu" role="menu">
            {items.map((it) => (
              <button
                key={it.code}
                type="button"
                className={"langItem" + (it.code === lang ? " langItemActive" : "")}
                onClick={() => { onChange(it.code); setOpen(false); }}
                role="menuitem"
              >
                {it.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const sendAi = () => {
    const text = aiText.trim();
    if (!text) return;
    setAiMessages((m) => [...m, { from: "user", text }]);
    setAiText("");
    setTimeout(() => {
      setAiMessages((m) => [...m, { from: "ai", text: "Понял 👍 (демо). Могу помочь: Тарифы, Financial Target, Контроль бюджета, Анализ финансов." }]);
    }, 400);
  };

  const [page, setPage] = useState("home");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const aiBodyRef = useRef(null);

  useEffect(() => {
    if (!aiOpen) return;
    const el = aiBodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [aiMessages, aiOpen]);

  const { lang, t, changeLang } = useLang();

  const [modal, setModal] = useState({ open: false, title: "", body: "" });
  const [auth, setAuth] = useState({ open: false, view: "login" });
  const openAuth = (view = "login") => setAuth({ open: true, view });
  const closeAuth = () => setAuth((a) => ({ ...a, open: false }));
  const switchAuth = (view) => setAuth((a) => ({ ...a, view }));
  const openModal = (title, body) => setModal({ open: true, title, body });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const Page = () => {
    if (page === "target") return <FinancialTarget />;
    if (page === "home") return <Home onOpenModal={openModal} />;
    if (page === "pricing") return <Pricing onPick={() => openModal("Тариф", "Вы выбрали тариф (демо).")} />;
    if (page === "security") return <Security />;
    if (page === "analysis") return <FinanceAnalysis />;
    if (page === "budget") return <BudgetControl />;
    if (page === "faq") return <FAQ />;
    if (page === "contact") return <Contact />;
    return <Home onOpenModal={openModal} />;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="headerRow">
          <button className="logo" onClick={() => setPage("home")} type="button">
            <img src="/1.png" alt="Nexora logo" className="logoIcon" />
            <img src="/2.png" alt="Nexora Bank" className="logoTextImg" />
          </button>
          <nav className="nav">
            <button className={"navLink " + (page === "home" ? "navLinkActive" : "")} onClick={() => setPage("home")} type="button">{t("nav_home")}</button>
            <button className={"navLink " + (page === "pricing" ? "navLinkActive" : "")} onClick={() => setPage("pricing")} type="button">{t("nav_pricing")}</button>
            <button className={"navLink " + (page === "security" ? "navLinkActive" : "")} onClick={() => setPage("security")} type="button">{t("nav_security")}</button>
            <button className={"navLink " + (page === "analysis" ? "navLinkActive" : "")} onClick={() => setPage("analysis")} type="button">{t("nav_analysis")}</button>
            <button className={"navLink " + (page === "target" ? "navLinkActive" : "")} onClick={() => setPage("target")} type="button">{t("nav_target")}</button>
            <button className={"navLink " + (page === "budget" ? "navLinkActive" : "")} onClick={() => setPage("budget")} type="button">{t("nav_budget")}</button>
          </nav>
          <div className="headerActions">
            <LangSelect lang={lang} onChange={(l) => { changeLang(l); setGoogleLang(l); }} />
            <button className="btn ghost" type="button" onClick={() => openAuth("login")}>
              Войти
            </button>
            <button className="btn primary" type="button" onClick={() => openAuth("register")}>
              Регистрация
            </button>
          </div>
        </div>
      </header>
      <main className="container main"><Page /></main>

      <footer className="footer">
        <div className="container footerRow">
          <div className="footerLeft">
            <div className="footerBrand">NEXORA BANK</div>
            <div className="footerLinks">
              <button onClick={() => setPage("faq")} type="button">FAQ</button>
              <button onClick={() => setPage("contact")} type="button">Контакты</button>
            </div>
            <div className="footerContacts">
              <span>📞 +998 (90) 000-00-00</span>
              <span>✉ support@nexorabank.uz</span>
            </div>
          </div>
          <div className="footerRight">
            © {new Date().getFullYear()} Nexora Bank
            <div className="muted">Demo UI • React only</div>
          </div>
        </div>
      </footer>

      {/* AI CHAT */}
      {aiOpen && (
        <div className="aiPanel" role="dialog" aria-modal="true">
          <div className="aiHead">
            <div className="aiTitle">ИИ помощник</div>
            <button className="iconBtn" type="button" onClick={() => setAiOpen(false)}>✕</button>
          </div>
          <div className="aiBody" ref={aiBodyRef}>
            {aiMessages.map((m, i) => (
              <div key={i} className={"aiMsg " + (m.from === "user" ? "aiUser" : "aiBot")}>{m.text}</div>
            ))}
          </div>
          <div className="aiFoot">
            <input className="input aiInput" value={aiText} onChange={(e) => setAiText(e.target.value)} placeholder="Напиши сообщение…" onKeyDown={(e) => { if (e.key === "Enter") sendAi(); }} />
            <button className="btn primary aiSend" type="button" onClick={sendAi}>Отправить</button>
          </div>
        </div>
      )}
      {!aiOpen && <button className="aiFab" type="button" onClick={() => setAiOpen(true)} aria-label="Открыть ИИ помощника">🤖</button>}

      <AuthModal open={auth.open} view={auth.view} onClose={closeAuth} onSwitch={switchAuth} />
      <Modal open={modal.open} title={modal.title} onClose={closeModal} onAction={closeModal} actionText="Понятно"><pre className="pre">{modal.body}</pre></Modal>
    </div>
  );
}
