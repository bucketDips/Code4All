package com.example.codinschool.controllers.exercice_engine;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import com.example.codinschool.R;
import com.example.codinschool.customviews.MyDialogFragment;
import com.example.codinschool.customviews.MyEditText;

/**
 * The type Boucle block editing dialog fragment.
 */
public class BoucleBlockEditingDialogFragment extends MyDialogFragment {

    private Button buttonCreate;
    private MyEditText editTextStart;
    private MyEditText editTextEnd;
    private IEditBlockDialogBoxCallback callback;

    /**
     * Get instance boucle block editing dialog fragment.
     *
     * @param callback the callback
     * @return the boucle block editing dialog fragment
     */
    public static BoucleBlockEditingDialogFragment getInstance(IEditBlockDialogBoxCallback callback){
        BoucleBlockEditingDialogFragment fragment = new BoucleBlockEditingDialogFragment();
        fragment.callback = callback;
        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_boucle_block_editing, null);
        Button buttonApply = dialogFragment.findViewById(R.id.buttonApply);
        TextView textViewStart = dialogFragment.findViewById(R.id.editTextStart);
        TextView textViewEnd = dialogFragment.findViewById(R.id.editTextEnd);
        buttonApply.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String res = parseResult(textViewStart, textViewEnd);
                if(!res.equals("")){
                    callback.onApply(res);
                    dismiss();
                }
            }
        });



        return dialogFragment;

    }

    @Override
    public void onResume() {
        super.onResume();
        int width = getResources().getDimensionPixelSize(R.dimen.popup_width);
        int height = getResources().getDimensionPixelSize(R.dimen.popup_height);
    }

    private String parseResult(TextView textViewStart, TextView textViewEnd) {

        String val1String = textViewStart.getText().toString();
        String val2String = textViewEnd.getText().toString();

        int val1 = 0;
        int val2 = 0;

        if(!val1String.equals("")){
            val1 = Integer.parseInt(val1String);
        }

        if(!val2String.equals(""))
            val2 = Integer.parseInt(val2String);

        if(val1 < val2){
            return val1 + ","+val2;
        } else if (val2 < val1){
            return val2 + "," +val1;
        }else{
            return "0,0";
        }
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }
}
