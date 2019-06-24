package com.example.code4all.data_pojo.user;

public interface IUserManager {
    String userData = "userdata";
    void loadUserFromSharedPreference();
    void loadUserInfos(String userNameOrEmail);
    void saveUserInfosJsonToSharedPreferences(User user);
}
