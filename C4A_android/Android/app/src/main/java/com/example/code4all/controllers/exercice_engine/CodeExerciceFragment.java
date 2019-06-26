package com.example.code4all.controllers.exercice_engine;

import android.content.ClipData;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import com.example.code4all.R;
import com.example.code4all.customviews.FunctionListWindow;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.exercice_functions.CodeBlock;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

public class CodeExerciceFragment extends Fragment implements View.OnTouchListener{

    private final String TAG = "CodeExerciceFragment";
    private ExerciceEngineActivity parent;
    private Button buttonTest;
    private ConstraintLayout root;
    List<CodeBlock> codeBlocks;
    private CodeBlocksChainFactory chainFactory;

    private float xDelta;
    private float yDelta;
    private int lastAction;
    private FunctionListWindow functionListWindow;


    public CodeExerciceFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View fragment = inflater.inflate(R.layout.fragment_code_exercice, container, false);
        loadUi(fragment);
        parent = (ExerciceEngineActivity) getActivity();

        if (getArguments() != null && getArguments().containsKey(ExerciceEngineActivity.EXERCICE_JSON)) {
            String exerciceJson = getArguments().getString(ExerciceEngineActivity.EXERCICE_JSON);
            Gson gson = new GsonBuilder().create();

            Exercice exercice = gson.fromJson(exerciceJson, Exercice.class);

            functionListWindow = new FunctionListWindow(getContext(), exercice.getFunctions(), this, v -> hideFunctionListWindow(), new OnTouchRecyclerViewListener());


            root.addView(functionListWindow);

            chainFactory = new CodeBlocksChainFactory(exercice.getFunctions(), getContext(), parent.getSharedPreferenceManager(), parent.getServerHandler());
            chainFactory.build(root);
        }



        return fragment;
    }

    private void hideFunctionListWindow() {
        if(this.functionListWindow != null){
            this.functionListWindow.setVisibility(View.GONE);
        }
    }

    private void loadUi(View fragment) {
        buttonTest = fragment.findViewById(R.id.buttonTest);
        root = fragment.findViewById(R.id.root);
    }

    public final class OnTouchRecyclerViewListener implements View.OnTouchListener {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            if(event.getAction() == MotionEvent.ACTION_DOWN){
                ClipData data = ClipData.newPlainText("","");
                View.DragShadowBuilder shadowBuilder = new View.DragShadowBuilder(v);
                v.startDrag(data, shadowBuilder, v, 0);
                return true;
            } else {
                return false;
            }
        }
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        //parent.showSnackbarMessage("onTouch on windows", R.color.white);

        switch (event.getAction() & MotionEvent.ACTION_MASK) {
            case MotionEvent.ACTION_DOWN:
                lastAction = MotionEvent.ACTION_DOWN;
                xDelta = functionListWindow.getX() - event.getRawX();
                yDelta = functionListWindow.getY() - event.getRawY();
                break;
            case MotionEvent.ACTION_MOVE:
                lastAction = MotionEvent.ACTION_MOVE;
                functionListWindow.setX(event.getRawX() + xDelta);
                functionListWindow.setY(event.getRawY() + yDelta);
                break;
            case MotionEvent.ACTION_UP:
                if(lastAction == MotionEvent.ACTION_DOWN){
                    functionListWindow.hideList();
                }
                break;

        }
        return true;
    }
}
