import { useMemo } from "react";
import { Card } from "../components/UI/Card";

export function Home({ onOpenModal }) {
  const products = useMemo(
    () => [
      {
        key: "card",
        icon: "💳",
        title: "Nexora Card",
        text: "Виртуальная и пластиковая карта: переводы, кэшбэк и контроль расходов.",
      },
      {
        key: "deposit",
        icon: "🏦",
        title: "Вклады",
        text: "Накопления с пополнением и гибкими сроками. Проценты — пример для демо.",
      },
      {
        key: "loan",
        icon: "📈",
        title: "Кредиты",
        text: "Прозрачные условия и понятный график. В демо — без реальных расчётов.",
      },
    ],
    []
  );

  return (
    <div className="stack">
      <section className="hero">
        <div className="heroLeft">
          <div className="badge">Надёжно • Быстро • Удобно</div>
          <h1 className="h1">
            Nexora Bank — <span className="soft">онлайн банк</span> для твоих денег
          </h1>
          <p className="lead">
            Переводы, карты, вклады и кредиты — в одном месте. Управляй финансами онлайн за пару кликов.
          </p>
          <div className="row">
            <button
              className="btn primary"
              type="button"
              onClick={() =>
                onOpenModal("Открыть счёт", "Это демо фронтенд. В реальном проекте тут будет форма + запрос на сервер (API).")
              }
            >
              Открыть счёт
            </button>
            <button
              className="btn ghost"
              type="button"
              onClick={() =>
                onOpenModal(
                  "Скачать приложение",
                  "Можем добавить блок со ссылками на App Store / Google Play и QR-код."
                )
              }
            >
              Скачать приложение
            </button>
          </div>
          <div className="stats">
            <Card>
              <div className="statNum">1.2M+</div>
              <div className="statLabel">клиентов</div>
            </Card>
            <Card>
              <div className="statNum">24/7</div>
              <div className="statLabel">поддержка</div>
            </Card>
            <Card>
              <div className="statNum">0%</div>
              <div className="statLabel">P2P*</div>
            </Card>
          </div>
          <div className="fine">*условно для демо</div>
        </div>
        <div className="heroRight">
          <Card className="cardPreview">
            <div className="cardTop">
              <div className="chip" />
              <div className="brandMark">NEXORA</div>
            </div>
            <div className="cardNum">4000 •••• •••• 1234</div>
            <div className="cardBottom">
              <div>
                <div className="muted">Баланс</div>
                <div className="balance">xx xxx xxx UZS</div>
              </div>
              <div className="cardName">Ф.И.О</div>
            </div>
          </Card>
          <div className="miniGrid">
            <Card>
              <div className="miniTitle">Перевод</div>
              <div className="muted">По номеру телефона</div>
            </Card>
            <Card>
              <div className="miniTitle">Вклад</div>
              <div className="muted">до 22% годовых</div>
            </Card>
            <Card>
              <div className="miniTitle">Кредит</div>
              <div className="muted">решение за 5 минут</div>
            </Card>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="sectionHead">
          <h2 className="h2">Продукты</h2>
          <p className="muted">Все основные банковские услуги — на одной платформе.</p>
        </div>
        <div className="grid3">
          {products.map((p) => (
            <Card key={p.key} className="product">
              <div className="productIcon">{p.icon}</div>
              <div className="productTitle">{p.title}</div>
              <div className="muted">{p.text}</div>
              <button
                className="link"
                type="button"
                onClick={() => onOpenModal(p.title, p.text)}
              >
                Подробнее →
              </button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
