package com.example.code4all.customviews;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.controllers.exercice_engine.CodeExerciceFragment;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;

import java.util.ArrayList;
import java.util.Arrays;

@SuppressLint("ViewConstructor")
public class FunctionListWindow extends CardView {

    private final static String TAG = "FunctionListWindow";
    private RecyclerView recyclerView;
    private ImageButton buttonClose;
    private TextView function_list_label;
    private ConstraintLayout top_zone;

    public FunctionListWindow(Context context, ExerciceFunction[] functions,  OnTouchListener onTouchListener, OnClickListener onClickListener, CodeExerciceFragment.OnTouchRecyclerViewListener onTouchRecyclerViewListener) {
        super(context);
        init(functions, onClickListener, onTouchListener, onTouchRecyclerViewListener);
    }

    public FunctionListWindow(Context context, AttributeSet attrs, ExerciceFunction[] functions,  OnTouchListener onTouchListener, OnClickListener onClickListener, CodeExerciceFragment.OnTouchRecyclerViewListener onTouchRecyclerViewListener) {
        super(context, attrs);
        init(functions, onClickListener, onTouchListener, onTouchRecyclerViewListener);
    }

    public FunctionListWindow(Context context, AttributeSet attrs, int defStyleAttr, ExerciceFunction[] functions, OnTouchListener onTouchListener, OnClickListener onClickListener, CodeExerciceFragment.OnTouchRecyclerViewListener onTouchRecyclerViewListener) {
        super(context, attrs, defStyleAttr);
        init(functions, onClickListener, onTouchListener, onTouchRecyclerViewListener);
    }

    @SuppressLint("ClickableViewAccessibility")
    public void init(ExerciceFunction[] functions, OnClickListener clickListener, OnTouchListener onTouchListener, CodeExerciceFragment.OnTouchRecyclerViewListener onTouchRecyclerViewListener){
        inflate(getContext(), R.layout.function_list_layout, this);
        View root = getRootView();
        recyclerView = this.findViewById(R.id.recyclerView);
        buttonClose = this.findViewById(R.id.button_close);
        function_list_label = this.findViewById(R.id.function_list_label);
        top_zone = this.findViewById(R.id.top_zone);

        if(functions.length > 0){
            ArrayList<ExerciceFunction> functionArrayList = new ArrayList<>(Arrays.asList(functions));
            recyclerView.setAdapter(new FunctionListAdapter(functionArrayList, onTouchRecyclerViewListener));
            recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        }

        // FOR TEST
        functions = new ExerciceFunction[2];
        functions[0] = new ExerciceFunction(1,2,"console.log(mafubaaaa)", "PC.speak()", "this function can be used to speak in the game");
        functions[1] = new ExerciceFunction(1,2,"console.log(mafubaaaa !)", "PC.scream()", "this function can be used to speak in the game");
        ArrayList<ExerciceFunction> functionArrayList = new ArrayList<>(Arrays.asList(functions));
        recyclerView.setAdapter(new FunctionListAdapter(functionArrayList, onTouchRecyclerViewListener));
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        // TEST

        function_list_label.setOnTouchListener(onTouchListener);
        buttonClose.setOnClickListener(v -> clickListener.onClick(root));
    }

    public void hideList() {
        if(recyclerView.getVisibility() == View.GONE){
            recyclerView.setVisibility(View.VISIBLE);
        } else {
            recyclerView.setVisibility(View.GONE);
        }
    }


    public class FunctionListAdapter extends RecyclerView.Adapter<FunctionListAdapter.ViewHolder> {

        private final CodeExerciceFragment.OnTouchRecyclerViewListener listener;
        private ArrayList<ExerciceFunction> functions;


        FunctionListAdapter(ArrayList<ExerciceFunction> functions, CodeExerciceFragment.OnTouchRecyclerViewListener listener) {
            this.functions = functions;
            this.listener = listener;
        }

        public ArrayList<ExerciceFunction> getFunctions() {
            return functions;
        }

        @Override
        public FunctionListWindow.FunctionListAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_function_list_item, parent, false);
            return new ViewHolder(view);
        }

        @Override
        public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
            viewHolder.functionName.setText(functions.get(i).getName());
            viewHolder.functionName.setOnTouchListener(listener);
        }


        @Override
        public int getItemCount() {
            return functions.size();
        }

        class ViewHolder extends RecyclerView.ViewHolder {
            final TextView functionName;

            ViewHolder(View view) {
                super(view);
                functionName = view.findViewById(R.id.functionName);
            }
        }
    }
}
