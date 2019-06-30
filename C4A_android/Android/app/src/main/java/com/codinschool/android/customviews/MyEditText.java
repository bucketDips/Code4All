package com.codinschool.android.customviews;

import android.content.Context;
import android.util.AttributeSet;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;

/**
 * The type My edit text.
 */
public class MyEditText extends android.support.v7.widget.AppCompatEditText {

    private final String TAG ="MyEditText";

    /**
     * Instantiates a new My edit text.
     *
     * @param context the context
     */
    public MyEditText(Context context) {
        super(context);
    }

    /**
     * Instantiates a new My edit text.
     *
     * @param context the context
     * @param attrs   the attrs
     */
    public MyEditText(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    /**
     * Instantiates a new My edit text.
     *
     * @param context      the context
     * @param attrs        the attrs
     * @param defStyleAttr the def style attr
     */
    public MyEditText(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    public void onEditorAction(int actionCode) {
        if (actionCode == EditorInfo.IME_ACTION_DONE || actionCode == EditorInfo.IME_ACTION_NEXT) {
            InputMethodManager imm = (InputMethodManager) this.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(this.getWindowToken(), 0);
        }

        super.onEditorAction(actionCode);
    }
}
