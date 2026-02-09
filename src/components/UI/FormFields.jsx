export function Input({ label, error, ...props }) {
  return (
    <label className="field">
      <span className="fieldLabel">{label}</span>
      <input className={"input " + (error ? "inputErr" : "")} {...props} />
      <small className="fieldErr">{error || ""}</small>
    </label>
  );
}

export function Textarea({ label, error, ...props }) {
  return (
    <label className="field">
      <span className="fieldLabel">{label}</span>
      <textarea
        className={"input textarea " + (error ? "inputErr" : "")}
        {...props}
      />
      <small className="fieldErr">{error || ""}</small>
    </label>
  );
}
