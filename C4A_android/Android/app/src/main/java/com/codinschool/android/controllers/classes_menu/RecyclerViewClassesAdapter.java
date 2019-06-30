package com.codinschool.android.controllers.classes_menu;

import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import com.codinschool.android.R;
import com.codinschool.android.data_pojo.classe.Classe;
import de.hdodenhof.circleimageview.CircleImageView;

import java.util.ArrayList;

/**
 * The type Recycler view classes adapter.
 */
class RecyclerViewClassesAdapter extends RecyclerView.Adapter<RecyclerViewClassesAdapter.ViewHolder> {

    private static final String TAG = "RecyclerViewAdapter";
    private int selectedPos = RecyclerView.NO_POSITION;

    private ArrayList<Classe> classes;
    private IRecyclerViewClassesAdapterListener callback;

    /**
     * Instantiates a new Recycler view classes adapter.
     *
     * @param classes  the classes to show in the recyclerview
     * @param callback the callback to user action
     */
    RecyclerViewClassesAdapter(ArrayList<Classe> classes, IRecyclerViewClassesAdapterListener callback) {
        this.classes = classes;
        this.callback = callback;
    }


    /**
     * Update data.
     *
     * @param classeList the classe list
     */
    public void updateData(ArrayList<Classe> classeList) {
        classes.clear();
        classes.addAll(classeList);
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.layout_classe_list_item, viewGroup, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        viewHolder.classeName.setText(classes.get(i).getName());
        viewHolder.classeSize.setVisibility(View.GONE);
        viewHolder.itemView.setSelected(selectedPos == i);

        viewHolder.buttonDelete.setOnClickListener(v -> {
            callback.onClickDelete(classes.get(i));
        });

        viewHolder.constraintLayout.setOnClickListener(v -> {
            selectedPos = viewHolder.getLayoutPosition();
            notifyItemChanged(selectedPos);
            callback.onClasseSelected(classes.get(i));
        });
    }

    @Override
    public int getItemCount() {
        return classes.size();
    }

    /**
     * The type View holder.
     */
    class ViewHolder extends RecyclerView.ViewHolder{
        private ImageButton buttonDelete;
        private CircleImageView imageView;
        private TextView classeName;
        private TextView classeSize;
        private ConstraintLayout constraintLayout;

        /**
         * Instantiates a new View holder.
         *
         * @param view the view
         */
        ViewHolder(View view){
            super(view);
            constraintLayout = itemView.findViewById(R.id.constraintLayout);
            imageView = itemView.findViewById(R.id.imageView);
            classeName = itemView.findViewById(R.id.classename);
            classeSize = itemView.findViewById(R.id.classesize);
            constraintLayout = itemView.findViewById(R.id.constraintLayout);
            buttonDelete = itemView.findViewById(R.id.buttonDelete);
        }
    }
}
