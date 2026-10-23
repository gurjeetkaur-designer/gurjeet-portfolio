// Best-effort deterrents against copying the artwork. A web page cannot truly
// block OS-level screenshots, so these raise the effort required: no right-click
// or drag-to-save, a blank clipboard after PrintScreen, and blurred media while
// the window is unfocused (which catches most snipping tools), being printed, or
// has developer tools docked open.

const SHIELD_CLASS = 'is-shielded';
const DEVTOOLS_CLASS = 'is-inspecting';

function shield(ms) {
  document.documentElement.classList.add(SHIELD_CLASS);
  if (ms) setTimeout(unshield, ms);
}

function unshield() {
  if (document.hasFocus()) document.documentElement.classList.remove(SHIELD_CLASS);
}

export function protectContent() {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('dragstart', (e) => {
    if (e.target.closest?.('img, video')) e.preventDefault();
  });

  document.addEventListener('keydown', (e) => {
    const mod = e.ctrlKey || e.metaKey;
    const key = e.key.toLowerCase();

    // Save page / print / view source.
    if (mod && (key === 's' || key === 'p' || key === 'u')) e.preventDefault();

    // Developer tools: F12, Ctrl+Shift+I/J/C/K (Windows/Linux), Cmd+Option+I/J/C/U (macOS).
    const devtoolsKey = ['i', 'j', 'c', 'k', 'u'].includes(key) || ['KeyI', 'KeyJ', 'KeyC', 'KeyK', 'KeyU'].includes(e.code);
    if (e.key === 'F12' || (mod && (e.shiftKey || e.altKey) && devtoolsKey)) e.preventDefault();

    // macOS screenshot chords (Cmd+Shift+3/4/5) and Windows Snipping Tool (Win+Shift+S).
    if ((e.metaKey && e.shiftKey) || key === 'meta' || key === 'os') shield(1500);
  });

  // PrintScreen only fires on keyup in most browsers; overwrite whatever it captured.
  document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      shield(1500);
      navigator.clipboard?.writeText('').catch(() => {});
    }
  });

  window.addEventListener('blur', () => shield());
  window.addEventListener('focus', unshield);
  document.addEventListener('visibilitychange', () => (document.hidden ? shield() : unshield()));

  // Docked developer tools shrink the viewport relative to the window. Blur the
  // artwork while they appear to be open. Undocked devtools can't be detected.
  const DEVTOOLS_GAP = 200;
  setInterval(() => {
    const open =
      window.outerWidth - window.innerWidth > DEVTOOLS_GAP ||
      window.outerHeight - window.innerHeight > DEVTOOLS_GAP;
    document.documentElement.classList.toggle(DEVTOOLS_CLASS, open);
  }, 1000);

  window.addEventListener('beforeprint', () => shield());
  window.addEventListener('afterprint', unshield);
}
