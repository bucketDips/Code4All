package com.example.codinschool.data_pojo.classe;

import com.example.codinschool.data_pojo.user.User;

import java.util.ArrayList;

/**
 * The interface Classe callback.
 */
public interface IClasseCallback {
    /**
     * On list loaded.
     *
     * @param list the list
     */
    void onListLoaded(ArrayList<User> list);
}
