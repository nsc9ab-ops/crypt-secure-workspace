const FIREBASE_VERSION = '13.4.0';
const CONFIG = window.SFN_FIREBASE_CONFIG || {};
const configured = Boolean(CONFIG.apiKey && CONFIG.authDomain && CONFIG.projectId && CONFIG.appId && !CONFIG.projectId.startsWith('REPLACE_'));
const appBridge = window.SFNApp;
const panel = document.querySelector('#panel');
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const handleFormat = /^SFN-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
let sdk = null;
let firebaseAuth = null;
let db = null;
let currentUser = null;
let memberProfile = null;
let authMode = 'register';
let authMethod = 'phone';
let phoneConfirmation = null;
let phoneRecaptcha = null;
let moduleError = '';
let memberStatus = '';
let relationships = [];
let profileByUid = new Map();
let activeRelationshipId = '';
let messages = [];
let unsubAuth = null;
let unsubRelationships = null;
let unsubMessages = null;
let unsubIncomingCalls = null;
let unsubCallDoc = null;
let unsubRemoteCandidates = null;
let activeCallRef = null;
let activeCallRole = '';
let activeCallStatus = '';
let callText = 'Messages are private to this member thread.';
let callDocumentReady = false;
let pendingIceCandidates = [];
let callBusy = false;
let peer = null;
let microphone = null;
let remoteStream = null;
let callTimeout = null;
let incomingCall = null;
let firebaseStarted = false;

appBridge.views.members = 'Members & calls';

