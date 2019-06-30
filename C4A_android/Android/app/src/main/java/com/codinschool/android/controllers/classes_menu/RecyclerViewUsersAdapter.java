package com.codinschool.android.controllers.classes_menu;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import com.codinschool.android.R;
import com.codinschool.android.data_pojo.user.User;

import java.util.ArrayList;

/**
 * The type Recycler view users adapter.
 */
class RecyclerViewUsersAdapter extends RecyclerView.Adapter<RecyclerViewUsersAdapter.ViewHolder> {

    private static final String TAG = "RecyclerViewAdapter";
    private final Context context;

    private ArrayList<User> users;
    private IRecyclerViewUsersAdapterListener callback;
    private ArrayList<Boolean> isSelected;

    /**
     * Instantiates a new Recycler view users adapter.
     *
     * @param users    the users
     * @param context  the context
     * @param callback the callback
     */
    RecyclerViewUsersAdapter(ArrayList<User> users, Context context, IRecyclerViewUsersAdapterListener callback) {
        this.users = users;
        this.callback = callback;
        this.context = context;
        this.isSelected = new ArrayList<>();
    }

    /**
     * Update data.
     *
     * @param users the users
     */
    void updateData(ArrayList<User> users){
        this.users = users;
        notifyDataSetChanged();
    }


    /**
     * Clear data.
     */
    void clearData(){
        this.users.clear();
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(context).inflate(R.layout.layout_user_search_item, viewGroup, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {

        int pos = i;

        isSelected.add(false);

        viewHolder.userMail.setText(users.get(pos).getEmail());
        viewHolder.userName.setText(users.get(pos).getName());

        viewHolder.row.setOnClickListener(v -> callback.onUserSelected(users.get(pos)));
    }

    @Override
    public int getItemCount() {
        return users.size();
    }

    /**
     * The type View holder.
     */
    class ViewHolder extends RecyclerView.ViewHolder{
        private TextView userName;
        private TextView userMail;
        private ConstraintLayout row;

        /**
         * Instantiates a new View holder.
         *
         * @param view the view
         */
        ViewHolder(View view){
            super(view);
            row = itemView.findViewById(R.id.row);
            userName = itemView.findViewById(R.id.username);
            userMail = itemView.findViewById(R.id.email);
        }
    }
}
