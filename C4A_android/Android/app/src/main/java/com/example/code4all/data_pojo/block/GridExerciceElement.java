package com.example.code4all.data_pojo.block;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.ShapeDrawable;
import android.support.v4.content.ContextCompat;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.example.code4all.R;

public class GridExerciceElement extends View {


    private int id;
    private int row;
    private int column;
    private int width;
    private int height;
    private int patternId;


    public GridExerciceElement(Context context) {
        super(context);
    }

    public GridExerciceElement(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public GridExerciceElement(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public View getView(Context context, LayoutInflater layoutInflater) {

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

    public void setWidth(int width) {
        this.width = width;
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
}
