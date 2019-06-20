package com.example.code4all.controllers.classes_menu;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.data.user.User;

import java.util.ArrayList;

public class GridUsersAdapter extends BaseAdapter {

    private ArrayList<User> users;
    private Integer[] avatars = {
        R.drawable.boy,
        R.drawable.boy1,
        R.drawable.girl,
        R.drawable.girl1,
        R.drawable.man,
        R.drawable.man1,
        R.drawable.man2,
        R.drawable.man3,
        R.drawable.man4
    };
    private Context context;
    private LayoutInflater inflater;

    public GridUsersAdapter(ArrayList<User> userList, Context context) {
        super();
        this.users = userList;
        this.inflater = LayoutInflater.from(context);
        this.context = context;
    }

    @Override
    public int getCount() {
        return users.size();
    }

    @Override
    public Object getItem(int position) {
        return position;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if(convertView == null){
            convertView = this.inflater.inflate(R.layout.user_grid_layout, null);
            TextView userLabel = convertView.findViewById(R.id.userLabel);
            ImageView userImage = convertView.findViewById(R.id.userImage);

            userLabel.setText(context.getString(R.string.user_grid_layout_label, users.get(position).getName()));
            double randomNumber = Math.random() * ( avatars.length);

            if(randomNumber > 0 || randomNumber < avatars.length)
                userImage.setImageResource(avatars[(int) randomNumber]);
            else
                userImage.setImageResource(avatars[4]);
        }


        return convertView;
    }

}
