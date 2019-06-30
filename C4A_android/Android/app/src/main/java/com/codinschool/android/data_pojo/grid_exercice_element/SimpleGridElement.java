package com.codinschool.android.data_pojo.grid_exercice_element;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;

/**
 * The type Simple grid element.
 */
public class SimpleGridElement extends GridExerciceElement{

    /**
     * Instantiates a new Simple grid element.
     *
     * @param context   the context
     * @param id        the id
     * @param row       the row
     * @param column    the column
     * @param width     the width
     * @param height    the height
     * @param patternId the pattern id
     */
    public SimpleGridElement(Context context, int id, int row, int column, int width, int height, int patternId) {
        super(context, id, row, column, width, height, patternId);
    }

    /**
     * Instantiates a new Simple grid element.
     *
     * @param context   the context
     * @param attrs     the attrs
     * @param id        the id
     * @param row       the row
     * @param column    the column
     * @param width     the width
     * @param height    the height
     * @param patternId the pattern id
     */
    public SimpleGridElement(Context context, AttributeSet attrs, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, id, row, column, width, height, patternId);
    }

    /**
     * Instantiates a new Simple grid element.
     *
     * @param context      the context
     * @param attrs        the attrs
     * @param defStyleAttr the def style attr
     * @param id           the id
     * @param row          the row
     * @param column       the column
     * @param width        the width
     * @param height       the height
     * @param patternId    the pattern id
     */
    public SimpleGridElement(Context context, AttributeSet attrs, int defStyleAttr, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr, id, row, column, width, height, patternId);
    }

    /**
     * Instantiates a new Simple grid element.
     *
     * @param context      the context
     * @param attrs        the attrs
     * @param defStyleAttr the def style attr
     * @param defStyleRes  the def style res
     * @param id           the id
     * @param row          the row
     * @param column       the column
     * @param width        the width
     * @param height       the height
     * @param patternId    the pattern id
     */
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public SimpleGridElement(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr, defStyleRes, id, row, column, width, height, patternId);
    }
}