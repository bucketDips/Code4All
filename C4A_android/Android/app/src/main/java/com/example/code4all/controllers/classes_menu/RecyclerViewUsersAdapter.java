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
import com.example.code4all.R;
import com.example.code4all.data_pojo.user.User;

import java.util.ArrayList;

class RecyclerViewUsersAdapter extends RecyclerView.Adapter<RecyclerViewUsersAdapter.ViewHolder> {

    private static final String TAG = "RecyclerViewAdapter";
    private final Context context;

    private ArrayList<User> users;
    private IRecyclerViewUsersAdapterListener callback;
    private ArrayList<Boolean> isSelected;

    RecyclerViewUsersAdapter(ArrayList<User> users, Context context, IRecyclerViewUsersAdapterListener callback) {
        this.users = users;
        this.callback = callback;
        this.context = context;
        this.isSelected = new ArrayList<>();
    }

    void updateData(ArrayList<User> users){
        this.users = users;
        notifyDataSetChanged();

        //updateAllBackground(users);
    }

    /*
    private void updateAllBackground(ArrayList<User> usersSelected) {

        for(int i = 0; i < getItemCount(); i++){

        }
    }*/

    void clearData(){
        this.users.clear();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        Log.d(TAG, "onCreateViewHolder called");
        View view = LayoutInflater.from(context).inflate(R.layout.layout_user_search_item, viewGroup, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        Log.d(TAG, "onBindViewHolder: called");

        int pos = i;

        isSelected.add(false);

        viewHolder.userMail.setText(users.get(pos).getEmail());
        viewHolder.userName.setText(users.get(pos).getName());

        viewHolder.row.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //changeRowBackGround(v, pos);
                callback.onUserSelected(users.get(pos));
            }
        });
    }

    private void changeRowBackGround(View view, int i){
        if(!isSelected.get(i)){
            view.setBackgroundColor(context.getColor(R.color.blue));
        } else {
            view.setBackgroundColor(context.getColor(R.color.text));
        }
        isSelected.set(i, !isSelected.get(i));
    }

    @Override
    public int getItemCount() {
        return users.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{
        private TextView userName;
        private TextView userMail;
        private ConstraintLayout row;

        ViewHolder(View view){
            super(view);
            row = itemView.findViewById(R.id.row);
            userName = itemView.findViewById(R.id.username);
            userMail = itemView.findViewById(R.id.email);
        }
    }
}
