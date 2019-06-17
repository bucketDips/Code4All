package com.example.code4all.data.user;

import org.json.JSONObject;

public interface IUserManager {
    String userData = "userdata";
    void loadUserFromSharedPreference();
    void loadUserInfos(String userNameOrEmail);
    void saveUserInfosJsonToSharedPreferences(User user);
}
