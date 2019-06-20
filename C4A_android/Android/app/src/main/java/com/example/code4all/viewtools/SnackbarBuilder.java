package com.example.code4all.viewtools;

import android.support.design.snackbar.ContentViewCallback;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import com.example.code4all.R;

public class SnackbarBuilder {
    public static Snackbar make(View view, CharSequence sequence, int duration, int color){
        Snackbar snackbar = Snackbar.make(view, sequence, duration);
        if(color != -1){
            View snackView = snackbar.getView();
            TextView textView = snackView.findViewById(android.support.design.R.id.snackbar_text);
            textView.setTextColor(ContextCompat.getColor(view.getContext(), color));
        }

        return snackbar;
    }
}
