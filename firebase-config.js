/*
 * Public Firebase Web configuration belongs here.
 * Firebase client config is not a server secret. Firestore Rules and Auth must
 * be enabled before deploying; never put Admin SDK credentials in this file.
 */
window.SFN_FIREBASE_CONFIG = {
  apiKey: "REPLACE_WITH_FIREBASE_WEB_API_KEY",
  authDomain: "REPLACE_WITH_PROJECT.firebaseapp.com",
  projectId: "REPLACE_WITH_PROJECT_ID",
  appId: "REPLACE_WITH_FIREBASE_WEB_APP_ID"
};

/* STUN-only calling can fail on some networks. Configure a TURN relay through
 * a provider or a protected token endpoint for reliable cross-network calls. */
window.SFN_CALL_ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" }
];
