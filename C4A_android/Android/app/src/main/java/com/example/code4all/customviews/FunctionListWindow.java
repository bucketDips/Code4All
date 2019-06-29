package com.example.code4all.customviews;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.controllers.exercice_engine.CodeExerciceFragment;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;

import java.util.ArrayList;

@SuppressLint("ViewConstructor")
public class FunctionListWindow extends CardView {

    private final static String TAG = "FunctionListWindow";
    private RecyclerView recyclerViewExerciceFunction;
    private RecyclerView recyclerViewPrimaryFunctions;

    private ImageButton buttonClose;
    private CardView functionWindow;
    private TextView functionListLabel;
    private ConstraintLayout topZoneWindow;
    private ArrayList<ExerciceFunction> exerciceFunctions;
    private ArrayList<ExerciceFunction> primaryFunctions;
    private LinearLayout bottomPart;

    private int[] colors = new int[]{
            R.color.red,
            R.color.blue_material_design,
            R.color.green,
            R.color.pink,
            R.color.orange,
            R.color.blue,
            R.color.blue_material_design,
            R.color.black
    };

    int index = 0;

    public FunctionListWindow(Context context, ArrayList<ExerciceFunction> functions, OnClickListener onClickButtonCloseListener, CodeExerciceFragment.OnTouchFunctionListWindows onTouchFunctionListWindows,
                              CodeExerciceFragment.OnTouchRecyclerViewListener onTouchRecyclerViewListener) {
        super(context);
        init(functions, onClickButtonCloseListener, onTouchFunctionListWindows,  onTouchRecyclerViewListener);
    }

    @SuppressLint("ClickableViewAccessibility")
    public void init(ArrayList<ExerciceFunction> functions, OnClickListener onClickButtonCloseListener, CodeExerciceFragment.OnTouchFunctionListWindows onTouchFunctionListWindows,
                     CodeExerciceFragment.OnTouchRecyclerViewListener onTouchRecyclerViewListener){
        inflate(getContext(), R.layout.function_list_layout, this);

        this.exerciceFunctions = functions;

        functionWindow = this.findViewById(R.id.cardViewRoot);
        recyclerViewExerciceFunction = this.findViewById(R.id.recyclerViewExerciceFunction);
        recyclerViewPrimaryFunctions = this.findViewById(R.id.recyclerViewPrimaryFunctions);
        buttonClose = this.findViewById(R.id.button_close);
        functionListLabel = this.findViewById(R.id.function_list_label);
        topZoneWindow = this.findViewById(R.id.top_zone);
        bottomPart = this.findViewById(R.id.bottomPart);

        recyclerViewExerciceFunction.setAdapter(new FunctionListAdapter(this.exerciceFunctions, onTouchRecyclerViewListener));
        recyclerViewExerciceFunction.setLayoutManager(new LinearLayoutManager(getContext()));

        recyclerViewPrimaryFunctions.setAdapter(new FunctionListAdapter(generatePrimaryFunctions(), onTouchRecyclerViewListener));
        recyclerViewPrimaryFunctions.setLayoutManager(new LinearLayoutManager(getContext()));


        functionListLabel.setOnTouchListener(onTouchFunctionListWindows);
        buttonClose.setOnClickListener(v -> onClickButtonCloseListener.onClick(functionWindow));
    }

    public void hideList() {
        if(bottomPart.getVisibility() == View.GONE){
            bottomPart.setVisibility(View.VISIBLE);
        } else {
            bottomPart.setVisibility(View.GONE);
        }
    }

    public ExerciceFunction getExerciceFunction(String exerciceFunctionName){
        for(ExerciceFunction exerciceFunction : primaryFunctions){
            if(exerciceFunction.getName().equals(exerciceFunctionName))
                return exerciceFunction;
        }

        for(ExerciceFunction exerciceFunction : exerciceFunctions){
            if(exerciceFunction.getName().equals(exerciceFunctionName))
                return exerciceFunction;
        }

        return null;
    }

    private ArrayList<ExerciceFunction> generatePrimaryFunctions(){
        primaryFunctions = new ArrayList<>();
        primaryFunctions.add(new ExerciceFunction(0,0,null, ExerciceFunction.PRIMARY_FUNCTION_NAME_FOR,null));
        primaryFunctions.add(new ExerciceFunction(0,0,null, ExerciceFunction.PRIMARY_FUNCTION_NAME_IF,null));

        return primaryFunctions;
    }

    public boolean isPrimary(ExerciceFunction function) {
        for (ExerciceFunction exerciceFunction : primaryFunctions) {
            if (exerciceFunction.equals(function))
                return true;
        }

        return false;
    }

    public class FunctionListAdapter extends RecyclerView.Adapter<FunctionListAdapter.ViewHolder> {

        private final CodeExerciceFragment.OnTouchRecyclerViewListener onTouchRecyclerViewListener;
        private ArrayList<ExerciceFunction> functions;
        int position = 0;


        FunctionListAdapter(ArrayList<ExerciceFunction> functions, CodeExerciceFragment.OnTouchRecyclerViewListener listener) {
            this.functions = functions;
            this.onTouchRecyclerViewListener = listener;
        }

        public ArrayList<ExerciceFunction> getFunctions() {
            return functions;
        }

        @Override
        public FunctionListWindow.FunctionListAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_function_list_item, parent, false);
            Log.d(TAG, "FunctionListWindow.FunctionListAdapter.ViewHolder onCreateViewHolder");
            return new ViewHolder(view, null);
        }

        @SuppressLint("ClickableViewAccessibility")
        @Override
        public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
            viewHolder.functionName.setText(functions.get(i).getName());
            int color = getColor();
            functions.get(i).setColorid(color);
            viewHolder.functionName.setTextColor(getResources().getColor(color));
            viewHolder.functionName.setOnTouchListener(onTouchRecyclerViewListener);
        }



        @Override
        public int getItemCount() {
            return functions.size();
        }

        class ViewHolder extends RecyclerView.ViewHolder {
            final TextView functionName;
            private ExerciceFunction function;

            ViewHolder(View view, ExerciceFunction function) {
                super(view);
                this.function = function;
                functionName = view.findViewById(R.id.functionName);
            }
            public ExerciceFunction getFunctionFromViewHolder(){
                return this.function;
            }
        }
    }

    private int getColor() {
        if(index > colors.length)
            index = 0;

        int color = colors[index];
        index ++;

        return color;
    }
}
