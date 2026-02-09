import { Card } from "../components/UI/Card";

export function Security() {
  return (
    <div className="stack">
      <div className="sectionHead">
        <h2 className="h2">Безопасность</h2>
        <p className="muted">Простые и понятные принципы защиты.</p>
      </div>
      <div className="grid2">
        <Card>
          <div className="h3">2FA и уведомления</div>
          <p className="muted">
            Подтверждение входа и операций, контроль устройств и быстрые уведомления.
          </p>
          <ul className="list">
            <li>Коды подтверждения</li>
            <li>Лимиты и блокировка</li>
            <li>Уведомления по операциям</li>
          </ul>
        </Card>
        <Card>
          <div className="h3">Шифрование данных</div>
          <p className="muted">Передача данных защищена современными протоколами.</p>
          <ul className="list">
            <li>HTTPS и secure cookies</li>
            <li>Защита сессий</li>
            <li>Антифрод логика</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
