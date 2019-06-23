package com.example.code4all.data_pojo.classe;

import com.example.code4all.data_pojo.user.User;

import java.util.ArrayList;

public interface IClasseCallback {
    void onListLoaded(ArrayList<User> list);
}
