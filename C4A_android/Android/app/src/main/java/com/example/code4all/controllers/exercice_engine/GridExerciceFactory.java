package com.example.code4all.controllers.exercice_engine;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import com.example.code4all.data_pojo.block.*;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

public class GridExerciceFactory extends Factory{

    private final String TAG = "GridExerciceFactory";
    private final Exercice exercice;
    private final IGridExerciceListener listener;
    private GridExerciceElement[][] data;
    private LayoutInflater layoutInflater;
    private int base_height_element = 200;
    private int base_width_element = 200;

    GridExerciceFactory(Context context, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler, Exercice exercice, IGridExerciceListener listener) {
        super(context, sharedPreferenceManager, serverHandler);
        this.layoutInflater = LayoutInflater.from(context);
        this.exercice = exercice;
        this.data = initDataArray();
        this.listener = listener;
    }

    private GridExerciceElement[][] initDataArray() {
        GridExerciceElement[][] data = new GridExerciceElement[this.exercice.getContent().getLines()][this.exercice.getContent().getColumns()];

        Block[] blocks = exercice.getContent().getBlocks();
        Label[] labels = exercice.getContent().getLabels();
        NonPlayerCharacter[] npcs = exercice.getContent().getNpcs();
        PlayableCharacter[] pcs = exercice.getContent().getPcs();

        for(int i = 0; i < data.length ; i ++){
            for(int y = 0; y < data[0].length ; y ++){
                data[i][y] = new GridExerciceElement(context);
            }
        }

        for(Block block : blocks){
            data[block.getRow()-1][block.getColumn()-1] = block;
        }

        for(Label label : labels){
            data[label.getRow()-1][label.getColumn()-1] = label;
        }

        for(NonPlayerCharacter npc : npcs){
            data[npc.getRow()-1][npc.getColumn()-1] = npc;
        }

        for(PlayableCharacter pc : pcs){
            data[pc.getRow()-1][pc.getColumn()-1] = pc;
        }

        return data;
    }

    GridExerciceElement getItem(int rowIndex, int columnIndex){
        return data[rowIndex][columnIndex];
    }

    void resizeGrid(int value){
        int numRow = this.data.length;
        int numColumn = this.data[0].length;

        int newWidth = (base_width_element + (value*2));
        int newHeight = (base_height_element + (value*2));

        for(int i = 0; i < numRow; i++){
            for(int y = 0; y < numColumn; y++){
                ViewGroup.LayoutParams layoutParams = data[i][y].getLayoutParams();
                layoutParams.height = newHeight;
                layoutParams.width = newWidth;
                data[i][y].setLayoutParams(layoutParams);
            }
        }
    }

    @Override
    public View build(View root) {
        LinearLayout grid = (LinearLayout) root;
        int numRow = this.data.length;
        int numColumn = this.data[0].length;

        for(int i = 0; i < numRow; i++){
            LinearLayout row = (LinearLayout) new LinearLayout(getContext());
            row.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.WRAP_CONTENT, 1 ));


            for(int y = 0; y < numColumn; y++){

                //if(exercice.getContent().getBlocks())
                GridExerciceElement block = (GridExerciceElement) data[i][y].getView(getContext(), layoutInflater);
                block.setLayoutParams(new ViewGroup.LayoutParams(base_width_element, base_height_element));

                int finalY = y;
                int finalI = i;
                block.setOnClickListener(v -> listener.onClickElement(finalI, finalY));


                data[i][y] = block;

                /*if(y % 2==0)
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        block.setBackgroundColor(getContext().getColor(R.color.red));
                    }*/
                row.addView(block);
            }

            grid.addView(row);
        }

        ViewGroup.LayoutParams layoutParams = grid.getLayoutParams();
        layoutParams.width = ViewGroup.LayoutParams.WRAP_CONTENT;
        layoutParams.height = ViewGroup.LayoutParams.WRAP_CONTENT;

        return grid;
    }

}


