package com.example.code4all.data.classe;

import com.example.code4all.data.user.User;

import java.util.ArrayList;

public interface IClasseCallback {
    void onListLoaded(ArrayList<User> list);
}
