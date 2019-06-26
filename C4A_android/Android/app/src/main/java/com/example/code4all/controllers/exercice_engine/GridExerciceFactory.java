package com.example.code4all.controllers.exercice_engine;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Typeface;
import android.os.Build;
import android.support.constraint.ConstraintLayout;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.example.code4all.R;
import com.example.code4all.customviews.AutoResizeTextView;
import com.example.code4all.data_pojo.file.File;
import com.example.code4all.data_pojo.grid_exercice_element.*;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;
import pl.droidsonroids.gif.GifImageView;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class GridExerciceFactory extends Factory{

    private final String TAG = "GridExerciceFactory";
    private final Exercice exercice;

    private View[][] grid;
    private LayoutInflater layoutInflater;
    private int base_height_element = 50;
    private int base_width_element = 50;
    private ConstraintLayout gridBorder;
    private GifImageView gridBackground;
    private HashMap<GridExerciceElement, GifImageView> imageViewRegister;
    private HashMap<GridExerciceElement, AutoResizeTextView> labelRegister;


    GridExerciceFactory(Context context, ConstraintLayout gridborder, GifImageView gridBackground, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler, Exercice exercice) {
        super(context, sharedPreferenceManager, serverHandler);
        this.gridBorder = gridborder;
        this.layoutInflater = LayoutInflater.from(context);
        this.exercice = exercice;
        this.imageViewRegister = new HashMap<>();
        this.labelRegister = new HashMap<>();
        this.grid = initGridLayout();
        this.gridBackground = gridBackground;
    }

    private View[][] initGridLayout() {
        View[][] data = new View[this.exercice.getRows()][this.exercice.getColumns()];

        for(int i = 0; i < data.length ; i ++){
            for(int y = 0; y < data[0].length ; y ++){
                data[i][y] = layoutInflater.inflate(R.layout.exercice_grid_block_layout, null);
            }
        }

        for(Block block : this.exercice.getBlocks()){
            GifImageView imageView = generateImageView(block, exercice.getFichiers());
            imageViewRegister.put(block, imageView);
        }

        for(Label label : this.exercice.getLabels()){
            labelRegister.put(label, generateTextView(label));
        }

        for(NonPlayerCharacter npc : this.exercice.getNpcs()){
            GifImageView imageView = generateImageView(npc, exercice.getFichiers());
            imageViewRegister.put(npc, imageView);
        }

        for(PlayableCharacter pc : this.exercice.getPcs()){
            GifImageView imageView = generateImageView(pc, exercice.getFichiers());
            imageViewRegister.put(pc, imageView);
        }

        return data;
    }

    @Override
    public View build(View root) {
        LinearLayout grid = (LinearLayout) root;
        int numRow = this.grid.length;
        int numColumn = this.grid[0].length;

        for(int i = 0; i < numRow; i++){
            LinearLayout row = new LinearLayout(getContext());
            row.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.WRAP_CONTENT, 1 ));
            for(int y = 0; y < numColumn; y++){
                View block = this.grid[i][y];
                block.setLayoutParams(new ViewGroup.LayoutParams(base_width_element, base_height_element));
                //grid[i][y] = block;
                row.addView(block);
            }

            grid.addView(row);
        }

        ViewGroup.LayoutParams layoutParams = grid.getLayoutParams();
        layoutParams.width = ViewGroup.LayoutParams.WRAP_CONTENT;
        layoutParams.height = ViewGroup.LayoutParams.WRAP_CONTENT;

        drawBlocks();

        imageSetBackground(grid, exercice.getFichiers(), null);


        return grid;
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    private void imageSetBackground(View view, File[] files, GridExerciceElement element) {
        if(files == null)
            return;

        if(view instanceof LinearLayout){
            for(File file : files){
                if(file.getId() == exercice.getPatternId()){
                    if(gridBackground != null){
                        Glide.with(context).load(file.getUrl()).transition(DrawableTransitionOptions.withCrossFade()).error(R.drawable.texturedownloadfail).fitCenter().centerCrop().into(gridBackground);
                    }
                }
            }
            if(gridBackground != null)
                gridBackground.setBackground(context.getDrawable(R.drawable.texturenotfound));
        }

        if(view instanceof GifImageView){
            GifImageView gifImageView = (GifImageView) view;
            // search the corresponding file to of our element
            gifImageView.setBackgroundResource(R.drawable.texturenotfound);
            for(File file : files){
                if(file.getId() == element.getPatternId()){
                    // SINCE PICASSO DO NOT SUPPORT GIF WE MANAGE IT BY USING GLIDE IN STEAD
                    gifImageView.setBackgroundResource(R.color.transparent);
                    if (file.isAGif()){
                        Glide.with(context).asGif().load(file.getUrl()).error(R.drawable.texturedownloadfail).into(gifImageView);
                    } else {
                        Glide.with(context).load(file.getUrl()).error(R.drawable.texturedownloadfail).into(gifImageView);
                    }
                }
            }
        }
    }

    private void reSizeGridExerciceElements(int newHeight, int newWidth, int value){

        Iterator it = imageViewRegister.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry pair = (Map.Entry)it.next();
            GridExerciceElement gridExerciceElement = (GridExerciceElement) pair.getKey();
            ImageView imageView = (ImageView) pair.getValue();

            ConstraintLayout.LayoutParams layoutParams = (ConstraintLayout.LayoutParams) imageView.getLayoutParams();
            updateLayoutParams(layoutParams, newWidth, newHeight, gridExerciceElement);
        }

        it = labelRegister.entrySet().iterator();
        while (it.hasNext()){
            Map.Entry pair = (Map.Entry)it.next();
            GridExerciceElement gridExerciceElement = (GridExerciceElement) pair.getKey();
            TextView textView = (TextView) pair.getValue();

            ConstraintLayout.LayoutParams layoutParams = (ConstraintLayout.LayoutParams) textView.getLayoutParams();
            updateLayoutParams(layoutParams, newWidth, newHeight, gridExerciceElement);
            updateLabelTextSize(textView, value);

        }


    }

    void resizeGrid(int value){
        int numRow = this.grid.length;
        int numColumn = this.grid[0].length;

        int newWidth = (base_width_element + (value*2));
        int newHeight = (base_height_element + (value*2));

        for(int i = 0; i < numRow; i++){
            for(int y = 0; y < numColumn; y++){
                View gridElement =  grid[i][y];
                ViewGroup.LayoutParams layoutParams = gridElement.getLayoutParams();
                layoutParams.height = newHeight;
                layoutParams.width = newWidth;
                gridElement.setLayoutParams(layoutParams);
            }
        }

        reSizeGridExerciceElements(newHeight, newWidth, value);
    }

    private void drawBlocks() {
        Iterator it = imageViewRegister.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry pair = (Map.Entry)it.next();

            drawBlock((ImageView) pair.getValue());
        }

        it = labelRegister.entrySet().iterator();
        while (it.hasNext()){
            Map.Entry pair = (Map.Entry)it.next();

            drawBlock((View) pair.getValue());
        }

    }


    private void drawBlock(View block){
        gridBorder.addView(block);
    }

    private AutoResizeTextView generateTextView(Label label){

        AutoResizeTextView textView = new AutoResizeTextView(context);
        //set tag with base textsize
        textView.setText(label.getText());
        textView.setGravity(Gravity.CENTER);
        textView.setTypeface(textView.getTypeface(), Typeface.BOLD);
        textView.setLayoutParams(generateLayoutParams(label));

        return textView;
    }

    private GifImageView generateImageView(GridExerciceElement gridExerciceElement, File[] fichiers) {

        GifImageView imageViewOfTheBlock = new GifImageView(context);

        imageViewOfTheBlock.setScaleType(ImageView.ScaleType.FIT_XY);

        imageSetBackground(imageViewOfTheBlock, fichiers, gridExerciceElement);
        imageViewOfTheBlock.setLayoutParams(generateLayoutParams(gridExerciceElement));

        return imageViewOfTheBlock;
    }

    private ConstraintLayout.LayoutParams generateLayoutParams(GridExerciceElement gridExerciceElement){
        int columnIndex = gridExerciceElement.getColumn() -1 ;
        int rowIndex = gridExerciceElement.getRow() -1;
        int height = gridExerciceElement.getHeightOfTheElement();
        int width = gridExerciceElement.getWidthOfTheElement();

        int imageWidth = width * base_width_element;
        int imageHeight = height * base_height_element;

        ConstraintLayout.LayoutParams layoutParams = new ConstraintLayout.LayoutParams(imageWidth, imageHeight);

        int marginTop = rowIndex * base_height_element;
        int marginStart = columnIndex * base_width_element;

        layoutParams.setMargins(marginStart, marginTop,0,0);
        layoutParams.topToTop = R.id.gridborder;
        layoutParams.startToStart = R.id.gridborder;

        return layoutParams;
    }

    private void updateLabelTextSize(TextView textView, int seekBarValue){
        //float textSize = (float) textView.getTag() + (float) seekBarValue / 100;
        //textView.setTextSize(textSize);
    }

    private void updateLayoutParams(ConstraintLayout.LayoutParams layoutParams, int newWidth, int newHeight, GridExerciceElement gridExerciceElement){
        layoutParams.height = newHeight * gridExerciceElement.getHeightOfTheElement();
        layoutParams.width = newWidth * gridExerciceElement.getWidthOfTheElement();


        int marginTop = newHeight * (gridExerciceElement.getRow()-1);
        int marginStart = newWidth * (gridExerciceElement.getColumn()-1);

        layoutParams.topToTop = R.id.gridborder;
        layoutParams.startToStart = R.id.gridborder;

        layoutParams.setMargins(marginStart, marginTop,0,0);
    }

}


