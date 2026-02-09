import { useState } from "react";
import { Card } from "../components/UI/Card";

export function FAQ() {
  const items = [
    {
      q: "Как открыть счёт?",
      a: "На главной нажми «Открыть счёт». В реальности это будет форма + API.",
    },
    {
      q: "Есть ли комиссии за переводы?",
      a: "Зависит от тарифа. В демо — просто витрина тарифов.",
    },
    {
      q: "Как восстановить доступ?",
      a: "Добавим «Забыли пароль» и подтверждение по SMS/Email.",
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <div className="stack">
      <div className="sectionHead">
        <h2 className="h2">FAQ</h2>
        <p className="muted">Частые вопросы клиентов.</p>
      </div>
      <div className="stack">
        {items.map((it, idx) => (
          <Card key={it.q} className="acc">
            <button
              className="accBtn"
              onClick={() => setOpen(open === idx ? -1 : idx)}
              type="button"
            >
              <span className="accQ">{it.q}</span>
              <span className="accIcon">{open === idx ? "−" : "+"}</span>
            </button>
            {open === idx && <div className="accA">{it.a}</div>}
          </Card>
        ))}
      </div>
    </div>
  );
}
