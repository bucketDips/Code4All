package com.codinschool.android.tools;

import android.app.AlertDialog;
import android.view.View;

/**
 * Created by wmorgado on 07/03/2018.
 */
public interface IBasicDialogCallBack {
    /**
     * On click button 1.
     *
     * @param view      the view
     * @param dialogBox the dialog box
     */
    void onClickButton1(View view, AlertDialog dialogBox);

    /**
     * On click button 2.
     *
     * @param view      the view
     * @param dialogBox the dialog box
     */
    void onClickButton2(View view, AlertDialog dialogBox);
}
