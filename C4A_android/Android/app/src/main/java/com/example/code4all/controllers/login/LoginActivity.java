package com.example.code4all.controllers.login;

import android.app.Activity;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.v7.app.AppCompatActivity;
import com.example.code4all.R;
import com.example.code4all.serverhandler.ServerHandler;

public class LoginActivity extends AppCompatActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ServerHandler.initInstance(getApplicationContext());
        setContentView(R.layout.activity_login);
    }
}
