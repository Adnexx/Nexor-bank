export const setGoogleLang = (lang) => {
  const trySet = () => {
    const select = document.querySelector("select.goog-te-combo");
    if (!select) return false;
    select.value = lang;
    select.dispatchEvent(new Event("change"));
    return true;
  };

  if (trySet()) return;
  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (trySet() || tries > 40) clearInterval(timer);
  }, 100);
};