function pageHeader(){
  return '<div class="pagehead"><div><div class="eyebrow">SCOTT.F.N NETWORK</div><h1>Members & calls</h1><p>Find members by their generated Scott.F.N username, then message or call after they accept your request.</p></div></div>';
}
function statusBox(text=memberStatus){
  return '<div id="memberStatus" role="status" aria-live="polite" class="data-note" style="margin:12px 0">'+esc(text||'')+'</div>';
}
function setStatus(text, isError=false){
  memberStatus=text||'';
  const el=document.querySelector('#memberStatus');
  if(el){el.textContent=memberStatus;el.style.borderColor=isError?'#70434a':'';el.style.color=isError?'#ffb2b3':'';}
}
function friendlyError(error){
  const code=error?.code||'';
  if(code.includes('operation-not-allowed')||String(error?.message||'').includes('OPERATION_NOT_ALLOWED'))return authMethod==='email'?'Email and password sign-in is disabled in Firebase. Enable the Email/Password provider in Authentication settings.':'Firebase is blocking SMS sign-in. In Authentication settings, enable Phone, allow your SMS region, add this site as an authorized domain, and link billing if Firebase requests it.';
  if(code.includes('configuration-not-found')||String(error?.message||'').includes('CONFIGURATION_NOT_FOUND'))return 'Firebase is blocking SMS sign-in. In Authentication settings, enable Phone, allow your SMS region, add this site as an authorized domain, and link billing if Firebase requests it.';
  if(code.includes('invalid-credential')||code.includes('user-not-found')||code.includes('wrong-password'))return 'Email or password was not accepted.';
  if(code.includes('weak-password'))return 'Choose a stronger password with at least 12 characters.';
  if(code.includes('invalid-email'))return 'Enter a valid email address.';
  if(code.includes('email-already-in-use'))return 'That email already has an account. Choose Sign in.';
  if(code.includes('user-disabled'))return 'This account has been disabled. Contact the app administrator.';
  if(code.includes('requires-recent-login'))return 'For security, sign out and sign in again before retrying.';
  if(code.includes('too-many-requests'))return 'Too many attempts. Wait a while and try again.';
  if(code.includes('internal-error'))return 'Phone verification could not start. Refresh the page and confirm this site is an authorized Firebase domain.';
  if(code.includes('permission-denied'))return 'Firebase denied this action. Confirm the Firestore rules were deployed.';
  if(code.includes('unavailable')||code.includes('network-request-failed'))return 'The Internet service is unavailable. Check your connection and try again.';
  return error?.message||'The action could not be completed.';
}
function configView(){
  return pageHeader()+'<div class="two-col"><div class="card"><div class="cardhead"><h2>Connect Firebase</h2><span class="tag warn">SETUP NEEDED</span></div><p class="hint">The member service is prepared, but this website is not connected to a Firebase project yet. A project supplies phone and email sign-in plus the live message database.</p><ol class="hint" style="line-height:1.9;padding-left:20px"><li>Create a Firebase project and register a Web app.</li><li>Enable Email/Password and Phone providers. Configure the SMS region policy and link billing if the project asks for it. New projects allow no SMS regions until a policy is set.</li><li>Add <code>nsc9ab-ops.github.io</code> to Authentication authorized domains.</li><li>Create a Cloud Firestore database.</li><li>Paste the public Web app configuration into <code>firebase-config.js</code>.</li><li>Deploy this project’s <code>firestore.rules</code> and indexes.</li></ol><p class="hint">Phone sign-in uses SMS and reCAPTCHA. Standard messaging rates may apply. The Firebase Web config is public client configuration; never put Admin SDK keys in this website.</p><a class="btn primary" href="https://console.firebase.google.com/project/nsc9ab-f382c/authentication/providers" target="_blank" rel="noopener noreferrer">Open Firebase sign-in setup ↗</a></div><div class="card"><div class="cardhead"><h2>Voice call setup</h2><span class="tag">WEBRTC</span></div><p class="hint">Voice calling uses WebRTC. A TURN relay is recommended so calls can connect when the two devices cannot reach each other directly. TURN credentials should come from a protected service and should not be committed into the public website.</p><p class="hint">Current placeholder configuration includes public STUN only, so calls may fail on some networks until a TURN service is configured.</p></div></div>';
}
function authView(){
  const registering=authMode==='register';
  const setupLink='<a class="btn subtle" href="https://console.firebase.google.com/project/nsc9ab-f382c/authentication/providers" target="_blank" rel="noopener noreferrer">Open Firebase sign-in setup ↗</a>';
  const phone=phoneConfirmation?.phone||'';
  const form=authMethod==='email'?'<div class="field"><label for="memberEmail">Email address</label><input id="memberEmail" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com"></div><div class="field"><label for="memberPassword">Password</label><input id="memberPassword" type="password" autocomplete="'+(registering?'new-password':'current-password')+'" required minlength="12" maxlength="128" placeholder="At least 12 characters"></div>'+(registering?'<div class="field"><label for="memberPasswordConfirm">Confirm password</label><input id="memberPasswordConfirm" type="password" autocomplete="new-password" required minlength="12" maxlength="128" placeholder="Enter your password again"></div>':'')+'<button class="btn primary" style="width:100%" id="memberAuthSubmit" type="submit">'+(registering?'Create account and send verification':'Sign in with email')+'</button>':phoneConfirmation?'<div class="field"><label for="memberPhone">Phone number</label><input id="memberPhone" type="tel" value="'+esc(phone)+'" readonly></div><div class="field"><label for="memberCode">SMS verification code</label><input id="memberCode" inputmode="numeric" autocomplete="one-time-code" required maxlength="8" placeholder="Enter the code sent by SMS"></div><button class="btn primary" style="width:100%" id="memberAuthSubmit" type="submit">Verify phone and continue</button>':'<div class="field"><label for="memberPhone">Phone number</label><input id="memberPhone" type="tel" autocomplete="tel" required maxlength="20" placeholder="+1 555 123 4567"></div><div id="memberRecaptcha"></div><button class="btn primary" style="width:100%" id="memberAuthSubmit" type="submit">Send SMS verification code</button>';
  return pageHeader()+'<div class="two-col"><div class="card"><div class="cardhead"><h2>'+(authMethod==='email'?'Email and password':'Sign in with your phone')+'</h2><span class="tag">'+(authMethod==='email'?'EMAIL VERIFIED':'SMS VERIFIED')+'</span></div><p class="hint">'+(authMethod==='email'?'Use an email address and password. New accounts must verify the address before member features are enabled.':'Use your phone number in international format. Firebase will send a one-time SMS code, then Scott.F.N will generate your member username.')+'</p><div class="button-row" style="margin:10px 0"><button class="btn '+(authMethod==='phone'?'primary':'subtle')+'" type="button" data-member="auth-method" data-method="phone">Phone</button><button class="btn '+(authMethod==='email'?'primary':'subtle')+'" type="button" data-member="auth-method" data-method="email">Email & password</button></div>'+statusBox()+'<form id="memberAuthForm">'+form+'</form><div class="button-row" style="margin-top:12px">'+(phoneConfirmation?'<button class="btn subtle" type="button" data-member="phone-start-over">Use a different number</button>':'<button class="btn subtle" type="button" data-member="toggle-auth">'+(registering?'Already a member? Sign in':'Create a member account')+'</button>')+(authMethod==='email'&&!registering?'<button class="btn subtle" type="button" data-member="reset-password">Forgot password?</button>':'')+'</div></div><div class="card"><div class="cardhead"><h2>Member safety</h2><span class="tag">PRIVATE THREADS</span></div><p class="hint">Verified accounts can search usernames. A member must accept your request before you can message or call.</p><p class="hint">Messages use Firebase Authentication and the supplied Firestore rules once those rules are deployed. They are not end-to-end encrypted like WhatsApp. Never share your password or SMS code.</p><p class="hint">Email and phone sign-ins may create separate accounts unless explicitly linked in Firebase.</p><p class="hint">Voice calls request microphone access only after you tap Call.</p><div class="button-row" style="margin-top:14px">'+setupLink+'</div></div></div>';
}
function profileHandle(){
  if(!memberProfile)return '';
  return '<div class="card" style="margin-bottom:14px"><div class="cardhead"><div><div class="smalllabel">YOUR GENERATED USERNAME</div><strong style="display:block;margin-top:5px;font:700 16px var(--mono);color:var(--mint)">'+esc(memberProfile.handle)+'</strong></div><button class="btn small" data-member="copy-handle">Copy username</button></div><div class="button-row"><span class="hint">Share this username with people you trust.</span><button class="btn small subtle" data-member="sign-out">Sign out</button></div></div>';
}
function statusLabel(rel){
  if(rel.status==='accepted')return 'Connected';
  if(rel.status==='pending'&&rel.recipientUid===currentUser?.uid)return 'Wants to connect';
  if(rel.status==='pending')return 'Request sent';
  return 'Request declined';
}
function relationshipList(){
  if(!relationships.length)return '<div class="empty">No members yet. Add someone by their generated username.</div>';
  return relationships.map(rel=>{
    const otherUid=(rel.members||[]).find(uid=>uid!==currentUser?.uid)||'';
    const other=profileByUid.get(otherUid)||{handle:'Loading member…'};
    let controls='';
    if(rel.status==='accepted')controls='<button class="btn small" data-member="open-thread" data-rel="'+esc(rel.id)+'">Open chat</button>';
    else if(rel.status==='pending'&&rel.recipientUid===currentUser?.uid)controls='<button class="btn small primary" data-member="accept-request" data-rel="'+esc(rel.id)+'">Accept</button>';
    return '<div class="eventrow"><span class="staticon">'+(rel.status==='accepted'?'✓':'◌')+'</span><div class="rowmain"><strong>'+esc(other.handle||otherUid)+'</strong><small>'+esc(statusLabel(rel))+'</small></div>'+controls+'</div>';
  }).join('');
}
function incomingCallCard(){
  if(!incomingCall)return '';
  const profile=profileByUid.get(incomingCall.data.callerUid)||{};
  return '<div class="data-note" style="margin:12px 0"><strong>Incoming voice call from '+esc(profile.handle||'Scott.F.N member')+'</strong><div class="button-row" style="margin-top:10px"><button class="btn primary" data-member="accept-call" data-call="'+esc(incomingCall.id)+'" '+(callBusy?'disabled':'')+'>Answer</button><button class="btn" data-member="decline-call" data-call="'+esc(incomingCall.id)+'" '+(callBusy?'disabled':'')+'>Decline</button></div></div>';
}
function threadView(){
  const rel=relationships.find(item=>item.id===activeRelationshipId&&item.status==='accepted');
  if(!rel)return '<div class="empty">Select an accepted member to open your private thread.</div>';
  const otherUid=rel.members.find(uid=>uid!==currentUser.uid);
  const other=profileByUid.get(otherUid)||{handle:'Member'};
  const items=messages.map(message=>{
    const own=message.senderUid===currentUser.uid;
    const date=message.createdAt?.toDate?.();
    return '<div class="bubble '+(own?'mine':'')+'">'+esc(message.text)+'<time>'+esc(date?date.toLocaleString(): 'Sending…')+'</time></div>';
  }).join('');
  const callAction=activeCallRef?.id&&activeCallStatus!=='ended'?'end-call':'start-call';
  const callLabel=callAction==='end-call'?'End call':'☎ Call';
  return '<div class="card"><div class="cardhead"><div><h2>'+esc(other.handle||'Member')+'</h2><small>Accepted member · Firebase</small></div><button class="btn small" data-member="'+callAction+'" '+(callBusy?'disabled':'')+'>'+callLabel+'</button></div><div id="memberCallStatus" class="hint" role="status">'+esc(callText)+'</div><div id="memberMessages" class="chatmessages" style="height:300px;min-height:200px;border:1px solid var(--line);border-radius:12px;margin:12px 0">'+(items||'<div class="chatwelcome">Start a conversation with '+esc(other.handle||'this member')+'.</div>')+'</div><form id="memberMessageForm" class="composer" style="padding:0;border:0"><textarea id="memberMessageInput" maxlength="3000" placeholder="Write a message…" required></textarea><button class="btn primary" type="submit">Send</button></form></div>';
}
function signedInView(){
  return pageHeader()+statusBox()+'<div class="data-note">Messages are protected by Firebase Authentication and Firestore rules after setup. They are not end-to-end encrypted. Calls may need a TURN relay for some networks.</div>'+profileHandle()+incomingCallCard()+'<div class="two-col" style="margin-top:14px"><div><div class="card"><div class="cardhead"><h2>Find a member</h2><span class="tag">EXACT USERNAME</span></div><p class="hint">Enter the complete generated username, for example SFN-A7KM-3P9X.</p><form id="memberLookupForm" class="button-row"><input style="flex:1;min-width:180px;border:1px solid var(--line);border-radius:9px;padding:10px;background:#0b191d;color:var(--text)" id="memberLookup" maxlength="13" autocomplete="off" placeholder="SFN-ABCD-1234" required><button class="btn primary" type="submit">Find / request</button></form></div><div class="card" style="margin-top:14px"><div class="cardhead"><h2>Your members</h2><span class="tag">'+relationships.filter(rel=>rel.status==='accepted').length+' CONNECTED</span></div><div class="inventory-list">'+relationshipList()+'</div></div></div><div>'+threadView()+'</div></div><p class="hint" style="margin-top:14px">Use verified Firebase accounts only. Never share reset codes, passwords, or one-time sign-in codes with another member.</p>';
}
function renderMembers(){
  if(!panel)return;
  document.querySelector('#crumbTitle').textContent='Members & calls';
  if(!configured){panel.innerHTML=configView();return;}
  if(!currentUser){panel.innerHTML=authView();return;}
  if(currentUser.email&&!currentUser.emailVerified){panel.innerHTML=pageHeader()+'<div class="card"><div class="cardhead"><h2>Verify your email</h2><span class="tag warn">ACTION NEEDED</span></div>'+statusBox('We sent a verification link to '+currentUser.email+'. Open it, then return here and check verification status.')+'<div class="button-row"><button class="btn primary" data-member="refresh-email">I verified my email</button><button class="btn" data-member="resend-verification">Resend verification email</button><button class="btn subtle" data-member="sign-out">Sign out</button></div></div>';return;}
  panel.innerHTML=signedInView();
  const remoteAudio=document.querySelector('#memberRemoteAudio');
  if(remoteAudio&&remoteStream)remoteAudio.srcObject=remoteStream;
  const messageBox=document.querySelector('#memberMessages');
  if(messageBox)messageBox.scrollTop=messageBox.scrollHeight;
}

