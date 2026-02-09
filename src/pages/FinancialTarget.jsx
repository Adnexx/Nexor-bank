import { useState } from "react";
import { Card } from "../components/UI/Card";
import { Input } from "../components/UI/FormFields";


export function FinancialTarget() {
  const LS_KEY = "nexora_target_v1";
  const [state, setState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (saved) return saved;
    } catch {}
    return {
      goalName: "Моя цель",
      goalAmount: 5000000,
      savedAmount: 0,
      salaryAmount: 3000000,
      saveMode: "percent",
      saveValue: 10,
      lastDepositAt: "",
    };
  });

  const fmt = (n) =>
    new Intl.NumberFormat("ru-RU").format(Math.max(0, Math.round(n))) +
    " UZS";
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const percent =
    state.goalAmount > 0
      ? clamp((state.savedAmount / state.goalAmount) * 100, 0, 100)
      : 0;

  const saveToLS = (next) => {
    setState(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  };
  const setField = (key, value) => {
    const next = { ...state, [key]: value };
    saveToLS(next);
  };

  const calcDeposit = () => {
    const salary = Number(state.salaryAmount) || 0;
    const v = Number(state.saveValue) || 0;
    if (salary <= 0) return 0;
    if (state.saveMode === "percent")
      return Math.round((salary * clamp(v, 0, 100)) / 100);
    return Math.round(clamp(v, 0, salary));
  };
  const deposit = calcDeposit();

  const doSalaryDeposit = () => {
    if (state.goalAmount <= 0)
      return alert("Укажи сумму цели больше 0");
    if (state.salaryAmount <= 0) return alert("Укажи зарплату больше 0");
    if (deposit <= 0)
      return alert("Сумма откладывания должна быть больше 0");
    const now = new Date().toISOString().slice(0, 10);
    const nextSaved = Math.min(
      state.goalAmount,
      state.savedAmount + deposit
    );
    saveToLS({ ...state, savedAmount: nextSaved, lastDepositAt: now });
  };
  const reset = () => {
    if (!confirm("Сбросить накопления?")) return;
    saveToLS({ ...state, savedAmount: 0, lastDepositAt: "" });
  };

  return (
    <div className="stack">
      <div className="sectionHead">
        <h2 className="h2">Financial Target</h2>
        <p className="muted">
          Цель накопления: укажи зарплату и сколько откладывать.
        </p>
      </div>
      <div className="grid2">
        <Card>
          <div className="h3">Цель</div>
          <Input
            label="Название цели"
            value={state.goalName}
            onChange={(e) => setField("goalName", e.target.value)}
            placeholder="Например: Новый телефон"
          />
          <Input
            label="Сумма цели (UZS)"
            value={state.goalAmount}
            onChange={(e) => setField("goalAmount", Number(e.target.value || 0))}
            inputMode="numeric"
          />
          <Input
            label="Уже накоплено (UZS)"
            value={state.savedAmount}
            onChange={(e) =>
              setField("savedAmount", Number(e.target.value || 0))
            }
            inputMode="numeric"
          />
          <div className="row">
            <button
              className="btn primary"
              type="button"
              onClick={doSalaryDeposit}
            >
              Начислить зарплату + отложить
            </button>
            <button className="btn ghost" type="button" onClick={reset}>
              Сброс
            </button>
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Последнее начисление: <b>{state.lastDepositAt || "—"}</b>
          </div>
        </Card>
        <Card>
          <div className="h3">Настройка откладывания</div>
          <Input
            label="Зарплата (UZS)"
            value={state.salaryAmount}
            onChange={(e) =>
              setField("salaryAmount", Number(e.target.value || 0))
            }
            inputMode="numeric"
          />
          <label className="field">
            <span className="fieldLabel">Способ</span>
            <select
              className="input"
              value={state.saveMode}
              onChange={(e) => setField("saveMode", e.target.value)}
            >
              <option value="percent">Процент от зарплаты</option>
              <option value="fixed">Фиксированная сумма</option>
            </select>
          </label>
          {state.saveMode === "percent" ? (
            <Input
              label="Сколько откладывать (%)"
              value={state.saveValue}
              onChange={(e) =>
                setField("saveValue", Number(e.target.value || 0))
              }
              inputMode="numeric"
              placeholder="10"
            />
          ) : (
            <Input
              label="Сколько откладывать (UZS)"
              value={state.saveValue}
              onChange={(e) =>
                setField("saveValue", Number(e.target.value || 0))
              }
              inputMode="numeric"
              placeholder="300000"
            />
          )}
          <div className="targetSummary">
            <div className="targetRing" style={{ "--p": `${percent}` }}>
              <div className="targetRingInner">
                <div className="targetPercent">{Math.round(percent)}%</div>
                <div className="muted">прогресс</div>
              </div>
            </div>
            <div className="targetInfo">
              <div>
                <span className="muted">Откладывается:</span> <b>{fmt(deposit)}</b>
              </div>
              <div>
                <span className="muted">Накоплено:</span>{" "}
                <b>{fmt(state.savedAmount)}</b>
              </div>
              <div>
                <span className="muted">Цель:</span> <b>{fmt(state.goalAmount)}</b>
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                * В демо работает в браузере.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
