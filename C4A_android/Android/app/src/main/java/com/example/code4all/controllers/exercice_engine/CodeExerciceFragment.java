package com.example.code4all.controllers.exercice_engine;

import android.app.AlertDialog;
import android.content.ClipData;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.support.v7.widget.CardView;
import android.util.Log;
import android.view.*;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.customviews.FunctionListWindow;
import com.example.code4all.customviews.MyDialogFragment;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.customviews.CodeBlock;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;
import com.example.code4all.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.example.code4all.data_pojo.solution_data.Action;
import com.example.code4all.data_pojo.solution_data.Boucle;
import com.example.code4all.data_pojo.solution_data.Condition;
import com.example.code4all.data_pojo.tests.Test;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.tools.DialogBoxBuilder;
import com.example.code4all.tools.IBasicDialogCallBack;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;

public class CodeExerciceFragment extends Fragment implements View.OnLongClickListener{

    private final String TAG = "CodeExerciceFragment";
    private ExerciceEngineActivity parent;
    private ConstraintLayout root;
    private CodeBlocksChainFactory chainFactory;

    private float xDelta;
    private float yDelta;
    private int lastAction;
    private FunctionListWindow functionListWindow;
    private LinearLayout chainBlocks;
    private FrameLayout frameLayout;
    private Exercice exercice;
    private DragInputListener chainBlockListener;
    private ArrayList<ExerciceFunction> functions;
    private Button buttonRun;
    private String exerciceJson;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View fragment = inflater.inflate(R.layout.fragment_code_exercice, container, false);
        loadUi(fragment);

        parent = (ExerciceEngineActivity) getActivity();
        Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
        if (getArguments() != null && getArguments().containsKey(ExerciceEngineActivity.EXERCICE_JSON)) {
            exerciceJson = getArguments().getString(ExerciceEngineActivity.EXERCICE_JSON);
            chainBlockListener = new DragInputListener();
            exercice = gson.fromJson(exerciceJson, Exercice.class);
            functions = new ArrayList<>(Arrays.asList(exercice.getFunctions()));

            functionListWindow = new FunctionListWindow(getContext(), functions,
                    v -> hideFunctionListWindow(), new OnTouchFunctionListWindows(),
                    new OnTouchRecyclerViewListener());

            root.addView(functionListWindow);

            chainFactory = new CodeBlocksChainFactory(exercice.getFunctions(), getContext(), parent.getSharedPreferenceManager(), parent.getServerHandler(), new DragInputListener());
            chainFactory.build(chainBlocks);

            buttonRun.setOnClickListener(v -> buildSolution());
        }

        return fragment;
    }

    private String buildSolution() {
        Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).setPrettyPrinting().create();

//        solutions[i] = new Action();

        Object[] objects = new Object[chainBlocks.getChildCount()];
        for(int i = 0; i < objects.length; i ++){
            objects[i] = parcours((CodeBlock) chainBlocks.getChildAt(i));
        }

        String solution = gson.toJson(objects);
        String exerciceJson = this.exerciceJson;
        JSONObject response = new JSONObject();

        try {
            //JSONArray solution = new JSONArray(gson.toJson(objects));
            //JSONObject exercice = new JSONObject(gson.toJson(this.exerciceJson));
            response.put("exercice", exerciceJson);
            response.put("solution", solution);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        parent.getServerHandler().executeExercice(response, exerciceJson, solution, parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                try {
                    ArrayList<Exercice> exerciceFrames = new ArrayList<>();
                    JSONArray exerciceStepsJson = result.getJSONArray("exerciceSteps");
                    for(int i = 0; i < exerciceStepsJson.length(); i++){
                        Exercice exercice = gson.fromJson(String.valueOf(exerciceStepsJson.getJSONObject(i)), Exercice.class);
                        exerciceFrames.add(exercice);
                    }

                    ArrayList<Test> tests = new ArrayList<>();
                    JSONArray testsJson = result.getJSONArray("testResult");
                    for(int y = 0; y < testsJson.length(); y ++){
                        Test test = gson.fromJson(String.valueOf(testsJson.getJSONObject(y)), Test.class);
                        tests.add(test);
                    }
                    parent.sendFramesToGridExerciceFragment(exerciceFrames);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                String responseBody = new String(error.networkResponse.data, StandardCharsets.UTF_8);

                Log.d(TAG, responseBody);

            }
        });