function installMemberNavigation(){
  const nav=document.querySelector('#railnav');
  const button=nav?.querySelector('[data-view="members"]');
  if(button){button.title='Members and calls';button.setAttribute('aria-label','Members and calls');}
}
function stopCloudListeners(){
  unsubRelationships?.();unsubRelationships=null;
  unsubIncomingCalls?.();unsubIncomingCalls=null;
  unsubMessages?.();unsubMessages=null;
  unsubCallDoc?.();unsubCallDoc=null;
  unsubRemoteCandidates?.();unsubRemoteCandidates=null;
}
function clearMemberSession(){
  stopCloudListeners();
  if(activeCallRef)void closeCall(true);
  currentUser=null;memberProfile=null;relationships=[];profileByUid=new Map();activeRelationshipId='';messages=[];incomingCall=null;
}
function generatedHandle(){
  const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes=crypto.getRandomValues(new Uint8Array(8));
  const chars=[...bytes].map(value=>alphabet[value%alphabet.length]);
  return 'SFN-'+chars.slice(0,4).join('')+'-'+chars.slice(4).join('');
}
async function ensureProfile(user){
  const userRef=sdk.doc(db,'users',user.uid);
  const current=await sdk.getDoc(userRef);
  if(current.exists())return current.data();
  for(let attempt=0;attempt<20;attempt++){
    const handle=generatedHandle();
    const handleRef=sdk.doc(db,'handles',handle);
    const result=await sdk.runTransaction(db,async tx=>{
      const [handleSnap,profileSnap]=await Promise.all([tx.get(handleRef),tx.get(userRef)]);
      if(profileSnap.exists())return profileSnap.data();
      if(handleSnap.exists())return null;
      const profile={uid:user.uid,handle,displayName:handle,createdAt:sdk.serverTimestamp()};
      tx.set(handleRef,{uid:user.uid,handle,createdAt:sdk.serverTimestamp()});
      tx.set(userRef,profile);
      return {...profile,createdAt:null};
    });
    if(result)return result;
  }
  throw Error('Could not reserve a unique username. Please retry.');
}
async function loadRelationships(user){
  unsubRelationships?.();
  const q=sdk.query(sdk.collection(db,'relationships'),sdk.where('members','array-contains',user.uid));
  unsubRelationships=sdk.onSnapshot(q,async snapshot=>{
    relationships=snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
    const otherUids=[...new Set(relationships.flatMap(rel=>rel.members||[]).filter(uid=>uid!==user.uid))];
    const entries=await Promise.all(otherUids.map(async uid=>{
      try{const profile=await sdk.getDoc(sdk.doc(db,'users',uid));return [uid,profile.exists()?profile.data():null]}catch{return [uid,null]}
    }));
    profileByUid=new Map(entries.filter(([,profile])=>profile));
    if(activeRelationshipId&&!relationships.some(rel=>rel.id===activeRelationshipId&&rel.status==='accepted')){
      activeRelationshipId='';messages=[];unsubMessages?.();unsubMessages=null;
    }
    appBridge.render();
  },error=>setStatus(friendlyError(error),true));
}
function listenMessages(relationshipId){
  unsubMessages?.();unsubMessages=null;messages=[];activeRelationshipId=relationshipId;
  const q=sdk.query(sdk.collection(db,'relationships',relationshipId,'messages'),sdk.orderBy('createdAt','desc'),sdk.limit(100));
  unsubMessages=sdk.onSnapshot(q,snapshot=>{
    messages=snapshot.docs.map(doc=>({id:doc.id,...doc.data()})).reverse();
    const messageBox=document.querySelector('#memberMessages');
    if(messageBox){const items=messages.map(message=>'<div class="bubble '+(message.senderUid===currentUser?.uid?'mine':'')+'">'+esc(message.text)+'<time>'+esc(message.createdAt?.toDate?.()?.toLocaleString()||'Sending…')+'</time></div>').join('');messageBox.innerHTML=items||'<div class="chatwelcome">Start a conversation with this member.</div>';messageBox.scrollTop=messageBox.scrollHeight;}
  },error=>setStatus(friendlyError(error),true));
}
function listenIncomingCalls(user){
  unsubIncomingCalls?.();
  const q=sdk.query(sdk.collection(db,'calls'),sdk.where('members','array-contains',user.uid),sdk.where('status','==','ringing'));
  unsubIncomingCalls=sdk.onSnapshot(q,snapshot=>{
    const hit=snapshot.docs.map(item=>({id:item.id,data:item.data(),ref:item.ref})).find(item=>{
      const createdAt=item.data().createdAt?.toDate?.()?.getTime();
      return item.data().calleeUid===user.uid&&item.id!==activeCallRef?.id&&createdAt&&Date.now()-createdAt<120000;
    })||null;
    if(hit?.id!==incomingCall?.id){incomingCall=hit;appBridge.render();}
  },error=>setStatus(friendlyError(error),true));
}
async function loadVerifiedUser(user){
  currentUser=user;
  if(!user){clearMemberSession();if(!memberStatus)memberStatus='Signed out.';appBridge.render();return;}
  if(!appBridge.isUnlocked?.())return;
  if(user.email&&!user.phoneNumber&&!user.emailVerified){memberProfile=null;relationships=[];setStatus('Verify your email before using member search or messaging.');appBridge.render();return;}
  try{
    memberProfile=await ensureProfile(user);
    memberStatus='Signed in as '+memberProfile.handle+'.';
    await loadRelationships(user);
    listenIncomingCalls(user);
    appBridge.render();
  }catch(error){setStatus(friendlyError(error),true);appBridge.render();}
}
async function startFirebase(){
  if(!configured||firebaseStarted||!appBridge.isUnlocked?.())return;
  firebaseStarted=true;
  try{
    const root='https://www.gstatic.com/firebasejs/'+FIREBASE_VERSION+'/';
    const [appSdk,authSdk,firestoreSdk]=await Promise.all([
      import(root+'firebase-app.js'),import(root+'firebase-auth.js'),import(root+'firebase-firestore.js')
    ]);
    sdk={...authSdk,...firestoreSdk,initializeApp:appSdk.initializeApp};
    const firebaseApp=sdk.initializeApp(CONFIG);
    try{
      const analyticsSdk=await import(root+'firebase-analytics.js');
      if(await analyticsSdk.isSupported())analyticsSdk.getAnalytics(firebaseApp);
    }catch{}
    firebaseAuth=sdk.getAuth(firebaseApp);db=sdk.getFirestore(firebaseApp);
    await sdk.setPersistence(firebaseAuth,sdk.browserLocalPersistence);
    unsubAuth=sdk.onAuthStateChanged(firebaseAuth,user=>{
      if(!appBridge.isUnlocked?.())return;
      void loadVerifiedUser(user);
    },error=>setStatus(friendlyError(error),true));
    if(firebaseAuth.currentUser)await loadVerifiedUser(firebaseAuth.currentUser);
  }catch(error){firebaseStarted=false;moduleError=friendlyError(error);setStatus(moduleError,true);}
}
async function reserveGeneratedProfile(user){return ensureProfile(user);}
async function submitMemberAuth(event){
  event.preventDefault();
  if(!firebaseAuth)return setStatus('Firebase is still connecting. Check the Internet and retry.',true);
  try{
    if(authMethod==='email'){
      const email=document.querySelector('#memberEmail')?.value.trim();
      const password=document.querySelector('#memberPassword')?.value||'';
      if(!email||!password)throw Error('Enter your email address and password.');
      setStatus(authMode==='register'?'Creating your account…':'Signing in…');
      if(authMode==='register'){
        if(password.length<12)throw Error('Choose a password with at least 12 characters.');
        if(password!==document.querySelector('#memberPasswordConfirm')?.value)throw Error('The passwords do not match.');
        const credential=await sdk.createUserWithEmailAndPassword(firebaseAuth,email,password);
        await sdk.sendEmailVerification(credential.user);
        setStatus('Account created. Check your email for a verification link, then return here.');
        appBridge.render();
      }else{
        const credential=await sdk.signInWithEmailAndPassword(firebaseAuth,email,password);
        await loadVerifiedUser(credential.user);
      }
      return;
    }
    if(phoneConfirmation){
      const code=document.querySelector('#memberCode')?.value.trim();
      if(!code)throw Error('Enter the SMS verification code.');
      setStatus('Verifying your phone…');
      const credential=await phoneConfirmation.confirm(code);
      phoneConfirmation=null;phoneRecaptcha=null;
      await loadVerifiedUser(credential.user);
      return;
    }
    const phone=document.querySelector('#memberPhone')?.value.trim();
    if(!/^\+[1-9]\d{7,14}$/.test(phone))throw Error('Enter a valid phone number with country code, for example +1 555 123 4567.');
    setStatus('Preparing SMS verification…');
    if(!phoneRecaptcha){
      phoneRecaptcha=new sdk.RecaptchaVerifier(firebaseAuth,'memberRecaptcha',{size:'normal',callback:()=>{}});
      await phoneRecaptcha.render();
    }
    const confirmation=await sdk.signInWithPhoneNumber(firebaseAuth,phone,phoneRecaptcha);
    phoneConfirmation={phone,confirm:code=>confirmation.confirm(code)};
    setStatus('SMS code sent. Enter it below to continue.');
    appBridge.render();
  }catch(error){setStatus(friendlyError(error),true);}
}
async function lookupMember(event){
  event.preventDefault();
  const input=document.querySelector('#memberLookup');
  const handle=input.value.trim().toUpperCase();
  if(!handleFormat.test(handle))return setStatus('Enter a complete username like SFN-A7KM-3P9X.',true);
  try{
    setStatus('Looking up '+handle+'…');
    const handleDoc=await sdk.getDoc(sdk.doc(db,'handles',handle));
    if(!handleDoc.exists())return setStatus('No member has that username.',true);
    const targetUid=handleDoc.data().uid;
    if(targetUid===currentUser.uid)return setStatus('That is your own username.',true);
    const members=[currentUser.uid,targetUid].sort();
    const relationshipId=members.join('__');
    const relRef=sdk.doc(db,'relationships',relationshipId);
    const existing=await sdk.getDoc(relRef);
    if(existing.exists()){
      const rel={id:existing.id,...existing.data()};
      if(rel.status==='accepted'){listenMessages(rel.id);appBridge.render();return setStatus('You are already connected. Chat is open.')}
      if(rel.status==='pending')return setStatus(rel.requesterUid===currentUser.uid?'Your request is waiting for acceptance.':'This member already requested to connect. Accept their request in Your members.')
      if(rel.status==='declined'){
        await sdk.updateDoc(relRef,{status:'pending',requesterUid:currentUser.uid,recipientUid:targetUid});
        return setStatus('Connection request sent again to '+handle+'.');
      }
      return setStatus('This connection request cannot be changed.',true);
    }
    await sdk.setDoc(relRef,{members,requesterUid:currentUser.uid,recipientUid:targetUid,status:'pending',createdAt:sdk.serverTimestamp()});
    setStatus('Connection request sent to '+handle+'.');
  }catch(error){setStatus(friendlyError(error),true);}
}
async function acceptRequest(relationshipId){
  try{await sdk.updateDoc(sdk.doc(db,'relationships',relationshipId),{status:'accepted'});setStatus('Member request accepted. You can now text or call.');}
  catch(error){setStatus(friendlyError(error),true);}
}
function selectedRelationship(){return relationships.find(rel=>rel.id===activeRelationshipId&&rel.status==='accepted')||null;}
async function sendMemberMessage(event){
  event.preventDefault();
  const rel=selectedRelationship();
  if(!rel)return setStatus('Choose a connected member before sending.',true);
  const field=document.querySelector('#memberMessageInput');
  const text=field?.value.trim();
  if(!text)return;
  try{
    field.value='';
    await sdk.addDoc(sdk.collection(db,'relationships',rel.id,'messages'),{senderUid:currentUser.uid,text:text.slice(0,3000),createdAt:sdk.serverTimestamp()});
  }catch(error){if(field)field.value=text;setStatus(friendlyError(error),true);}
}
function callStatus(text){callText=text;const el=document.querySelector('#memberCallStatus');if(el)el.textContent=text;}
function iceServers(){
  const configuredServers=window.SFN_CALL_ICE_SERVERS;
  return Array.isArray(configuredServers)&&configuredServers.length?configuredServers:[{urls:'stun:stun.l.google.com:19302'}];
}
async function publishIceCandidate(role,candidate){
  if(!activeCallRef)return;
  const collectionName=role==='caller'?'callerCandidates':'calleeCandidates';
  await sdk.addDoc(sdk.collection(db,'calls',activeCallRef.id,collectionName),{candidate,createdAt:sdk.serverTimestamp()});
}
function makePeer(callRef,role){
  peer=new RTCPeerConnection({iceServers:iceServers()});
  peer.ontrack=event=>{remoteStream=event.streams[0];const audio=document.querySelector('#memberRemoteAudio');if(audio)audio.srcObject=remoteStream;callStatus('Voice connected. Your call audio uses WebRTC.');};
  peer.onconnectionstatechange=()=>{
    if(peer?.connectionState==='connected'){activeCallStatus='active';callStatus('Voice connected.');}
    else if(peer?.connectionState==='failed')callStatus('Call connection failed. A TURN relay may be needed on this network.');
    else if(peer?.connectionState==='disconnected')callStatus('Call network disconnected. Trying to reconnect…');
  };
  peer.onicecandidate=event=>{
    if(!event.candidate||!activeCallRef)return;
    const candidate=event.candidate.toJSON();
    if(!callDocumentReady){pendingIceCandidates.push({role,candidate});return;}
    void publishIceCandidate(role,candidate).catch(error=>setStatus(friendlyError(error),true));
  };
  return peer;
}
function watchRemoteCandidates(role){
  unsubRemoteCandidates?.();
  const other=role==='caller'?'calleeCandidates':'callerCandidates';
  unsubRemoteCandidates=sdk.onSnapshot(sdk.collection(db,'calls',activeCallRef.id,other),snapshot=>{
    for(const change of snapshot.docChanges())if(change.type==='added'&&change.doc.data().candidate&&peer){void peer.addIceCandidate(new RTCIceCandidate(change.doc.data().candidate)).catch(()=>{});}
  },error=>setStatus(friendlyError(error),true));
}
function watchCallDocument(){
  unsubCallDoc?.();
  unsubCallDoc=sdk.onSnapshot(activeCallRef,async snapshot=>{
    if(!snapshot.exists())return;
    const data=snapshot.data();
    if(activeCallRole==='caller'&&data.answer&&peer&&!peer.currentRemoteDescription){
      try{await peer.setRemoteDescription(new RTCSessionDescription(data.answer));watchRemoteCandidates('caller');callStatus('Ringing…');}catch(error){callStatus(friendlyError(error));}
    }
    if(data.status==='active'){activeCallStatus='active';callStatus('Call connected.');}
    if(['ended','declined'].includes(data.status)&&activeCallStatus!=='ended'){
      activeCallStatus=data.status;callStatus(data.status==='declined'?'Call declined.':'Call ended.');
      void closeCall(false).then(()=>appBridge.render());
    }
  },error=>setStatus(friendlyError(error),true));
}
async function startVoiceCall(){
  const rel=selectedRelationship();
  if(!rel)return setStatus('Choose an accepted member before calling.',true);
  if(callBusy)return;
  if(activeCallRef&&activeCallStatus!=='ended')return setStatus('Finish the current call first.',true);
  if(!navigator.mediaDevices?.getUserMedia)return setStatus('This browser does not support microphone calls. Use the secure HTTPS website or APK.',true);
  callBusy=true;
  try{
    callStatus('Requesting microphone…');
    appBridge.render();
    microphone=await navigator.mediaDevices.getUserMedia({audio:true,video:false});
    if(!appBridge.isUnlocked?.()||!currentUser)throw Error('Unlock Scott.F.N and sign in again before starting a call.');
    const calleeUid=rel.members.find(uid=>uid!==currentUser.uid);
    activeCallRef=sdk.doc(sdk.collection(db,'calls'));
    activeCallRole='caller';activeCallStatus='ringing';
    const connection=makePeer(activeCallRef,'caller');
    for(const track of microphone.getTracks())connection.addTrack(track,microphone);
    const offer=await connection.createOffer();
    await connection.setLocalDescription(offer);
    await sdk.setDoc(activeCallRef,{relationshipId:rel.id,members:rel.members,callerUid:currentUser.uid,calleeUid,status:'ringing',offer:{type:connection.localDescription.type,sdp:connection.localDescription.sdp},createdAt:sdk.serverTimestamp()});
    callDocumentReady=true;
    const queuedCandidates=pendingIceCandidates.splice(0);
    await Promise.all(queuedCandidates.map(item=>publishIceCandidate(item.role,item.candidate)));
    appBridge.render();
    watchCallDocument();
    callStatus('Calling '+(profileByUid.get(calleeUid)?.handle||'member')+'…');
    callTimeout=setTimeout(()=>{if(activeCallRef&&activeCallRole==='caller'&&activeCallStatus==='ringing')void endCall();},45000);
  }catch(error){callStatus(friendlyError(error));await closeCall(false);}
  finally{callBusy=false;appBridge.render();}
}
async function acceptVoiceCall(callId){
  const incoming=callId===incomingCall?.id?incomingCall:null;
  if(!incoming)return setStatus('This call has expired.',true);
  if(callBusy)return;
  callBusy=true;
  try{
    callStatus('Requesting microphone…');
    appBridge.render();
    microphone=await navigator.mediaDevices.getUserMedia({audio:true,video:false});
    if(!appBridge.isUnlocked?.()||!currentUser)throw Error('Unlock Scott.F.N and sign in again before answering.');
    activeCallRef=incoming.ref;activeCallRole='callee';activeCallStatus='active';callDocumentReady=true;incomingCall=null;
    const connection=makePeer(activeCallRef,'callee');
    for(const track of microphone.getTracks())connection.addTrack(track,microphone);
    const callData=incoming.data;
    await connection.setRemoteDescription(new RTCSessionDescription(callData.offer));
    watchRemoteCandidates('callee');
    const answer=await connection.createAnswer();
    await connection.setLocalDescription(answer);
    await sdk.updateDoc(activeCallRef,{answer:{type:answer.type,sdp:answer.sdp},status:'active'});
    watchCallDocument();
    callStatus('Connecting voice…');appBridge.render();
  }catch(error){callStatus(friendlyError(error));await closeCall(false);}
  finally{callBusy=false;appBridge.render();}
}
async function declineVoiceCall(callId){
  const incoming=callId===incomingCall?.id?incomingCall:null;
  if(!incoming)return;
  try{await sdk.updateDoc(incoming.ref,{status:'declined'});incomingCall=null;setStatus('Call declined.');appBridge.render();}
  catch(error){setStatus(friendlyError(error),true);}
}
async function endCall(){
  if(!activeCallRef)return;
  const ref=activeCallRef;
  try{await sdk.updateDoc(ref,{status:'ended'});}catch{}
  await closeCall(false);
  activeCallStatus='ended';callStatus('Call ended.');
  appBridge.render();
}
async function closeCall(updateStatus){
  clearTimeout(callTimeout);callTimeout=null;
  if(updateStatus&&activeCallRef)try{await sdk.updateDoc(activeCallRef,{status:'ended'});}catch{}
  unsubCallDoc?.();unsubCallDoc=null;unsubRemoteCandidates?.();unsubRemoteCandidates=null;
  if(peer){peer.ontrack=null;peer.onicecandidate=null;peer.close();peer=null;}
  if(microphone){microphone.getTracks().forEach(track=>track.stop());microphone=null;}
  const audio=document.querySelector('#memberRemoteAudio');if(audio)audio.srcObject=null;
  remoteStream=null;
  activeCallRef=null;activeCallRole='';callDocumentReady=false;pendingIceCandidates=[];
}
async function handleMemberAction(button){
  const action=button.dataset.member;
  try{
    if(action==='toggle-auth'){authMode=authMode==='register'?'login':'register';memberStatus='';appBridge.render();}
    else if(action==='auth-method'){authMethod=button.dataset.method==='email'?'email':'phone';phoneConfirmation=null;phoneRecaptcha?.clear?.();phoneRecaptcha=null;memberStatus='';appBridge.render();}
    else if(action==='reset-password'){
      const email=document.querySelector('#memberEmail')?.value.trim();
      if(!email)return setStatus('Enter your email address first.',true);
      await sdk.sendPasswordResetEmail(firebaseAuth,email);setStatus('Password reset link sent to '+email+'.');
    }
    else if(action==='phone-start-over'){phoneConfirmation=null;phoneRecaptcha?.clear?.();phoneRecaptcha=null;memberStatus='';appBridge.render();}
    else if(action==='resend-verification'){
      if(!firebaseAuth?.currentUser)return setStatus('Sign in again, then resend the verification email.',true);
      await sdk.sendEmailVerification(firebaseAuth.currentUser);setStatus('Verification email sent.');
    }
    else if(action==='refresh-email'){
      if(!firebaseAuth?.currentUser)return setStatus('Sign in again to check your email verification.',true);
      await sdk.reload(firebaseAuth.currentUser);
      currentUser=firebaseAuth.currentUser;
      if(currentUser.emailVerified){await loadVerifiedUser(currentUser);setStatus('Email verified. Your member account is ready.');}
      else setStatus('Email is not verified yet. Open the link in your inbox, then check again.',true);
    }
    else if(action==='sign-out'){if(activeCallRef)await endCall();memberStatus='Signed out.';authMode='login';await sdk.signOut(firebaseAuth);appBridge.render();}
    else if(action==='copy-handle'){
      await navigator.clipboard.writeText(memberProfile.handle);setStatus('Username copied.');
    }
    else if(action==='accept-request')await acceptRequest(button.dataset.rel);
    else if(action==='open-thread'){
      const rel=relationships.find(item=>item.id===button.dataset.rel);
      if(rel){listenMessages(rel.id);appBridge.render();}
    }
    else if(action==='accept-call')await acceptVoiceCall(button.dataset.call);
    else if(action==='decline-call')await declineVoiceCall(button.dataset.call);
    else if(action==='start-call')await startVoiceCall();
    else if(action==='end-call')await endCall();
  }catch(error){setStatus(friendlyError(error),true);}
}

