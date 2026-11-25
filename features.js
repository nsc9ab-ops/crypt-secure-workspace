/* Scott.F.N local document scanner and original ringtone studio. */
(() => {
  const encoder = new TextEncoder();
  const ringtoneFiles = new Map();
  let scanStream = null;
  let scanPages = [];

  views.pdfscan = 'PDF Scan';
  views.ringtones = 'Ringtones';

  const nav = document.querySelector('#sfnBottomNav');
  const pdfNav = nav?.querySelector('[data-page="messages"]');
  if (pdfNav) {
    pdfNav.dataset.page = 'pdfscan';
    pdfNav.setAttribute('aria-label', 'PDF Scan');
    pdfNav.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"></path><path d="M14 3v5h5M9 12h7M9 16h7"></path></svg><span>PDF Scan</span>';
  }

  const rail = document.querySelector('#railnav');
  if (rail && !rail.querySelector('[data-view="ringtones"]')) {
    const button = document.createElement('button');
    button.className = 'navbtn'; button.dataset.action = 'navigate'; button.dataset.view = 'ringtones';
    button.title = 'Ringtones'; button.setAttribute('aria-label', 'Ringtones');
    button.innerHTML = '<span class="glyph">♫</span>';
    rail.insertBefore(button, rail.querySelector('[data-view="appearance"]') || null);
  }

  function addHomeShortcut() {
    const grid = document.querySelector('.home-quickgrid');
    if (grid && !grid.querySelector('[data-feature="ringtones"]')) {
      grid.insertAdjacentHTML('beforeend', '<button class="quick home-quick" data-feature="ringtones"><span class="quickglyph">♫</span><span><strong>Ringtones</strong><small>Preview and save ten original tones</small></span></button>');
    }
  }

  const oldRender = render;
  render = function () {
    oldRender();
    if (state.view === 'pdfscan') { document.querySelector('#panel').innerHTML = pdfScanView(); renderPageList(); }
    if (state.view === 'ringtones') document.querySelector('#panel').innerHTML = ringtoneView();
    if (state.view === 'home') addHomeShortcut();
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

  window.addEventListener('click', event => {
    const homeLink = event.target.closest('[data-feature="ringtones"]');
    if (homeLink) navigate('ringtones');
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
    return '<div class="pagehead"><div><div class="eyebrow">PERSONAL AUDIO</div><h1>Ringtone studio</h1><p>Ten original tones made in the app, grouped by iPhone inspired and Android inspired styles.</p></div></div><div class="data-note">These are new Scott.F.N compositions inspired by broad mobile sound styles. They do not copy the built-in Apple or Android ringtones.</div><h2 class="ringtone-group-title">iPhone inspired <span>5 tones</span></h2><div class="ringtone-list">'+items.slice(0,5).map(card).join('')+'</div><h2 class="ringtone-group-title">Android inspired <span>5 tones</span></h2><div class="ringtone-list">'+items.slice(5).map((item,i)=>card(item,i+5)).join('')+'</div><p class="hint">Save a WAV file to your phone, then choose it in your device’s sound or ringtone settings.</p>';
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
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-tone]');if(!button)return;const index=Number(button.dataset.index),tone=toneCatalog[index];if(!tone)return;
    const blob=getTone(index),url=URL.createObjectURL(blob);
    if(button.dataset.tone==='preview'){const audio=new Audio(url);audio.play().catch(()=>toast('Tap Preview again to allow audio playback.'));audio.addEventListener('ended',()=>URL.revokeObjectURL(url),{once:true})}
    else{const link=document.createElement('a');link.href=url;link.download='Scott-FN-'+tone.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.wav';link.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}
  });

  const extraStyle=document.createElement('style');
  extraStyle.textContent='.pdfscan-layout{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:14px}.pdfscan-video-wrap{position:relative;min-height:300px;display:grid;place-items:center;overflow:hidden;border:1px solid var(--line);border-radius:12px;background:#02090a}.pdfscan-video-wrap video{display:none;width:100%;max-height:65vh;object-fit:contain}.pdfscan-placeholder{padding:35px 20px;text-align:center;color:var(--muted);font-size:13px}.pdfscan-controls{margin-top:12px}.pdfscan-upload{position:relative;overflow:hidden}.pdfscan-upload input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}.pdfscan-pages{display:grid;gap:8px;max-height:55vh;overflow:auto}.pdfscan-page{display:flex;align-items:center;gap:10px;min-width:0;padding:8px;border:1px solid var(--line);border-radius:11px;background:var(--panel)}.pdfscan-page img{width:54px;height:68px;object-fit:cover;border-radius:5px;background:white}.pdfscan-page-info{min-width:0;flex:1}.pdfscan-page-info strong,.pdfscan-page-info small{display:block}.pdfscan-page-info small{margin-top:4px;color:var(--muted);font-size:11px}.pdfscan-page-actions{display:flex;gap:4px}.pdfscan-save{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}.ringtone-group-title{display:flex;justify-content:space-between;align-items:center;margin:22px 0 10px;font-size:18px}.ringtone-group-title span{font:11px var(--mono);color:var(--muted)}.ringtone-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ringtone-card{display:grid;grid-template-columns:38px minmax(0,1fr);gap:10px;padding:13px;border:1px solid var(--line);border-radius:14px;background:var(--panel);min-width:0}.ringtone-icon{width:38px;height:38px;border:1px solid #397660;border-radius:12px;display:grid;place-items:center;color:var(--mint);font-size:18px}.ringtone-copy h3{margin:7px 0 3px;font-size:15px}.ringtone-copy p{margin:0;color:var(--muted);font-size:11px}.ringtone-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:8px}.pdfscan-page-actions .topicon{width:32px;height:32px}.sfn-nav-item[data-page="pdfscan"]{color:var(--mint)}@media(max-width:760px){.pdfscan-layout{grid-template-columns:1fr}.pdfscan-video-wrap{min-height:230px}.ringtone-list{grid-template-columns:1fr}.ringtone-card{grid-template-columns:34px minmax(0,1fr)}.ringtone-icon{width:34px;height:34px}.ringtone-actions{justify-content:stretch}.ringtone-actions .btn{flex:1}.pdfscan-page-actions{gap:2px}.pdfscan-page-actions .topicon{width:30px;height:30px}}@media(max-width:380px){.pdfscan-controls .btn,.pdfscan-upload{font-size:11px;padding:8px}.pdfscan-page img{width:44px;height:58px}.pdfscan-page-actions .topicon{width:27px;height:28px}}';
  document.head.append(extraStyle);
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
})();
