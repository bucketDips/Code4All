package com.example.codinschool.controllers.classes_menu;

import android.app.Dialog;
import android.content.Context;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import com.example.codinschool.R;
import com.example.codinschool.customviews.MyDialogFragment;
import com.example.codinschool.customviews.MyEditText;
import com.example.codinschool.viewtools.SnackbarBuilder;

public class ClasseCreationDialogFragment extends MyDialogFragment {

    private Button buttonCreate;
    private MyEditText editTextClasseName;
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

    @Override
    public void onResume() {
        super.onResume();
        int width  = Resources.getSystem().getDisplayMetrics().widthPixels;
        int height = Resources.getSystem().getDisplayMetrics().heightPixels;

        width = (int) (width * 0.70);
        height = (int) (height * 0.40);

        //float heightInPx = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 200, getResources().getDisplayMetrics());
        getDialog().getWindow().setLayout(width, height);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_classe_creation, null);

        editTextClasseName = dialogFragment.findViewById(R.id.editTextStart);
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
