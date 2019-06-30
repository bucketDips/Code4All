package com.codinschool.android.controllers.classes_menu;

import com.codinschool.android.data_pojo.user.User;

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
