package com.example.codinschool.data_pojo.user;

public interface IUserManager {
    String userData = "userdata";
    void loadUserFromSharedPreference();
    void loadUserInfos(String userNameOrEmail);
    void saveUserInfosJsonToSharedPreferences(User user);
}
