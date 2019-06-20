package com.example.code4all.controllers;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

public abstract class MyAppCompatActivity extends AppCompatActivity {

    protected SharedPreferenceManager sharedPreferenceManager;
    protected ServerHandler serverHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            // ONLY TO TEST ONE ACTIVITY, DELETE IN PROD
            //ServerHandler.initInstance(getApplicationContext());

            this.sharedPreferenceManager = new SharedPreferenceManager(getApplicationContext());
            this.serverHandler = ServerHandler.getInstance();

        } catch (Exception e) {
            e.printStackTrace();
        }

        setContentView(getLayoutResourceId());
    }

    public ServerHandler getServerHandler() {
        return serverHandler;
    }

    public SharedPreferenceManager getSharedPreferenceManager() {
        return sharedPreferenceManager;
    }

    protected abstract int getLayoutResourceId();

}
