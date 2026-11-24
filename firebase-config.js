/*
 * Public Firebase Web configuration belongs here.
 * Firebase client config is not a server secret. Firestore Rules and Auth must
 * be enabled before deploying; never put Admin SDK credentials in this file.
 */
window.SFN_FIREBASE_CONFIG = {
  apiKey: ***
  authDomain: "scott-bac91.firebaseapp.com",
  projectId: "scott-bac91",
  storageBucket: "scott-bac91.firebasestorage.app",
  messagingSenderId: "155240318820",
  appId: "1:155240318820:web:da957b5ffd7e7091561c71",
  measurementId: "G-VH9P8PJ1EG"
};

window.SFN_CALL_ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" }
];
