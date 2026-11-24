# Scott.F.N Personal Hub

Live site: https://nsc9ab-ops.github.io/crypt-secure-workspace/

A futuristic, local-first personal workspace with messages, a calendar, camera capture, QR/barcode home inventory, a private file vault, local financial record signing, current-device location, and appearance settings. The app has no user accounts, server data sync, or end-to-end messaging.

The LIFEKEEP starter structure is included as a command-centre view for finances, savings goals, home intelligence, smart shopping, shared life, calendar/tasks, protection, trusted devices, and settings. Its demo structure links into Scott.F.N's existing local modules. A password screen can set a local browser access lock; this is not an online account and does not encrypt browser data or sync credentials across devices. The connection badge reports the browser's online/offline status.

The site is published through GitHub Pages using the `Publish Scott.F.N website` workflow. Financial files, notes, location, and signatures remain in the user’s browser; uploaded files are not encrypted at rest. A local signature is not identity verification or payment authorization.

The Android APK download is published at [downloads/ScottFN.apk](https://nsc9ab-ops.github.io/crypt-secure-workspace/downloads/ScottFN.apk). It is a debug-signed WebView wrapper around the live website, so internet access is required. Android requests camera/location permissions only when those features are opened. Cycle records stay in that app installation's browser storage.
