package com.example.code4all.controllers.login;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import com.example.code4all.R;
import com.example.code4all.controllers.main_menu.MainMenuActivity;
import com.example.code4all.customviews.MyAppCompatActivity;
import com.example.code4all.data_pojo.user.User;
import com.example.code4all.serverhandler.ServerHandler;

public class LoginActivity extends MyAppCompatActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        ServerHandler.initInstance(getApplicationContext());
        super.onCreate(savedInstanceState);

        User user = sharedPreferenceManager.getUserInfos();
        if(user != null){
            restoreSession();
        }
    }

    private void restoreSession() {
        Intent intent = new Intent(this, MainMenuActivity.class);
        startActivity(intent);

    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_login;
    }

    @Override
    protected View getRootView() {
        return findViewById(R.id.root);
    }
}
