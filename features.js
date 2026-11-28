/* Scott.F.N local document scanner and original ringtone studio. */
(() => {
  const encoder = new TextEncoder();
  const ringtoneFiles = new Map();
  let scanStream = null;
  let scanPages = [];

  views.pdfscan = 'PDF Scan';
  views.ringtones = 'Ringtones';
  views.arcade = 'Cyber Arcade';

  const nav = document.querySelector('#sfnBottomNav');
  // Keep the bottom bar focused on core navigation. Tools and games live in
  // the authenticated LIFEKEEP workspace instead of taking permanent slots.
  nav?.querySelector('[data-page="inventory"]')?.remove();
  nav?.querySelector('[data-page="messages"]')?.remove();

  function installFuturisticClock() {
    const actions = document.querySelector('.top-actions');
    if (!actions || document.querySelector('#sfnFuturisticClock')) return;
    const clock = document.createElement('section');
    clock.id = 'sfnFuturisticClock';
    clock.className = 'sfn-clock-widget';
    clock.setAttribute('aria-label', 'Current time and date');
    clock.innerHTML = '<div class="sfn-clock-face" aria-hidden="true"><div class="sfn-clock-ticks"></div><span class="sfn-clock-hand sfn-hour"></span><span class="sfn-clock-hand sfn-minute"></span><span class="sfn-clock-hand sfn-second"></span><i class="sfn-clock-pin"></i></div><div class="sfn-clock-readout"><strong class="sfn-clock-time">--:--:--</strong><span class="sfn-clock-date">Loading date</span></div>';
    const ticks = clock.querySelector('.sfn-clock-ticks');
    for (let index = 0; index < 12; index += 1) {
      const tick = document.createElement('b');
      tick.style.transform = `rotate(${index * 30}deg)`;
      ticks.appendChild(tick);
    }
    actions.prepend(clock);
    const hour = clock.querySelector('.sfn-hour');
    const minute = clock.querySelector('.sfn-minute');
    const second = clock.querySelector('.sfn-second');
    const timeReadout = clock.querySelector('.sfn-clock-time');
    const dateReadout = clock.querySelector('.sfn-clock-date');
    const update = () => {
      const now = new Date();
      const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;
      hour.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
      minute.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
      second.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
      timeReadout.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      dateReadout.textContent = now.toLocaleDateString([], {weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'}).toUpperCase();
    };
    update();
    clock._sfnTimer = window.setInterval(update, 250);
  }

  installFuturisticClock();
  const clockStyle = document.createElement('style');
  clockStyle.textContent = '.sfn-clock-widget{display:flex;align-items:center;gap:8px;margin-right:4px;padding:5px 9px 5px 5px;border:1px solid #168d61;border-radius:14px;background:linear-gradient(145deg,#061f18,#03110e);box-shadow:0 0 18px #00ff6230,inset 0 0 12px #00ff6212}.sfn-clock-face{position:relative;width:34px;height:34px;border:1px solid #50f0b4;border-radius:50%;background:radial-gradient(circle,#123e30 0 44%,#061712 45%);box-shadow:0 0 10px #21e69466}.sfn-clock-ticks,.sfn-clock-ticks b{position:absolute;inset:0}.sfn-clock-ticks b:after{content:"";position:absolute;left:50%;top:2px;width:1px;height:4px;background:#96ffda;transform:translateX(-50%);transform-origin:50% 15px}.sfn-clock-hand{position:absolute;left:50%;bottom:50%;width:1px;border-radius:2px;transform-origin:50% 100%;transform:translateX(-50%) rotate(0deg)}.sfn-hour{height:9px;width:3px;background:#d6fff0}.sfn-minute{height:13px;width:2px;background:#6dffc2}.sfn-second{height:14px;background:#ffcf67;box-shadow:0 0 5px #ffcf67}.sfn-clock-pin{position:absolute;left:50%;top:50%;width:4px;height:4px;border-radius:50%;background:#fff;transform:translate(-50%,-50%);box-shadow:0 0 5px #fff}.sfn-clock-readout{display:grid;gap:2px;min-width:84px}.sfn-clock-time{font:700 10px var(--mono);letter-spacing:.08em;color:#d4ffed;white-space:nowrap}.sfn-clock-date{font:8px var(--mono);letter-spacing:.06em;color:#6fe6b4;white-space:nowrap}.sfn-clock-widget:hover{border-color:#55ffc0;box-shadow:0 0 24px #00ff6255,inset 0 0 12px #00ff6220}@media(max-width:760px){.sfn-clock-widget{padding:4px;margin-right:0}.sfn-clock-readout{display:none}.sfn-clock-face{width:32px;height:32px}}';
  document.head.appendChild(clockStyle);

  const rail = document.querySelector('#railnav');
  if (rail && !rail.querySelector('[data-view="ringtones"]')) {
    const button = document.createElement('button');
    button.className = 'navbtn'; button.dataset.action = 'navigate'; button.dataset.view = 'ringtones';
    button.title = 'Ringtones'; button.setAttribute('aria-label', 'Ringtones');
    button.innerHTML = '<span class="glyph">♫</span>';
    rail.insertBefore(button, rail.querySelector('[data-view="appearance"]') || null);
  }

  if (rail && !rail.querySelector('[data-view="arcade"]')) {
    const button = document.createElement('button');
    button.className = 'navbtn'; button.dataset.action = 'navigate'; button.dataset.view = 'arcade';
    button.title = 'Cyber Arcade'; button.setAttribute('aria-label', 'Cyber Arcade');
    button.innerHTML = '<span class="glyph">✦</span>';
    rail.insertBefore(button, rail.querySelector('[data-view="appearance"]') || null);
  }

  function installArcadeBottomNav() {
    if (!nav || nav.querySelector('[data-page="arcade"]')) return;
    const button = document.createElement('button');
    button.className = 'sfn-nav-item'; button.dataset.page = 'arcade'; button.type = 'button';
    button.setAttribute('aria-label', 'Cyber Arcade');
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12a4 4 0 0 1 3.8 5l-1 3a2 2 0 0 1-3.2 1l-2.3-1.8H8.7L6.4 17a2 2 0 0 1-3.2-1l-1-3A4 4 0 0 1 6 8Z"></path><path d="M7 11v4M5 13h4M16 12h.01M19 14h.01"></path></svg><span>Arcade</span>';
    const cycle = nav.querySelector('[data-page="cycle"]');
    (cycle || nav.querySelector('[data-page="calendar"]'))?.after(button);
    button.addEventListener('click', () => window.dispatchEvent(new CustomEvent('sfn:navigate', {detail:{page:'arcade'}})));
  }
  installArcadeBottomNav();

  function addHomeShortcut() {
    const grid = document.querySelector('.home-quickgrid');
    if (grid && !grid.querySelector('[data-feature="ringtones"]')) {
      grid.insertAdjacentHTML('beforeend', '<button class="quick home-quick" data-feature="ringtones"><span class="quickglyph">♫</span><span><strong>Ringtones</strong><small>Preview and save ten original tones</small></span></button>');
    }
    if (grid && !grid.querySelector('[data-feature="arcade"]')) {
      grid.insertAdjacentHTML('beforeend', '<button class="quick home-quick" data-feature="arcade"><span class="quickglyph">✦</span><span><strong>Cyber Arcade</strong><small>Play Cyber Serpent and Void Interceptor</small></span></button>');
    }
  }

  function addWorkspaceTools() {
    const panel = document.querySelector('#panel');
    if (state.view !== 'lifekeep' || !panel || panel.querySelector('.workspace-tools')) return;
    panel.querySelectorAll('.quick').forEach(item => {
      if (item.querySelector('strong')?.textContent.trim() === 'Smart shopping') item.remove();
    });
    const section = document.createElement('section');
    section.className = 'workspace-tools';
    section.innerHTML = '<div class="side-title">Workspace tools & games</div><div class="quickgrid">' +
      '<button class="quick" data-action="navigate:inventory"><span class="quickglyph">▤</span><strong>Inventory</strong><small>Track household stock and essentials</small></button>' +
      '<button class="quick" data-action="navigate:pdfscan"><span class="quickglyph">▧</span><strong>PDF Scanner</strong><small>Capture pages and save a PDF locally</small></button>' +
      '<a class="quick" href="./games/kenya-highway-pro.html"><span class="quickglyph">🚛</span><strong>Kenya Highway PRO</strong><small>Realistic truck driving and tilt controls</small></a>' +
      '<a class="quick" href="./games/nexus-v-quantum-party-matrix.html"><span class="quickglyph">⚛</span><strong>NEXUS-V Party Matrix</strong><small>Quantum word and party game</small></a>' +
      '<button class="quick" data-feature="arcade"><span class="quickglyph">✦</span><strong>Cyber Arcade</strong><small>Play Cyber Serpent and Void Interceptor</small></button>' +
      '</div>';
    panel.appendChild(section);
  }

  const oldRender = render;
  render = function () {
    oldRender();
    if (state.view === 'pdfscan') { document.querySelector('#panel').innerHTML = pdfScanView(); renderPageList(); }
    if (state.view === 'ringtones') document.querySelector('#panel').innerHTML = ringtoneView();
    if (state.view === 'arcade') document.querySelector('#panel').innerHTML = arcadeView();
    if (state.view === 'home') addHomeShortcut();
    addWorkspaceTools();
    document.querySelectorAll('.home-quickgrid [data-game-link]').forEach(item => item.remove());
    installArcadeBottomNav();
    updateBottomNav();
  };

  function updateBottomNav() {
    const active = state.view === 'chat' ? 'messages' : state.view === 'device' ? 'devices' : state.view;
    nav?.querySelectorAll('.sfn-nav-item').forEach(item => {
      const selected = item.dataset.page === active;
      item.classList.toggle('active', selected);
      if (selected) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current');
    });
  }
  window.addEventListener('sfn:render', () => {
    updateBottomNav();
    if (state.view !== 'pdfscan') stopScanner();
  });

  // Older cached home-page enhancers may still try to append game tiles to the
  // overview. Remove those tiles immediately so games remain inside Workspace.
  new MutationObserver(() => {
    if (state.view === 'home') document.querySelectorAll('.home-quickgrid [data-game-link]').forEach(item => item.remove());
  }).observe(document.body, { childList: true, subtree: true });

  window.addEventListener('click', event => {
    const homeLink = event.target.closest('[data-feature="ringtones"]');
    if (homeLink) navigate('ringtones');
    const arcadeLink = event.target.closest('[data-feature="arcade"]');
    if (arcadeLink) navigate('arcade');
  });

  const arcadeScoreKeys = ['neon_nexus_snake_highscore', 'neon_nexus_space_highscore'];
  window.addEventListener('message', event => {
    const frame = document.querySelector('#sfnArcadeFrame');
    if (!frame || event.source !== frame.contentWindow || event.origin !== 'null' || !event.data || typeof event.data !== 'object') return;
    if (event.data.type === 'sfn-arcade-ready') {
      const scores = {};
      for (const key of arcadeScoreKeys) scores[key] = Math.max(0, Math.min(1000000000, Number(localStorage.getItem(key)) || 0));
      frame.contentWindow.postMessage({type:'sfn-arcade-scores', scores}, '*');
    } else if (event.data.type === 'sfn-arcade-score' && arcadeScoreKeys.includes(event.data.key)) {
      const score = Number(event.data.value);
      if (Number.isSafeInteger(score) && score >= 0 && score <= 1000000000) localStorage.setItem(event.data.key, String(score));
    }
  });

  function pdfScanView() {
    return '<div class="pagehead"><div><div class="eyebrow">DOCUMENTS · ON THIS DEVICE</div><h1>PDF Scan</h1><p>Scan paper pages with your camera or add images, arrange pages, then save a PDF to your phone.</p></div></div>' +
      '<div class="pdfscan-layout"><section class="card pdfscan-camera"><div class="cardhead"><h2>Capture document pages</h2><span class="tag">CAMERA STARTS ON TAP</span></div><div class="pdfscan-video-wrap"><video id="pdfScanVideo" playsinline autoplay muted></video><div id="pdfScanPlaceholder" class="pdfscan-placeholder">Camera preview appears here after you start scanning.</div></div><div class="button-row pdfscan-controls"><button class="btn" data-pdf="start">Open camera</button><button class="btn primary" data-pdf="capture" disabled>Capture page</button><button class="btn" data-pdf="stop" disabled>Stop camera</button><label class="btn pdfscan-upload">Add image pages<input id="pdfScanFiles" type="file" accept="image/*" multiple></label></div><p class="hint">Hold the page flat in good light. Capture one page at a time, or select existing photos. Each page is fitted to an A4 PDF sheet.</p></section>' +
      '<section class="card"><div class="cardhead"><h2>Pages <span id="pdfPageCount">0</span></h2><button class="btn small danger" data-pdf="clear">Clear all</button></div><div id="pdfScanPageList" class="pdfscan-pages"><div class="empty">No pages yet. Open the camera or add document images.</div></div><div class="pdfscan-save"><label class="field"><span>PDF file name</span><input id="pdfFileName" value="Scott-FN-Scan" maxlength="80"></label><button class="btn primary" data-pdf="save" disabled>Convert and save PDF</button><p id="pdfSaveStatus" class="hint" role="status"></p></div></section></div>';
  }

  function ringtoneView() {
    const items = [
      ['ios','Glass Pulse',[880,1174,1568,1174,880]],['ios','Marimba Steps',[523,659,784,659,523]],
      ['ios','Soft Current',[659,784,988,784,659]],['ios','Prism Bell',[1046,1318,1568,1318,1046]],
      ['ios','Morning Beacon',[784,988,1174,1568,1174]],['android','Pixel Chime',[587,784,1174,784,587]],
      ['android','Material Rise',[392,523,659,784,988]],['android','Orbit Tones',[880,660,880,1320,990]],
      ['android','Droid Pulse',[440,440,660,880,660]],['android','Amber Echo',[523,784,1046,784,523]]
    ];
    const card = ([family,name,notes], index) => '<article class="ringtone-card"><div class="ringtone-icon">♫</div><div class="ringtone-copy"><span class="tag">'+(family==='ios'?'IPHONE INSPIRED':'ANDROID INSPIRED')+'</span><h3>'+name+'</h3><p>Original Scott.F.N tone · WAV</p></div><div class="ringtone-actions"><button class="btn small" data-tone="preview" data-index="'+index+'">▶ Preview</button><button class="btn small primary" data-tone="download" data-index="'+index+'">↓ Save WAV</button></div></article>';
    const options=items.map((item,i)=>'<option value="'+i+'">'+(item[0]==='ios'?'iPhone inspired · ':'Android inspired · ')+item[1]+'</option>').join('');
    const callChoice=localStorage.getItem('sfn_call_tone')||'0',messageChoice=localStorage.getItem('sfn_message_tone')||'5';
    return '<div class="pagehead"><div><div class="eyebrow">PERSONAL AUDIO</div><h1>Ringtone studio</h1><p>Choose separate sounds for incoming calls and new messages.</p></div></div><div class="card ringtone-settings"><div class="cardhead"><h2>App alert sounds</h2><span class="tag">LOCAL SETTINGS</span></div><p class="hint">Alerts play while Scott.F.N is open. Call sound repeats until you answer or decline.</p><div class="ringtone-picks"><label class="field"><span>Incoming call sound</span><select data-tone-setting="call">'+options+'</select></label><button class="btn" data-tone-preview-setting="call">▶ Preview call</button><label class="field"><span>New message sound</span><select data-tone-setting="message">'+options+'</select></label><button class="btn" data-tone-preview-setting="message">▶ Preview message</button></div></div><div class="data-note">These are original Scott.F.N compositions inspired by broad mobile sound styles; they do not copy built-in Apple or Android ringtones.</div><h2 class="ringtone-group-title">iPhone inspired <span>5 tones</span></h2><div class="ringtone-list">'+items.slice(0,5).map(card).join('')+'</div><h2 class="ringtone-group-title">Android inspired <span>5 tones</span></h2><div class="ringtone-list">'+items.slice(5).map((item,i)=>card(item,i+5)).join('')+'</div><p class="hint">Save a WAV file to your phone, then choose it in your device’s sound or ringtone settings.</p>';
  }

  function arcadeView() {
    return '<div class="pagehead"><div><div class="eyebrow">LOCAL PLAY · TWO GAME MODES</div><h1>Cyber Arcade</h1><p>Launch Cyber Serpent or Void Interceptor. Scores stay on this device, and the isolated game frame cannot access your workspace data.</p></div></div><section class="card sfn-arcade-card"><div class="cardhead"><h2>NEON NEXUS · Twin-System</h2><span class="tag">OFFLINE READY</span></div><iframe id="sfnArcadeFrame" class="sfn-arcade-frame" title="Cyber Arcade: Cyber Serpent and Void Interceptor" src="./games/cyber-arcade-twin-system.html" sandbox="allow-scripts" allow="autoplay; gamepad" loading="lazy"></iframe></section>';
  }

  function stopScanner() {
    if (scanStream) scanStream.getTracks().forEach(track => track.stop());
    scanStream = null;
    const video = document.querySelector('#pdfScanVideo');
    if (video) video.srcObject = null;
  }

  async function startScanner() {
    if (!navigator.mediaDevices?.getUserMedia) throw Error('Camera access is unavailable. Use the Add image pages button instead.');
    stopScanner();
    scanStream = await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1600},height:{ideal:2000}},audio:false});
    const video = document.querySelector('#pdfScanVideo');
    if (!video) return stopScanner();
    video.srcObject = scanStream;
    video.style.display = 'block';
    document.querySelector('#pdfScanPlaceholder').hidden = true;
    document.querySelector('[data-pdf="capture"]').disabled = false;
    document.querySelector('[data-pdf="stop"]').disabled = false;
  }

  function canvasJpeg(canvas, quality=.78) {
    return new Promise((resolve,reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(Error('Could not process that page image.')), 'image/jpeg', quality));
  }
  async function normalizeImage(blob, name) {
    const bitmap = await createImageBitmap(blob);
    const ratio = Math.min(1,1600/bitmap.width,2000/bitmap.height);
    const canvas = document.createElement('canvas'); canvas.width=Math.max(1,Math.round(bitmap.width*ratio));canvas.height=Math.max(1,Math.round(bitmap.height*ratio));
    const context=canvas.getContext('2d',{alpha:false});context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close?.();
    const jpeg=await canvasJpeg(canvas);const dataUrl=await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.readAsDataURL(jpeg)});
    return {id:crypto.randomUUID?.()||String(Date.now()+Math.random()),name,width:canvas.width,height:canvas.height,dataUrl};
  }
  async function capturePage() {
    const video=document.querySelector('#pdfScanVideo');if(!video?.videoWidth)throw Error('Wait for the camera preview, then capture again.');
    const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d',{alpha:false}).drawImage(video,0,0,canvas.width,canvas.height);
    const page=await normalizeImage(await canvasJpeg(canvas,.82),'Page '+(scanPages.length+1));scanPages.push(page);renderPageList();
  }
  function renderPageList() {
    const list=document.querySelector('#pdfScanPageList');if(!list)return;
    document.querySelector('#pdfPageCount').textContent=String(scanPages.length);
    document.querySelector('[data-pdf="save"]').disabled=!scanPages.length;
    list.innerHTML=scanPages.length?scanPages.map((page,i)=>'<article class="pdfscan-page"><img src="'+page.dataUrl+'" alt="Preview of '+page.name+'"><div class="pdfscan-page-info"><strong>Page '+(i+1)+'</strong><small>'+page.width+' × '+page.height+' px</small></div><div class="pdfscan-page-actions"><button class="topicon" data-pdf="up" data-index="'+i+'" aria-label="Move page up" '+(!i?'disabled':'')+'>↑</button><button class="topicon" data-pdf="down" data-index="'+i+'" aria-label="Move page down" '+(i===scanPages.length-1?'disabled':'')+'>↓</button><button class="topicon" data-pdf="remove" data-index="'+i+'" aria-label="Remove page">×</button></div></article>').join(''):'<div class="empty">No pages yet. Open the camera or add document images.</div>';
  }

  function bytes(text) { return encoder.encode(text); }
  function concat(parts) { const size=parts.reduce((sum,part)=>sum+part.length,0),out=new Uint8Array(size);let offset=0;for(const part of parts){out.set(part,offset);offset+=part.length}return out; }
  async function makePdf(pages) {
    const objects=[];const pageRefs=pages.map((_,i)=>3+i*3);
    objects.push(bytes('<< /Type /Catalog /Pages 2 0 R >>'));
    objects.push(bytes('<< /Type /Pages /Kids ['+pageRefs.map(ref=>ref+' 0 R').join(' ') +'] /Count '+pages.length+' >>'));
    for(let i=0;i<pages.length;i++){
      const page=pages[i],pageObj=3+i*3,contentObj=pageObj+1,imageObj=pageObj+2;
      const scale=Math.min(595/page.width,842/page.height),w=page.width*scale,h=page.height*scale,x=(595-w)/2,y=(842-h)/2;
      const content=bytes('q '+w.toFixed(2)+' 0 0 '+h.toFixed(2)+' '+x.toFixed(2)+' '+y.toFixed(2)+' cm /Im0 Do Q');
      objects.push(bytes('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 '+imageObj+' 0 R >> >> /Contents '+contentObj+' 0 R >>'));
      objects.push(concat([bytes('<< /Length '+content.length+' >>\nstream\n'),content,bytes('\nendstream')]));
      const jpeg=Uint8Array.from(atob(page.dataUrl.split(',')[1]),c=>c.charCodeAt(0));
      objects.push(concat([bytes('<< /Type /XObject /Subtype /Image /Width '+page.width+' /Height '+page.height+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpeg.length+' >>\nstream\n'),jpeg,bytes('\nendstream')]));
    }
    const parts=[bytes('%PDF-1.4\n%âãÏÓ\n')],offsets=[0];let cursor=parts[0].length;
    for(let i=0;i<objects.length;i++){offsets.push(cursor);const chunk=concat([bytes((i+1)+' 0 obj\n'),objects[i],bytes('\nendobj\n')]);parts.push(chunk);cursor+=chunk.length}
    const xrefOffset=cursor;let xref='xref\n0 '+(objects.length+1)+'\n0000000000 65535 f \n';for(const offset of offsets.slice(1))xref+=String(offset).padStart(10,'0')+' 00000 n \n';
    parts.push(bytes(xref+'trailer\n<< /Size '+(objects.length+1)+' /Root 1 0 R >>\nstartxref\n'+xrefOffset+'\n%%EOF'));
    return new Blob([concat(parts)],{type:'application/pdf'});
  }

  function safeFilename(raw) { return (raw||'Scott-FN-Scan').trim().replace(/\.pdf$/i,'').replace(/[\\/:*?"<>|]/g,'-').slice(0,80)||'Scott-FN-Scan'; }
  function arrayBufferBase64(buffer) { const data=new Uint8Array(buffer),parts=[];for(let start=0;start<data.length;start+=0x8000)parts.push(String.fromCharCode(...data.subarray(start,start+0x8000)));return btoa(parts.join('')); }
  async function savePdf() {
    if(!scanPages.length)throw Error('Capture or add at least one page first.');
    const button=document.querySelector('[data-pdf="save"]'),status=document.querySelector('#pdfSaveStatus');button.disabled=true;status.textContent='Creating PDF…';
    try{
      const blob=await makePdf(scanPages),filename=safeFilename(document.querySelector('#pdfFileName').value)+'.pdf';
      if(window.sfnNative?.savePdf){const data=await blob.arrayBuffer();window.sfnNative.savePdf(arrayBufferBase64(data),filename);status.textContent='Saving PDF to your phone…';return}
      const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);status.textContent='PDF downloaded to your device.';
    }finally{button.disabled=false}
  }
  window.sfnPdfSaved=(filename,error)=>{const status=document.querySelector('#pdfSaveStatus');if(status)status.textContent=error||('Saved '+filename+' to Downloads.')};

  document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-pdf]');if(!button)return;
    const action=button.dataset.pdf,index=Number(button.dataset.index);
    try{
      if(action==='start')await startScanner();
      if(action==='capture')await capturePage();
      if(action==='stop'){stopScanner();document.querySelector('#pdfScanVideo').style.display='none';document.querySelector('#pdfScanPlaceholder').hidden=false;document.querySelector('[data-pdf="capture"]').disabled=true;button.disabled=true}
      if(action==='clear'){scanPages=[];renderPageList()}
      if(action==='remove'){scanPages.splice(index,1);renderPageList()}
      if(action==='up'&&index>0){[scanPages[index-1],scanPages[index]]=[scanPages[index],scanPages[index-1]];renderPageList()}
      if(action==='down'&&index<scanPages.length-1){[scanPages[index+1],scanPages[index]]=[scanPages[index],scanPages[index+1]];renderPageList()}
      if(action==='save')await savePdf();
    }catch(error){const status=document.querySelector('#pdfSaveStatus');if(status)status.textContent=error.message||'Could not process this document.';else toast(error.message||'Could not process this document.')}
  });
  document.addEventListener('change',async event=>{
    if(event.target.id!=='pdfScanFiles')return;
    const input=event.target;try{for(const file of [...input.files||[]])if(file.type.startsWith('image/'))scanPages.push(await normalizeImage(file,file.name));renderPageList()}catch(error){toast(error.message||'Could not read that image.')}finally{input.value=''}
  });

  const toneCatalog=[
    {group:'iPhone-inspired',name:'Glass Pulse',notes:[880,1174,1568,1174,880],wave:'sine'},
    {group:'iPhone-inspired',name:'Marimba Steps',notes:[523,659,784,659,523],wave:'triangle'},
    {group:'iPhone-inspired',name:'Soft Current',notes:[659,784,988,784,659],wave:'sine'},
    {group:'iPhone-inspired',name:'Prism Bell',notes:[1046,1318,1568,1318,1046],wave:'triangle'},
    {group:'iPhone-inspired',name:'Morning Beacon',notes:[784,988,1174,1568,1174],wave:'sine'},
    {group:'Android-inspired',name:'Pixel Chime',notes:[587,784,1174,784,587],wave:'sine'},
    {group:'Android-inspired',name:'Material Rise',notes:[392,523,659,784,988],wave:'triangle'},
    {group:'Android-inspired',name:'Orbit Tones',notes:[880,660,880,1320,990],wave:'sine'},
    {group:'Android-inspired',name:'Droid Pulse',notes:[440,440,660,880,660],wave:'square'},
    {group:'Android-inspired',name:'Amber Echo',notes:[523,784,1046,784,523],wave:'triangle'}
  ];
  function makeWav(tone) {
    const sequence=tone.notes.concat(tone.notes),rate=22050,gap=.1,noteDuration=.3,count=Math.ceil((sequence.length*(noteDuration+gap))*rate),pcm=new Int16Array(count);
    let at=0;
    for(const frequency of sequence){const length=Math.floor(noteDuration*rate),attack=.018*rate,release=.07*rate;
      for(let i=0;i<length&&at+i<count;i++){const env=Math.min(1,i/attack,(length-i)/release),t=i/rate;let sample;
        if(tone.wave==='triangle')sample=(2/Math.PI)*Math.asin(Math.sin(2*Math.PI*frequency*t));
        else if(tone.wave==='square')sample=Math.tanh(2.5*Math.sin(2*Math.PI*frequency*t));
        else sample=Math.sin(2*Math.PI*frequency*t);
        pcm[at+i]=Math.max(-1,Math.min(1,sample*env*.62))*32767;
      }at+=length+Math.floor(gap*rate);
    }
    const wav=new ArrayBuffer(44+pcm.byteLength),view=new DataView(wav),write=(offset,text)=>{for(let i=0;i<text.length;i++)view.setUint8(offset+i,text.charCodeAt(i))};
    write(0,'RIFF');view.setUint32(4,36+pcm.byteLength,true);write(8,'WAVE');write(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,rate,true);view.setUint32(28,rate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);write(36,'data');view.setUint32(40,pcm.byteLength,true);new Int16Array(wav,44).set(pcm);
    return new Blob([wav],{type:'audio/wav'});
  }
  function getTone(index){let tone=ringtoneFiles.get(index);if(!tone){tone=makeWav(toneCatalog[index]);ringtoneFiles.set(index,tone)}return tone}
  const alertPlayers=new Map();
  function stopAlert(kind){const player=alertPlayers.get(kind);if(player){const url=player.src;player.pause();player.currentTime=0;player.src='';URL.revokeObjectURL(url);alertPlayers.delete(kind)}}
  window.sfnStopAlert=stopAlert;
  window.sfnPlayAlert=kind=>{const key=kind==='call'?'sfn_call_tone':'sfn_message_tone',index=Number(localStorage.getItem(key)??(kind==='call'?0:5));if(!toneCatalog[index])return;stopAlert(kind);const player=new Audio(URL.createObjectURL(getTone(index)));player.loop=kind==='call';alertPlayers.set(kind,player);player.play().catch(()=>{alertPlayers.delete(kind)});player.addEventListener('ended',()=>{if(alertPlayers.get(kind)===player){alertPlayers.delete(kind);URL.revokeObjectURL(player.src)}},{once:true})};
  document.addEventListener('change',event=>{const select=event.target.closest('[data-tone-setting]');if(!select)return;localStorage.setItem(select.dataset.toneSetting==='call'?'sfn_call_tone':'sfn_message_tone',select.value);toast('Alert sound saved.')});
  document.addEventListener('click',event=>{
    const settingPreview=event.target.closest('[data-tone-preview-setting]');if(settingPreview){const kind=settingPreview.dataset.tonePreviewSetting,index=Number(localStorage.getItem(kind==='call'?'sfn_call_tone':'sfn_message_tone')??(kind==='call'?0:5));const player=new Audio(URL.createObjectURL(getTone(index)));player.loop=false;player.play().catch(()=>toast('Tap Preview again to allow audio playback.'));return}
    const button=event.target.closest('[data-tone]');if(!button)return;const index=Number(button.dataset.index),tone=toneCatalog[index];if(!tone)return;
    const blob=getTone(index),url=URL.createObjectURL(blob);
    if(button.dataset.tone==='preview'){const audio=new Audio(url);audio.play().catch(()=>toast('Tap Preview again to allow audio playback.'));audio.addEventListener('ended',()=>URL.revokeObjectURL(url),{once:true})}
    else{const link=document.createElement('a');link.href=url;link.download='Scott-FN-'+tone.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.wav';link.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}
  });
  document.addEventListener('sfn:render',()=>{document.querySelectorAll('[data-tone-setting]').forEach(select=>{select.value=localStorage.getItem(select.dataset.toneSetting==='call'?'sfn_call_tone':'sfn_message_tone')||(select.dataset.toneSetting==='call'?'0':'5')})});

  const extraStyle=document.createElement('style');
  extraStyle.textContent='.pdfscan-layout{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:14px}.pdfscan-video-wrap{position:relative;min-height:300px;display:grid;place-items:center;overflow:hidden;border:1px solid var(--line);border-radius:12px;background:#02090a}.pdfscan-video-wrap video{display:none;width:100%;max-height:65vh;object-fit:contain}.pdfscan-placeholder{padding:35px 20px;text-align:center;color:var(--muted);font-size:13px}.pdfscan-controls{margin-top:12px}.pdfscan-upload{position:relative;overflow:hidden}.pdfscan-upload input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}.pdfscan-pages{display:grid;gap:8px;max-height:55vh;overflow:auto}.pdfscan-page{display:flex;align-items:center;gap:10px;min-width:0;padding:8px;border:1px solid var(--line);border-radius:11px;background:var(--panel)}.pdfscan-page img{width:54px;height:68px;object-fit:cover;border-radius:5px;background:white}.pdfscan-page-info{min-width:0;flex:1}.pdfscan-page-info strong,.pdfscan-page-info small{display:block}.pdfscan-page-info small{margin-top:4px;color:var(--muted);font-size:11px}.pdfscan-page-actions{display:flex;gap:4px}.pdfscan-save{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}.ringtone-picks{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:end}.ringtone-picks select{width:100%;min-height:44px;background:var(--panel);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:8px}.ringtone-group-title{display:flex;justify-content:space-between;align-items:center;margin:22px 0 10px;font-size:18px}.ringtone-group-title span{font:11px var(--mono);color:var(--muted)}.ringtone-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ringtone-card{display:grid;grid-template-columns:38px minmax(0,1fr);gap:10px;padding:13px;border:1px solid var(--line);border-radius:14px;background:var(--panel);min-width:0}.ringtone-icon{width:38px;height:38px;border:1px solid #397660;border-radius:12px;display:grid;place-items:center;color:var(--mint);font-size:18px}.ringtone-copy h3{margin:7px 0 3px;font-size:15px}.ringtone-copy p{margin:0;color:var(--muted);font-size:11px}.ringtone-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:8px}.pdfscan-page-actions .topicon{width:32px;height:32px}.sfn-nav-item[data-page="pdfscan"]{color:var(--mint)}@media(max-width:760px){.pdfscan-layout{grid-template-columns:1fr}.pdfscan-video-wrap{min-height:230px}.ringtone-list{grid-template-columns:1fr}.ringtone-picks{grid-template-columns:1fr}.ringtone-card{grid-template-columns:34px minmax(0,1fr)}.ringtone-icon{width:34px;height:34px}.ringtone-actions{justify-content:stretch}.ringtone-actions .btn{flex:1}.pdfscan-page-actions{gap:2px}.pdfscan-page-actions .topicon{width:30px;height:30px}}@media(max-width:380px){.pdfscan-controls .btn,.pdfscan-upload{font-size:11px;padding:8px}.pdfscan-page img{width:44px;height:58px}.pdfscan-page-actions .topicon{width:27px;height:28px}}';
  document.head.append(extraStyle);
  const arcadeStyle = document.createElement('style');
  arcadeStyle.textContent = '.sfn-arcade-card{overflow:hidden;padding:0}.sfn-arcade-card>.cardhead{padding:14px 16px}.sfn-arcade-frame{display:block;width:100%;height:clamp(360px,calc(100dvh - 245px),880px);border:0;background:#05070d;border-radius:0 0 14px 14px}.sfn-nav-item[data-page="arcade"]{color:#8be9ff}@media(max-width:760px){.sfn-arcade-frame{height:clamp(360px,calc(100dvh - 215px),820px)}}';
  document.head.append(arcadeStyle);
})();

