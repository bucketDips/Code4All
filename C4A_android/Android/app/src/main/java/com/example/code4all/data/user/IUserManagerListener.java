package com.example.code4all.data.user;

import com.example.code4all.data.classe.Classe;

import java.util.ArrayList;

public interface IUserManagerListener {
    void onUserSaved();
    void onUserLoaded(User user);

}
