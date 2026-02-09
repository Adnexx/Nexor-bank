import { useState } from "react";

export function PasswordInput({ label, value, onChange, autoComplete }) {
  const [show, setShow] = useState(false);

  return (
    <label className="field passwordField">
      <span className="fieldLabel">{label}</span>

      <div className="passwordInner">
        <input
          className="input"
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="eyeBtn"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Скрыть пароль" : "Показать пароль"}
        >
          {show ? (
            // 👁 видно
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 12C3.5 7 7.5 4 12 4C16.5 4 20.5 7 23 12C20.5 17 16.5 20 12 20C7.5 20 3.5 17 1 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            // 🚫👁 скрыто
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 12C3.5 7 7.5 4 12 4C16.5 4 20.5 7 23 12C20.5 17 16.5 20 12 20C7.5 20 3.5 17 1 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>
    </label>
  );
}
