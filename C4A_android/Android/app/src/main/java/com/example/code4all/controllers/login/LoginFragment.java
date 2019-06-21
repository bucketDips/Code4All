package com.example.code4all.controllers.login;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.controllers.main_menu.MainMenuActivity;
import com.example.code4all.data.user.User;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;
import com.example.code4all.viewtools.Keyboard;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class LoginFragment extends Fragment{
    private static final String TAG = "LoginFragment";
    private View fragment;
    private ServerHandler serverHandler;
    private SharedPreferenceManager cache;
    private Context context;
    private ProgressBar progressBar;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        fragment = inflater.inflate(R.layout.fragment_login, container, false);
        cache = new SharedPreferenceManager(getContext());

        Button button = fragment.findViewById(R.id.buttonConnect);
        button.setOnClickListener(this::onClickLogin);


        this.context = getContext();

        try {
            serverHandler = ServerHandler.getInstance();

            this.cache = new SharedPreferenceManager(context);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return fragment;
    }

    private void onClickLogin(View v) {
        Keyboard.INSTANCE.hide(this.context, v);
        Log.d(TAG, "onClickLogin");
        TextView username = fragment.findViewById(R.id.username);
        TextView password = fragment.findViewById(R.id.password);
        progressBar = fragment.findViewById(R.id.progressBar);
        progressBar.setVisibility(View.VISIBLE);

        serverHandler.connect(String.valueOf(username.getText()), String.valueOf(password.getText()), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                Log.d(TAG, result.toString());
                try {
                    progressBar.setVisibility(View.GONE);
                    String res = ServerHandler.getStringFromJsonObject(result, "success");
                    String code = ServerHandler.getStringFromJsonObject(result, "code");

                    if (res.equals("true") || code.equals("AUTHENTIFICATION_SUCCESS")){
                        Intent intent = new Intent(getActivity(), MainMenuActivity.class);
                        String token = result.getString("token");

                        cache.saveToken(token);

                        saveUserInfos(username.getText().toString(), token, intent);
                    }else{
                        Log.d(TAG, "onClickLogin An error has occured");
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                ErrorNetwork.parseVolleyError(error, getContext());
                progressBar.setVisibility(View.GONE);

                /*
                progressBar.setVisibility(View.GONE);
                ErrorNetwork errorNetwork = null;
                try {
                    errorNetwork = new ErrorNetwork(error, getContext());

                } catch (JSONException e) {
                    e.printStackTrace();
                }
                if(errorNetwork != null){
                    Log.d(TAG,errorNetwork.diplayErrorMessage());
                    Snackbar.make(fragment, errorNetwork.diplayErrorMessage(), Snackbar.LENGTH_LONG).show();
                }*/
            }
        });
    }

    private void saveUserInfos(String usernameOrEmail, String token, Intent intent){
        serverHandler.findUser(usernameOrEmail, token, new IAPICallbackJsonArray() {
            @Override
            public void onSuccessResponse(@NotNull JSONArray result) {
                try {
                    Gson gson = new GsonBuilder().create();
                    JSONObject userJson = result.getJSONObject(0);
                    User user = gson.fromJson(String.valueOf(userJson), User.class);
                    cache.saveUserInfos(user);
                    
                    startActivity(intent);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                progressBar.setVisibility(View.GONE);
            }
        });


    }

}
