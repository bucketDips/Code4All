package com.example.code4all.data_pojo.grid_exercice_element;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;

@SuppressLint("ViewConstructor")
public class PlayableCharacter extends GridExerciceElement{


    public PlayableCharacter(Context context, int id, int row, int column, int width, int height, int patternId) {
        super(context, id, row, column, width, height, patternId);
    }

    public PlayableCharacter(Context context, AttributeSet attrs, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, id, row, column, width, height, patternId);
    }

    public PlayableCharacter(Context context, AttributeSet attrs, int defStyleAttr, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr, id, row, column, width, height, patternId);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public PlayableCharacter(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes, int id, int row, int column, int width, int height, int patternId) {
        super(context, attrs, defStyleAttr, defStyleRes, id, row, column, width, height, patternId);
    }
}
