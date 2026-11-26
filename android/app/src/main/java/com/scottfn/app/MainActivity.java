package com.scottfn.app;

import android.Manifest;
import android.content.Intent;
import android.content.ContentValues;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.os.Bundle;
import android.webkit.GeolocationPermissions;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.io.OutputStream;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

import java.util.ArrayList;

public final class MainActivity extends FragmentActivity {
    private static final int REQUEST_MEDIA = 41;
    private static final int REQUEST_GEO = 42;
    private static final int REQUEST_FILE = 43;
    private static final int REQUEST_SAVE_PDF = 44;
    private static final String SITE = "https://nsc9ab-ops.github.io/crypt-secure-workspace/";
    private static final String KEY_ALIAS = "scottfn_vault_biometric_v1";
    private static final String PREFS = "scottfn_biometric";
    private WebView webView;
    private PermissionRequest pendingMediaRequest;
    private String[] pendingMediaResources;
    private GeolocationPermissions.Callback pendingGeoCallback;
    private String pendingGeoOrigin;
    private ValueCallback<Uri[]> pendingFileCallback;
    private byte[] pendingPdf;
    private String pendingPdfName;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        webView.addJavascriptInterface(new NativeBiometrics(), "sfnNative");
        setContentView(webView);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setTextZoom(110);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setSupportMultipleWindows(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        if (android.os.Build.VERSION.SDK_INT >= 26) settings.setSafeBrowsingEnabled(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (isTrustedSite(uri)) return false;
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, uri));
                } catch (Exception ignored) { }
                return true;
            }
        });
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(PermissionRequest request) {
                if (!isTrustedSite(Uri.parse(request.getOrigin().toString()))) {
                    request.deny();
                    return;
                }
                ArrayList<String> requestedResources = new ArrayList<>();
                ArrayList<String> androidPermissions = new ArrayList<>();
                for (String resource : request.getResources()) {
                    if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(resource)) {
                        requestedResources.add(resource);
                        if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED)
                            androidPermissions.add(Manifest.permission.CAMERA);
                    } else if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(resource)) {
                        requestedResources.add(resource);
                        if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED)
                            androidPermissions.add(Manifest.permission.RECORD_AUDIO);
                    }
                }
                if (requestedResources.isEmpty()) {
                    request.deny();
                } else if (!androidPermissions.isEmpty()) {
                    pendingMediaRequest = request;
                    pendingMediaResources = requestedResources.toArray(new String[0]);
                    requestPermissions(androidPermissions.toArray(new String[0]), REQUEST_MEDIA);
                } else request.grant(requestedResources.toArray(new String[0]));
            }

            @Override
            public void onPermissionRequestCanceled(PermissionRequest request) {
                if (pendingMediaRequest == request) {
                    pendingMediaRequest = null;
                    pendingMediaResources = null;
                }
            }

            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                        || checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                    callback.invoke(origin, true, false);
                } else {
                    pendingGeoOrigin = origin;
                    pendingGeoCallback = callback;
                    requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, REQUEST_GEO);
                }
            }

            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (pendingFileCallback != null) pendingFileCallback.onReceiveValue(null);
                pendingFileCallback = callback;
                Intent intent;
                try {
                    intent = params.createIntent();
                    startActivityForResult(intent, REQUEST_FILE);
                    return true;
                } catch (Exception error) {
                    pendingFileCallback = null;
                    callback.onReceiveValue(null);
                    return false;
                }
            }
        });
        webView.loadUrl(SITE);
    }

    private boolean isTrustedSite(Uri uri) {
        return uri != null && "https".equalsIgnoreCase(uri.getScheme())
                && "nsc9ab-ops.github.io".equalsIgnoreCase(uri.getHost())
                && (uri.getPort() == -1 || uri.getPort() == 443);
    }

    private SecretKey biometricKey() throws Exception {
        KeyStore store = KeyStore.getInstance("AndroidKeyStore");
        store.load(null);
        return (SecretKey) store.getKey(KEY_ALIAS, null);
    }

    private boolean biometricReady() {
        return BiometricManager.from(this).canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)
                == BiometricManager.BIOMETRIC_SUCCESS;
    }

    private void sendBiometricResult(String action, boolean success, String value) {
        String js = "window.sfnNativeBiometricResult&&window.sfnNativeBiometricResult(" +
                org.json.JSONObject.quote(action) + "," + success + "," + org.json.JSONObject.quote(value) + ")";
        runOnUiThread(() -> { if (webView != null) webView.evaluateJavascript(js, null); });
    }

    private void sendPdfResult(String filename, String error) {
        String js = "window.sfnPdfSaved&&window.sfnPdfSaved(" + org.json.JSONObject.quote(filename) + "," + org.json.JSONObject.quote(error) + ")";
        runOnUiThread(() -> { if (webView != null) webView.evaluateJavascript(js, null); });
    }

    private void savePdfToDownloads(byte[] data, String filename) throws Exception {
        ContentValues values = new ContentValues();
        values.put(MediaStore.Downloads.DISPLAY_NAME, filename);
        values.put(MediaStore.Downloads.MIME_TYPE, "application/pdf");
        values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
        values.put(MediaStore.Downloads.IS_PENDING, 1);
        Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
        if (uri == null) throw new IllegalStateException("Could not create a file in Downloads.");
        try (OutputStream output = getContentResolver().openOutputStream(uri)) {
            if (output == null) throw new IllegalStateException("Could not open the new PDF file.");
            output.write(data);
        } catch (Exception error) {
            getContentResolver().delete(uri, null, null);
            throw error;
        }
        ContentValues ready = new ContentValues(); ready.put(MediaStore.Downloads.IS_PENDING, 0);
        getContentResolver().update(uri, ready, null, null);
        sendPdfResult(filename, "");
    }

    private void authenticate(String action, Cipher cipher, byte[] input) {
        runOnUiThread(() -> {
        BiometricPrompt prompt = new BiometricPrompt(this, ContextCompat.getMainExecutor(this),
                new BiometricPrompt.AuthenticationCallback() {
                    @Override public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                        try {
                            byte[] output = result.getCryptoObject().getCipher().doFinal(input);
                            if ("setup".equals(action)) {
                                getSharedPreferences(PREFS, MODE_PRIVATE).edit()
                                        .putString("iv", Base64.encodeToString(result.getCryptoObject().getCipher().getIV(), Base64.NO_WRAP))
                                        .putString("wrapped", Base64.encodeToString(output, Base64.NO_WRAP)).apply();
                                sendBiometricResult(action, true, "");
                            } else sendBiometricResult(action, true, Base64.encodeToString(output, Base64.NO_WRAP));
                        } catch (Exception error) { sendBiometricResult(action, false, "Could not process the encrypted vault key. Set up biometrics again."); }
                    }
                    @Override public void onAuthenticationError(int code, CharSequence message) {
                        sendBiometricResult(action, false, message == null ? "Biometric authentication failed." : message.toString());
                    }
                    @Override public void onAuthenticationFailed() { }
                });
        BiometricPrompt.PromptInfo info = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("Scott.F.N secure unlock")
                .setSubtitle("Use your face or fingerprint to unlock this device vault")
                .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
                .setNegativeButtonText("Cancel")
                .build();
        prompt.authenticate(info, new BiometricPrompt.CryptoObject(cipher));
        });
    }

    private final class NativeBiometrics {
        @JavascriptInterface public void setTextZoom(int percent) {
            int safe = Math.max(90, Math.min(160, percent));
            runOnUiThread(() -> { if (webView != null) webView.getSettings().setTextZoom(safe); });
        }
        @JavascriptInterface public boolean isAvailable() { return biometricReady(); }
        @JavascriptInterface public boolean isEnrolled() {
            return getSharedPreferences(PREFS, MODE_PRIVATE).contains("wrapped") && biometricReady();
        }
        @JavascriptInterface public void savePdf(String base64, String filename) {
            if (!isTrustedSite(Uri.parse(webView.getUrl()))) return;
            try {
                byte[] data = Base64.decode(base64, Base64.DEFAULT);
                if (data.length == 0 || data.length > 40 * 1024 * 1024) throw new IllegalArgumentException("This PDF is empty or too large to save.");
                String safeName = filename == null ? "Scott-FN-Scan.pdf" : filename.replaceAll("[\\\\/:*?\"<>|]", "-");
                if (android.os.Build.VERSION.SDK_INT >= 29) savePdfToDownloads(data, safeName);
                else {
                    pendingPdf = data; pendingPdfName = safeName;
                    runOnUiThread(() -> {
                        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                        intent.addCategory(Intent.CATEGORY_OPENABLE); intent.setType("application/pdf");
                        intent.putExtra(Intent.EXTRA_TITLE, pendingPdfName);
                        startActivityForResult(intent, REQUEST_SAVE_PDF);
                    });
                }
            } catch (Exception error) { sendPdfResult(filename == null ? "PDF" : filename, error.getMessage() == null ? "Could not save this PDF." : error.getMessage()); }
        }
        @JavascriptInterface public void setup(String keyBase64) {
            if (!isTrustedSite(Uri.parse(webView.getUrl()))) return;
            try {
                if (!biometricReady()) throw new IllegalStateException("Set up a secure face or fingerprint in Android settings first.");
                KeyStore store = KeyStore.getInstance("AndroidKeyStore"); store.load(null);
                if (store.containsAlias(KEY_ALIAS)) store.deleteEntry(KEY_ALIAS);
                KeyGenerator generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
                KeyGenParameterSpec.Builder spec = new KeyGenParameterSpec.Builder(KEY_ALIAS,
                        KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
                        .setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                        .setUserAuthenticationRequired(true);
                if (android.os.Build.VERSION.SDK_INT >= 24) spec.setInvalidatedByBiometricEnrollment(true);
                if (android.os.Build.VERSION.SDK_INT >= 30) spec.setUserAuthenticationParameters(0, KeyProperties.AUTH_BIOMETRIC_STRONG);
                else spec.setUserAuthenticationValidityDurationSeconds(-1);
                generator.init(spec.build()); generator.generateKey();
                Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding"); cipher.init(Cipher.ENCRYPT_MODE, biometricKey());
                getSharedPreferences(PREFS, MODE_PRIVATE).edit().clear().apply();
                authenticate("setup", cipher, Base64.decode(keyBase64, Base64.NO_WRAP));
            } catch (Exception error) { sendBiometricResult("setup", false, error.getMessage() == null ? "Biometric setup failed." : error.getMessage()); }
        }
        @JavascriptInterface public void unlock() {
            if (!isTrustedSite(Uri.parse(webView.getUrl()))) return;
            try {
                if (!biometricReady()) throw new IllegalStateException("No secure face or fingerprint is available on this device.");
                android.content.SharedPreferences prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
                byte[] iv = Base64.decode(prefs.getString("iv", ""), Base64.NO_WRAP);
                byte[] wrapped = Base64.decode(prefs.getString("wrapped", ""), Base64.NO_WRAP);
                if (wrapped.length == 0) throw new IllegalStateException("Set up face or fingerprint unlock after opening the app with your password.");
                Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
                cipher.init(Cipher.DECRYPT_MODE, biometricKey(), new GCMParameterSpec(128, iv));
                authenticate("unlock", cipher, wrapped);
            } catch (Exception error) { sendBiometricResult("unlock", false, error.getMessage() == null ? "Biometric unlock failed." : error.getMessage()); }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_MEDIA && pendingMediaRequest != null) {
            PermissionRequest request = pendingMediaRequest;
            String[] resources = pendingMediaResources;
            pendingMediaRequest = null;
            pendingMediaResources = null;
            boolean granted = grantResults.length > 0;
            for (int result : grantResults) if (result != PackageManager.PERMISSION_GRANTED) granted = false;
            if (granted && resources != null) request.grant(resources);
            else request.deny();
        } else if (requestCode == REQUEST_GEO && pendingGeoCallback != null) {
            boolean granted = false;
            for (int result : grantResults) if (result == PackageManager.PERMISSION_GRANTED) granted = true;
            pendingGeoCallback.invoke(pendingGeoOrigin, granted, false);
            pendingGeoCallback = null;
            pendingGeoOrigin = null;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_SAVE_PDF) {
            if (resultCode == RESULT_OK && data != null && pendingPdf != null) {
                try (OutputStream output = getContentResolver().openOutputStream(data.getData())) {
                    if (output == null) throw new IllegalStateException("Could not open the selected location.");
                    output.write(pendingPdf); sendPdfResult(pendingPdfName, "");
                } catch (Exception error) { sendPdfResult(pendingPdfName, error.getMessage() == null ? "Could not save this PDF." : error.getMessage()); }
            } else if (resultCode != RESULT_OK) sendPdfResult(pendingPdfName == null ? "PDF" : pendingPdfName, "Save cancelled.");
            pendingPdf = null; pendingPdfName = null;
        } else if (requestCode == REQUEST_FILE && pendingFileCallback != null) {
            Uri[] result = resultCode == RESULT_OK && data != null ? WebChromeClient.FileChooserParams.parseResult(resultCode, data) : null;
            pendingFileCallback.onReceiveValue(result);
            pendingFileCallback = null;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
        }
        super.onDestroy();
    }
}
