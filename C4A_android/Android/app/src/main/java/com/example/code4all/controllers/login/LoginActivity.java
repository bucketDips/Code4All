package com.example.code4all.controllers.login;

import android.os.Bundle;
import com.example.code4all.R;
import com.example.code4all.customviews.MyAppCompatActivity;

public class LoginActivity extends MyAppCompatActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //ServerHandler.initInstance(getApplicationContext());

    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_login;
    }
}
