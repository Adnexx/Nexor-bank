import { useState } from "react";
import { Card } from "../components/UI/Card";
import { Input, Textarea } from "../components/UI/FormFields";

export function Contact() {
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [err, setErr] = useState({});

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2)
      e.name = "Введите имя (мин. 2 символа)";
    if (!/^\+?\d[\d\s()\-]{8,}$/.test(form.phone.trim()))
      e.phone = "Введите корректный телефон";
    if (form.message.trim().length < 10)
      e.message = "Сообщение минимум 10 символов";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    setToast("");
    if (!validate()) return;
    setToast("✅ Заявка отправлена (демо).");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="stack">
      <div className="sectionHead">
        <h2 className="h2">Контакты</h2>
        <p className="muted">Оставь заявку — мы ответим.</p>
      </div>
      <div className="grid2">
        <Card>
          <form className="form" onSubmit={submit} noValidate>
            <Input
              label="Имя"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Например, Имя"
              error={err.name}
            />
            <Input
              label="Телефон"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              placeholder="+998 (__) ___-__-__"
              error={err.phone}
            />
            <Textarea
              label="Сообщение"
              rows={4}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              placeholder="Коротко опиши вопрос"
              error={err.message}
            />
            <button className="btn primary" type="submit">
              Отправить
            </button>
            {toast && <div className="toast">{toast}</div>}
          </form>
        </Card>
        <Card>
          <div className="h3">Nexora Bank</div>
          <p className="muted">Ташкент • Пн–Сб 9:00–18:00</p>
          <div className="contactList">
            <div>
              <b>Телефон:</b> +998 (90) 000-00-00
            </div>
            <div>
              <b>Email:</b> support@nexorabank.uz
            </div>
            <div>
              <b>Адрес:</b> ул. Примерная, 1
            </div>
          </div>
          <div className="note">
            Это фронтенд-шаблон. Чтобы сделать "настоящий банк", нужен бекенд +
            база данных + защита.
          </div>
        </Card>
      </div>
    </div>
  );
}
