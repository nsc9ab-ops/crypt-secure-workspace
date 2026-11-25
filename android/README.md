# Scott.F.N Phone Lock

This native Android app provides a large **Lock a phone now** action and a second shortcut to Google Find Hub. The lock action opens [Android Remote Lock](https://android.com/lock); Google verifies the request and locks the selected phone. The Find Hub action opens [android.com/find](https://android.com/find), where you can locate, ring, mark lost, or erase a device. It installs as a separate **Phone Lock** app alongside older Scott.F.N installs, preserving their local data.

Prepare each phone before it is lost. On that phone, open **Settings → Google → All services → Theft protection → Remote Lock**, turn Remote Lock on, verify its phone number, and set the security challenge. Remote Lock requires an active SIM, internet access, and Find Hub enabled. Requirements and availability can vary by device; follow [Google's current instructions](https://www.android.com/articles/protect-your-device-with-secure-lock/).

The app opens Google’s official services and does not collect Google passwords, device location, or personal data. It needs no Android permissions.

The checked-in build helper builds a debug-signed APK for direct installation. A Play Store release requires a separately managed release signing key and Play Console preparation.
