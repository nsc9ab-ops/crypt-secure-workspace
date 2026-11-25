package com.scottfn.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.RippleDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.WindowInsets;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

public final class MainActivity extends Activity {
    private static final int BACKGROUND = Color.rgb(7, 17, 20);
    private static final int SURFACE = Color.rgb(16, 33, 38);
    private static final int MINT = Color.rgb(101, 242, 193);
    private static final int GOLD = Color.rgb(243, 206, 131);
    private static final int TEXT = Color.rgb(233, 245, 243);
    private static final int MUTED = Color.rgb(156, 178, 178);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(BACKGROUND);
        getWindow().setNavigationBarColor(BACKGROUND);

        ScrollView scroll = new ScrollView(this);
        scroll.setFillViewport(true);
        scroll.setBackgroundColor(BACKGROUND);

        LinearLayout page = new LinearLayout(this);
        page.setOrientation(LinearLayout.VERTICAL);
        page.setPadding(dp(24), dp(28), dp(24), dp(28));
        scroll.addView(page);
        if (Build.VERSION.SDK_INT >= 35) {
            scroll.setOnApplyWindowInsetsListener((view, insets) -> {
                android.graphics.Insets bars = insets.getInsets(WindowInsets.Type.systemBars());
                page.setPadding(dp(24) + bars.left, dp(28) + bars.top,
                        dp(24) + bars.right, dp(28) + bars.bottom);
                return insets;
            });
        }
        setContentView(scroll);

        ImageView icon = new ImageView(this);
        icon.setImageResource(R.drawable.ic_launcher_foreground);
        icon.setContentDescription("Large phone lock icon");
        LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(dp(76), dp(76));
        iconParams.gravity = Gravity.START;
        page.addView(icon, iconParams);

        TextView brand = label("SCOTT.F.N  ·  PHONE LOCK", 11, MINT, true);
        brand.setLetterSpacing(0.12f);
        LinearLayout.LayoutParams brandParams = params(0, 0);
        brandParams.topMargin = dp(18);
        page.addView(brand, brandParams);

        TextView title = label("Lost phone?", 31, TEXT, true);
        LinearLayout.LayoutParams titleParams = params(0, 0);
        titleParams.topMargin = dp(9);
        page.addView(title, titleParams);

        TextView intro = label("Lock or find your Android phone from another device using Google’s official tools.", 15, MUTED, false);
        intro.setLineSpacing(dp(3), 1.0f);
        LinearLayout.LayoutParams introParams = params(0, 0);
        introParams.topMargin = dp(8);
        introParams.bottomMargin = dp(24);
        page.addView(intro, introParams);

        View lockAction = action("Lock a phone now", "Open Android Remote Lock", MINT, BACKGROUND,
                "https://android.com/lock", true);
        page.addView(lockAction, params(0, dp(66)));

        View findAction = action("Find or secure a phone", "Open Google Find Hub", SURFACE, TEXT,
                "https://android.com/find", false);
        LinearLayout.LayoutParams findParams = params(0, dp(66));
        findParams.topMargin = dp(12);
        page.addView(findAction, findParams);

        LinearLayout setupCard = new LinearLayout(this);
        setupCard.setOrientation(LinearLayout.VERTICAL);
        setupCard.setPadding(dp(18), dp(18), dp(18), dp(18));
        setupCard.setBackground(border(SURFACE, 16, Color.rgb(39, 74, 67)));
        LinearLayout.LayoutParams cardParams = params(0, 0);
        cardParams.topMargin = dp(28);
        page.addView(setupCard, cardParams);

        TextView setupHeading = label("Set this up before you need it", 16, TEXT, true);
        setupCard.addView(setupHeading, params(0, 0));

        TextView setupSteps = label("On the phone you want to protect, open Settings → Google → All services → Theft protection → Remote Lock. Turn it on, verify your number, and set the security challenge.", 14, MUTED, false);
        setupSteps.setLineSpacing(dp(4), 1.0f);
        LinearLayout.LayoutParams stepsParams = params(0, 0);
        stepsParams.topMargin = dp(10);
        setupCard.addView(setupSteps, stepsParams);

        TextView requirements = label("Remote Lock needs a verified phone number, an active SIM, internet access, and Find Hub enabled on the phone.", 12, GOLD, false);
        requirements.setLineSpacing(dp(3), 1.0f);
        LinearLayout.LayoutParams requirementParams = params(0, 0);
        requirementParams.topMargin = dp(14);
        setupCard.addView(requirements, requirementParams);

        TextView note = label("This app opens Google’s services. It doesn’t collect your Google password or lock devices by itself.", 12, MUTED, false);
        note.setLineSpacing(dp(3), 1.0f);
        LinearLayout.LayoutParams noteParams = params(0, 0);
        noteParams.topMargin = dp(18);
        page.addView(note, noteParams);
    }

    private View action(String title, String subtitle, int background, int foreground, String url, boolean primary) {
        LinearLayout button = new LinearLayout(this);
        button.setOrientation(LinearLayout.VERTICAL);
        button.setGravity(Gravity.CENTER_VERTICAL);
        button.setPadding(dp(18), dp(8), dp(18), dp(8));
        GradientDrawable shape = border(background, 15, primary ? MINT : Color.rgb(39, 59, 63));
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            button.setBackground(new RippleDrawable(ColorStateList.valueOf(primary ? 0x557FFFFF : 0x33FFFFFF), shape, null));
        } else {
            button.setBackground(shape);
        }
        button.setClickable(true);
        button.setFocusable(true);
        button.setOnClickListener(view -> open(url));

        TextView heading = label(title, 16, foreground, true);
        TextView detail = label(subtitle, 12, primary ? Color.rgb(18, 72, 57) : MUTED, false);
        LinearLayout.LayoutParams detailParams = params(0, 0);
        detailParams.topMargin = dp(3);
        button.addView(heading, params(0, 0));
        button.addView(detail, detailParams);
        button.setContentDescription(title + ". " + subtitle);
        return button;
    }

    private void open(String url) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (ActivityNotFoundException error) {
            Toast.makeText(this, "No browser is available to open this service.", Toast.LENGTH_LONG).show();
        }
    }

    private TextView label(String text, int sizeSp, int color, boolean bold) {
        TextView view = new TextView(this);
        view.setText(text);
        view.setTextColor(color);
        view.setTextSize(sizeSp);
        view.setTypeface(Typeface.create("sans-serif", bold ? Typeface.BOLD : Typeface.NORMAL));
        return view;
    }

    private GradientDrawable border(int color, int radiusDp, int strokeColor) {
        GradientDrawable shape = new GradientDrawable();
        shape.setColor(color);
        shape.setCornerRadius(dp(radiusDp));
        if (strokeColor != 0) shape.setStroke(dp(1), strokeColor);
        return shape;
    }

    private LinearLayout.LayoutParams params(int width, int height) {
        return new LinearLayout.LayoutParams(width == 0 ? LinearLayout.LayoutParams.MATCH_PARENT : width,
                height == 0 ? LinearLayout.LayoutParams.WRAP_CONTENT : height);
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }
}
