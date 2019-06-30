package com.codinschool.android.data_pojo.grid_exercice_element;

import android.content.Context;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.view.View;

/**
 * The type Grid exercice element.
 */
//@Expose(serialize = false, )
public class GridExerciceElement extends View implements IGridExerciceElement {

    private int id;
    private int row;
    private int column;
    private int width;
    private int height;
    private int patternId;


    /**
     * Instantiates a new Grid exercice element.
     *
     * @param context the context
     * @param view    the view
     */
    public GridExerciceElement(Context context, View view) {
        super(context);

    }

    /**
     * Instantiates a new Grid exercice element.
     *
     * @param context the context
     * @param attrs   the attrs
     */
    public GridExerciceElement(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    /**
     * Instantiates a new Grid exercice element.
     *
     * @param context      the context
     * @param attrs        the attrs
     * @param defStyleAttr the def style attr
     */
    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);

    }

    /**
     * Instantiates a new Grid exercice element.
     *
     * @param context      the context
     * @param attrs        the attrs
     * @param defStyleAttr the def style attr
     * @param defStyleRes  the def style res
     */
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);

    }

    /**
     * Instantiates a new Grid exercice element.
     *
     * @param context   the context
     * @param id        the id
     * @param row       the row
     * @param column    the column
     * @param width     the width
     * @param height    the height
     * @param patternId the pattern id
     */
    public GridExerciceElement(Context context, int id, int row, int column, int width, int height, int patternId) {
        super(context);
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    /**
     * Instantiates a new Grid exercice element.
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
    public GridExerciceElement(Context context, AttributeSet attrs, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs);
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    /**
     * Instantiates a new Grid exercice element.
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
    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr);
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    /**
     * Instantiates a new Grid exercice element.
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
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr, defStyleRes);
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets row.
     *
     * @return the row
     */
    public int getRow() {
        return row;
    }

    /**
     * Sets row.
     *
     * @param row the row
     */
    public void setRow(int row) {
        this.row = row;
    }

    /**
     * Gets column.
     *
     * @return the column
     */
    public int getColumn() {
        return column;
    }

    /**
     * Sets column.
     *
     * @param column the column
     */
    public void setColumn(int column) {
        this.column = column;
    }


    /**
     * Gets width of the element.
     *
     * @return the width of the element
     */
    public int getWidthOfTheElement() {
        return width;
    }

    /**
     * Sets width.
     *
     * @param width the width
     */
    public void setWidth(int width) {
        this.width = width;
    }

    /**
     * Gets height of the element.
     *
     * @return the height of the element
     */
    public int getHeightOfTheElement() {
        return height;
    }

    /**
     * Sets height.
     *
     * @param height the height
     */
    public void setHeight(int height) {
        this.height = height;
    }

    /**
     * Gets pattern id.
     *
     * @return the pattern id
     */
    public int getPatternId() {
        return patternId;
    }
}
