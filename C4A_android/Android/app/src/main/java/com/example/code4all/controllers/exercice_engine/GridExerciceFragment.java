package com.example.code4all.controllers.exercice_engine;

import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;
import com.example.code4all.R;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;
import com.example.code4all.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import pl.droidsonroids.gif.GifImageView;

import java.util.ArrayList;

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

    public GridExerciceFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View fragment = inflater.inflate(R.layout.fragment_grid_exercice, container, false);
        loadUi(fragment);

        parent = (ExerciceEngineActivity) getActivity();


        if (getArguments() != null && getArguments().containsKey(ExerciceEngineActivity.EXERCICE_JSON)) {
            Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
            exerciceJson = getArguments().getString(ExerciceEngineActivity.EXERCICE_JSON);
            exercice = gson.fromJson(exerciceJson, Exercice.class);

            showTestsAvancement(exercice.getTests());
            assert parent != null;
            factory = new GridExerciceFactory(getContext(), gridborder, gridBackGround, parent.getSharedPreferenceManager(), parent.getServerHandler(), exercice);
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
                ConstraintLayout testLayout = (ConstraintLayout) getLayoutInflater().inflate(R.layout.test_simple_layout, null);
                TextView testName = testLayout.findViewById(R.id.testName);
                ImageView imageIcon = testLayout.findViewById(R.id.imageIcon);

                testName.setText(test.getName());
                imageIcon.setImageResource(R.drawable.notverified);

                testArea.addView(testLayout);
            }
        } else {
            testArea.setVisibility(View.GONE);
        }
    }

    private void loadUi(View fragment) {
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

    public void setLayoutParams(LinearLayout.LayoutParams layoutParamsFrameLayoutLeft) {
        root.setLayoutParams(layoutParamsFrameLayoutLeft);
    }

    public void updateFragmentGrid(ArrayList<Exercice> exerciceFrames) {
        Log.d(TAG,"updateFragmentGrid");
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
                            parent.runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    exerciceGrid = factory.updateGrid(exerciceFrames.get(finalI),exerciceGrid);
                                }
                            });
                        }
                        i = i+1;
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        thread.start();
    }


    private class gridExerciceOnSeekBarChangeListner implements SeekBar.OnSeekBarChangeListener{
        @Override
        public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
            Log.d(TAG, "onProgressChanged: GridExerciceFragment");
            factory.resizeGrid(progress);
        }

        @Override
        public void onStartTrackingTouch(SeekBar seekBar) {

        }

        @Override
        public void onStopTrackingTouch(SeekBar seekBar) {

        }
    }
}
