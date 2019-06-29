package com.example.codinschool.customviews;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.ShapeDrawable;
import android.os.Build;
import android.support.annotation.Nullable;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.CardView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.example.codinschool.R;
import com.example.codinschool.controllers.exercice_engine.CodeExerciceFragment;
import com.example.codinschool.data_pojo.exercice_functions.ExerciceFunction;

@SuppressLint("ViewConstructor")
public class CodeBlock extends CardView {

    //private TextView blockLabel;
    //private LinearLayout linearLayout;
    private ExerciceFunction function;
    private LinearLayout container;
    private ImageView buttonGetUp;
    private ImageView buttonGetDown;
    private ImageView buttonClose;
    private TextView blockLabel;
    private String startAndEnd;
    private Object data;
    private String condition;
    //private CodeBlock ;


    public String getBlockLabelText() {
        return blockLabel.getText().toString();
    }

    public CodeBlock(Context context, ExerciceFunction function, CodeExerciceFragment.DragInputListener listener, boolean primaryFunction, OnLongClickListener longClickListener) {
        super(context);
        init(context, function, listener, primaryFunction, longClickListener);
    }

    public ExerciceFunction getFunction() {
        return function;
    }

    public void init(Context context, ExerciceFunction function, @Nullable CodeExerciceFragment.DragInputListener listener, boolean primaryFunction, OnLongClickListener longClickListener){
        //Log.d("CodeBlocks", "init()");
        inflate(context, R.layout.code_block, this);
        blockLabel = this.findViewById(R.id.block_label);
        buttonGetDown = this.findViewById(R.id.buttonGetDown);
        buttonGetUp = this.findViewById(R.id.buttonGetUp);
        buttonClose = this.findViewById(R.id.buttonClose);
        container = this.findViewById(R.id.container);
        this.function = function;

        if(primaryFunction){
            container.setOnDragListener(listener);
            if(function.getName().equals(ExerciceFunction.PRIMARY_FUNCTION_NAME_FOR)){
                //data = new CodeExerciceFragment.Boucle("boucle",0,0, new CodeExerciceFragment.Action[]{});
            }

            this.setOnLongClickListener(longClickListener);
        }


        String label = getContext().getString(R.string.simple_string_placeholder, function.getName());
        blockLabel.setText(label);
        CardView cardView = findViewById(R.id.block);
        cardView.setCardBackgroundColor(getContext().getResources().getColor(function.getColorid()));

        if (android.os.Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP){
            getBackground().setAlpha(0);
        } else {
            setBackgroundColor(ContextCompat.getColor(context, android.R.color.transparent));
        }
    }

    public String getCondition(){
        return condition;
    }

    public String getStartAndEnd(){
        return startAndEnd;
    }


    public String getNameOfTheFunction(){
        return function.getName();
    }


    @SuppressLint("SetTextI18n")
    public void updateParameters(String parameters){
        if(function.getName().equals(ExerciceFunction.PRIMARY_FUNCTION_NAME_IF))
            this.condition = parameters;
        if(function.getName().equals(ExerciceFunction.PRIMARY_FUNCTION_NAME_FOR)){
            this.startAndEnd = parameters;
        }

        this.blockLabel.setText(function.getName() + "(" + parameters + ")");
    }


    @Override
    public int getChildCount() {
        return super.getChildCount();
    }

    public boolean haveChildren() {
        if(container.getChildCount() >0 )
            return true;
        else
            return false;
    }

    public LinearLayout getContainer() {
        return this.container;
    }

    private void updateDrawableBackground(Drawable background, Context context, int color){

        if (background instanceof ShapeDrawable) {
            ShapeDrawable shapeDrawable = (ShapeDrawable) background;
            shapeDrawable.getPaint().setColor(ContextCompat.getColor(context,color));
        } else if (background instanceof GradientDrawable) {
            GradientDrawable gradientDrawable = (GradientDrawable) background;
            gradientDrawable.setColor(ContextCompat.getColor(context,color));
        } else if (background instanceof ColorDrawable) {
            ColorDrawable colorDrawable = (ColorDrawable) background;
            colorDrawable.setColor(ContextCompat.getColor(context,color));
        }
    }

    public ImageView getButtonGetUp() {
        return this.buttonGetUp;
    }

    public ImageView getButtonGetDown() {
        return this.buttonGetDown;
    }

    public ImageView getButtonClose(){
        return this.buttonClose;
    }
    public boolean isTheSame(CodeBlock target){
        return this.equals(target);
    }
}
