package com.codinschool.android.tools;

import android.app.AlertDialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import com.codinschool.android.R;

/**
 * The type Dialog box builder.
 */
public class DialogBoxBuilder {
    /**
     * Build alert dialog.
     *
     * @param context        the context
     * @param dialogMessage  the dialog message
     * @param labelButton1   the label button 1
     * @param labelButton2   the label button 2
     * @param layoutInflater the layout inflater
     * @param callBack       the call back
     * @return the alert dialog
     */
    public static AlertDialog build(Context context, String dialogMessage, String labelButton1, String labelButton2, LayoutInflater layoutInflater, IBasicDialogCallBack callBack){
        View view = layoutInflater.inflate(R.layout.simple_dialog_box_with, null);

        AlertDialog alertDialog = new AlertDialog.Builder(context).create();
        alertDialog.setCancelable(false);

        setupView(view, labelButton1, labelButton2, dialogMessage, callBack, alertDialog);
        alertDialog.setView(view);

        return alertDialog;
    }

    private static void setupView(View view, String labelButton1, String labelButton2, String dialogMessage, IBasicDialogCallBack callBack, AlertDialog alertDialog){
        Button button1 = view.findViewById(R.id.button1);
        Button button2 = view.findViewById(R.id.button2);

        TextView textView = view.findViewById(R.id.dialogMessage);
        textView.setText(dialogMessage);

        button1.setText(labelButton1);
        button1.setOnClickListener(v -> callBack.onClickButton1(v, alertDialog));

        button2.setText(labelButton2);
        button2.setOnClickListener(v -> callBack.onClickButton2(v, alertDialog));

    }
}
