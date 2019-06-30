package com.example.codinschool.controllers.exercice_engine;

import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;
import com.example.codinschool.R;
import com.example.codinschool.data_pojo.exercice.Exercice;
import com.example.codinschool.data_pojo.exercice_functions.ExerciceFunction;
import com.example.codinschool.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.example.codinschool.data_pojo.tests.Test;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import pl.droidsonroids.gif.GifImageView;

import java.util.ArrayList;

/**
 * The type Grid exercice fragment.
 */
public class GridExerciceFragment extends Fragment {

    private final String TAG = "GridExerciceFragment";

    private LinearLayout exerciceGrid;
    private TextView textViewGrid;
    private Exercice exercice;
    private GridExerciceFactory factory;
    private SeekBar zoomSeekbar;
    private ConstraintLayout gridborder;
    private GifImageView gridBackGround;
    private ConstraintLayout root;
    private String exerciceJson;
    private ExerciceEngineActivity parent;
    private LinearLayout testArea;
    private ImageButton imageButtonTestDetail;

    /**
     * Instantiates a new Grid exercice fragment.
     */
    public GridExerciceFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View fragment = inflater.inflate(R.layout.fragment_grid_exercice, container, false);
        bindUi(fragment);

        parent = (ExerciceEngineActivity) getActivity();


        if (getArguments() != null && getArguments().containsKey(ExerciceEngineActivity.EXERCICE_JSON)) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
            exerciceJson = getArguments().getString(ExerciceEngineActivity.EXERCICE_JSON);
            exercice = gson.fromJson(exerciceJson, Exercice.class);

            showTestsAvancement(exercice.getTests());
            assert parent != null;
            factory = new GridExerciceFactory(this, getContext(), gridborder, gridBackGround, parent.getSharedPreferenceManager(), parent.getServerHandler(), exercice);
            exerciceGrid = factory.build(exerciceGrid);

            textViewGrid.setText(getString(R.string.simple_string_placeholder,
                    String.valueOf("Exercice " + exercice.getTitle() + " " +
                            exercice.getColumns() + "x" + exercice.getRows())));
            imageButtonTestDetail.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    parent.showDialogTestDetails(exercice.getTests());
                }
            });

        }

        return fragment;
    }

    private void showTestsAvancement(ExerciceFunction[] tests) {
        if(tests.length > 0){
            for(ExerciceFunction test : tests){
                TextView textView = new TextView(getContext());
                textView.setText(test.getName());
                textView.setTextColor(getResources().getColor(R.color.white));
                textView.setGravity(Gravity.CENTER_VERTICAL);
                LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.MATCH_PARENT);
                layoutParams.setMarginStart(32);
                layoutParams.setMarginEnd(32);
                textView.setLayoutParams(layoutParams);
                testArea.addView(textView);
            }
        } else {
            testArea.setVisibility(View.GONE);
        }
    }

    private void bindUi(View fragment) {
        exerciceGrid = fragment.findViewById(R.id.grid);
        textViewGrid = fragment.findViewById(R.id.textViewExerciceGrid);
        gridborder = fragment.findViewById(R.id.gridborder);
        gridBackGround = fragment.findViewById(R.id.gridBackGround);
        zoomSeekbar = fragment.findViewById(R.id.zoomSeekbar);
        root = fragment.findViewById(R.id.root);
        testArea = fragment.findViewById(R.id.testArea);
        imageButtonTestDetail = fragment.findViewById(R.id.imageButtonTestDetail);

        zoomSeekbar.setOnSeekBarChangeListener(new gridExerciceOnSeekBarChangeListner());
    }

    /**
     * Sets layout params.
     *
     * @param layoutParamsFrameLayoutLeft the layout params frame layout left
     */
    public void setLayoutParams(LinearLayout.LayoutParams layoutParamsFrameLayoutLeft) {
        root.setLayoutParams(layoutParamsFrameLayoutLeft);
    }

    /**
     * Update fragment grid.
     *
     * @param exerciceFrames the exercice frames
     * @param tests          the tests
     */
    public void updateFragmentGrid(ArrayList<Exercice> exerciceFrames, ArrayList<Test> tests) {
        //Thread thread
        int y = exerciceFrames.size();
        Thread thread = new Thread(){
            @Override
            public void run() {
                try {
                    int i = 0;
                    while (i < exerciceFrames.size()){
                        synchronized (this) {
                            wait(350);
                            int finalI = i;
                            parent.runOnUiThread(() -> exerciceGrid = factory.updateGrid(exerciceFrames.get(finalI),exerciceGrid));
                        }
                        i = i+1;
                    }
                    parent.runOnUiThread(() -> parent.showResultDialogFragment(tests));
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        thread.start();
    }

    /**
     * Gets parent.
     *
     * @return the parent
     */
    public ExerciceEngineActivity getParent() {
        return parent;
    }

    /**
     * Gets seekbar value.
     *
     * @return the seekbar value
     */
    public int getSeekbarValue() {
        return zoomSeekbar.getProgress();
    }


    private class gridExerciceOnSeekBarChangeListner implements SeekBar.OnSeekBarChangeListener{
        @Override
        public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
            factory.setProgress(progress);
            factory.resizeGrid();
        }

        @Override
        public void onStartTrackingTouch(SeekBar seekBar) {

        }

        @Override
        public void onStopTrackingTouch(SeekBar seekBar) {

        }
    }
}
