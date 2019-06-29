package com.example.codinschool.viewtools;

import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.widget.TextView;

public class SnackbarBuilder {
    public static Snackbar make(View view, CharSequence sequence, int duration, int color){
        Snackbar snackbar = Snackbar.make(view, sequence, duration);
        if(color != -1){
            View snackView = snackbar.getView();
            TextView textView = snackView.findViewById(android.support.design.R.id.snackbar_text);
            textView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
            textView.setTextColor(ContextCompat.getColor(view.getContext(), color));
        }

        return snackbar;
    }
}
