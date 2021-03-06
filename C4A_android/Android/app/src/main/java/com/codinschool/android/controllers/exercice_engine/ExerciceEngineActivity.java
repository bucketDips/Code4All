package com.codinschool.android.controllers.exercice_engine;

import android.content.res.Configuration;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.FragmentManager;
import android.view.View;
import android.widget.*;
import com.codinschool.android.R;
import com.codinschool.android.customviews.MyAppCompatActivity;
import com.codinschool.android.data_pojo.exercice.Exercice;
import com.codinschool.android.data_pojo.exercice.ExerciceManager;
import com.codinschool.android.data_pojo.exercice_functions.ExerciceFunction;
import com.codinschool.android.data_pojo.tests.Test;

import java.util.ArrayList;

/**
 * The type Exercice engine activity.
 */
public class ExerciceEngineActivity extends MyAppCompatActivity{

    /**
     * The Exercice json.
     */
    static final String EXERCICE_JSON = "EXERCICE_JSON";
    /**
     * The Exercice files json array.
     */
    static final String EXERCICE_FILES_JSON_ARRAY = "EXERCICE_FILES_JSON_ARRAY";
    /**
     * The Exercice function json array.
     */
    static final String EXERCICE_FUNCTION_JSON_ARRAY = "EXERCICE_FUNCTION_JSON_ARRAY";
    private final String TAG = "ExerciceEngineActivity";
    private ExerciceManager exerciceManager;
    private ConstraintLayout root;
    private FrameLayout frameLayoutLeft;
    private FrameLayout frameLayoutRight;
    private LinearLayout linearLayout;
    private GridExerciceFragment gridExerciceFragment;
    private CodeExerciceFragment codeExerciceFragment;
    private SeekBar topSeekBar;


    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        updateLinearLayoutChildren(newConfig);

    }

    private void updateLinearLayoutChildren(Configuration newConfig) {
        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
            linearLayout.setOrientation(LinearLayout.HORIZONTAL);
        } else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) {
            linearLayout.setOrientation(LinearLayout.VERTICAL);
        }

        int max = linearLayout.getChildCount();
        for (int i = 0; i < max; i++) {
            if (linearLayout.getChildAt(i) instanceof FrameLayout) {
                FrameLayout frameLayout = (FrameLayout) linearLayout.getChildAt(i);
                LinearLayout.LayoutParams layoutParams = (LinearLayout.LayoutParams) frameLayout.getLayoutParams();
                int height = layoutParams.height;
                int width = layoutParams.width;
                layoutParams.width = height;
                layoutParams.height = width;
            } else {
                View View =  linearLayout.getChildAt(i);
                LinearLayout.LayoutParams layoutParams = (LinearLayout.LayoutParams) View.getLayoutParams();
                int height = layoutParams.height;
                int width = layoutParams.width;
                layoutParams.width = height;
                layoutParams.height = width;
            }
        }
    }

    private void bindUi(){
        root = findViewById(R.id.root);
        topSeekBar = findViewById(R.id.seekBarTop);
        frameLayoutLeft = findViewById(R.id.fragment_grid_holder);
        frameLayoutRight = findViewById(R.id.fragment_code_blocks);
        linearLayout = findViewById(R.id.linearLayout);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        bindUi();
        if(this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT){
            updateLinearLayoutChildren(this.getResources().getConfiguration());
        }

        topSeekBar.setOnSeekBarChangeListener(new ExerciceEngineActivityOnSeekBarChangeListener());

        if(getIntent().hasExtra(EXERCICE_JSON)){
            String exerciceJson = getIntent().getExtras().getString(EXERCICE_JSON);
            showGridExerciceFragment(getSupportFragmentManager(), exerciceJson);
            showCodeExerciceFragment(getSupportFragmentManager(), exerciceJson);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    private void showGridExerciceFragment(FragmentManager supportFragmentManager, String exerciceJson) {
        Bundle bundle = new Bundle();
        bundle.putString(ExerciceEngineActivity.EXERCICE_JSON, exerciceJson);
        gridExerciceFragment = new GridExerciceFragment();
        gridExerciceFragment.setArguments(bundle);

        supportFragmentManager.beginTransaction().add(R.id.fragment_grid_holder, gridExerciceFragment).commit();
    }

    private void showCodeExerciceFragment(FragmentManager supportFragmentManager, String exerciceJson) {
        Bundle bundle = new Bundle();
        bundle.putString(ExerciceEngineActivity.EXERCICE_JSON, exerciceJson);
        codeExerciceFragment = new CodeExerciceFragment();
        codeExerciceFragment.setArguments(bundle);

        supportFragmentManager.beginTransaction().add(R.id.fragment_code_blocks, codeExerciceFragment).commit();
    }


    private void updateTwoFragmentWeight(int progress){
        float progressRescaled = (float) progress / 100;

        LinearLayout.LayoutParams layoutParamsFrameLayoutLeft = (LinearLayout.LayoutParams) this.frameLayoutLeft.getLayoutParams();
        LinearLayout.LayoutParams layoutParamsFrameLayoutRight = (LinearLayout.LayoutParams) this.frameLayoutRight.getLayoutParams();

        if (layoutParamsFrameLayoutLeft != null && layoutParamsFrameLayoutRight != null) {

            layoutParamsFrameLayoutRight.weight = progressRescaled;
            layoutParamsFrameLayoutLeft.weight = (float) 1 - progressRescaled;
        }
    }

    @Override
    public FragmentManager getSupportFragmentManager() {
        return super.getSupportFragmentManager();
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_exercice_engine;
    }

    @Override
    protected View getRootView() {
        return root;
    }

    /**
     * Send frames to grid exercice fragment.
     *
     * @param exerciceFrames the exercice frames
     * @param tests          the tests
     */
    public void sendFramesToGridExerciceFragment(ArrayList<Exercice> exerciceFrames, ArrayList<Test> tests) {
        gridExerciceFragment.updateFragmentGrid(exerciceFrames, tests);
    }

    /**
     * Show dialog test details.
     *
     * @param tests the tests
     */
    public void showDialogTestDetails(ExerciceFunction[] tests) {
        TestDialogFragment dialogFragment = TestDialogFragment.getInstance(tests);
        dialogFragment.show(getSupportFragmentManager(), "DIALOG_FRAGMENT_TESTS_DETAILS");
    }

    /**
     * Show result dialog fragment.
     *
     * @param tests the tests
     */
    public void showResultDialogFragment(ArrayList<Test> tests) {
        ResultDialogFragment dialogFragment = ResultDialogFragment.getInstance(tests);
        dialogFragment.show(getSupportFragmentManager(), "DIALOG_FRAGMENT_RESULT");
        codeExerciceFragment.enableButtonRun();
    }

    private final class ExerciceEngineActivityOnSeekBarChangeListener implements SeekBar.OnSeekBarChangeListener {
        /**
         * Instantiates a new Exercice engine activity on seek bar change listener.
         */
        ExerciceEngineActivityOnSeekBarChangeListener(){ }
        @Override
        public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
            updateTwoFragmentWeight(progress);
        }

        @Override
        public void onStartTrackingTouch(SeekBar seekBar) {}

        @Override
        public void onStopTrackingTouch(SeekBar seekBar) {}
    }
}

