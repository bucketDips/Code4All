package com.example.code4all.controllers.exercice_engine;

import android.content.res.Configuration;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.FragmentManager;
import android.util.Log;
import android.view.View;
import android.widget.*;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.customviews.MyAppCompatActivity;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.exercice.ExerciceManager;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ExerciceEngineActivity extends MyAppCompatActivity{

    static final String EXERCICE_JSON = "EXERCICE_JSON";
    static final String EXERCICE_FILES_JSON_ARRAY = "EXERCICE_FILES_JSON_ARRAY";
    static final String EXERCICE_FUNCTION_JSON_ARRAY = "EXERCICE_FUNCTION_JSON_ARRAY";
    private final String TAG = "ExerciceEngineActivity";
    private ExerciceManager exerciceManager;
    private ConstraintLayout root;
    private FrameLayout frameLayoutLeft;
    private FrameLayout frameLayoutRight;
    private LinearLayout linearLayout;
    private GridExerciceFragment gridExerciceFragment;
    private CodeExerciceFragment codeExerciceFragment;

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Log.d(TAG, "onConfigurationChanged");
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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        root = findViewById(R.id.root);
        SeekBar topSeekBar = findViewById(R.id.seekBarTop);
        frameLayoutLeft = findViewById(R.id.fragment_grid_holder);
        frameLayoutRight = findViewById(R.id.fragment_code_blocks);
        linearLayout = findViewById(R.id.linearLayout);

        topSeekBar.setOnSeekBarChangeListener(new ExerciceEngineActivityOnSeekBarChangeListener());

        if(getIntent().hasExtra(EXERCICE_JSON)){
            String exerciceJson = getIntent().getExtras().getString(EXERCICE_JSON);
            showGridExerciceFragment(getSupportFragmentManager(), exerciceJson);
            showCodeExerciceFragment(getSupportFragmentManager(), exerciceJson);
        }
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
        Log.d(TAG, "updateTwoFragmentWeight: ExerciceEngineActivity");
        float progressRescaled = (float) progress / 100;

        LinearLayout.LayoutParams layoutParamsFrameLayoutLeft = (LinearLayout.LayoutParams) this.frameLayoutLeft.getLayoutParams();
        LinearLayout.LayoutParams layoutParamsFrameLayoutRight = (LinearLayout.LayoutParams) this.frameLayoutRight.getLayoutParams();

        if (layoutParamsFrameLayoutLeft != null && layoutParamsFrameLayoutRight != null) {

            layoutParamsFrameLayoutRight.weight = (float) progressRescaled;
            layoutParamsFrameLayoutLeft.weight = (float) 1 - progressRescaled;
            Log.d(TAG, "fragments.setLayoutParams");
            Log.d(TAG, layoutParamsFrameLayoutLeft.width +" "+ layoutParamsFrameLayoutLeft.height +" "+  layoutParamsFrameLayoutLeft.weight );
            Log.d(TAG, layoutParamsFrameLayoutRight.width +" "+ layoutParamsFrameLayoutRight.height +" "+  layoutParamsFrameLayoutRight.weight );
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

    public void sendFramesToGridExerciceFragment(ArrayList<Exercice> exerciceFrames) {
        gridExerciceFragment.updateFragmentGrid(exerciceFrames);
    }

    public void showDialogTestDetails(ExerciceFunction[] tests) {
        TestDialogFragment dialogFragment = TestDialogFragment.getInstance(tests);
        dialogFragment.show(getSupportFragmentManager(), "DIALOG_FRAGMENT_TESTS_DETAILS");
    }

    private final class ExerciceEngineActivityOnSeekBarChangeListener implements SeekBar.OnSeekBarChangeListener {
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

