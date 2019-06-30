package com.codinschool.android.customviews;

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
import com.codinschool.android.R;
import com.codinschool.android.controllers.exercice_engine.CodeExerciceFragment;
import com.codinschool.android.data_pojo.exercice_functions.ExerciceFunction;

/**
 * The type Code block.
 */
@SuppressLint("ViewConstructor")
public class CodeBlock extends CardView {


    private ExerciceFunction function;
    private LinearLayout container;
    private ImageView buttonGetUp;
    private ImageView buttonGetDown;
    private ImageView buttonClose;
    private TextView blockLabel;
    private String startAndEnd;
    private String condition;


    /**
     * Gets block label text.
     *
     * @return the block label text
     */
    public String getBlockLabelText() {
        return blockLabel.getText().toString();
    }

    /**
     * Instantiates a new Code block.
     *
     * @param context           the context
     * @param function          the function
     * @param listener          the listener
     * @param primaryFunction   the primary function
     * @param longClickListener the long click listener
     */
    public CodeBlock(Context context, ExerciceFunction function, CodeExerciceFragment.DragInputListener listener, boolean primaryFunction, OnLongClickListener longClickListener) {
        super(context);
        init(context, function, listener, primaryFunction, longClickListener);
    }

    /**
     * Gets function.
     *
     * @return the function
     */
    public ExerciceFunction getFunction() {
        return function;
    }

    /**
     * Init.
     *
     * @param context           the context
     * @param function          the function
     * @param listener          the listener
     * @param primaryFunction   the primary function
     * @param longClickListener the long click listener
     */
    public void init(Context context, ExerciceFunction function, @Nullable CodeExerciceFragment.DragInputListener listener, boolean primaryFunction, OnLongClickListener longClickListener){
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

    /**
     * Get condition string.
     *
     * @return the string
     */
    public String getCondition(){
        return condition;
    }

    /**
     * Get start and end string.
     *
     * @return the string
     */
    public String getStartAndEnd(){
        return startAndEnd;
    }


    /**
     * Get name of the function string.
     *
     * @return the string
     */
    public String getNameOfTheFunction(){
        return function.getName();
    }


    /**
     * Update parameters.
     *
     * @param parameters the parameters
     */
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

    /**
     * Have children boolean.
     *
     * @return the boolean
     */
    public boolean haveChildren() {
        return container.getChildCount() > 0;
    }

    /**
     * Gets container.
     *
     * @return the container
     */
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

    /**
     * Gets button get up.
     *
     * @return the button get up
     */
    public ImageView getButtonGetUp() {
        return this.buttonGetUp;
    }

    /**
     * Gets button get down.
     *
     * @return the button get down
     */
    public ImageView getButtonGetDown() {
        return this.buttonGetDown;
    }

    /**
     * Get button close image view.
     *
     * @return the image view
     */
    public ImageView getButtonClose(){
        return this.buttonClose;
    }

    /**
     * Is the same boolean.
     *
     * @param target the target
     * @return the boolean
     */
    public boolean isTheSame(CodeBlock target){
        return this.equals(target);
    }
}
