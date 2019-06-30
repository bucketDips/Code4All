package com.example.codinschool.controllers.classes_menu;

import com.example.codinschool.data_pojo.user.User;

/**
 * The interface Recycler view adapter listener used to control user actions on the recyclerview.
 */
public interface IRecyclerViewUsersAdapterListener {
    /**
     * On user selected.
     *
     * @param user the user
     */
    void onUserSelected(User user);
}
