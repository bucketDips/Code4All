package com.example.codinschool.controllers.classes_menu;

import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import com.example.codinschool.R;
import com.example.codinschool.data_pojo.classe.Classe;
import de.hdodenhof.circleimageview.CircleImageView;

import java.util.ArrayList;

class RecyclerViewClassesAdapter extends RecyclerView.Adapter<RecyclerViewClassesAdapter.ViewHolder> {

    private static final String TAG = "RecyclerViewAdapter";
    private int selectedPos = RecyclerView.NO_POSITION;

    private ArrayList<Classe> classes;
    private IRecyclerViewClassesAdapterListener callback;

    RecyclerViewClassesAdapter(ArrayList<Classe> classes, IRecyclerViewClassesAdapterListener callback) {
        Log.d(TAG, "constructor called");
        this.classes = classes;
        this.callback = callback;
    }



    public void updateData(ArrayList<Classe> classeList) {
        classes.clear();
        classes.addAll(classeList);
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        Log.d(TAG, "onCreateViewHolder called");
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.layout_classe_list_item, viewGroup, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        Log.d(TAG, "onBindViewHolder: called");
        Log.d(TAG, classes.get(i).toString());
        viewHolder.classeName.setText(classes.get(i).getName());
        viewHolder.classeSize.setVisibility(View.GONE);
        viewHolder.itemView.setSelected(selectedPos == i);

        viewHolder.buttonDelete.setOnClickListener(v -> {
            callback.onClickDelete(classes.get(i));
            //Toast.makeText(context, classes.get(i).getName(), Toast.LENGTH_LONG).show();
        });

        viewHolder.constraintLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                selectedPos = viewHolder.getLayoutPosition();
                notifyItemChanged(selectedPos);
                callback.onClasseSelected(classes.get(i));
                Log.d(TAG, "onClick: clicked on: " + classes.get(i).getName());
            }
        });
    }

    @Override
    public int getItemCount() {
        return classes.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{
        private ImageButton buttonDelete;
        private CircleImageView imageView;
        private TextView classeName;
        private TextView classeSize;
        private ConstraintLayout constraintLayout;

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
