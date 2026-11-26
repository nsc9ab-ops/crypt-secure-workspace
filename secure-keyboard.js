/* Scott.F.N in-app keyboard. It keeps sensitive entry inside the app shell. */
(() => {
  const sensitive = new Set(['accessPass','memberPassword','memberPasswordConfirm','memberPhone','memberCode','memberLookup']);
  const digitFields = new Set(['memberCode']);
  const passwordFields = new Set(['accessPass','memberPassword','memberPasswordConfirm']);
  const state = { input: null, mode: 'text', panel: null };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function markFields() {
    sensitive.forEach(id => {
      const input = document.getElementById(id);
      if (!input || input.dataset.sfnKeyboard === '1') return;
      input.dataset.sfnKeyboard = '1';
      input.setAttribute('inputmode', 'none');
      input.setAttribute('autocomplete', 'off');
      input.addEventListener('focus', () => open(input));
    });
  }

  function open(input) {
    state.input = input;
    state.mode = digitFields.has(input.id) || input.type === 'tel' ? 'digits' : input.id === 'memberLookup' ? 'callsign' : passwordFields.has(input.id) ? 'password' : 'text';
    input.dataset.sfnKeyboardOpen = '1';
    input.setAttribute('inputmode', 'none');
    input.setAttribute('readonly', 'readonly');
    if (!state.panel) {
      state.panel = document.createElement('section');
      state.panel.className = 'sfn-keyboard';
      state.panel.setAttribute('aria-label', 'Scott.F.N secure keyboard');
      document.body.append(state.panel);
      state.panel.addEventListener('click', onKey);
    }
    render();
  }

  function close() {
    if (!state.input) return;
    state.input.removeAttribute('readonly');
    state.input.removeAttribute('data-sfn-keyboard-open');
    state.input = null;
    state.panel?.classList.remove('open');
  }

  function keys() {
    if (state.mode === 'digits') return [...randomDigits(), '⌫', 'Clear', 'Done'];
    if (state.mode === 'callsign') return ['S','F','N','-','A','B','C','D','E','G','K','L','M','N','O','P','Q','R','T','U','V','W','X','Y','Z','2','3','4','5','6','7','8','9','⌫','Clear','Done'];
    if (state.mode === 'password') return [...'1234567890', ...'QWERTYUIOP', ...'ASDFGHJKL', ...'ZXCVBNM', ...'qwertyuiop', ...'asdfghjkl', ...'zxcvbnm', ...'!@#$%^&*', '⌫', 'Clear', 'Done'];
    return ['1','2','3','4','5','6','7','8','9','0','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','⌫','Clear','Done'];
  }

  function randomDigits() {
    const values = ['0','1','2','3','4','5','6','7','8','9'];
    const random = crypto.getRandomValues(new Uint32Array(values.length));
    for (let i = values.length - 1; i > 0; i--) { const j = random[i] % (i + 1); [values[i], values[j]] = [values[j], values[i]]; }
    return values;
  }

  function render() {
    if (!state.panel || !state.input) return;
    const title = state.mode === 'digits' ? 'SECURE NUMERIC KEYPAD' : state.mode === 'callsign' ? 'CALLSIGN ENTRY' : 'SECURE ENTRY';
    state.panel.innerHTML = '<div class="sfn-keyboard-head"><span><i></i>'+title+'</span><button type="button" data-key="close" aria-label="Close keyboard">×</button></div><div class="sfn-keyboard-preview">'+esc(state.input.value || 'Ready')+'</div><div class="sfn-keyboard-grid">'+keys().map(key => '<button type="button" data-key="'+esc(key)+'" class="'+(key.length>1?'wide':'')+'">'+esc(key)+'</button>').join('')+'</div><p>Local app keyboard · input is kept in this field only</p>';
    state.panel.classList.add('open');
  }

  function onKey(event) {
    const button = event.target.closest('[data-key]');
    if (!button || !state.input) return;
    const key = button.dataset.key;
    if (key === 'close') return close();
    if (key === 'Done') { state.input.form?.requestSubmit?.(); close(); return; }
    if (key === 'Clear') { state.input.value = ''; return notify(); }
    if (key === '⌫') { state.input.value = state.input.value.slice(0, -1); return notify(); }
    const max = Number(state.input.maxLength) > 0 ? Number(state.input.maxLength) : 128;
    if (state.input.value.length < max) state.input.value += key;
    notify();
  }

  function notify() {
    state.input.dispatchEvent(new Event('input', { bubbles: true }));
    state.input.dispatchEvent(new Event('change', { bubbles: true }));
    render();
  }

  const style = document.createElement('style');
  style.textContent = '.sfn-keyboard{position:fixed;z-index:120;left:50%;bottom:14px;width:min(460px,calc(100vw - 24px));padding:12px;border:1px solid #39d98d;border-radius:22px;background:linear-gradient(145deg,#071b18f5,#071218f7);box-shadow:0 18px 60px #000b,0 0 32px #31ff9b24;backdrop-filter:blur(20px);opacity:0;transform:translate(-50%,18px) scale(.97);pointer-events:none;transition:.22s ease}.sfn-keyboard.open{opacity:1;transform:translate(-50%,0) scale(1);pointer-events:auto}.sfn-keyboard-head{display:flex;justify-content:space-between;align-items:center;color:#91ffc8;font:10px ui-monospace,monospace;letter-spacing:.1em}.sfn-keyboard-head span{display:flex;align-items:center;gap:7px}.sfn-keyboard-head i{width:7px;height:7px;border-radius:50%;background:#57ffad;box-shadow:0 0 10px #57ffad}.sfn-keyboard-head button{border:0;background:transparent;color:#a9c9c2;font-size:21px;line-height:1}.sfn-keyboard-preview{min-height:35px;margin:9px 0;padding:8px 10px;border:1px solid #245246;border-radius:10px;background:#061311;color:#dffff0;font:15px ui-monospace,monospace;overflow-wrap:anywhere}.sfn-keyboard-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:5px}.sfn-keyboard-grid button{min-height:38px;padding:3px;border:1px solid #205641;border-radius:9px;background:#0c2820;color:#d9fff0;font:600 13px ui-monospace,monospace}.sfn-keyboard-grid button:hover,.sfn-keyboard-grid button:focus-visible{border-color:#76ffc0;background:#164c37;box-shadow:0 0 11px #48f5a33b;outline:0}.sfn-keyboard-grid button.wide{grid-column:span 2}.sfn-keyboard p{margin:8px 0 0;color:#6d9488;text-align:center;font:9px ui-monospace,monospace}@media(max-width:420px){.sfn-keyboard{bottom:7px;padding:9px}.sfn-keyboard-grid{gap:4px}.sfn-keyboard-grid button{min-height:35px;font-size:11px}}@media(prefers-reduced-motion:reduce){.sfn-keyboard{transition:none}}body.reduce-motion .sfn-keyboard{transition:none}';
  document.head.append(style);
  new MutationObserver(markFields).observe(document.body, { childList: true, subtree: true });
  markFields();
})();
