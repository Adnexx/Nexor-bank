import { Card } from "../components/UI/Card";

export function BudgetControl() {
  const summary = { income: 8_500_000, expense: 6_300_000, balance: 2_200_000 };
  const categories = [
    { name: "Еда", used: 1_200_000, limit: 1_500_000 },
    { name: "Транспорт", used: 600_000, limit: 500_000 },
    { name: "Развлечения", used: 900_000, limit: 1_200_000 },
  ];
  const operations = [
    { title: "Супермаркет", amount: -120_000, type: "expense", icon: "🛒" },
    { title: "Такси", amount: -45_000, type: "expense", icon: "🚕" },
    { title: "Зарплата", amount: +3_500_000, type: "income", icon: "💼" },
  ];

  return (
    <div className="stack">
      <div className="sectionHead">
        <h2 className="h2">Контроль бюджета</h2>
        <p className="muted">Следи за расходами и не выходи за лимиты</p>
      </div>
      <div className="grid3">
        <div className="card">
          <div className="muted">Доходы</div>
          <div className="bigNum pos">{summary.income.toLocaleString()} UZS</div>
        </div>
        <div className="card">
          <div className="muted">Расходы</div>
          <div className="bigNum neg">{summary.expense.toLocaleString()} UZS</div>
        </div>
        <div className="card">
          <div className="muted">Остаток</div>
          <div className="bigNum">{summary.balance.toLocaleString()} UZS</div>
        </div>
      </div>
      <div className="stack">
        <h3 className="h3">Категории</h3>
        <div className="budgetList">
          {categories.map((c) => {
            const percent = Math.min(100, Math.round((c.used / c.limit) * 100));
            const over = c.used > c.limit;
            return (
              <div key={c.name} className="budgetRow">
                <div className="budgetTop">
                  <div className="budgetCat">{c.name}</div>
                  <div className="budgetNums">
                    {c.used.toLocaleString()} / {c.limit.toLocaleString()} UZS{" "}
                    {over && <span className="pillWarn">Превышен</span>}
                  </div>
                </div>
                <div className="budgetBar">
                  <div
                    className={over ? "budgetFillOver" : "budgetFill"}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card">
        <h3 className="h3">Последние операции</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Операция</th>
              <th className="right">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((o, i) => (
              <tr key={i}>
                <td>
                  <span style={{ marginRight: 8 }}>{o.icon}</span>
                  {o.title}
                </td>
                <td className={`right ${o.amount < 0 ? "neg" : "pos"}`}>
                  {o.amount > 0 ? "+" : ""}
                  {o.amount.toLocaleString()} UZS
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10 }} className="muted">
          Итого за период: <b className="pos">+3 335 000 UZS</b>
        </div>
      </div>
      <div className="note">
        💡 Совет: расходы на транспорт превышают лимит. Попробуй оптимизировать
        поездки.
      </div>
    </div>
  );
}
