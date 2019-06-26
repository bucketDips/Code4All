package com.example.code4all.controllers.exercice_engine;

import android.content.Context;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import pl.droidsonroids.gif.GifImageView;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link GridExerciceFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 */
public class GridExerciceFragment extends Fragment {

    private final String TAG = "GridExerciceFragment";

    private OnFragmentInteractionListener mListener;
    private LinearLayout exerciceGrid;
    private TextView textViewGrid;
    private Exercice exercice;
    private GridExerciceFactory factory;
    private SeekBar seekbar;
    private ConstraintLayout gridborder;
    private GifImageView gridBackGround;

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


            /*
            // test
            Block block = new Block(getContext(),3,2,2,2,2,2);
            exercice = new Exercice(3,"toto","description",0,5,"console.log('dddd')",
                    22,4,10,new Block[]{block}, new NonPlayerCharacter[]{}, new PlayableCharacter[]{},new Label[]{}, 2);
                    */

            assert parent != null;
            factory = new GridExerciceFactory(getContext(), gridborder, gridBackGround, parent.getSharedPreferenceManager(), parent.getServerHandler(), exercice);
            exerciceGrid = (LinearLayout) factory.build(exerciceGrid);
            textViewGrid.setText(getString(R.string.simple_string_placeholder,
                    String.valueOf("Exercice " + exercice.getTitle() + " " +
                            exercice.getColumns() + "x" + exercice.getRows())));

        }
        return fragment;
    }

    private void loadUi(View fragment) {
        exerciceGrid = fragment.findViewById(R.id.grid);
        textViewGrid = fragment.findViewById(R.id.textViewExerciceGrid);
        gridborder = fragment.findViewById(R.id.gridborder);
        gridBackGround = fragment.findViewById(R.id.gridBackGround);
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
