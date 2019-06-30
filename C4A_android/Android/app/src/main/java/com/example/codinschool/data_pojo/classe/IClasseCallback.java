package com.example.codinschool.data_pojo.classe;

import com.example.codinschool.data_pojo.user.User;

import java.util.ArrayList;

public interface IClasseCallback {
    void onListLoaded(ArrayList<User> list);
}
