/* Scott.F.N in-app keyboard, styled after a compact Android keyboard. */
(() => {
  const fieldIds = new Set(['accessPass','memberPassword','memberPasswordConfirm','memberPhone','memberCode','memberLookup']);
  const numericIds = new Set(['memberCode']);
  const passwordIds = new Set(['accessPass','memberPassword','memberPasswordConfirm']);
  const state = { input: null, mode: 'text', panel: null, saved: null, shifted: false, symbols: false };
  const originalAttributes = new WeakMap();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function markFields() {
    fieldIds.forEach(id => {
      const input = document.getElementById(id);
      if (!input || input.dataset.sfnKeyboard === '1') return;
      originalAttributes.set(input, {
        readonly: input.hasAttribute('readonly'),
        inputmode: input.getAttribute('inputmode'),
        autocomplete: input.getAttribute('autocomplete')
      });
      input.dataset.sfnKeyboard = '1';
      input.setAttribute('inputmode', 'none');
      input.setAttribute('autocomplete', 'off');
      input.addEventListener('focus', () => open(input));
      input.addEventListener('blur', () => queueMicrotask(() => {
        if (state.input === input && !state.panel?.contains(document.activeElement)) close();
      }));
    });
  }

  function capture(input) {
    const original = originalAttributes.get(input) || {};
    state.saved = {
      readonly: original.readonly ?? input.hasAttribute('readonly'),
      inputmode: original.inputmode ?? null,
      autocomplete: original.autocomplete ?? null,
      type: input.type
    };
    input.setAttribute('inputmode', 'none');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('readonly', 'readonly');
  }

  function restore() {
    if (!state.input || !state.saved) return;
    const input = state.input;
    input.type = state.saved.type;
    if (!state.saved.readonly) input.removeAttribute('readonly');
    if (state.saved.inputmode === null) input.removeAttribute('inputmode');
    else input.setAttribute('inputmode', state.saved.inputmode);
    if (state.saved.autocomplete === null) input.removeAttribute('autocomplete');
    else input.setAttribute('autocomplete', state.saved.autocomplete);
    delete input.dataset.sfnKeyboardOpen;
    state.saved = null;
  }

  function open(input) {
    if (state.input && state.input !== input) restore();
    state.input = input;
    state.mode = numericIds.has(input.id) || input.type === 'tel' ? 'digits' : input.id === 'memberLookup' ? 'callsign' : passwordIds.has(input.id) ? 'password' : 'text';
    state.shifted = state.mode === 'callsign';
    state.symbols = false;
    capture(input);
    input.dataset.sfnKeyboardOpen = '1';
    ensurePanel();
    render();
  }

  function ensurePanel() {
    if (state.panel) return;
    state.panel = document.createElement('section');
    state.panel.className = 'sfn-keyboard';
    state.panel.setAttribute('aria-label', 'Scott.F.N secure keyboard');
    state.panel.setAttribute('aria-hidden', 'true');
    state.panel.innerHTML = '<div class="sfn-kb-shell"></div>';
    document.body.append(state.panel);
    state.panel.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault();
      onKey(event);
    });
    state.panel.addEventListener('click', event => {
      if (event.detail === 0) onKey(event);
    });
  }

  function close(skipAutoUnlock = false) {
    if (!state.input) return;
    const input = state.input;
    if (skipAutoUnlock && input.id === 'accessPass') input.dataset.sfnSkipAutoUnlock = '1';
    restore();
    state.input = null;
    state.panel?.classList.remove('open');
    state.panel?.setAttribute('aria-hidden', 'true');
    input.blur();
    if (input.dataset.sfnSkipAutoUnlock === '1') queueMicrotask(() => delete input.dataset.sfnSkipAutoUnlock);
  }

  function key(label, value = label, action = '', kind = '') {
    return { label, value, action, kind };
  }
  function letterRows() {
    const caps = state.mode === 'callsign' || state.shifted;
    const map = text => [...text].map(char => key(caps ? char.toUpperCase() : char.toLowerCase()));
    return [
      [...'1234567890'].map(char => key(char)),
      map('qwertyuiop'),
      map('asdfghjkl'),
      [key('⇧', '', 'shift', 'modifier'), ...map('zxcvbnm'), key('⌫', '', 'backspace', 'modifier')],
      [key('?123', '', 'symbols', 'modifier'), ...(state.mode === 'callsign' ? [key('-', '-', '', 'punctuation'), key('English (UK)', '', 'noop', 'space')] : [key(',', ',', '', 'punctuation'), key('English (UK)', ' ', '', 'space'), key('.', '.', '', 'punctuation')]), key(state.mode === 'callsign' ? '✓' : '↵', '', 'done', 'action')]
    ];
  }
  function symbolRows() {
    if (state.mode === 'callsign') {
      const digits = [...'0123456789'];
      shuffle(digits);
      return [
        digits.slice(0,3).map(char => key(char)),
        digits.slice(3,6).map(char => key(char)),
        digits.slice(6,9).map(char => key(char)),
        [key(digits[9]), key('-', '-'), key('⌫', '', 'backspace', 'modifier')],
        [key('ABC', '', 'letters', 'modifier'), key('English (UK)', '', 'noop', 'space'), key('✓', '', 'done', 'action')]
      ];
    }
    const groups = ['1234567890', '@#$%&-*+=', '()!?:;\'"/'];
    return [
      [...groups[0]].map(char => key(char)),
      [...groups[1]].map(char => key(char)),
      [...groups[2]].map(char => key(char)),
      [key('ABC', '', 'letters', 'modifier'), key('⌫', '', 'backspace', 'modifier')],
      [key('ABC', '', 'letters', 'modifier'), key(state.mode === 'callsign' ? '-' : ',', state.mode === 'callsign' ? '-' : ','), key('English (UK)', ' ', '', 'space'), key('.', '.'), key(state.mode === 'callsign' ? '✓' : '↵', '', 'done', 'action')]
    ];
  }
  function digitRows() {
    const digits = [...'123456789'];
    if (state.mode === 'digits') shuffle(digits);
    return [
      digits.slice(0,3).map(char => key(char)),
      digits.slice(3,6).map(char => key(char)),
      digits.slice(6,9).map(char => key(char)),
      [key('Clear', '', 'clear', 'modifier'), key('0', '0'), key('⌫', '', 'backspace', 'modifier')],
      [key('123', '', 'noop', 'modifier'), key('English (UK)', '', 'noop', 'space'), key('✓', '', 'done', 'action')]
    ];
  }
  function makeRows() {
    if (state.mode === 'digits') return digitRows();
    return state.symbols ? symbolRows() : letterRows();
  }
  function shuffle(items) {
    const random = crypto.getRandomValues(new Uint32Array(items.length));
    for (let i = items.length - 1; i > 0; i--) {
      const j = random[i] % (i + 1);
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  function title() {
    if (state.mode === 'digits') return 'SECURE NUMERIC ENTRY';
    if (state.mode === 'callsign') return 'SCOTT.F.N USERNAME';
    return state.mode === 'password' ? 'PRIVATE PASSWORD ENTRY' : 'SECURE ENTRY';
  }
  function previewValue() {
    const value = state.input?.value || '';
    if (state.mode === 'password' && value) return '•'.repeat(value.length);
    return value || state.input?.placeholder || 'Type securely';
  }
  function render() {
    if (!state.panel || !state.input) return;
    state.panel.classList.toggle('numeric', state.mode === 'digits' || (state.mode === 'callsign' && state.symbols));
    const rows = makeRows();
    state.panel.querySelector('.sfn-kb-shell').innerHTML =
      '<div class="sfn-kb-entry"><span class="sfn-kb-search" aria-hidden="true">⌕</span><span class="sfn-kb-value">'+esc(previewValue())+'</span><span class="sfn-kb-entry-status">●</span></div>'+
      '<div class="sfn-kb-toolbar"><span class="sfn-kb-mark" aria-hidden="true">SF</span><span class="sfn-kb-caption">'+title()+'</span><span class="sfn-kb-spacer"></span>'+(state.mode === 'password' ? '<button class="sfn-kb-tool" type="button" data-action="visibility" aria-label="Show or hide password">◉</button>' : '')+'<span class="sfn-kb-lock" aria-label="Local keyboard">◆</span><button class="sfn-kb-tool sfn-kb-close" type="button" data-action="close" aria-label="Close keyboard">⌄</button></div>'+
      '<div class="sfn-kb-rows">'+rows.map((row,index)=>'<div class="sfn-kb-row sfn-kb-row-'+index+'">'+row.map(item=>'<button type="button" class="sfn-kb-key '+(item.kind||'')+'" data-action="'+esc(item.action)+'" data-value="'+esc(item.value)+'" aria-label="'+esc(item.action||item.value||item.label)+'">'+esc(item.label)+'</button>').join('')+'</div>').join('')+'</div>'+
      '<div class="sfn-kb-foot"><span>ON-DEVICE INPUT</span><span>·</span><span>ENGLISH (UK)</span></div>';
    state.panel.classList.add('open');
    state.panel.setAttribute('aria-hidden', 'false');
  }

  function insert(value) {
    const input = state.input;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    const limit = Number(input.maxLength) > 0 ? Number(input.maxLength) : 128;
    if (input.value.length - (end - start) >= limit) return;
    input.value = input.value.slice(0, start) + value + input.value.slice(end);
    const cursor = start + value.length;
    try { input.setSelectionRange(cursor, cursor); } catch {}
    notify();
  }
  function erase() {
    const input = state.input;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    if (start === end && start > 0) input.value = input.value.slice(0, start - 1) + input.value.slice(end);
    else input.value = input.value.slice(0, start) + input.value.slice(end);
    const cursor = start === end ? Math.max(0, start - 1) : start;
    try { input.setSelectionRange(cursor, cursor); } catch {}
    notify();
  }
  function notify() {
    state.input.dispatchEvent(new Event('input', { bubbles: true }));
    const preview = state.panel?.querySelector('.sfn-kb-value');
    if (preview) preview.textContent = previewValue();
  }
  function onKey(event) {
    const button = event.target.closest('[data-action]');
    if (!button || !state.input) return;
    const action = button.dataset.action;
    if (action === 'close') return close();
    if (action === 'done') { const form = state.input.form; close(true); form?.requestSubmit?.(); return; }
    if (action === 'clear') { state.input.value = ''; try { state.input.setSelectionRange(0,0); } catch {} return notify(); }
    if (action === 'backspace') return erase();
    if (action === 'shift') { state.shifted = !state.shifted; return render(); }
    if (action === 'symbols') { state.symbols = true; return render(); }
    if (action === 'letters') { state.symbols = false; return render(); }
    if (action === 'visibility') {
      state.input.type = state.input.type === 'password' ? 'text' : 'password';
      button.setAttribute('aria-pressed', String(state.input.type === 'text'));
      return;
    }
    insert(button.dataset.value ?? '');
  }

  const style = document.createElement('style');
  style.textContent = `
    .sfn-keyboard{position:fixed;z-index:9999;left:50%;bottom:0;width:100%;max-width:680px;padding:8px 12px calc(9px + env(safe-area-inset-bottom));box-sizing:border-box;contain:layout paint;background:#191a1d;color:#f5f5f7;box-shadow:0 -16px 48px #0009;opacity:0;visibility:hidden;pointer-events:none;transform:translate(-50%,18px);transition:opacity .1s ease,transform .1s ease,visibility .1s ease;font-family:Roboto,"Arial",sans-serif;touch-action:manipulation;user-select:none}
    .sfn-keyboard.open{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}
    .sfn-kb-entry{height:48px;display:flex;align-items:center;gap:12px;padding:0 15px;margin:0 0 8px;border:1px solid #37383b;border-radius:28px;background:#202124;color:#c4c6cc;font-size:15px;box-sizing:border-box}
    .sfn-kb-search{font-size:24px;color:#d9dbe0;line-height:1}.sfn-kb-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sfn-kb-entry-status{font-size:9px;color:#77d957;text-shadow:0 0 8px #72e554}
    .sfn-kb-toolbar{height:42px;display:flex;align-items:center;gap:10px;padding:0 5px 8px;color:#ddd}
    .sfn-kb-mark{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#343538;color:#f5f5f5;font-size:10px;font-weight:800;letter-spacing:-.5px}
    .sfn-kb-caption{font:9px ui-monospace,monospace;letter-spacing:.08em;color:#92949a}.sfn-kb-spacer{flex:1}
    .sfn-kb-lock{font-size:11px;color:#8bd96f;padding:0 4px;text-shadow:0 0 9px #7be55d}
    .sfn-kb-tool{width:31px;height:31px;border:0;border-radius:50%;background:#343538;color:#ededf0;font-size:15px;display:grid;place-items:center}.sfn-kb-close{font-size:19px;color:#bfc1c7;background:transparent}
    .sfn-kb-rows{display:grid;gap:8px}.sfn-kb-row{display:flex;justify-content:center;gap:6px;min-height:48px}
    .sfn-kb-key{flex:1;min-width:0;max-width:58px;height:48px;border:0;border-radius:7px;background:#303135;color:#f5f5f6;box-shadow:0 1px 0 #090a0b;font:400 22px Roboto,"Arial",sans-serif;display:grid;place-items:center;padding:0 2px;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
    .sfn-kb-row-1 .sfn-kb-key,.sfn-kb-row-2 .sfn-kb-key{max-width:64px}
    .sfn-kb-key:active{background:#505157;transform:translateY(1px)}
    .sfn-kb-key.modifier{max-width:76px;flex:1.45;background:#222326;font-size:17px}
    .sfn-kb-key.punctuation{max-width:54px;font-size:19px}
    .sfn-kb-key.space{max-width:none;flex:5;font-size:14px;color:#d4d5d9}
    .sfn-kb-key.action{max-width:68px;flex:1.2;background:#222326;color:#7cdb58;font-size:22px}
    .sfn-keyboard.numeric .sfn-kb-row:not(.sfn-kb-row-4) .sfn-kb-key{max-width:110px}
    .sfn-keyboard.numeric .sfn-kb-row-4 .sfn-kb-key.space{font-size:11px}
    .sfn-kb-row-0 .sfn-kb-key{height:44px;min-height:44px;font-size:18px}
    .sfn-kb-row-3{padding:0 1px}
    .sfn-kb-row-4 .modifier{font-size:13px}
    .sfn-kb-foot{display:flex;justify-content:center;gap:7px;height:17px;align-items:end;padding-top:3px;color:#74767c;font:8px ui-monospace,monospace;letter-spacing:.07em}
    .sfn-kb-row-4:has(.action) .sfn-kb-key{height:47px}
    @media(max-width:420px){.sfn-keyboard{padding-left:8px;padding-right:8px}.sfn-kb-rows{gap:7px}.sfn-kb-row{gap:5px;min-height:45px}.sfn-kb-key{height:45px;font-size:20px}.sfn-kb-key.modifier{max-width:58px;font-size:15px}.sfn-kb-key.action{max-width:57px}.sfn-kb-entry{height:44px}.sfn-kb-toolbar{height:38px}}
    @media(prefers-reduced-motion:reduce){.sfn-keyboard{transition:none}}
    body.reduce-motion .sfn-keyboard{transition:none}
  `;
  document.head.append(style);
  document.addEventListener('pointerdown', event => {
    const path = event.composedPath?.() || [];
    if (!state.input || state.panel?.contains(event.target) || path.includes(state.panel) || event.target === state.input) return;
    close(Boolean(event.target.closest?.('#accessForm button[type="submit"], #accessForm input[type="submit"]')));
  });
  document.addEventListener('change', event => {
    if (event.target?.dataset?.sfnSkipAutoUnlock !== '1') return;
    delete event.target.dataset.sfnSkipAutoUnlock;
    event.stopImmediatePropagation();
  }, true);
  document.addEventListener('focusin', event => {
    if (state.input && event.target !== state.input && !state.panel?.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && state.input) close(); });
  let markFrame = 0;
  const scheduleMarkFields = () => {
    if (markFrame) return;
    markFrame = requestAnimationFrame(() => {
      markFrame = 0;
      markFields();
    });
  };
  new MutationObserver(records => {
    let needsScan = false;
    for (const record of records) {
      if (state.panel && (record.target === state.panel || state.panel.contains(record.target))) continue;
      needsScan = true;
      if (state.input && !state.input.isConnected) {
        close();
        break;
      }
    }
    if (needsScan) scheduleMarkFields();
  }).observe(document.body, { childList: true, subtree: true });
  markFields();
})();
