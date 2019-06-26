package com.example.code4all.data_pojo.grid_exercice_element;

import android.content.Context;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v4.content.ContextCompat;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import com.example.code4all.R;

public class GridExerciceElement extends View implements IGridExerciceElement {

    private int id;
    private int row;
    private int column;
    private int width;
    private int height;
    private int patternId;

    public GridExerciceElement(Context context) {
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



    /*
        View view = layoutInflater.inflate(R.layout.exercice_grid_block_layout, null);
        GradientDrawable drawable = (GradientDrawable) view.getBackground();

        if (this instanceof Block){
            drawable.setColor(ContextCompat.getColor(context, R.color.red));
        }

        if (this instanceof Label){
            drawable.setColor(ContextCompat.getColor(context, R.color.blue));
        }

        if (this instanceof NonPlayerCharacter){
            drawable.setColor(ContextCompat.getColor(context, R.color.green));

        }

        if (this instanceof PlayableCharacter){
            drawable.setColor(ContextCompat.getColor(context, R.color.yellow));
        }

        view.setBackground(drawable);
        return view;
        */


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

    public void setPatternId(int patternId) {
        this.patternId = patternId;
    }

    public int getColor(Context context) {

        if(this instanceof PlayableCharacter){
            return ContextCompat.getColor(context, R.color.blue);
        }

        if(this instanceof Block){
            return ContextCompat.getColor(context, R.color.black);
        }

        if(this instanceof Label){
            return ContextCompat.getColor(context, R.color.yellow);
        }

        if(this instanceof NonPlayerCharacter){
            return ContextCompat.getColor(context, R.color.red);
        }

        return ContextCompat.getColor(context, R.color.transparent);

    }
}
