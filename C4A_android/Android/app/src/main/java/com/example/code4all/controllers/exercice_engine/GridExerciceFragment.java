package com.example.code4all.controllers.exercice_engine;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.data_pojo.block.GridExerciceElement;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link GridExerciceFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 */
public class GridExerciceFragment extends Fragment {

    private final String TAG = "GridExerciceFragment";
    private final String CONTENT_GRID = "CONTENT_GRID";
    private OnFragmentInteractionListener mListener;
    private LinearLayout exerciceGrid;
    private TextView textViewGrid;
    private Exercice exercice;
    private GridExerciceFactory factory;
    private SeekBar seekbar;

    public GridExerciceFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View fragment = inflater.inflate(R.layout.fragment_grid_exercice, container, false);
        loadUi(fragment);

        ExerciceEngineActivity parent = (ExerciceEngineActivity) getActivity();


        if (getArguments() != null && getArguments().containsKey(ExerciceEngineActivity.EXERCICE_JSON)) {
            Gson gson = new GsonBuilder().create();
            String exerciceJson = getArguments().getString(ExerciceEngineActivity.EXERCICE_JSON);
            exercice = gson.fromJson(exerciceJson, Exercice.class);

            assert parent != null;
            factory = new GridExerciceFactory(getContext(), parent.getSharedPreferenceManager(), parent.getServerHandler(), exercice, new IGridExerciceListener() {
                @Override
                public void onClickElement(int indexRow, int indexColumn) {
                    Log.d(TAG, (indexRow + 1)  + " " + (indexColumn+1) );
                    GridExerciceElement element = factory.getItem(indexRow, indexColumn);

                    Log.d(TAG, element.getClass().toString());


                }
            });
            exerciceGrid = (LinearLayout) factory.build(exerciceGrid);
            textViewGrid.setText(getString(R.string.simple_string_placeholder, String.valueOf("Exercice " + exercice.getTitle())));

            //createExerciceGrid(factory, exerciceGrid, fragment,20, 30);
        }
        return fragment;
    }

    private void loadUi(View fragment) {
        exerciceGrid = fragment.findViewById(R.id.grid);
        textViewGrid = fragment.findViewById(R.id.textViewExerciceGrid);
        seekbar = fragment.findViewById(R.id.zoomSeekbar);

        seekbar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                //Log.d(TAG, "onScrollChange: " + progress );
                factory.resizeGrid(progress);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString() + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onGridLoaded();
    }

}
