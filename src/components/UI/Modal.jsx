export function Modal({
  open,
  title,
  children,
  onClose,
  actionText = "Ок",
  onAction,
}) {
  if (!open) return null;
  const close = () => onClose?.();
  return (
    <div className="modal">
      <button className="backdrop" onClick={close} aria-label="Закрыть" />
      <div className="modalBox" role="dialog" aria-modal="true">
        <div className="modalHead">
          <h3 className="modalTitle">{title}</h3>
          <button
            className="iconBtn"
            onClick={close}
            type="button"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        <div className="modalBody">{children}</div>
        <div className="modalFoot">
          <button className="btn ghost" onClick={close} type="button">
            Закрыть
          </button>
          <button
            className="btn primary"
            onClick={() => (onAction ? onAction() : close())}
            type="button"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
