package com.example.codinschool.data_pojo.user;

import com.android.volley.VolleyError;

public interface IUserManagerListener {
    void onUserSaved();
    void onUserLoaded(User user);
    void onUserLoadFail(String user, VolleyError error);

}