window.addEventListener('sfn:render', () => {
  if (window.sfnNative?.setTextZoom) window.sfnNative.setTextZoom(Number(state.textSize || 110));
});
document.addEventListener('input', event => {
  if (event.target.id === 'textSizePick' && window.sfnNative?.setTextZoom) window.sfnNative.setTextZoom(Number(event.target.value) || 110);
});

/* Quick PIN unlock is kept in the same cached feature bundle for the Android WebView. */
(() => {
  const KEY='sfn-local-pin-v1', bytes=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0)), b64=value=>btoa(String.fromCharCode(...new Uint8Array(value)));
  const rec=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}};
  async function derive(pin,salt){const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:180000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
  async function setup(){if(!secureKey)return toast('Open the workspace with your password before setting a PIN.');const pin=prompt('Create a 4 to 8 digit quick PIN:');if(pin===null)return;if(!/^\d{4,8}$/.test(pin))return toast('Use 4 to 8 digits.');if(pin!==prompt('Enter the PIN again:'))return toast('The PINs do not match.');const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),wrapped=await crypto.subtle.encrypt({name:'AES-GCM',iv},await derive(pin,salt),await crypto.subtle.exportKey('raw',secureKey));localStorage.setItem(KEY,JSON.stringify({salt:b64(salt),iv:b64(iv),wrapped:b64(wrapped)}));toast('Quick PIN unlock is ready');render()}
  async function unlock(pin){const saved=rec();if(!saved)throw Error('Set up a quick PIN after opening the workspace with your password.');try{const raw=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(saved.iv)},await derive(pin,bytes(saved.salt)),bytes(saved.wrapped));await openVaultWithRawKey(b64(raw))}catch{throw Error('That PIN did not unlock this workspace.')}}
  function gate(){const el=document.querySelector('#accessGate');if(!el||el.dataset.pin==='1'||!rec())return;el.dataset.pin='1';const button=document.createElement('button');button.className='btn';button.type='button';button.textContent='⌕  Use quick PIN';button.style.marginTop='10px';el.querySelector('#accessForm')?.after(button);button.onclick=()=>{if(el.querySelector('.pin-entry'))return;const row=document.createElement('div');row.className='pin-entry';row.innerHTML='<input inputmode="numeric" maxlength="8" placeholder="4–8 digit PIN"><button class="access-main" type="button">Unlock with PIN ›</button><div class="access-error"></div>';button.after(row);const input=row.querySelector('input');input.focus();row.querySelector('button').onclick=async()=>{try{await unlock(input.value)}catch(error){row.querySelector('.access-error').textContent=error.message}}};}
  window.addEventListener('sfn:render',()=>{gate();if(state.view==='appearance'&&!document.querySelector('[data-action="setup-pin"]'))document.querySelector('#settingsGrid')?.insertAdjacentHTML('beforeend','<div class="setting-card"><h3>Quick PIN</h3><p>Use a short local PIN to reopen this encrypted workspace.</p><div class="settingline"><span>'+(rec()?'PIN enabled':'Not configured')+'</span><button class="btn small" data-action="setup-pin">'+(rec()?'Replace PIN':'Set up PIN')+'</button></div></div>')});
  document.addEventListener('click',event=>{if(event.target.closest('[data-action="setup-pin"]'))setup().catch(error=>toast(error.message||'Could not set up the PIN.'))});
  const style=document.createElement('style');style.textContent='.pin-entry{display:grid;gap:8px;margin-top:10px}.pin-entry input{width:100%;padding:14px;border:1px solid #65edff88;border-radius:12px;background:#071823;color:#fff;font-size:20px;letter-spacing:.35em;text-align:center}';document.head.append(style);
  gate();
})();

