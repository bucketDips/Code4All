package com.codinschool.android.customviews;

import android.content.Context;
import android.support.constraint.ConstraintLayout;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import com.codinschool.android.R;
import com.codinschool.android.controllers.store.IStoreActivity;
import com.codinschool.android.data_pojo.exercice.Exercice;

/**
 * The type Exercice grid layout item.
 */
public class ExerciceGridLayoutItem extends ConstraintLayout {
    private IStoreActivity listener;
    private LayoutInflater layoutInflate;
    private Exercice exercice;

    /**
     * Instantiates a new Exercice grid layout item.
     *
     * @param context  the context
     * @param exercice the exercice
     * @param listener the listener
     * @param imageid  the imageid
     */
    public ExerciceGridLayoutItem(Context context, Exercice exercice, IStoreActivity listener, int imageid) {
        super(context);
        this.listener = listener;
        this.exercice = exercice;
        this.layoutInflate = LayoutInflater.from(context);
        init(imageid);

    }

    /**
     * Instantiates a new Exercice grid layout item.
     *
     * @param context the context
     * @param attrs   the attrs
     */
    public ExerciceGridLayoutItem(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    /**
     * Instantiates a new Exercice grid layout item.
     *
     * @param context      the context
     * @param attrs        the attrs
     * @param defStyleAttr the def style attr
     */
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
        button.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onClickAdded(exercice);
            }
        });
    }

    /**
     * Gets exercice.
     *
     * @return the exercice
     */
    public Exercice getExercice() {
        return this.exercice;
    }
}
