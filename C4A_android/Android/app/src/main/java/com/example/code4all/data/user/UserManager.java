package com.example.code4all.data.user;

import android.content.Context;
import com.android.volley.VolleyError;
import com.example.code4all.data.DataManager;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.serverhandler.ServerHandler;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
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

        if (token != null && userNameOrEmail.length() > 0) {
            serverHandler.findUser(userNameOrEmail, token, new IAPICallbackJsonArray() {
                @Override
                public void onSuccessResponse(@NotNull JSONArray result) {
                    try {
                        if(userExist(result)){
                            User user = getUserFromJson(result);
                            saveUserInfosJsonToSharedPreferences(user);
                            listener.onUserLoaded(user);
                        } else {
                            listener.onUserLoaded(null);
                        }

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }

                private User getUserFromJson(JSONArray result) throws JSONException {
                    Gson gson = new Gson();
                    JSONObject userInfos = result.getJSONObject(0);
                    return gson.fromJson(String.valueOf(userInfos), User.class);
                }

                private boolean userExist(JSONArray result) {
                    return result.length() > 0;
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {
                    listener.onUserLoadFail(userNameOrEmail, error);
                }
            });
        } else
            listener.onUserLoaded(null);
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
