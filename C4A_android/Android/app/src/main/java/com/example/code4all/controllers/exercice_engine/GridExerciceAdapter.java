package com.example.code4all.controllers.exercice_engine;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.example.code4all.R;

import java.util.ArrayList;

public class GridExerciceAdapter extends BaseAdapter {

    private Context context;
    private LayoutInflater inflater;
    private ArrayList<View> blocks;
    private int columnsSize;
    private int rowsSize;

    public GridExerciceAdapter(ArrayList<View> blocks, Context context, int columnsSize, int rowSize) {
        super();
        this.context = context;
        this.inflater = LayoutInflater.from(context);
        this.blocks = blocks;
        this.columnsSize = columnsSize;
        this.rowsSize = rowSize;
    }

    @Override
    public int getCount() {
        return blocks.size();
    }

    @Override
    public Object getItem(int position) {
        return blocks.get(position);

        /* position = 21
              6 * 4 = 24


        */
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        /*if(convertView == null){
            convertView = this.inflater.inflate(R.layout.exercice_grid_block_layout, null);
        }*/
        if(convertView == null){
            convertView = this.inflater.inflate(R.layout.user_grid_layout, null);
        }

        return convertView;
    }
}