/* Pattern unlock wraps the existing local vault key and never stores the drawn pattern. */
(() => {
  const KEY = 'sfn-local-pattern-v1';
  const DOTS = Array.from({ length: 9 }, (_, index) => ({
    id: index,
    x: 50 + (index % 3) * 100,
    y: 50 + Math.floor(index / 3) * 100
  }));
  const NS = 'http://www.w3.org/2000/svg';
  const encoder = new TextEncoder();
  const bytes = value => Uint8Array.from(atob(value), char => char.charCodeAt(0));
  const toBase64 = value => btoa(String.fromCharCode(...new Uint8Array(value)));
  const record = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch { return null; }
  };

  async function derivePatternKey(pattern, salt) {
    const material = await crypto.subtle.importKey(
      'raw', encoder.encode(`Scott.F.N pattern unlock v1:${pattern}`), 'PBKDF2', false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 240000, hash: 'SHA-256' },
      material,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  function setPath(svg, ids, tail) {
    const line = svg.querySelector('.sfn-pattern-line');
    const coords = ids.map(id => {
      const dot = DOTS[id];
      return `${dot.x},${dot.y}`;
    });
    if (tail && coords.length) coords.push(`${tail.x},${tail.y}`);
    line.setAttribute('points', coords.join(' '));
  }

  function drawSurface(svg, onComplete, onInvalid) {
    svg.setAttribute('viewBox', '0 0 300 300');
    svg.innerHTML = '<polyline class="sfn-pattern-line" points="" />' + DOTS.map(dot =>
      `<g class="sfn-pattern-node" data-dot="${dot.id}"><circle class="sfn-pattern-hit" cx="${dot.x}" cy="${dot.y}" r="34"/><circle class="sfn-pattern-ring" cx="${dot.x}" cy="${dot.y}" r="14"/><circle class="sfn-pattern-core" cx="${dot.x}" cy="${dot.y}" r="4"/></g>`
    ).join('');

    const path = [];
    let pointerId = null;
    let previous = null;
    const position = event => {
      const rect = svg.getBoundingClientRect();
      return { x: (event.clientX - rect.left) * 300 / rect.width, y: (event.clientY - rect.top) * 300 / rect.height };
    };
    const addDot = id => {
      if (path.includes(id)) return;
      path.push(id);
      svg.querySelector(`[data-dot="${id}"]`)?.classList.add('selected');
      setPath(svg, path);
    };
    const nearestDot = (point, limit = 38) => {
      let nearest = null;
      let distance = limit;
      for (const dot of DOTS) {
        const next = Math.hypot(point.x - dot.x, point.y - dot.y);
        if (next < distance) { nearest = dot.id; distance = next; }
      }
      return nearest;
    };
    const crossDots = (from, to) => {
      const dx = to.x - from.x, dy = to.y - from.y;
      const lengthSquared = dx * dx + dy * dy;
      if (!lengthSquared) return;
      DOTS.map(dot => {
        const t = Math.max(0, Math.min(1, ((dot.x - from.x) * dx + (dot.y - from.y) * dy) / lengthSquared));
        const distance = Math.hypot(dot.x - (from.x + t * dx), dot.y - (from.y + t * dy));
        return { id: dot.id, t, distance };
      }).filter(item => !path.includes(item.id) && item.t > 0 && item.t < 1 && item.distance < 19)
        .sort((a, b) => a.t - b.t)
        .forEach(item => addDot(item.id));
    };
    const reset = () => {
      path.length = 0;
      previous = null;
      svg.querySelectorAll('.sfn-pattern-node.selected').forEach(node => node.classList.remove('selected'));
      setPath(svg, []);
    };

    svg.onpointerdown = event => {
      if (pointerId !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
      event.preventDefault();
      pointerId = event.pointerId;
      svg.setPointerCapture?.(pointerId);
      reset();
      previous = position(event);
      const start = nearestDot(previous);
      if (start !== null) addDot(start);
    };
    svg.onpointermove = event => {
      if (pointerId !== event.pointerId) return;
      event.preventDefault();
      const next = position(event);
      if (previous) crossDots(previous, next);
      setPath(svg, path, next);
      previous = next;
    };
    svg.onpointerup = event => {
      if (pointerId !== event.pointerId) return;
      event.preventDefault();
      const end = position(event);
      if (previous) crossDots(previous, end);
      const lastDot = nearestDot(end);
      if (lastDot !== null) addDot(lastDot);
      pointerId = null;
      const value = path.join('-');
      if (path.length < 7) {
        reset();
        onInvalid('Connect at least 7 different dots.');
        return;
      }
      reset();
      onComplete(value);
    };
    svg.onpointercancel = () => { pointerId = null; reset(); };
  }

  function patternStyle() {
    const style = document.createElement('style');
    style.textContent = `
      .sfn-pattern-entry{margin-top:12px;padding:13px;border:1px solid #65edff55;border-radius:18px;background:linear-gradient(145deg,#071923,#06131a);text-align:center}
      .sfn-pattern-entry p,.sfn-pattern-setup p{margin:0 0 10px;color:#a9c7d1;font-size:12px;line-height:1.5}
      .sfn-pattern-pad{display:block;width:min(100%,280px);height:auto;margin:0 auto;touch-action:none;user-select:none;-webkit-user-select:none}
      .sfn-pattern-line{fill:none;stroke:#58f1ff;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;opacity:.9;filter:drop-shadow(0 0 7px #39ddeb)}
      .sfn-pattern-hit{fill:transparent}.sfn-pattern-ring{fill:#102c3b;stroke:#6b8b9a;stroke-width:3;transition:fill .08s,stroke .08s}
      .sfn-pattern-core{fill:#b8eaf0;pointer-events:none}.sfn-pattern-node.selected .sfn-pattern-ring{fill:#087d91;stroke:#8bfbff;stroke-width:5;filter:drop-shadow(0 0 8px #41efff)}
      .sfn-pattern-node.selected .sfn-pattern-core{fill:#fff}
      .sfn-pattern-error{min-height:20px;margin:7px 0;color:#ff9aab;font-size:12px}
      .sfn-pattern-overlay{position:fixed;inset:0;z-index:10020;display:grid;place-items:center;overflow:auto;padding:16px;background:#02080de8;backdrop-filter:blur(12px)}
      .sfn-pattern-setup{width:min(100%,390px);margin:auto;padding:21px;border:1px solid #54ecf577;border-radius:24px;background:linear-gradient(145deg,#102431,#07131c);box-shadow:0 22px 80px #000b,0 0 35px #19ced022;color:#effbff;text-align:center}
      .sfn-pattern-setup h2{margin:0 0 8px;font-size:21px}.sfn-pattern-setup .sfn-pattern-pad{width:min(100%,300px)}
      .sfn-pattern-actions{display:flex;justify-content:center;gap:9px;margin-top:10px}
      .sfn-pattern-actions button{min-height:43px;padding:9px 15px;border:1px solid #54ecf577;border-radius:12px;background:#0b2935;color:#e9fcff;font-size:13px;font-weight:600;font-family:inherit;touch-action:manipulation}
      @media(max-height:560px){.sfn-pattern-overlay{padding:8px}.sfn-pattern-setup{padding:13px}.sfn-pattern-setup .sfn-pattern-pad{width:min(36vh,220px)}}
      @media(prefers-reduced-motion:reduce){.sfn-pattern-ring{transition:none}}
    `;
    document.head.append(style);
  }

  async function savePattern(pattern) {
    if (!secureKey) throw Error('Unlock the workspace with your password before setting a pattern.');
    const salt = crypto.getRandomValues(new Uint8Array(24));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const wrappingKey = await derivePatternKey(pattern, salt);
    const rawKey = await crypto.subtle.exportKey('raw', secureKey);
    const wrapped = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, wrappingKey, rawKey);
    localStorage.setItem(KEY, JSON.stringify({ salt: toBase64(salt), iv: toBase64(iv), wrapped: toBase64(wrapped), dots: 7 }));
  }

  async function unlockPattern(pattern) {
    const saved = record();
    if (!saved) throw Error('No unlock pattern is configured on this device.');
    try {
      const wrappingKey = await derivePatternKey(pattern, bytes(saved.salt));
      const rawKey = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(saved.iv) }, wrappingKey, bytes(saved.wrapped));
      await openVaultWithRawKey(toBase64(rawKey));
    } catch {
      throw Error('That pattern did not unlock this workspace.');
    }
  }

  function setup() {
    if (!secureKey) return toast('Open the workspace with your password before setting a pattern.');
    const overlay = document.createElement('div');
    overlay.className = 'sfn-pattern-overlay';
    overlay.innerHTML = '<section class="sfn-pattern-setup" role="dialog" aria-modal="true" aria-labelledby="sfnPatternTitle"><h2 id="sfnPatternTitle">Pattern unlock</h2><p>Draw a pattern through at least 7 dots, then draw it again to confirm. Your pattern is never saved; it only unlocks this device’s encrypted key. Keep your password for stronger protection and recovery.</p><svg class="sfn-pattern-pad" aria-label="Draw an unlock pattern"></svg><div class="sfn-pattern-error" role="status" aria-live="polite">Draw your new pattern.</div><div class="sfn-pattern-actions"><button type="button" data-pattern-cancel>Cancel</button></div></section>';
    document.body.append(overlay);
    const svg = overlay.querySelector('svg');
    const status = overlay.querySelector('.sfn-pattern-error');
    let firstPattern = null;
    drawSurface(svg, async pattern => {
      if (!firstPattern) {
        firstPattern = pattern;
        status.textContent = 'Now draw the same pattern again to confirm.';
        return;
      }
      if (pattern !== firstPattern) {
        firstPattern = null;
        status.textContent = 'Patterns did not match. Draw a new pattern.';
        return;
      }
      status.textContent = 'Securing your pattern…';
      try {
        await savePattern(pattern);
        overlay.remove();
        toast('Pattern unlock is ready on this device.');
        render();
      } catch (error) {
        status.textContent = error.message || 'Could not set up pattern unlock.';
      }
    }, message => { status.textContent = message; });
    overlay.querySelector('[data-pattern-cancel]').onclick = () => overlay.remove();
    overlay.addEventListener('click', event => { if (event.target === overlay) overlay.remove(); });
  }

  function addGateOption() {
    const gate = document.querySelector('#accessGate');
    if (!gate || !record() || gate.dataset.patternOption === '1') return;
    gate.dataset.patternOption = '1';
    const button = document.createElement('button');
    button.className = 'btn';
    button.type = 'button';
    button.textContent = 'Draw unlock pattern';
    button.style.marginTop = '10px';
    const row = document.createElement('div');
    row.className = 'sfn-pattern-entry';
    row.hidden = true;
    row.innerHTML = '<p>Draw your pattern through at least 7 dots.</p><svg class="sfn-pattern-pad" aria-label="Draw your unlock pattern"></svg><div class="sfn-pattern-error" role="status" aria-live="polite"></div><button type="button" class="access-link" data-pattern-close>Cancel pattern entry</button>';
    button.onclick = () => {
      row.hidden = !row.hidden;
      if (!row.hidden && !row.dataset.ready) {
        row.dataset.ready = '1';
        const status = row.querySelector('.sfn-pattern-error');
        drawSurface(row.querySelector('svg'), async pattern => {
          status.textContent = 'Checking pattern…';
          try { await unlockPattern(pattern); }
          catch (error) { status.textContent = error.message || 'Pattern unlock failed.'; }
        }, message => { status.textContent = message; });
      }
    };
    row.querySelector('[data-pattern-close]').onclick = () => { row.hidden = true; };
    gate.querySelector('#accessForm')?.after(button, row);
  }

  function updateSettings() {
    if (state.view !== 'appearance') return;
    const grid = document.querySelector('#settingsGrid');
    if (!grid || grid.querySelector('[data-action="setup-pattern"]')) return;
    grid.insertAdjacentHTML('beforeend', '<section class="setting-card"><div class="settings-card-head"><div><h3>Pattern unlock</h3><p>Draw a local pattern to reopen the encrypted workspace on this device.</p></div><span class="settings-card-icon">⌘</span></div><div class="settings-security-row"><span><strong>' + (record() ? 'Pattern enabled' : 'Not configured') + '</strong><small>Uses at least 7 dots. Keep your password for stronger protection and recovery.</small></span><button class="btn small" data-action="setup-pattern">' + (record() ? 'Replace pattern' : 'Set up pattern') + '</button></div></section>');
  }

  patternStyle();
  addGateOption();
  if (typeof window.showAccessGate === 'function') {
    const originalShowAccessGate = window.showAccessGate;
    window.showAccessGate = function (...args) {
      const result = originalShowAccessGate.apply(this, args);
      addGateOption();
      return result;
    };
  }
  window.addEventListener('sfn:render', () => { addGateOption(); updateSettings(); });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-action="setup-pattern"]')) setup();
  });
})();
