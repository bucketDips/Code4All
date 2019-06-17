package com.example.code4all.controllers.login;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.controllers.main_menu.MainMenuActivity;
import com.example.code4all.data.classe.ClasseManager;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;
import com.example.code4all.viewtools.Keyboard;
import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

public class LoginFragment extends Fragment{
    private static final String TAG = "LoginFragment";
    private View fragment;
    private ServerHandler serverHandler;
    private SharedPreferenceManager cache;
    private Context context;



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
        serverHandler.connect(String.valueOf(username.getText()), String.valueOf(password.getText()), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                Log.d(TAG, result.toString());
                try {
                    String res = ServerHandler.getStringFromJsonObject(result, "success");
                    String code = ServerHandler.getStringFromJsonObject(result, "code");

                    if (res.equals("true")){
                        Intent intent = new Intent(getActivity(), MainMenuActivity.class);
                        String token = result.getString("token");

                        cache.saveToken(token);
                        saveUserInfos(username.getText().toString(), intent);

                        startActivity(intent);
                    }else{
                        Log.d(TAG, "onClickLogin An error has occured");
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {

            }
        });
    }

    private void saveUserInfos(String usernameOrEmail, Intent intent){

    }

}
