package com.example.code4all.data_pojo.grid_exercice_element;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;

@SuppressLint("ViewConstructor")
public class Label extends GridExerciceElement{

    private String text;

    public Label(Context context, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, id, row, column, width, height, patternId);
        this.text = text;
    }

    public Label(Context context, AttributeSet attrs, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, attrs, id, row, column, width, height, patternId);
        this.text = text;
    }

    public Label(Context context, AttributeSet attrs, int defStyleAttr, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, attrs, defStyleAttr, id, row, column, width, height, patternId);
        this.text = text;
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public Label(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes, int id, int row, int column, int width, int height, int patternId, String text) {
        super(context, attrs, defStyleAttr, defStyleRes, id, row, column, width, height, patternId);
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
