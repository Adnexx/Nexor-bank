import { Card } from "../components/UI/Card";

export function Pricing({ onPick }) {
  const plans = [
    { name: "Start", price: "0 UZS/мес", transfers: "до 20/мес", cashback: "до 1%" },
    {
      name: "Plus",
      price: "15 000 UZS/мес",
      transfers: "безлимит",
      cashback: "до 3%",
      hot: true,
    },
    { name: "Pro", price: "35 000 UZS/мес", transfers: "безлимит", cashback: "до 5%" },
  ];

  return (
    <div className="stack">
      <div className="sectionHead">
        <h2 className="h2">Тарифы</h2>
        <p className="muted">Пример тарифов для витрины Nexora Bank.</p>
      </div>
      <div className="grid3">
        {plans.map((p) => (
          <Card key={p.name} className={"plan " + (p.hot ? "planHot" : "")}>
            <div className="planHead">
              <div className="planName">
                {p.name} {p.hot && <span className="pill">Популярно</span>}
              </div>
              <div className="planPrice">{p.price}</div>
            </div>
            <div className="planInfo">
              <div>
                Переводы: <b>{p.transfers}</b>
              </div>
              <div>
                Кэшбэк: <b>{p.cashback}</b>
              </div>
            </div>
            <button
              className="btn primary"
              onClick={() => onPick(p)}
              type="button"
            >
              Выбрать
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
