package com.example.code4all.data.user;

import android.content.Context;
import com.android.volley.VolleyError;
import com.example.code4all.data.DataManager;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.serverhandler.ServerHandler;
import com.google.gson.Gson;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class UserManager extends DataManager implements IUserManager {
    private IUserManagerListener listener;

    public UserManager (Context context, ServerHandler serverHandler){
        super(serverHandler, context);
        this.context = context;
        this.serverHandler = serverHandler;
    }

    public void setListener(IUserManagerListener listener) {
        this.listener = listener;
    }

    // look for an user in the cache and return it
    @Override
    public void loadUserFromSharedPreference() {
        User user = sharedPreferenceManager.getUserInfos();
        listener.onUserLoaded(user);
    }



    @Override
    public void loadUserInfos(String userNameOrEmail) {
        String token = this.sharedPreferenceManager.getTokenSaved();

        if (token != null) {
            serverHandler.findUser(userNameOrEmail, token, new IAPICallbackJsonArray() {
                @Override
                public void onSuccessResponse(@NotNull JSONArray result) {
                    try {
                        JSONObject userInfos = result.getJSONObject(0);
                        Gson gson = new Gson();

                        User user = gson.fromJson(String.valueOf(userInfos), User.class);
                        saveUserInfosJsonToSharedPreferences(user);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {

                }
            });
        }
    }


    // Save user infos json to cache
    @Override
    public void saveUserInfosJsonToSharedPreferences(User user) {
        this.sharedPreferenceManager.saveUserInfos(user);
        listener.onUserSaved();

        // load the user saved in cache to memory
        loadUserFromSharedPreference();

    }
}
