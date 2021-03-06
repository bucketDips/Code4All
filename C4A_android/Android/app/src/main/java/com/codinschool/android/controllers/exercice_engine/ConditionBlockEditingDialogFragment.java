package com.codinschool.android.controllers.exercice_engine;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;
import com.codinschool.android.R;
import com.codinschool.android.customviews.MyDialogFragment;
import com.codinschool.android.data_pojo.exercice_functions.ExerciceFunction;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * The type Condition block editing dialog fragment.
 */
public class ConditionBlockEditingDialogFragment extends MyDialogFragment {

    private IEditBlockDialogBoxCallback callback;
    private ArrayList<ExerciceFunction> functions;

    /**
     * Get instance condition block editing dialog fragment.
     *
     * @param callback  the callback
     * @param functions the functions
     * @return the condition block editing dialog fragment
     */
    public static ConditionBlockEditingDialogFragment getInstance(IEditBlockDialogBoxCallback callback, ArrayList<ExerciceFunction> functions){
        ConditionBlockEditingDialogFragment fragment = new ConditionBlockEditingDialogFragment();
        fragment.callback = callback;
        fragment.functions = functions;
        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_condition_block_editing, null);
        Button buttonApply = dialogFragment.findViewById(R.id.buttonApply);
        Spinner spinner = dialogFragment.findViewById(R.id.spinner);

        List<String> functionsName = new ArrayList<String>();
        for(ExerciceFunction function :functions){
            functionsName.add(function.getName());
        }

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(Objects.requireNonNull(getContext()), R.layout.spinner_item, functionsName);
        adapter.setDropDownViewResource(R.layout.spinner_item);
        spinner.setAdapter(adapter);


        buttonApply.setOnClickListener(v -> {
            String choice = spinner.getSelectedItem().toString();
            if(!choice.equals("")){
                callback.onApply(choice);
                dismiss();
            }
        });



        return dialogFragment;

    }

    @Override
    public void onResume() {
        super.onResume();
    }

    private String parseResult(TextView textViewStart, TextView textViewEnd) {

        int val1 = Integer.parseInt(String.valueOf(textViewStart.getText()));
        int val2 = Integer.parseInt(String.valueOf(textViewEnd.getText()));

        String result = "";
        if(val1 < val2){
            result += val1 + ","+val2;
            return result;
        } else if (val2 < val1){
            result += val2 + "," +val1;
            return result;
        }else{
            return "";
        }
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }
}
