package com.example.codinschool.data_pojo.grid_exercice_element;

import android.content.Context;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

//@Expose(serialize = false, )
public class GridExerciceElement extends View implements IGridExerciceElement {

    private int id;
    private int row;
    private int column;
    private int width;
    private int height;
    private int patternId;


    public GridExerciceElement(Context context, View view) {
        super(context);
        Log.d("GridExerciceElement","GridExerciceElement(Context context)" );

    }

    public GridExerciceElement(Context context, AttributeSet attrs) {
        super(context, attrs);
        Log.d("GridExerciceElement","GridExerciceElement(Context context, AttributeSet attrs)" );
    }

    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        Log.d("GridExerciceElement","GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr)" );

    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        Log.d("GridExerciceElement","GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes)" );

    }

    public GridExerciceElement(Context context, int id, int row, int column, int width, int height, int patternId) {
        super(context);
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    public GridExerciceElement(Context context, AttributeSet attrs, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs);
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr);
        this.id = id;
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.patternId = patternId;
    }

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

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }


    public int getWidthOfTheElement() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeightOfTheElement() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getPatternId() {
        return patternId;
    }
}
