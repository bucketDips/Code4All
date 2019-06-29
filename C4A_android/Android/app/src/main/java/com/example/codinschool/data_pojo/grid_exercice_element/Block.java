package com.example.codinschool.data_pojo.grid_exercice_element;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;

public class Block extends GridExerciceElement{
    public Block(Context context, int id, int row, int column, int width, int height, int patternId) {
        super(context, id, row, column, width, height, patternId);
    }

    public Block(Context context, AttributeSet attrs, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, id, row, column, width, height, patternId);
    }

    public Block(Context context, AttributeSet attrs, int defStyleAttr, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr, id, row, column, width, height, patternId);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public Block(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr, defStyleRes, id, row, column, width, height, patternId);
    }
}
