package com.codinschool.android.controllers.login;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import com.codinschool.android.R;
import com.codinschool.android.controllers.main_menu.MainMenuActivity;
import com.codinschool.android.customviews.MyAppCompatActivity;
import com.codinschool.android.data_pojo.user.User;
import com.codinschool.android.serverhandler.ServerHandler;

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
