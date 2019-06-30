package com.example.codinschool.controllers.exercice_engine;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.constraint.ConstraintLayout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.example.codinschool.R;
import com.example.codinschool.customviews.MyDialogFragment;
import com.example.codinschool.data_pojo.exercice_functions.ExerciceFunction;

/**
 * The type Test dialog fragment.
 */
public class TestDialogFragment  extends MyDialogFragment {

    private static ExerciceFunction[] tests;

    /**
     * Get instance test dialog fragment.
     *
     * @param testsReceived the tests received
     * @return the test dialog fragment
     */
    public static TestDialogFragment getInstance(ExerciceFunction[] testsReceived){
        TestDialogFragment fragment = new TestDialogFragment();
        tests = testsReceived;

        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_tests, null);
        LinearLayout linearLayout = dialogFragment.findViewById(R.id.testArea);
        for(ExerciceFunction test: tests){
            ConstraintLayout row = (ConstraintLayout) inflater.inflate(R.layout.test_detailled_layout, null);
            ImageView imageView = row.findViewById(R.id.imageIcon);
            TextView testName = row.findViewById(R.id.testName);
            TextView testDescription = row.findViewById(R.id.testDetail);
            testName.setText(test.getName());
            testDescription.setText(test.getDescription());
            imageView.setVisibility(View.GONE);
            linearLayout.addView(row);
        }

        return dialogFragment;
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
