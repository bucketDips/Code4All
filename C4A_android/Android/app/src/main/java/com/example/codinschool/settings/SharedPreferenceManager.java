package com.example.codinschool.settings;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import com.example.codinschool.R;
import com.example.codinschool.data_pojo.user.IUserManager;
import com.example.codinschool.data_pojo.user.User;
import com.google.gson.Gson;


/**
 * Created by wmorgado on 13/03/2018.
 */

public class SharedPreferenceManager {

    private final Context context;
    private SharedPreferences cache ;
    private SharedPreferences.Editor editor;

    public SharedPreferenceManager(Context context){
        this.context = context;
        this.cache = PreferenceManager.getDefaultSharedPreferences(context);
        this.editor = cache.edit();
    }

    public Boolean isAccountRemembered(){
        return cache.getBoolean(context.getString(R.string.remember_me), false);
    }

    public String getTokenSaved(){
        return cache.getString(context.getString(R.string.token), "");
    }

    public void saveToken(String token) {
        cache.edit().putString(context.getString(R.string.token), token).apply();
    }

    public void saveUserInfos(User user) {
        Gson gson = new Gson();
        String userJson = gson.toJson(user);
        cache.edit().putString(IUserManager.userData, userJson).apply();
    }

    public User getUserInfos(){
        Gson gson =  new Gson();
        String userJson = cache.getString(IUserManager.userData, "");


        if(!userJson.equals("")){
            User user = gson.fromJson(userJson, User.class);
            return user;
        }
        else
            return null;
    }

    public void clearCache(){
        cache.edit().clear().apply();
    }

}