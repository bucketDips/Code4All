package com.example.codinschool.controllers.login;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import com.example.codinschool.R;
import com.example.codinschool.controllers.main_menu.MainMenuActivity;
import com.example.codinschool.customviews.MyAppCompatActivity;
import com.example.codinschool.data_pojo.user.User;
import com.example.codinschool.serverhandler.ServerHandler;

/**
 * The type Login activity.
 */
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
