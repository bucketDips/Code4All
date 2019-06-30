package com.example.codinschool.controllers.classes_menu;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.example.codinschool.R;
import com.example.codinschool.data_pojo.user.User;

import java.util.ArrayList;

/**
 * The type Grid users adapter.
 */
public class GridUsersAdapter extends BaseAdapter {

    private ArrayList<User> users;
    /**
     * The Avatars.
     */
    public static Integer[] avatars = {
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

    /**
     * Instantiates a new Grid users adapter.
     *
     * @param userList the user list
     * @param context  the context
     */
    GridUsersAdapter(ArrayList<User> userList, Context context) {
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
        return users.get(position);
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

    /**
     * Get random picture integer.
     *
     * @return the integer
     */
    public static Integer getRandomPicture(){
        double randomNumber = Math.random() * ( avatars.length);
        return avatars[(int) randomNumber];
    }

}
