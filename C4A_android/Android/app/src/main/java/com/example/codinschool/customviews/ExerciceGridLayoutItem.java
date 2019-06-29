package com.example.codinschool.customviews;

import android.content.Context;
import android.support.constraint.ConstraintLayout;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import com.example.codinschool.R;
import com.example.codinschool.data_pojo.exercice.Exercice;

public class ExerciceGridLayoutItem extends ConstraintLayout {
    private OnClickListener listener;
    private LayoutInflater layoutInflate;
    private Exercice exercice;

    public ExerciceGridLayoutItem(Context context, Exercice exercice, OnClickListener listener, int imageid) {
        super(context);
        init(imageid);
        this.listener = listener;
        this.exercice = exercice;
        this.layoutInflate = LayoutInflater.from(context);
    }

    public ExerciceGridLayoutItem(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public ExerciceGridLayoutItem(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    private void init(int imageid){
        layoutInflate.inflate(R.layout.grid_exercice_item_layout, this);
        ImageView imageView = this.findViewById(R.id.imageView);
        TextView exerciceName = this.findViewById(R.id.exerciceName);
        TextView authorName = this.findViewById(R.id.authorName);
        TextView exercice_description = this.findViewById(R.id.exercice_description);
        Button button = this.findViewById(R.id.buttonAdd);


        exerciceName.setText(exercice.getTitle());
        authorName.setText(exercice.getAuthorName());
        exercice_description.setText(exercice.getDescription());
        imageView.setImageResource(imageid);
        button.setOnClickListener(listener);
    }

    public Exercice getExercice() {
        return this.exercice;
    }
}
