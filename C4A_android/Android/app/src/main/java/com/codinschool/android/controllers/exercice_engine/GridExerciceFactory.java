package com.codinschool.android.controllers.exercice_engine;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Typeface;
import android.os.Build;
import android.support.constraint.ConstraintLayout;
import android.support.v4.content.ContextCompat;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.codinschool.android.R;
import com.codinschool.android.customviews.AutoResizeTextView;
import com.codinschool.android.data_pojo.exercice_functions.ExerciceFunction;
import com.codinschool.android.data_pojo.file.File;
import com.codinschool.android.data_pojo.grid_exercice_element.*;
import com.codinschool.android.data_pojo.exercice.Exercice;
import com.codinschool.android.serverhandler.ServerHandler;
import com.codinschool.android.settings.SharedPreferenceManager;
import pl.droidsonroids.gif.GifImageView;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * The type Grid exercice factory.
 */
public class GridExerciceFactory extends Factory{

    private final String TAG = "GridExerciceFactory";
    private GridExerciceFragment fragmentCaller;
    private Exercice exercice;

    private View[][] grid;
    private LayoutInflater layoutInflater;
    private int base_height_element = 25;
    private int base_width_element = 25;
    private ConstraintLayout gridBorder;
    private GifImageView gridBackground;
    private HashMap<GridExerciceElement, GifImageView> imageViewRegister;
    private HashMap<GridExerciceElement, AutoResizeTextView> labelRegister;
    private int progress = 0;
    private File[] files;
    private ExerciceFunction[] tests;


    /**
     * Instantiates a new Grid exercice factory.
     *
     * @param fragment                the fragment
     * @param context                 the context
     * @param gridborder              the gridborder
     * @param gridBackground          the grid background
     * @param sharedPreferenceManager the shared preference manager
     * @param serverHandler           the server handler
     * @param exercice                the exercice
     */
    GridExerciceFactory(GridExerciceFragment fragment, Context context, ConstraintLayout gridborder, GifImageView gridBackground, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler, Exercice exercice) {
        super(context, sharedPreferenceManager, serverHandler);
        this.fragmentCaller = fragment;
        this.gridBorder = gridborder;
        this.layoutInflater = LayoutInflater.from(context);
        this.exercice = exercice;
        this.imageViewRegister = new HashMap<>();
        this.labelRegister = new HashMap<>();
        this.files = exercice.getFichiers();
        this.grid = initGridLayout();
        this.gridBackground = gridBackground;
    }

    /**
     * Sets progress.
     *
     * @param progressValue the progress value
     */
    public void setProgress(int progressValue) {
        this.progress = progressValue;
    }

    private View[][] initGridLayout() {
        View[][] data = new View[this.exercice.getRows()][this.exercice.getColumns()];

        for(int i = 0; i < data.length ; i ++){
            for(int y = 0; y < data[0].length ; y ++){
                data[i][y] = layoutInflater.inflate(R.layout.exercice_grid_block_layout, null);
            }
        }


        if(this.exercice.getBlocks() !=null){
            for(Block block : this.exercice.getBlocks()){
                GifImageView imageView = generateImageView(block, this.files);
                imageViewRegister.put(block, imageView);
            }
        }

        if(this.exercice.getLabels() !=null){
            for(Label label : this.exercice.getLabels()){
                labelRegister.put(label, generateTextView(label));
            }
        }


        if(this.exercice.getNpcs() != null){
            for(NonPlayerCharacter npc : this.exercice.getNpcs()){
                GifImageView imageView = generateImageView(npc, this.files);
                imageViewRegister.put(npc, imageView);
            }
        }

        if(this.exercice.getPcs() != null){
            for(PlayableCharacter pc : this.exercice.getPcs()){
                GifImageView imageView = generateImageView(pc, this.files);
                imageViewRegister.put(pc, imageView);
            }
        }

        return data;
    }

    /**
     * Update grid linear layout.
     *
     * @param exercice the exercice
     * @param root     the root
     * @return the linear layout
     */
    public LinearLayout updateGrid(Exercice exercice, LinearLayout root){
        this.exercice = exercice;
        eraseBlocks();
        this.grid = initGridLayout();

        return build(root);
    }

    /**
     * Erase blocks.
     */
    public void eraseBlocks() {
        Iterator it = imageViewRegister.entrySet().iterator();
        while(it.hasNext()){
            Map.Entry pair = (Map.Entry)it.next();
            GifImageView imageViewToDelete = (GifImageView) pair.getValue();
            gridBorder.removeView(imageViewToDelete);
        }

        it = labelRegister.entrySet().iterator();
        while (it.hasNext()){
            Map.Entry pair = (Map.Entry)it.next();
            AutoResizeTextView labelToDelete = (AutoResizeTextView) pair.getValue();
            gridBorder.removeView(labelToDelete);
        }

        this.labelRegister.clear();
        this.imageViewRegister.clear();
    }

    @Override
    public LinearLayout build(LinearLayout root) {
        int numRow = this.grid.length;
        int numColumn = this.grid[0].length;

        if(root.getChildCount() > 0){
            root.removeAllViews();
        }

        progress = fragmentCaller.getSeekbarValue();

        for(int i = 0; i < numRow; i++){

            // create row
            LinearLayout row = new LinearLayout(getContext());
            row.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.WRAP_CONTENT, 1 ));
            for(int y = 0; y < numColumn; y++){
                View block = this.grid[i][y];
                block.setLayoutParams(new ViewGroup.LayoutParams((base_width_element + (progress*2)), (base_height_element + (progress*2))));
                row.addView(block);
            }

            root.addView(row);
        }

        ViewGroup.LayoutParams layoutParams = root.getLayoutParams();
        layoutParams.width = ViewGroup.LayoutParams.WRAP_CONTENT;
        layoutParams.height = ViewGroup.LayoutParams.WRAP_CONTENT;

        drawBlocks();

        imageSetBackground(root, this.files, null);


        return root;
    }

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
                gridBackground.setBackground(ContextCompat.getDrawable(context, R.drawable.texturenotfound));
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

        }


    }

    /**
     * Resize grid.
     */
    void resizeGrid(){
        int numRow = this.grid.length;
        int numColumn = this.grid[0].length;

        int newWidth = (base_width_element + (progress*2));
        int newHeight = (base_height_element + (progress*2));

        for(int i = 0; i < numRow; i++){
            for(int y = 0; y < numColumn; y++){
                View gridElement =  grid[i][y];
                ViewGroup.LayoutParams layoutParams = gridElement.getLayoutParams();
                layoutParams.height = newHeight;
                layoutParams.width = newWidth;
                gridElement.setLayoutParams(layoutParams);
            }
        }

        reSizeGridExerciceElements(newHeight, newWidth, progress);
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

        int imageWidth = width * (base_width_element + (progress *2));
        int imageHeight = height * (base_height_element + (progress *2));

        ConstraintLayout.LayoutParams layoutParams = new ConstraintLayout.LayoutParams(imageWidth, imageHeight);

        int marginStart = columnIndex * (base_width_element + (progress *2));
        int marginTop = rowIndex *  (base_height_element + (progress *2));

        layoutParams.setMargins(marginStart, marginTop,0,0);
        layoutParams.topToTop = R.id.gridborder;
        layoutParams.startToStart = R.id.gridborder;

        return layoutParams;
    }

    private void updateLabelTextSize(TextView textView, int seekBarValue){
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


