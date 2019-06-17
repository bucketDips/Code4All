package com.example.code4all.controllers.classes_menu;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;
import com.example.code4all.R;
import com.example.code4all.data.classe.Classe;
import de.hdodenhof.circleimageview.CircleImageView;

import java.util.ArrayList;

class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {

    private static final String TAG = "RecyclerViewAdapter";

    private ArrayList<Classe> classes = new ArrayList<>();
    private Context context;

    RecyclerViewAdapter(ArrayList<Classe> classes, Context context) {
        this.classes = classes;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.layout_classe_list_item, viewGroup, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        Log.d(TAG, "onBindViewHolder: called");
        viewHolder.classeName.setText(classes.get(i).getName());
        viewHolder.classeSize.setVisibility(View.GONE);
        viewHolder.constraintLayout.setOnClickListener(v -> {
            Log.d(TAG, "onClick: clicked on: " + classes.get(i).getName());
            Toast.makeText(context, classes.get(i).getName(), Toast.LENGTH_LONG).show();
        });

    }

    @Override
    public int getItemCount() {
        return classes.size();
    }

    class ViewHolder extends RecyclerView .ViewHolder{
        CircleImageView imageView;
        TextView classeName;
        TextView classeSize;
        ConstraintLayout constraintLayout;

        ViewHolder(View view){
            super(view);
            imageView = itemView.findViewById(R.id.imageView);
            classeName = itemView.findViewById(R.id.classename);
            classeSize = itemView.findViewById(R.id.classesize);
            constraintLayout = itemView.findViewById(R.id.constraintLayout);
        }
    }
}
