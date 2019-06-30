package com.codinschool.android.controllers.exercice_engine;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.constraint.ConstraintLayout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.codinschool.android.R;
import com.codinschool.android.customviews.MyDialogFragment;
import com.codinschool.android.data_pojo.tests.Test;

import java.util.ArrayList;

/**
 * The type Result dialog fragment.
 */
public class ResultDialogFragment extends MyDialogFragment {

    private static ArrayList<Test> tests;
    private static final String TAG = "ResultDialogFragment";

    /**
     * Get instance result dialog fragment.
     *
     * @param testsReceived the tests received
     * @return the result dialog fragment
     */
    public static ResultDialogFragment getInstance(ArrayList<Test> testsReceived){
        ResultDialogFragment fragment = new ResultDialogFragment();
        tests = testsReceived;

        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        this.setCancelable(false);

        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_result, null);
        LinearLayout linearLayout = dialogFragment.findViewById(R.id.testArea);
        TextView testResultMessage = dialogFragment.findViewById(R.id.testResultMessage);
        TextView testResultDetail = dialogFragment.findViewById(R.id.testResultDetail);
        Button buttonClose = dialogFragment.findViewById(R.id.buttonClose);
        buttonClose.setOnClickListener(v -> dismiss());

        int goodTestNumber = 0;
        for(Test test: tests){
            ConstraintLayout row = (ConstraintLayout) inflater.inflate(R.layout.test_detailled_layout, null);
            Object[] result = test.getResults();
            ImageView image = row.findViewById(R.id.imageIcon);
            TextView testName = row.findViewById(R.id.testName);
            TextView testDescription = row.findViewById(R.id.testDetail);
            testName.setText(test.getName());
            if(result != null){
                testDescription.setText(String.valueOf(result[1]));
                if(!((boolean) result[0]))
                    image.setImageResource(R.drawable.notverified);
                else{
                    image.setImageResource(R.drawable.verified);
                    goodTestNumber++;
                }
            }

            if(goodTestNumber == tests.size()){
                testResultMessage.setText(getResources().getString(R.string.congratulations));
                testResultMessage.setTextColor(getResources().getColor(R.color.green));
                testResultDetail.setTextColor(getResources().getColor(R.color.green));
                testResultDetail.setText("You have completed all of the " + goodTestNumber + " tests !");
            } else {
                testResultMessage.setText(getResources().getString(R.string.fail));
                testResultMessage.setTextColor(getResources().getColor(R.color.red));
                testResultDetail.setTextColor(getResources().getColor(R.color.red));
                testResultDetail.setText("Only " +goodTestNumber + " test over " + tests.size() + " are are good");
            }

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
