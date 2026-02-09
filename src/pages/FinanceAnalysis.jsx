import { useMemo, useState } from "react";
import { Card } from "../components/UI/Card";
import { Input, Textarea } from "../components/UI/FormFields";
export function FinanceAnalysis() {
  const [items, setItems] = useState(() => [
    {
      id: 1,
      type: "income",
      amount: 2500000,
      title: "Зарплата",
      date: "2026-02-01",
    },
    {
      id: 2,
      type: "expense",
      amount: 420000,
      title: "Еда",
      date: "2026-02-03",
    },
    {
      id: 3,
      type: "expense",
      amount: 180000,
      title: "Транспорт",
      date: "2026-02-04",
    },
    {
      id: 4,
      type: "income",
      amount: 300000,
      title: "Фриланс",
      date: "2026-02-05",
    },
  ]);

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    title: "",
    date: "",
  });
  const [err, setErr] = useState("");

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const it of items) {
      if (it.type === "income") income += it.amount;
      else expense += it.amount;
    }
    return { income, expense, balance: income - expense };
  }, [items]);

  const byMonth = useMemo(() => {
    const map = new Map();
    for (const it of items) {
      const m = (it.date || "").slice(0, 7) || "unknown";
      if (!map.has(m)) map.set(m, { income: 0, expense: 0 });
      const obj = map.get(m);
      if (it.type === "income") obj.income += it.amount;
      else obj.expense += it.amount;
    }
    return Array.from(map.entries())
      .filter(([k]) => k !== "unknown")
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([month, v]) => ({ month, ...v, net: v.income - v.expense }));
  }, [items]);

  const maxAbs = useMemo(() => {
    let m = 1;
    for (const r of byMonth)
      m = Math.max(m, Math.abs(r.net), r.income, r.expense);
    return m;
  }, [byMonth]);

  const addItem = (e) => {
    e.preventDefault();
    setErr("");
    const amountNum = Number(String(form.amount).replace(/\s+/g, ""));
    if (!form.title.trim()) return setErr("Введите название операции");
    if (!form.date) return setErr("Выберите дату");
    if (!Number.isFinite(amountNum) || amountNum <= 0)
      return setErr("Сумма должна быть больше 0");
    setItems((prev) => [
      {
        id: Date.now(),
        type: form.type,
        amount: amountNum,
        title: form.title.trim(),
        date: form.date,
      },
      ...prev,
    ]);
    setForm({ type: "expense", amount: "", title: "", date: "" });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  const fmt = (n) =>
    new Intl.NumberFormat("ru-RU").format(n) + " UZS";

  return (
    <div className="stack">
      <div className="sectionHead">
        <h2 className="h2">Анализ финансов</h2>
        <p className="muted">Демо-аналитика: доходы, расходы, баланс.</p>
      </div>
      <div className="grid3">
        <Card>
          <div className="muted">Доходы</div>
          <div className="bigNum">{fmt(totals.income)}</div>
        </Card>
        <Card>
          <div className="muted">Расходы</div>
          <div className="bigNum">{fmt(totals.expense)}</div>
        </Card>
        <Card>
          <div className={"bigNum " + (totals.balance < 0 ? "neg" : "pos")}>
            <div className="muted">Баланс</div>
            {fmt(totals.balance)}
          </div>
        </Card>
      </div>
      <div className="grid2">
        <Card>
          <div className="h3">Добавить операцию</div>
          <form className="form" onSubmit={addItem}>
            <label className="field">
              <span className="fieldLabel">Тип</span>
              <select
                className="input"
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
              >
                <option value="expense">Расход</option>
                <option value="income">Доход</option>
              </select>
            </label>
            <Input
              label="Сумма (UZS)"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              placeholder="Например 150000"
            />
            <Input
              label="Название"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Например: Еда / Зарплата"
            />
            <Input
              label="Дата"
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
            <button className="btn primary" type="submit">
              Добавить
            </button>
            {err && <div className="toastErr">⚠ {err}</div>}
          </form>
        </Card>
        <Card>
          <div className="h3">Динамика по месяцам</div>
          {byMonth.length === 0 ? (
            <p className="muted">Добавь операции, чтобы увидеть график.</p>
          ) : (
            <div className="barChart">
              {byMonth.map((r) => (
                <div className="barRow" key={r.month}>
                  <div className="barLabel">{r.month}</div>
                  <div className="bars">
                    <div className="barLine">
                      <div
                        className="bar income"
                        style={{
                          width:
                            Math.round((r.income / maxAbs) * 100) + "%",
                        }}
                      />
                      <span className="barText">Доход: {fmt(r.income)}</span>
                    </div>
                    <div className="barLine">
                      <div
                        className="bar expense"
                        style={{
                          width:
                            Math.round((r.expense / maxAbs) * 100) + "%",
                        }}
                      />
                      <span className="barText">
                        Расход: {fmt(r.expense)}
                      </span>
                    </div>
                    <div className="barLine">
                      <div
                        className={
                          "bar net " +
                          (r.net < 0 ? "expense" : "income")
                        }
                        style={{
                          width:
                            Math.round(
                              (Math.abs(r.net) / maxAbs) * 100
                            ) + "%",
                        }}
                      />
                      <span className="barText">Итог: {fmt(r.net)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      <Card>
        <div className="h3">Операции</div>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип</th>
                <th>Название</th>
                <th className="right">Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  <td>{it.date}</td>
                  <td>
                    <span
                      className={
                        "tag " +
                        (it.type === "income" ? "tagIn" : "tagOut")
                      }
                    >
                      {it.type === "income" ? "Доход" : "Расход"}
                    </span>
                  </td>
                  <td>{it.title}</td>
                  <td
                    className={
                      "right " +
                      (it.type === "income" ? "pos" : "neg")
                    }
                  >
                    {it.type === "income" ? "+" : "-"} {fmt(it.amount)}
                  </td>
                  <td className="right">
                    <button
                      className="btnSmall"
                      type="button"
                      onClick={() => removeItem(it.id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="muted">
                    Нет операций
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
