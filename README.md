# Scott.F.N Personal Hub

Live site: https://nsc9ab-ops.github.io/crypt-secure-workspace/

A futuristic, local-first personal workspace with messages, a calendar, camera capture, QR/barcode home inventory, a private file vault, local financial record signing, current-device location, and appearance settings. The app has no user accounts, server data sync, or end-to-end messaging.

The LIFEKEEP starter structure is included as a command-centre view for finances, savings goals, home intelligence, smart shopping, shared life, calendar/tasks, protection, trusted devices, and settings. Its demo structure links into Scott.F.N's existing local modules. A password screen sets a local browser access lock. Messages, cycle notes, and financial signatures are encrypted locally with AES-GCM after password unlock. Other app state and uploaded files remain local browser data and are not encrypted at rest. The universal reset code `@254` erases this device’s Scott.F.N local data so a new password can be created; it cannot recover existing encrypted records. The connection badge reports the browser's online/offline status.

The site is published through GitHub Pages using the `Publish Scott.F.N website` workflow. Financial files, notes, location, and signatures remain in the user’s browser; uploaded files are not encrypted at rest. A local signature is not identity verification or payment authorization.

The supplied Scott.F.N emblem is used for the website, installed PWA, and Android launcher icon. The Android APK download is published at [downloads/ScottFN.apk](https://nsc9ab-ops.github.io/crypt-secure-workspace/downloads/ScottFN.apk). It is a debug-signed WebView wrapper around the live website, so internet access is required. Android requests camera/location permissions only when those features are opened. Cycle records stay in that app installation's browser storage.

Online member messaging and voice calls are not active yet. The current site is a static GitHub Pages app with local notes only; member accounts, unique usernames, message delivery, call signaling, and a relay service need a configured online backend.
