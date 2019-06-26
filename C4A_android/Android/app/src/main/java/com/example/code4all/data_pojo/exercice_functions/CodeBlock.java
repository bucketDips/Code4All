package com.example.code4all.data_pojo.exercice_functions;

import android.content.Context;
import android.support.constraint.ConstraintLayout;
import android.util.AttributeSet;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.data_pojo.exercice.Exercice;

public class CodeBlock extends ConstraintLayout {

    public CodeBlock(Context context) {
        super(context);
    }

    public CodeBlock(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public CodeBlock(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    private ExerciceFunction exerciceFunction;
    public CodeBlock(Context context, ExerciceFunction exerciceFunction) {
        super(context);
        this.exerciceFunction = exerciceFunction;
    }

    public CodeBlock(Context context, AttributeSet attrs, ExerciceFunction exerciceFunction) {
        super(context, attrs);
        this.exerciceFunction = exerciceFunction;
    }

    public CodeBlock(Context context, AttributeSet attrs, int defStyleAttr, ExerciceFunction exerciceFunction) {
        super(context, attrs, defStyleAttr);
        this.exerciceFunction = exerciceFunction;
    }
    private void init(Context context){
        TextView blockLabel = this.findViewById(R.id.block_label);
        String label = context.getString(R.string.simple_string_placeholder, exerciceFunction.getName());
        blockLabel.setText(label);
    }
}
