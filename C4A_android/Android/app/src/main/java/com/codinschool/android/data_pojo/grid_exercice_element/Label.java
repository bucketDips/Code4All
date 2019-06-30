package com.codinschool.android.data_pojo.grid_exercice_element;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;

/**
 * The type Label.
 */
@SuppressLint("ViewConstructor")
public class Label extends GridExerciceElement{

    private String text;

    /**
     * Instantiates a new Label.
     *
     * @param context   the context
     * @param id        the id
     * @param row       the row
     * @param column    the column
     * @param width     the width
     * @param height    the height
     * @param patternId the pattern id
     * @param text      the text
     */
    public Label(Context context, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, id, row, column, width, height, patternId);
        this.text = text;
    }

    /**
     * Instantiates a new Label.
     *
     * @param context   the context
     * @param attrs     the attrs
     * @param id        the id
     * @param row       the row
     * @param column    the column
     * @param width     the width
     * @param height    the height
     * @param patternId the pattern id
     * @param text      the text
     */
    public Label(Context context, AttributeSet attrs, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, attrs, id, row, column, width, height, patternId);
        this.text = text;
    }

    /**
     * Instantiates a new Label.
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
     * @param text         the text
     */
    public Label(Context context, AttributeSet attrs, int defStyleAttr, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, attrs, defStyleAttr, id, row, column, width, height, patternId);
        this.text = text;
    }

    /**
     * Instantiates a new Label.
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
     * @param text         the text
     */
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public Label(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, attrs, defStyleAttr, defStyleRes, id, row, column, width, height, patternId);
        this.text = text;
    }

    /**
     * Gets text.
     *
     * @return the text
     */
    public String getText() {
        return text;
    }

    /**
     * Sets text.
     *
     * @param text the text
     */
    public void setText(String text) {
        this.text = text;
    }
}
