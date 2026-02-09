import { useState, useCallback } from "react";
import { I18N } from "./translations";

const LS_LANG = "nexora_lang";

export function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem(LS_LANG) || "ru");

  const t = useCallback(
    (key) => I18N[lang]?.[key] ?? I18N.ru?.[key] ?? key,
    [lang]
  );

  const changeLang = useCallback((l) => {
    setLang(l);
    localStorage.setItem(LS_LANG, l);
  }, []);

  return { lang, t, changeLang };
}
