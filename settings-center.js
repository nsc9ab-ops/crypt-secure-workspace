/* Integrated Scott Nexus control center. Adapted from the supplied React UI
   so it runs inside Scott.F.N without mounting a second application. */
(() => {
  if (typeof window.appearanceView !== 'function' || typeof state !== 'object') return;

  const STORE = 'scottNexusSettingsV1';
  const ACTIVE = 'sfn-nexus-active-section';
  const defaults = {
    theme: 'emerald', eyeComfort: false, warmth: 25, highContrast: false,
    readingMode: false, interfaceScale: 100, appBrightness: 100,
    fontProfile: 'Default', nightSchedule: 'Off', appLock: false,
    biometric: false, twoFactor: false, loginAlerts: true,
    privateNotifications: true, autoLock: 'After 1 minute',
    sessionTimeout: '30 minutes', interfaceMode: 'Dark', glassOpacity: 78,
    cardDensity: 'Comfortable', radius: 18, animations: true, motionSpeed: 100,
    reduceMotion: false, haptics: false, transition: 'Fluid fade', parallax: false,
    aiSuggestions: false, cloudSync: false, autoBackup: false,
    smartNotifications: false, dataSaver: false, lowPower: false,
    backgroundRefresh: false, developerMode: false, verboseLogs: false,
    experimental: false
  };
  const sections = [
    ['overview', 'Overview', '◫'], ['eye', 'Eye care & display', '◉'],
    ['security', 'Security & privacy', '◇'], ['appearance', 'Appearance', '✦'],
    ['motion', 'Motion & effects', '◌'], ['technology', 'Advanced technology', '⌁'],
    ['system', 'System & developer', '⌘']
  ];
  const groups = {
    eye: [
      ['Eye protection profile', '◉', 'Tune visual comfort for this app.', [
        ['eyeComfort','Eye comfort overlay','Warm the interface for easier viewing.','toggle'],
        ['warmth','Warmth intensity','Adjust the interface tint.','range',0,100,'%'],
        ['highContrast','Contrast enhancement','Strengthen text and card borders.','toggle'],
        ['readingMode','Reading layout','Reduce decoration on reading surfaces.','toggle']]],
      ['Display tuning','▣','Typography and visual density.',[
        ['interfaceScale','Interface scale','Resize interface elements.','range',90,125,'%'],
        ['fontProfile','Text readability','Choose a comfortable text profile.','select',['Default','Comfort','Large','Extra large']],
        ['appBrightness','Interface brightness','Changes app styling only, not device brightness.','range',60,120,'%'],
        ['nightSchedule','Night schedule','Saved as a local preference.','select',['Off','Sunset to sunrise','20:00 – 06:00','22:00 – 07:00']]]]
    ],
    security: [
      ['Authentication','◇','Account access preferences.',[
        ['appLock','Require app lock','Use the app password, PIN, or pattern controls below.','toggle'],
        ['biometric','Biometric / passkey sign-in','Configure a supported passkey using the setup action below.','toggle'],
        ['twoFactor','Two-factor authentication','Preference only; no second-factor service is connected.','toggle'],
        ['loginAlerts','Login alerts','Preference only; remote login alerts need a backend.','toggle']]],
      ['Privacy controls','⬡','Local session and notification preferences.',[
        ['privateNotifications','Private notifications','Preference only; app notifications are not currently delivered.','toggle'],
        ['autoLock','Auto-lock preference','Choose the desired inactivity timeout.','select',['Immediately','After 1 minute','After 5 minutes','After 15 minutes','Never']],
        ['sessionTimeout','Session timeout','Local preference; session enforcement requires auth integration.','select',['15 minutes','30 minutes','1 hour','12 hours']]]]
    ],
    appearance: [
      ['Colour atmosphere','✦','Choose the visual identity.',[
        ['interfaceMode','Interface mode','Dark is the active app appearance.','select',['Dark','Light (planned)','System (planned)']],
        ['glassOpacity','Glass surface intensity','Adjust the card surface effect.','range',55,95,'%'],
        ['radius','Corner radius','Adjust card roundness.','range',8,30,'px']]],
      ['Layout preferences','⌗','Shape your control center.',[
        ['cardDensity','Card density','Choose spacing between controls.','select',['Comfortable','Compact','Spacious']]]]
    ],
    motion: [
      ['Motion engine','◌','Animation behavior and accessibility.',[
        ['animations','Interface animations','Enable interface transitions.','toggle'],
        ['motionSpeed','Animation speed','Adjust transition speed.','range',0,200,'%'],
        ['reduceMotion','Reduce motion','Minimize interface animation.','toggle'],
        ['haptics','Haptic feedback preference','Preference; browser haptics vary by device.','toggle']]],
      ['Transition style','✧','Choose a navigation feel.',[
        ['transition','Page transition','Select a transition preset.','select',['Fluid fade','Slide up','Soft scale','Instant']],
        ['parallax','Parallax effects','Enable decorative depth effects.','toggle']]]
    ],
    technology: [
      ['Intelligent services','⌁','Automation and synchronization preferences.',[
        ['aiSuggestions','AI recommendations','Local preference; no AI service is connected.','toggle'],
        ['cloudSync','Cloud synchronization','Requires authenticated cloud storage.','toggle'],
        ['autoBackup','Automatic backup','Requires a secure backup service.','toggle'],
        ['smartNotifications','Smart notifications','Requires notification service setup.','toggle']]],
      ['Performance preferences','◈','Desired system behavior.',[
        ['dataSaver','Data saver preference','Use fewer optional visual effects.','toggle'],
        ['lowPower','Low-power preference','Reduce optional animations and effects.','toggle'],
        ['backgroundRefresh','Background refresh','Requires service worker or native support.','toggle']]]
    ],
    system: [
      ['Developer preferences','⌘','Advanced local interface options.',[
        ['developerMode','Developer mode','Reveal development-only interface hints.','toggle'],
        ['verboseLogs','Verbose UI diagnostics','Local preference only; no diagnostic upload.','toggle'],
        ['experimental','Experimental features','Opt-in preference for future features.','toggle']]]
    ]
  };

  function read() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORE) || '{}') }; }
    catch { return { ...defaults }; }
  }
  function write(settings) {
    try { localStorage.setItem(STORE, JSON.stringify(settings)); } catch {}
  }
  function escText(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function icon(title, glyph) { return '<div class="nxc-icon" aria-hidden="true">'+glyph+'</div>'; }
  function control(item, settings) {
    const [key,label,hint,type,min,max,unit] = item;
    let input = '';
    if (type === 'toggle') input = '<button type="button" class="nxc-switch '+(settings[key]?'on':'')+'" role="switch" aria-checked="'+!!settings[key]+'" aria-label="'+escText(label)+'" data-nxc-toggle="'+key+'"><i></i></button>';
    else if (type === 'range') input = '<label class="nxc-range"><input type="range" min="'+min+'" max="'+max+'" value="'+Number(settings[key])+'" data-nxc-setting="'+key+'"><b>'+Number(settings[key])+escText(unit)+'</b></label>';
    else input = '<select data-nxc-setting="'+key+'" aria-label="'+escText(label)+'">'+min.map(option=>'<option '+(settings[key]===option?'selected':'')+'>'+escText(option)+'</option>').join('')+'</select>';
    return '<div class="nxc-row"><div class="nxc-copy"><strong>'+escText(label)+'</strong><small>'+escText(hint)+'</small></div>'+input+'</div>';
  }
  function card(group, settings) {
    return '<article class="nxc-card"><header class="nxc-card-head">'+icon(group[0],group[1])+'<div><h3>'+escText(group[0])+'</h3><p>'+escText(group[2])+'</p></div></header>'+group[3].map(item=>control(item,settings)).join('')+'</article>';
  }
  function overview(settings) {
    const changed = Object.keys(defaults).filter(key=>settings[key]!==defaults[key]).length;
    return '<section class="nxc-section"><div class="nxc-section-title"><h2>System overview</h2><p>Your key controls, organized in one place.</p></div><div class="nxc-card-grid">'+
      '<article class="nxc-card"><header class="nxc-card-head">'+icon('Visual comfort','◉')+'<div><h3>Visual comfort</h3><p>Make the interface easier on your eyes.</p></div></header>'+control(['eyeComfort','Eye comfort mode','Warm visual treatment for this app.','toggle'],settings)+control(['reduceMotion','Reduce motion','Minimize interface animation.','toggle'],settings)+'<button class="nxc-link" data-nxc-go="eye">Open eye-care controls ↗</button></article>'+
      '<article class="nxc-card"><header class="nxc-card-head">'+icon('Privacy snapshot','◇')+'<div><h3>Privacy snapshot</h3><p>Review account and device safeguards.</p></div></header><div class="nxc-status"><span>Workspace lock</span><b>'+(window.sfnNative?.isEnrolled?.()?'Enabled':'Local password')+'</b></div><div class="nxc-status"><span>Saved locally</span><b>On this device</b></div><button class="nxc-link" data-nxc-go="security">Review security ↗</button></article>'+
      '<article class="nxc-card nxc-wide"><header class="nxc-card-head">'+icon('Quick appearance','✦')+'<div><h3>Quick appearance</h3><p>Apply an accent colour across Scott.F.N.</p></div></header><div class="nxc-themes">'+[['cyan','Arctic cyan','#63dcff'],['violet','Quantum violet','#ad8bff'],['emerald','Neon emerald','#65f2c1']].map(([id,label,color])=>'<button type="button" class="nxc-theme '+(settings.theme===id?'selected':'')+'" data-nxc-theme="'+id+'"><i style="--swatch:'+color+'"></i>'+label+'</button>').join('')+'</div></article>'+
      '</div><div class="nxc-overview-foot"><span>Preferences changed</span><b>'+changed+'</b><span>Saved on this device</span></div></section>';
  }
  function systemPanel(settings) {
    return '<section class="nxc-section"><div class="nxc-section-title"><h2>System & developer</h2><p>Diagnostics, preferences and local data management.</p></div><div class="nxc-card-grid">'+groups.system.map(g=>card(g,settings)).join('')+
      '<article class="nxc-card"><header class="nxc-card-head">'+icon('Environment','▣')+'<div><h3>Environment</h3><p>Browser and runtime information.</p></div></header><div class="nxc-status"><span>Platform</span><b>'+escText(navigator.userAgentData?.platform||navigator.platform||'Browser')+'</b></div><div class="nxc-status"><span>Language</span><b>'+escText(navigator.language)+'</b></div><div class="nxc-status"><span>Network</span><b>'+(navigator.onLine?'Online':'Offline')+'</b></div><div class="nxc-action-row"><button class="nxc-action" data-nxc-action="export">Export preferences</button><label class="nxc-action">Import preferences<input type="file" accept="application/json" data-nxc-import hidden></label></div></article>'+
      '<article class="nxc-card nxc-wide"><header class="nxc-card-head">'+icon('Data & reset','▤')+'<div><h3>Data & reset</h3><p>Manage locally stored interface preferences.</p></div></header><div class="nxc-status"><span>Restore defaults</span><button class="nxc-action danger" data-nxc-action="reset">Reset settings</button></div><div class="nxc-status"><span>Clear all local app data</span><button class="nxc-action danger" data-action="clear-all">Clear app data</button></div><p class="nxc-note">Only non-sensitive interface preferences are stored here. Passwords, tokens, private keys, and recovery codes remain in the app’s protected flows.</p></article></div></section>';
  }

  const originalAppearance = appearanceView;
  appearanceView = function () {
    const settings = read();
    const active = sections.some(s=>s[0]===localStorage.getItem(ACTIVE))?localStorage.getItem(ACTIVE):'overview';
    const current = sections.find(s=>s[0]===active)||sections[0];
    const nav = sections.map(s=>'<button type="button" class="nxc-nav '+(s[0]===active?'active':'')+'" role="tab" aria-selected="'+(s[0]===active)+'" data-nxc-go="'+s[0]+'"><i>'+s[2]+'</i><span>'+escText(s[1])+'</span></button>').join('');
    const body = active==='overview' ? overview(settings) : active==='system' ? systemPanel(settings) : '<section class="nxc-section"><div class="nxc-section-title"><h2>'+escText(current[1])+'</h2><p>Configure your preferences. Changes are saved locally in this browser.</p></div><div class="nxc-card-grid">'+(groups[active]||[]).map(g=>card(g,settings)).join('')+(active==='appearance'?'<article class="nxc-card nxc-wide"><header class="nxc-card-head">'+icon('App appearance','✦')+'<div><h3>Scott.F.N appearance</h3><p>Existing workspace controls, connected to the app.</p></div></header>'+legacyControls(settings)+'</article>':'')+(active==='security'?'<article class="nxc-card nxc-wide"><header class="nxc-card-head">'+icon('Secure access','◇')+'<div><h3>Secure access setup</h3><p>Configure the app’s supported local authentication features.</p></div></header>'+securityActions()+'</article>':'')+(active==='technology'?'<article class="nxc-card nxc-wide"><p class="nxc-note">AI suggestions, cloud sync, backup, smart notifications, and background refresh are saved preferences. They need connected services before they can run.</p></article>':'')+'</div></section>';
    return '<div class="nxc-root"><section class="nxc-hero"><div><div class="nxc-kicker">PERSONAL SYSTEM CONFIGURATION</div><h2>'+(active==='overview'?'Control your digital space.':escText(current[1])+'.')+'</h2><p>One command center for visual comfort, privacy, personalization and intelligent system preferences.</p></div><span class="nxc-ready"><i></i> ALL SYSTEMS READY</span></section><div class="nxc-stats"><div><small>DISPLAY PROFILE</small><b>'+(settings.eyeComfort?'Eye comfort':'Adaptive')+'</b><em>Personalizable</em></div><div><small>SECURITY PROFILE</small><b>'+(window.sfnNative?.isEnrolled?.()?'Protected':'Local')+'</b><em>Device controls</em></div><div><small>INTERFACE THEME</small><b>'+(settings.theme==='cyan'?'Arctic cyan':settings.theme==='violet'?'Quantum violet':'Neon emerald')+'</b><em>Saved locally</em></div><div><small>CHANGED SETTINGS</small><b>'+Object.keys(defaults).filter(k=>settings[k]!==defaults[k]).length+'</b><em>This device</em></div></div><nav class="nxc-tabs" role="tablist" aria-label="Settings sections">'+nav+'</nav><div class="nxc-content">'+body+'</div><footer class="nxc-footer">SCOTT.F.N <i>•</i> CONTROL CENTER <i>•</i> LOCAL PREFERENCES</footer></div>';
  };

  function legacyControls(settings) {
    const safe = value => escText(value);
    return '<label class="nxc-row"><span class="nxc-copy"><strong>Wallpaper scene</strong><small>Choose the workspace atmosphere.</small></span><select id="wallPick"><option value="aurora" '+(state.wall==='aurora'?'selected':'')+'>Aurora green</option><option value="violet" '+(state.wall==='violet'?'selected':'')+'>Violet dusk</option><option value="ocean" '+(state.wall==='ocean'?'selected':'')+'>Deep ocean</option><option value="midnight" '+(state.wall==='midnight'?'selected':'')+'>Midnight</option></select></label><div class="nxc-row"><span class="nxc-copy"><strong>Custom wallpaper</strong><small>Choose an image on this device.</small></span><button class="nxc-action" data-action="wall-upload">Choose image</button></div><label class="nxc-row"><span class="nxc-copy"><strong>Accent color</strong><small>Set the app highlight colour.</small></span><input id="accentPick" type="color" value="'+safe(state.accent)+'"></label><label class="nxc-row"><span class="nxc-copy"><strong>Interface scale</strong><small>Resize the app interface.</small></span><input id="scalePick" type="range" min="90" max="115" value="'+Number(state.scale||100)+'"></label><label class="nxc-row"><span class="nxc-copy"><strong>Light appearance</strong><small>Use the light workspace palette.</small></span><input id="lightPick" type="checkbox" '+(state.light?'checked':'')+'></label><label class="nxc-row"><span class="nxc-copy"><strong>Eye care tint</strong><small>Apply a gentle warm overlay.</small></span><input id="eyeCarePick" type="checkbox" '+(state.eyeCare||settings.eyeComfort?'checked':'')+'></label><label class="nxc-row"><span class="nxc-copy"><strong>High contrast</strong><small>Improve control and text contrast.</small></span><input id="contrastPick" type="checkbox" '+(state.highContrast||settings.highContrast?'checked':'')+'></label><label class="nxc-row"><span class="nxc-copy"><strong>Reduce motion</strong><small>Turn off decorative transitions.</small></span><input id="motionPick" type="checkbox" '+(state.reduceMotion||settings.reduceMotion?'checked':'')+'></label><label class="nxc-row"><span class="nxc-copy"><strong>Larger touch targets</strong><small>Make controls easier to tap.</small></span><input id="targetsPick" type="checkbox" '+(state.largeTargets?'checked':'')+'></label><div class="nxc-row"><span class="nxc-copy"><strong>Call and message sounds</strong><small>Choose and preview alert tones.</small></span><button class="nxc-action" data-action="navigate" data-view="ringtones">Open ringtone studio</button></div><div class="nxc-row"><span class="nxc-copy"><strong>Compact layout</strong><small>Adjust workspace spacing.</small></span><button class="nxc-action" data-action="toggle-compact">'+(state.compact?'Use spacious':'Use compact')+'</button></div>';
  }
  function securityActions() {
    const nav = [...document.querySelectorAll('#railnav .navbtn[data-view]')];
    const moves = nav.map((button,index)=>'<div class="nxc-status"><span>'+escText(button.title||button.dataset.view)+'</span><button class="nxc-mini" data-nav-move="'+escText(button.dataset.view)+'" data-direction="-1" '+(index===0?'disabled':'')+'>↑</button><button class="nxc-mini" data-nav-move="'+escText(button.dataset.view)+'" data-direction="1" '+(index===nav.length-1?'disabled':'')+'>↓</button></div>').join('');
    return '<div class="nxc-action-row"><button class="nxc-action" data-action="setup-biometric">Set up web passkey</button><button class="nxc-action" data-action="setup-native-biometric">Set up app biometrics</button><button class="nxc-action" data-action="setup-pin">Set up quick PIN</button><button class="nxc-action" data-action="setup-pattern">Set up unlock pattern</button></div><p class="nxc-note">Biometric, PIN, and pattern actions use Scott.F.N’s existing authentication flows. Other security switches are preferences and do not claim to enable server-side protection.</p><h3 class="nxc-subhead">Navigation order</h3>'+moves+'<button class="nxc-action" data-action="reset-nav">Reset navigation order</button>';
  }

  function syncAppearance(settings) {
    document.body.dataset.theme = settings.theme;
    document.body.classList.toggle('warm-mode', !!settings.eyeComfort || !!state.eyeCare);
    document.body.classList.toggle('high-contrast', !!settings.highContrast || !!state.highContrast);
    document.body.classList.toggle('reduce-motion', !!settings.reduceMotion || !settings.animations || !!state.reduceMotion);
    document.body.classList.toggle('reading-mode', !!settings.readingMode);
    document.body.classList.toggle('low-power-mode', !!settings.lowPower || !!settings.dataSaver);
    document.documentElement.style.setProperty('--nxc-glass-blur', Math.round(settings.glassOpacity/5)+'px');
    document.documentElement.style.setProperty('--nxc-radius', settings.radius+'px');
    document.documentElement.style.setProperty('--nxc-motion', String(settings.motionSpeed/100));
    document.documentElement.style.setProperty('--nxc-brightness', String(settings.appBrightness/100));
    const font = settings.fontProfile==='Extra large'?1.25:settings.fontProfile==='Large'?1.15:settings.fontProfile==='Comfort'?1.08:1;
    document.documentElement.style.setProperty('--nxc-font-scale', String(font));
    const zoom = Number(settings.interfaceScale)||100;
    state.scale = Math.min(115, Math.max(90, zoom));
    if (settings.theme==='cyan') state.accent='#63dcff';
    else if (settings.theme==='violet') state.accent='#ad8bff';
    else state.accent='#65f2c1';
    if (typeof applyStyle==='function') applyStyle();
  }
  function update(key, value) {
    const settings = read();
    settings[key] = value;
    if (key==='eyeComfort') state.eyeCare=!!value;
    if (key==='highContrast') state.highContrast=!!value;
    if (key==='reduceMotion') state.reduceMotion=!!value;
    if (key==='interfaceScale') state.scale=Math.min(115,Number(value)||100);
    if (key==='fontProfile') state.textSize=value==='Extra large'?125:value==='Large'?115:value==='Comfort'?108:100;
    write(settings);
    syncAppearance(settings);
  }

  const style = document.createElement('style');
  style.textContent = `
    .nxc-root{--nxc-cyan:#63dcff;--nxc-violet:#ad8bff;--nxc-green:#65f2c1;--nxc-muted:#8fa4a8;--nxc-line:#52707835;--nxc-panel:#0c1b20;display:grid;gap:14px;min-width:0;font-size:calc(1em * var(--nxc-font-scale,1));filter:brightness(var(--nxc-brightness,1))}
    .nxc-hero{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;padding:23px;border:1px solid #35a98366;border-radius:22px;background:radial-gradient(ellipse at 85% 0,#13a97028,transparent 50%),linear-gradient(130deg,#0b2520,#0c1a20 70%);box-shadow:0 14px 45px #0003}
    .nxc-kicker{font:700 9px var(--mono);letter-spacing:2px;color:var(--mint)}.nxc-hero h2{font-size:clamp(21px,3vw,30px);margin:8px 0 5px;letter-spacing:-.7px}.nxc-hero p{margin:0;max-width:610px;color:#9ab4b2;font-size:11px;line-height:1.6}.nxc-ready{white-space:nowrap;border:1px solid #65f2c155;border-radius:30px;padding:9px 12px;color:#85f4c9;background:#65f2c10c;font:700 9px var(--mono)}.nxc-ready i{display:inline-block;width:7px;height:7px;margin-right:6px;border-radius:50%;background:#65f2c1;box-shadow:0 0 9px #65f2c1}
    .nxc-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.nxc-stats>div{display:grid;gap:5px;padding:12px 14px;border:1px solid var(--line);border-radius:15px;background:linear-gradient(140deg,#102522,#0d1a20)}.nxc-stats small{font:8px var(--mono);letter-spacing:.8px;color:#8ea3a5}.nxc-stats b{font-size:16px;color:#eafff6}.nxc-stats em{font-style:normal;font-size:9px;color:#77cba8}
    .nxc-tabs{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:7px;padding:10px;border:1px solid #38d9bb55;border-radius:19px;background:linear-gradient(120deg,#06161b,#0a2522 55%,#091627);box-shadow:inset 0 0 24px #32e2c00a,0 10px 32px #0004}.nxc-nav{display:flex;min-width:0;min-height:64px;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:7px 3px;border:1px solid transparent;border-radius:14px;background:transparent;color:#93b9b6;cursor:pointer;transition:all calc(.18s * var(--nxc-motion,1)) ease}.nxc-nav i{display:grid;place-items:center;width:42px;height:30px;border:1px solid #45e8c599;border-radius:24px 24px 10px 10px;background:linear-gradient(180deg,#143e3c,#071923);color:#a4ffe9;font:18px var(--mono);font-style:normal;box-shadow:0 0 11px #35edc622}.nxc-nav span{text-align:center;font:700 8px var(--mono);line-height:1.2}.nxc-nav:hover,.nxc-nav.active{color:#effff9;background:linear-gradient(155deg,#123b34,#0b252d);border-color:#53edc377;box-shadow:0 0 18px #30e9c01c;transform:translateY(-1px)}.nxc-nav.active i{border-color:#a4ffe9;box-shadow:0 0 18px #39f9ce66,inset 0 0 12px #61ffdc33}
    .nxc-section{animation:nxc-arrive calc(.22s * var(--nxc-motion,1)) ease both}.nxc-section-title{margin:2px 0 14px}.nxc-section-title h2{font-size:19px;margin:0 0 4px}.nxc-section-title p{font-size:10px;color:#8fa4a8;margin:0}.nxc-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.nxc-card{min-width:0;padding:16px;border:1px solid #28534a;border-radius:var(--nxc-radius,18px);background:linear-gradient(145deg,#0f211f,#0b191e);backdrop-filter:blur(var(--nxc-glass-blur,15px));box-shadow:0 8px 25px #0002}.nxc-card.nxc-wide{grid-column:1/-1}.nxc-card-head{display:flex;align-items:center;gap:10px;margin:0 0 9px}.nxc-card-head h3{font-size:12px;margin:0 0 4px}.nxc-card-head p{font-size:9px;line-height:1.4;color:#839b9a;margin:0}.nxc-icon{width:35px;height:35px;flex:0 0 35px;display:grid;place-items:center;border:1px solid #397d63;border-radius:12px;background:#15362a;color:#70f4c4;font-size:16px}.nxc-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid #52707820}.nxc-copy{display:block;min-width:0;flex:1}.nxc-copy strong{display:block;font-size:10px;font-weight:650}.nxc-copy small{display:block;margin-top:3px;color:#91a6a7;font-size:8px;line-height:1.45}.nxc-row select{width:auto;max-width:45%;min-width:115px;padding:7px 8px;border:1px solid #294044;border-radius:9px;background:#102126;color:var(--text);font-size:9px}.nxc-row input[type=color]{width:40px;height:30px;border:1px solid #294044;border-radius:8px;background:#0a1818}.nxc-row input[type=checkbox]{width:19px;height:19px;accent-color:#65f2c1}.nxc-switch{position:relative;width:42px;height:24px;flex:0 0 42px;border:0;border-radius:30px;background:#30394b;padding:0;cursor:pointer}.nxc-switch i{position:absolute;left:4px;top:4px;width:16px;height:16px;border-radius:50%;background:#aab5c7;transition:transform .18s}.nxc-switch.on{background:linear-gradient(90deg,#65f2c1,#63dcff)}.nxc-switch.on i{transform:translateX(18px);background:#07111b}.nxc-range{width:43%;min-width:110px;display:flex;align-items:center;gap:8px}.nxc-range input{width:100%;accent-color:#65f2c1}.nxc-range b{min-width:34px;text-align:right;color:#65f2c1;font:9px var(--mono)}.nxc-link{display:inline-flex;gap:6px;margin-top:9px;padding:7px 0;border:0;background:transparent;color:#7bead0;font-size:9px;font-weight:700;cursor:pointer}.nxc-status{display:flex;align-items:center;gap:7px;min-height:35px;padding:7px 0;border-top:1px solid #52707820;font-size:9px}.nxc-status>span{flex:1;color:#bed0ce}.nxc-status>b{color:#65f2c1;font-size:9px}.nxc-mini{width:29px;height:28px;border:1px solid #2b4649;border-radius:8px;background:#132529;color:#bde9df}.nxc-action{display:inline-flex;align-items:center;justify-content:center;min-height:35px;padding:8px 10px;border:1px solid #2b6252;border-radius:10px;background:#102a22;color:#aaffd7;font-size:9px;font-weight:700;cursor:pointer}.nxc-action.danger{color:#ffb2b3;border-color:#5d3438;background:#2a171a}.nxc-action-row{display:flex;flex-wrap:wrap;gap:8px;padding:10px 0}.nxc-themes{display:flex;gap:8px;flex-wrap:wrap}.nxc-theme{display:inline-flex;align-items:center;gap:8px;min-height:37px;padding:8px 11px;border:1px solid #294044;border-radius:11px;background:#0d1d21;color:#dcebe7;font-size:9px;cursor:pointer}.nxc-theme.selected{border-color:#65f2c1;box-shadow:0 0 0 2px #65f2c11b}.nxc-theme i{width:10px;height:10px;border-radius:50%;background:var(--swatch);box-shadow:0 0 8px var(--swatch)}.nxc-note{margin:9px 0;padding:11px;border:1px solid #4a4028;border-radius:10px;background:#201d14;color:#d8c99d;font-size:9px;line-height:1.55}.nxc-subhead{margin:14px 0 5px;font-size:10px}.nxc-overview-foot{display:flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid var(--line);border-radius:12px;background:#0c1b20;color:#9db5b0;font-size:9px}.nxc-overview-foot b{color:#65f2c1;font-size:15px}.nxc-footer{text-align:center;padding:8px 0 2px;color:#71888a;font:8px var(--mono);letter-spacing:1.4px}.nxc-footer i{color:#65f2c1;font-style:normal;padding:0 5px}.nxc-root .nxc-switch,.nxc-root button,.nxc-root select,.nxc-root input{touch-action:manipulation}.nxc-root .nxc-switch:focus-visible,.nxc-root button:focus-visible,.nxc-root select:focus-visible,.nxc-root input:focus-visible{outline:2px solid #65f2c1;outline-offset:2px}.reading-mode .nxc-root .nxc-card{background:#101b1b;backdrop-filter:none}.low-power-mode .nxc-root .nxc-card{backdrop-filter:none}.reduce-motion .nxc-root *{animation-duration:.001ms!important;transition-duration:.001ms!important}
    @keyframes nxc-arrive{from{opacity:.6;transform:translateY(4px)}to{opacity:1;transform:none}}@media(max-width:980px){.nxc-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.nxc-nav span{font-size:7px}}@media(max-width:700px){.nxc-hero{align-items:flex-start;flex-direction:column;padding:17px}.nxc-ready{font-size:8px}.nxc-tabs{grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;padding:7px}.nxc-nav{min-height:58px}.nxc-nav i{width:37px;height:27px}.nxc-card-grid{grid-template-columns:1fr}.nxc-card.nxc-wide{grid-column:auto}.nxc-card{padding:13px}.nxc-stats>div{padding:10px}.nxc-stats b{font-size:14px}}@media(max-width:390px){.nxc-stats{gap:6px}.nxc-stats small{font-size:7px}.nxc-row{gap:7px}.nxc-copy strong{font-size:9px}.nxc-copy small{font-size:8px}.nxc-tabs{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(prefers-reduced-motion:reduce){.nxc-section,.nxc-nav{animation:none!important;transition:none!important}}
  `;
  document.head.append(style);

  document.addEventListener('click', event => {
    const go = event.target.closest('[data-nxc-go]');
    if (go) { localStorage.setItem(ACTIVE, go.dataset.nxcGo); if (state.view!=='appearance') { navigate('appearance'); return; } render(); return; }
    const toggle = event.target.closest('[data-nxc-toggle]');
    if (toggle) { const key=toggle.dataset.nxcToggle; update(key,!read()[key]); render(); return; }
    const theme = event.target.closest('[data-nxc-theme]');
    if (theme) { update('theme',theme.dataset.nxcTheme); render(); return; }
    const action = event.target.closest('[data-nxc-action]')?.dataset.nxcAction;
    if (action==='export') { const blob=new Blob([JSON.stringify(read(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='scott-nexus-preferences.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);toast('Preferences exported.'); }
    if (action==='reset' && confirm('Restore Scott Nexus preferences to defaults?')) { write({ ...defaults });syncAppearance(defaults);render();toast('Preferences restored.'); }
  });
  document.addEventListener('input', event => {
    const key=event.target.dataset.nxcSetting;
    if (!key) return;
    const value=event.target.type==='range'?Number(event.target.value):event.target.value;
    update(key,value);
    const output=event.target.parentElement.querySelector('b');if(output)output.textContent=value+(event.target.type==='range'?(key==='radius'?'px':'%'):'');
  });
  document.addEventListener('change', event => {
    const key=event.target.dataset.nxcSetting;
    if (key) { update(key,event.target.type==='range'?Number(event.target.value):event.target.value);return; }
    if (event.target.id==='scalePick') { update('interfaceScale',Number(event.target.value)); return; }
    if (event.target.id==='eyeCarePick') { update('eyeComfort',!!event.target.checked); return; }
    if (event.target.id==='contrastPick') { update('highContrast',!!event.target.checked); return; }
    if (event.target.id==='motionPick') { update('reduceMotion',!!event.target.checked); return; }
    if (event.target.matches('[data-nxc-import]')) {
      const file=event.target.files?.[0];if(!file)return;
      file.text().then(text=>{const incoming=JSON.parse(text);const safe=Object.fromEntries(Object.keys(defaults).filter(k=>k in incoming).map(k=>[k,incoming[k]]));const settings={...defaults,...safe};write(settings);syncAppearance(settings);render();toast('Preferences imported.');}).catch(()=>toast('Invalid preferences file.')).finally(()=>{event.target.value='';});
    }
  });
  document.addEventListener('sfn:render', () => { if(state.view==='appearance') syncAppearance(read()); });
  syncAppearance(read());
  if (typeof originalAppearance === 'function') void originalAppearance;
})();
