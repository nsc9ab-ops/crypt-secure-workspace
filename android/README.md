# Scott.F.N Android wrapper

This small Android app uses the supplied Scott.F.N emblem as its launcher icon and opens the hosted Scott.F.N site in Android WebView. It needs internet access. Browser storage belongs to this app installation and stays separate from Chrome and other phones.

Camera, location, and file access are requested only after the corresponding site feature is used. Android permission prompts must be accepted as well as the website prompt. WhatsApp opens outside the app.

The password screen is a local browser lock, not an online account. Private messages, cycle notes, and financial signatures are encrypted locally after password unlock. Other app data and uploaded files remain in the app browser storage without at-rest encryption. The universal reset code `@254` permanently erases this installation’s app data; it cannot restore encrypted records.

The checked-in build helper builds a debug-signed APK for direct testing. A Play Store release requires a separately managed release signing key and Play Console preparation.
