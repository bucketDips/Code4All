package com.codinschool.android.controllers.login;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import com.android.volley.VolleyError;
import com.codinschool.android.R;
import com.codinschool.android.controllers.main_menu.MainMenuActivity;
import com.codinschool.android.customviews.MyEditText;
import com.codinschool.android.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.codinschool.android.data_pojo.user.User;
import com.codinschool.android.error.ErrorNetwork;
import com.codinschool.android.serverhandler.IAPICallbackJsonArray;
import com.codinschool.android.serverhandler.IAPICallbackJsonObject;
import com.codinschool.android.serverhandler.ServerHandler;
import com.codinschool.android.settings.SharedPreferenceManager;
import com.codinschool.android.viewtools.Keyboard;
import com.codinschool.android.viewtools.SnackbarBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * The type Login fragment.
 */
public class LoginFragment extends Fragment{
    private static final String TAG = "LoginFragment";
    private View fragment;
    private ServerHandler serverHandler;
    private SharedPreferenceManager cache;
    private Context context;
    private ProgressBar progressBar;
    private LoginActivity parent;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        fragment = inflater.inflate(R.layout.fragment_login, container, false);
        cache = new SharedPreferenceManager(getContext());
        parent = (LoginActivity) getActivity();

        Button button = fragment.findViewById(R.id.buttonConnect);
        button.setOnClickListener(this::onClickLogin);


        this.context = getContext();

        try {
            LoginActivity loginActivity = (LoginActivity) getActivity();
            if (loginActivity != null) {
                serverHandler = loginActivity.getServerHandler();
            }

            this.cache = new SharedPreferenceManager(context);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return fragment;
    }

    private void onClickLogin(View v) {
        Keyboard.INSTANCE.hide(this.context, v);
        MyEditText username = fragment.findViewById(R.id.username);
        MyEditText password = fragment.findViewById(R.id.password);
        progressBar = fragment.findViewById(R.id.progressBar);
        progressBar.setVisibility(View.VISIBLE);

        serverHandler.connect(String.valueOf(username.getText()), String.valueOf(password.getText()), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                try {
                    progressBar.setVisibility(View.GONE);
                    String res = ServerHandler.getStringFromJsonObject(result, "success");
                    String code = ServerHandler.getStringFromJsonObject(result, "code");

                    if (res.equals("true") || code.equals("AUTHENTIFICATION_SUCCESS")){
                        Intent intent = new Intent(getActivity(), MainMenuActivity.class);
                        String token = result.getString("token");

                        saveUserInfos(username.getText().toString(), token, intent);
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                String msg = ErrorNetwork.parseVolleyError(error, getContext());
                SnackbarBuilder.make(fragment, msg, Snackbar.LENGTH_LONG, R.color.white).show();
                progressBar.setVisibility(View.GONE);
            }
        });
    }

    private void saveUserInfos(String usernameOrEmail, String token, Intent intent){
        serverHandler.findUser(usernameOrEmail, token, new IAPICallbackJsonArray() {
            @Override
            public void onSuccessResponse(@NotNull JSONArray result) {
                try {
                    Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
                    JSONObject userJson = result.getJSONObject(0);
                    User user = gson.fromJson(String.valueOf(userJson), User.class);

                    cache.saveUserInfos(user);
                    cache.saveToken(token);

                    startActivity(intent);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                progressBar.setVisibility(View.GONE);
                parent.returnHome(error);
            }
        });


    }

}
