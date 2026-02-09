import { Input } from "./FormFields";
import { PasswordInput } from "./PasswordInput";
import { useState, useRef, useEffect } from "react";




export function MonthDropdown({ value, onChange, months }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const label = value ? months[Number(value) - 1] : "Выбери месяц";

  useEffect(() => {
    if (!open) return;

    const onDown = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setOpen(false);
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (v) => {
    onChange?.(v);
    setOpen(false);
  };

  return (
    <div className="monthWrap" ref={wrapRef}>
      <button
        type="button"
        className="monthBtn"
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{label}</span>
        <span className={"chev " + (open ? "up" : "")}>▾</span>
      </button>

      {open && (
        <div className="monthMenu" role="listbox">
          {months.map((m, i) => {
            const v = String(i + 1);
            const active = v === String(value || "");
            return (
              <button
                key={m}
                type="button"
                className={"monthItem " + (active ? "active" : "")}
                onClick={(e) => {
                  e.stopPropagation();
                  pick(v);
                }}
              >
                {m}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}



export function AuthModal({ open, view, onClose, onSwitch }) {
  const [loginForm, setLoginForm] = useState({ identity: "", password: "" });
  const [regForm, setRegForm] = useState({

    phone: "",
    email: "",
    password: "",
    username: "",
    birthDay: "",
    birthMonth: "",
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);


  if (!open) return null;
  const close = () => onClose?.();

  const submitLogin = (e) => {
    e.preventDefault();
    console.log("LOGIN", loginForm);
    alert("Вход отправлен (демо).");
    close();
  };

  const submitRegister = (e) => {
    e.preventDefault();
    console.log("REGISTER", regForm);
    alert("Регистрация отправлена (демо).");
    close();
  };

  const MONTHS_RU = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  return (
    <div className="modal">
      <button className="backdrop" onClick={close} aria-label="Закрыть" />
      <div className="modalBox" role="dialog" aria-modal="true">
        <div className="modalHead">
          <h3 className="modalTitle">
            {view === "login" ? "Вход" : "Регистрация"}
          </h3>
          <button
            className="iconBtn"
            onClick={close}
            type="button"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        <div className="modalBody">
          {view === "login" ? (
            <form className="form" onSubmit={submitLogin}>
              <Input
                label="Логин или Email"
                value={loginForm.identity}
                onChange={(e) =>
                  setLoginForm((s) => ({ ...s, identity: e.target.value }))
                }
                placeholder="example@mail.com или login"
                autoComplete="username"
              />

              <PasswordInput
                label="Пароль"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((s) => ({ ...s, password: e.target.value }))
                }
                autoComplete="current-password"
              />

              <button className="btn primary" type="submit">
                Войти
              </button>
              <div className="authSwitch">
                Нет аккаунта?{" "}
                <button
                  className="link"
                  type="button"
                  onClick={() => onSwitch?.("register")}
                >
                  Регистрация
                </button>
              </div>
            </form>
          ) : (
            <form className="form" onSubmit={submitRegister}>
              <Input
                label="Укажите номер телефона"
                value={regForm.phone}
                onChange={(e) =>
                  setRegForm((s) => ({ ...s, phone: e.target.value }))
                }
                placeholder="+998 __ ___ __ __"
                inputMode="tel"
              />
              <Input
                label="Введите электронную почту"
                type="email"
                value={regForm.email}
                onChange={(e) =>
                  setRegForm((s) => ({ ...s, email: e.target.value }))
                }
                placeholder="example@mail.com"
                autoComplete="email"
              />
              <Input
                label="Придумай логин"
                value={regForm.username}
                onChange={(e) =>
                  setRegForm((s) => ({ ...s, username: e.target.value }))
                }
                placeholder="nexora_user"
                autoComplete="username"
              />
              <PasswordInput
                label="Придумайте пароль"
                value={regForm.password}
                onChange={(e) =>
                  setRegForm((s) => ({ ...s, password: e.target.value }))
                }
                autoComplete="new-password"
              />
              <div className="authRow2">
                <label className="field">
                  <span className="fieldLabel">День рождения</span>
                  <input
                    className="input"
                    value={regForm.birthDay}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                      setRegForm((s) => ({ ...s, birthDay: v }));
                    }}
                    placeholder="1-31"
                    inputMode="numeric"
                  />
                </label>
                <label className="field">
                  <span className="fieldLabel">Месяц рождения</span>

                  <MonthDropdown
                    value={regForm.birthMonth}
                    onChange={(v) => setRegForm((s) => ({ ...s, birthMonth: v }))}
                    months={MONTHS_RU}
                  />

                </label>
              </div>
              <button className="btn primary" type="submit">
                Создать аккаунт
              </button>
              <div className="authSwitch">
                Уже есть аккаунт?{" "}
                <button
                  className="link"
                  type="button"
                  onClick={() => onSwitch?.("login")}
                >
                  Войти
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
