// Read only non-sensitive UI preferences; storage may be blocked by the browser.
try {
  const theme = localStorage.getItem('cpsi-theme');
  document.documentElement.dataset.theme = theme === 'light' || theme === 'dark' ? theme : 'light';
  const lang = localStorage.getItem('cpsi-language');
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
} catch {
  /* Keep the accessible default when storage is unavailable. */
}