panel?.addEventListener('submit',event=>{
  if(event.target.id==='memberAuthForm')void submitMemberAuth(event);
  else if(event.target.id==='memberLookupForm')void lookupMember(event);
  else if(event.target.id==='memberMessageForm')void sendMemberMessage(event);
});
panel?.addEventListener('click',event=>{
  const button=event.target.closest('[data-member]');
  if(button)void handleMemberAction(button);
});
window.addEventListener('sfn:render',()=>{if(appBridge.getState().view==='members'){renderMembers();if(configured&&appBridge.isUnlocked?.()&&!firebaseStarted)void startFirebase();}});
window.addEventListener('sfn:unlocked',()=>{
  if(appBridge.getState().view==='members')void startFirebase();
  if(firebaseAuth?.currentUser)void loadVerifiedUser(firebaseAuth.currentUser);
});
window.addEventListener('sfn:locked',()=>{
  clearMemberSession();
  memberStatus='';
});
installMemberNavigation();
if(!document.querySelector('#memberRemoteAudio')){
  const remoteAudio=document.createElement('audio');
  remoteAudio.id='memberRemoteAudio';remoteAudio.autoplay=true;remoteAudio.playsInline=true;remoteAudio.style.display='none';
  document.body.append(remoteAudio);
}
if(configured&&appBridge.isUnlocked?.()&&appBridge.getState().view==='members')void startFirebase();
window.addEventListener('online',()=>{if(configured&&appBridge.isUnlocked?.()&&appBridge.getState().view==='members'&&!firebaseStarted)void startFirebase();});
