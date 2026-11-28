/* Shared presentation controls for every Scott.F.N game. */
(() => {
  const KEY = 'sfn-game-minimal-hud-v1';
  const secondarySelectors = [
    '#portrait-banner', '#traffic-status-pill', '#orbit-hint-pill', '#toast-feed',
    '#hud-overlay', '#toast-container', '.holo-scanline'
  ];
  const root = document.documentElement;
  const saved = localStorage.getItem(KEY) === '1';
  const markSecondaryHud = () => secondarySelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => element.dataset.gameSecondary = 'true');
  });
  const style = document.createElement('style');
  style.textContent = '[data-game-secondary="true"]{transition:opacity .2s ease,visibility .2s ease}body.sfn-minimal-hud [data-game-secondary="true"]{display:none!important}.sfn-hud-toggle{position:fixed;top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));z-index:1200;border:1px solid rgba(103,232,249,.65);background:rgba(3,16,25,.9);color:#a5f3fc;padding:8px 11px;border-radius:8px;font:700 10px ui-monospace,SFMono-Regular,monospace;letter-spacing:.08em;box-shadow:0 0 16px rgba(34,211,238,.18);backdrop-filter:blur(10px)}.sfn-hud-toggle:hover{border-color:#fff;color:#fff}.sfn-hud-toggle[data-minimal="true"]{color:#86efac;border-color:#34d399}@media(max-width:700px){.sfn-hud-toggle{top:max(6px,env(safe-area-inset-top));right:max(6px,env(safe-area-inset-right));padding:7px 9px;font-size:9px}}';
  document.head.appendChild(style);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sfn-hud-toggle';
  button.title = 'Hide or show secondary game overlays';
  button.setAttribute('aria-label', 'Toggle minimal game HUD');
  const sync = () => {
    const minimal = root.classList.contains('sfn-minimal-hud');
    button.dataset.minimal = String(minimal);
    button.textContent = minimal ? 'HUD: MIN' : 'HUD: FULL';
  };
  const toggle = () => {
    const minimal = !root.classList.contains('sfn-minimal-hud');
    root.classList.toggle('sfn-minimal-hud', minimal);
    localStorage.setItem(KEY, minimal ? '1' : '0');
    sync();
  };
  button.addEventListener('click', toggle);
  const boot = () => {
    markSecondaryHud();
    if (saved) root.classList.add('sfn-minimal-hud');
    document.body.appendChild(button);
    sync();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true}); else boot();
})();
