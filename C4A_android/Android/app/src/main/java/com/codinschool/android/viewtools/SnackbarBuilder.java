package com.codinschool.android.viewtools;

import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.widget.TextView;

/**
 * The type Snackbar builder.
 */
public class SnackbarBuilder {
    /**
     * Make snackbar.
     *
     * @param view     the view
     * @param sequence the sequence
     * @param duration the duration
     * @param color    the color
     * @return the snackbar
     */
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
