package com.example.code4all.controllers.exercice_engine;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.constraint.ConstraintLayout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.customviews.MyDialogFragment;
import com.example.code4all.customviews.MyEditText;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;

public class TestDialogFragment  extends MyDialogFragment {

    private static ExerciceFunction[] tests;

    public static TestDialogFragment getInstance(ExerciceFunction[] testsReceived){
        TestDialogFragment fragment = new TestDialogFragment();
        tests = testsReceived;

        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_tests_and_result, null);
        LinearLayout linearLayout = dialogFragment.findViewById(R.id.testArea);
        for(ExerciceFunction test: tests){
            ConstraintLayout row = (ConstraintLayout) inflater.inflate(R.layout.test_detailled_layout, null);
            TextView testName = row.findViewById(R.id.testName);
            TextView testDescription = row.findViewById(R.id.testDetail);
            testName.setText(test.getName());
            testDescription.setText(test.getDescription());
            linearLayout.addView(row);
        }

        return dialogFragment;
    }

    @Override
    public void onResume() {
        super.onResume();
        int width = getResources().getDimensionPixelSize(R.dimen.popup_width);
        int height = getResources().getDimensionPixelSize(R.dimen.popup_height);
        getDialog().getWindow().setLayout(width, height);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
