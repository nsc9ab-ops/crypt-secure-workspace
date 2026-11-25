# Scott.F.N Personal Hub

Live site: https://nsc9ab-ops.github.io/crypt-secure-workspace/

A futuristic, local-first personal workspace with a calendar, camera capture, QR/barcode home inventory, a private file vault, local financial record signing, current-device location, and appearance settings. A Firebase-backed Members area supports verified accounts, generated usernames, friend requests, live text messages, and foreground voice-call signaling after a Firebase project is configured.

The LIFEKEEP starter structure is included as a command-centre view for finances, savings goals, home intelligence, smart shopping, shared life, calendar/tasks, protection, trusted devices, and settings. Its demo structure links into Scott.F.N's existing local modules. A password screen sets a local browser access lock. Messages, cycle notes, and financial signatures are encrypted locally with AES-GCM after password unlock. During first setup the app creates a recovery code that can change the password while preserving encrypted records; save that code in a password manager or offline safe because the app cannot recover a lost code. Other app state and uploaded files remain local browser data and are not encrypted at rest. The emergency erase code `@254` permanently erases this device’s Scott.F.N local data; it is not a recovery method. The connection badge reports the browser's online/offline status.

The site is published through GitHub Pages using the `Publish Scott.F.N website` workflow. Financial files, notes, location, and signatures remain in the user’s browser; uploaded files are not encrypted at rest. A local signature is not identity verification or payment authorization. Once the Firebase project and supplied Firestore rules are configured, Firebase Authentication and those rules protect member chats. Messages are not end-to-end encrypted. Do not use the chat for passwords, verification codes, financial credentials, or sensitive health data.

The website and installed PWA use the Scott.F.N emblem. The Android launcher uses a larger adaptive lock icon. The Android APK download is published at [downloads/ScottFN.apk](https://nsc9ab-ops.github.io/crypt-secure-workspace/downloads/ScottFN.apk). It is a native quick-launch app with two actions: open [Android Remote Lock](https://android.com/lock) or open [Google Find Hub](https://android.com/find). Google handles account verification and the remote lock request. Before a loss, enable Remote Lock on the phone under Settings → Google → All services → Theft protection → Remote Lock, verify its phone number, and set the security challenge. Remote Lock also requires an active SIM, an internet connection, and Find Hub enabled. See [Google's setup and lock instructions](https://www.android.com/articles/protect-your-device-with-secure-lock/). The app asks for no camera, microphone, location, or storage permissions.

## Firebase member service setup

The repository includes the client integration, `firestore.rules`, and `firestore.indexes.json`. The published site shows setup instructions until a Firebase Web app config is added to `firebase-config.js`. A Firebase project must be created in the owner's Google account; this repository cannot create or link the project automatically.

1. Create a Firebase project and register a Web app. Copy its Web config values into `firebase-config.js` (`apiKey`, `authDomain`, `projectId`, and `appId`). Firebase Web config is public client config; never add Admin SDK keys or service account credentials.
2. In Firebase Authentication, enable Email/Password and set up email verification. Add `nsc9ab-ops.github.io` to the authorized domains.
3. Create a Cloud Firestore database.
4. Install the Firebase CLI, authenticate with the project owner account, then deploy the included rules and index: `firebase deploy --only firestore --project YOUR_PROJECT_ID`.
5. Publish the updated site. Members register with email and a password, verify email, sign in, then share their generated `SFN-XXXX-XXXX` username. A friend request must be accepted before messaging or calling.

Voice calls use WebRTC. The included public STUN server may not connect peers on every network; add TURN through a provider or protected token service for broader reach. Do not put permanent TURN credentials in this public site. Firebase signaling supports calls while the app is open; background ringing and push notifications are not included.

Until a real Firebase project config and deployed rules are supplied, account creation, cross-device messaging, and calls remain inactive. The existing local chat notes continue to be stored on the device.
