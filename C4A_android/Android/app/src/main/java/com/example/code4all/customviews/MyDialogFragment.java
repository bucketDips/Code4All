package com.example.code4all.customviews;

import android.app.Dialog;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.view.Window;

import java.util.Objects;

public class MyDialogFragment extends DialogFragment {
    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {

        Dialog dialogFragment =  super.onCreateDialog(savedInstanceState);

        Objects.requireNonNull(dialogFragment.getWindow()).requestFeature(Window.FEATURE_NO_TITLE);

        return dialogFragment;
    }
}