/*
        String jsonObject = gson.toJson(solutions);
        try {
            JSONArray jsonArray = new JSONArray(jsonObject);
            Log.d(TAG, "test jsonObject" + jsonArray.get(0));
        } catch (JSONException e) {
            e.printStackTrace();
        }*/
        return "";
    }

    private Object parcours(CodeBlock block) {
        LinearLayout container = block.getContainer();

        if(!block.getNameOfTheFunction().equals(ExerciceFunction.PRIMARY_FUNCTION_NAME_FOR) && !block.getNameOfTheFunction().equals(ExerciceFunction.PRIMARY_FUNCTION_NAME_IF)){
            return block.getNameOfTheFunction();
        } else {
            int size = container.getChildCount();
            Object object = new Object();
            Object[] blocks = new Object[size];
            for(int y = 0; y < container.getChildCount(); y ++){
                CodeBlock codeBlock = (CodeBlock) container.getChildAt(y);
                blocks[y] = parcours(codeBlock);
            }

            if(block.getNameOfTheFunction().equals(ExerciceFunction.PRIMARY_FUNCTION_NAME_FOR)){
                String startAndEnd = block.getStartAndEnd();
                String start ="";
                String end ="";
                if(startAndEnd != null){
                    start = startAndEnd.substring(0, startAndEnd.indexOf(','));
                    end = startAndEnd.substring(startAndEnd.indexOf(',')+1, startAndEnd.length());
                } else {
                    start = "0";
                    end = "0";
                }
                object = new Boucle("boucle",Integer.parseInt(start),Integer.parseInt(end), blocks);

            } else if(block.getNameOfTheFunction().equals(ExerciceFunction.PRIMARY_FUNCTION_NAME_IF)){
                object = new Condition(block.getCondition(),"condition", blocks);

            } else {
                object = block.getNameOfTheFunction();
            }

            return object;
        }

    }

    private void hideFunctionListWindow() {
        if(this.functionListWindow != null){
            this.functionListWindow.setVisibility(View.GONE);
        }
    }

    private void loadUi(View fragment) {
        root = fragment.findViewById(R.id.root);
        chainBlocks = fragment.findViewById(R.id.start);
        buttonRun = fragment.findViewById(R.id.play);
        //frameLayout = fragment.findViewById(R.id.frameLayout);
    }

    private void addBlock(TextView v, ExerciceFunction exerciceFunction, LinearLayout target) {

        CodeBlock codeBlock = new CodeBlock(getContext(), exerciceFunction, chainBlockListener, functionListWindow.isPrimary(exerciceFunction), this);

        codeBlock.getButtonClose().setOnClickListener(v1 -> {
            AlertDialog dialog = DialogBoxBuilder.build(getContext(), getString(R.string.remove_codeblock_message_dialog_box),
                    getString(R.string.yes), getString(R.string.no), getLayoutInflater(), new IBasicDialogCallBack() {
                        @Override
                        public void onClickButton1(View view, AlertDialog dialogBox) {
                            LinearLayout parent = (LinearLayout) codeBlock.getParent();
                            parent.removeView(codeBlock);
                            dialogBox.dismiss();
                        }

                        @Override
                        public void onClickButton2(View view, AlertDialog dialogBox) {
                            dialogBox.dismiss();
                        }
                    });
            dialog.show();
        });

        codeBlock.getButtonGetUp().setOnClickListener(v12 -> {
            LinearLayout linearLayoutOfTheParent = (LinearLayout) codeBlock.getParent();
            int i = 0;
            boolean found = false;
            for(; i < linearLayoutOfTheParent.getChildCount() && !found; i++){
                CodeBlock target1 = (CodeBlock) linearLayoutOfTheParent.getChildAt(i);
                if(target1.equals(codeBlock)){
                    found = true;
                    linearLayoutOfTheParent.removeView(codeBlock);
                }
            }
            i--;

            if( i == 0){
                linearLayoutOfTheParent.addView(codeBlock, i);
            } else {
                linearLayoutOfTheParent.addView(codeBlock, i - 1 );
            }
        });

        codeBlock.getButtonGetDown().setOnClickListener(v13 -> {
            LinearLayout linearLayoutOfTheParent = (LinearLayout) codeBlock.getParent();
            int i = 0;
            boolean found = false;
            for(; i < linearLayoutOfTheParent.getChildCount() && !found; i++){

                CodeBlock target12 = (CodeBlock) linearLayoutOfTheParent.getChildAt(i);
                if(target12.equals(codeBlock)){
                    found = true;
                    linearLayoutOfTheParent.removeView(codeBlock);
                }
            }
            i--;
            if( i == linearLayoutOfTheParent.getChildCount()){
                linearLayoutOfTheParent.addView(codeBlock, i);
            } else {
                linearLayoutOfTheParent.addView(codeBlock, i + 1 );
            }
        });

        target.addView(codeBlock);

        Log.d(TAG, "addBlocks " + v.getText());


    }

    @Override
    public boolean onLongClick(View v) {
        CodeBlock codeBlock = (CodeBlock) v;
        ExerciceFunction exerciceFunction = codeBlock.getFunction();

        MyDialogFragment dialogFragment;
        switch (exerciceFunction.getName()){
            case ExerciceFunction.PRIMARY_FUNCTION_NAME_FOR:
                dialogFragment =  BoucleBlockEditingDialogFragment.getInstance(value -> codeBlock.updateParameters(value));
                if (getFragmentManager() != null) {
                    dialogFragment.show(getFragmentManager(),"BOUCLE_BLOCK_EDITING_DIALOG_FRAGMENT");
                }
                break;
            case ExerciceFunction.PRIMARY_FUNCTION_NAME_IF:
                dialogFragment = ConditionBlockEditingDialogFragment.getInstance(value -> codeBlock.updateParameters(value), functions);

                if (getFragmentManager() != null) {
                    dialogFragment.show(getFragmentManager(), "CONDITION_BLOCK_EDITING_DIALOG_FRAGMENT");
                }
                break;
        }

        return false;
    }


    // LISTENER FOR CATCH DRAG INPUT IN THE LINEARELAYOUT
    public final class DragInputListener implements View.OnDragListener{
        @Override
        public boolean onDrag(View v, DragEvent event) {
            switch (event.getAction()){
                case DragEvent.ACTION_DRAG_STARTED:
                    Log.d(TAG, "DragEvent.ACTION_DRAG_STARTED");
                    break;

                case DragEvent.ACTION_DRAG_ENTERED:
                    Log.d(TAG, "DragEvent.ACTION_DRAG_ENTERED");
                    Log.d(TAG, String.valueOf(((LinearLayout) v).getBaselineAlignedChildIndex()));

                    break;
                case DragEvent.ACTION_DROP:
                    Log.d(TAG, "DragEvent.ACTION_DROP");

                    TextView textView = (TextView) event.getLocalState();
                    LinearLayout linearLayout = (LinearLayout) v;
                    Log.d(TAG, String.valueOf(v.toString()));

                    //LinearLayout linearLayout = getViewByTag(v.getTag());
                    ExerciceFunction exerciceFunction = functionListWindow.getExerciceFunction(String.valueOf(textView.getText()));
                    if(exerciceFunction != null)
                        addBlock(textView, exerciceFunction, linearLayout);
                    //root.addView(codeBlock);
                    //chainBlocks.addView(codeBlock);
                    //Log.d(TAG, String.valueOf(chainBlocks.getChildCount()));

                    //addBlock(textView, linearLayout, v.getTag().toString());
                    break;

                case DragEvent.ACTION_DRAG_ENDED:
                    Log.d(TAG, "DragEvent.ACTION_DRAG_ENDED");

                    break;
                case DragEvent.ACTION_DRAG_EXITED: {
                    Log.d(TAG, "DragEvent.ACTION_DRAG_EXITED");
                    break;
                }
            }

            return true;
        }
    }

    private LinearLayout getViewByTag(Object tag) {
        return chainBlocks.findViewWithTag(String.valueOf(tag));
    }

    private LinearLayout findViewByTag(LinearLayout list, int tag){

        if((int) list.getTag() == tag)
            return list;

        for(int i = 0; i < list.getChildCount(); i++){
             CodeBlock codeBlock = (CodeBlock) list.getChildAt(i);
             if(codeBlock.getChildCount() > 0){
                 findViewByTag(codeBlock.getContainer(), tag);
             }
        }

        return null;
    }

    // INNER CLASSE FOR THE ONTOUCH RECYCLERVIEW IN THE FUNCTIONLISTWINDOWS
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







    // HANDLE FUNCTION LIST WINDOWS DRAG AND CLICK TO HIDE
    public final class OnTouchFunctionListWindows implements View.OnTouchListener {
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

        // this is used to handle function list windows

}
