package com.example.code4all.data_pojo.user;

import com.android.volley.VolleyError;

public interface IUserManagerListener {
    void onUserSaved();
    void onUserLoaded(User user);
    void onUserLoadFail(String user, VolleyError error);

}
