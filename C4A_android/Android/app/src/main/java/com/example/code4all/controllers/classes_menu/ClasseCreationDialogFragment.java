package com.example.code4all.controllers.classes_menu;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.app.DialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import com.example.code4all.R;
import com.example.code4all.tools.DialogBoxBuilder;
import com.example.code4all.viewtools.SnackbarBuilder;

public class ClasseCreationDialogFragment extends DialogFragment {

    private Button buttonCreate;
    private EditText editTextClasseName;
    private ClasseActivity parent;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        return super.onCreateDialog(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_classe_creation, null);

        editTextClasseName =dialogFragment.findViewById(R.id.editTextClasseName);
        buttonCreate = dialogFragment.findViewById(R.id.buttonAdd);
        parent = (ClasseActivity) getActivity();


        buttonCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String classeName = String.valueOf(editTextClasseName.getText());

                if(classeName.length() > 2){
                    parent.getClasseManager().createClasse(classeName);
                    dismiss();
                } else
                    SnackbarBuilder.make(parent.getRootView(),"The classe name must have at least 3 characters", Snackbar.LENGTH_LONG, R.color.white).show();
            }
        });
        return dialogFragment;
    }
}
