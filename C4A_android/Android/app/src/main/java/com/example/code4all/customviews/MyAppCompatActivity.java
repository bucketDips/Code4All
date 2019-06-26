package com.example.code4all.customviews;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.util.AttributeSet;
import android.view.View;
import android.view.Window;
import android.widget.Toast;
import com.android.volley.VolleyError;
import com.example.code4all.controllers.login.LoginActivity;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;
import com.example.code4all.viewtools.SnackbarBuilder;

public abstract class MyAppCompatActivity extends AppCompatActivity {

    protected SharedPreferenceManager sharedPreferenceManager;
    protected ServerHandler serverHandler;

    @Override
    public void onCreate(Bundle savedInstanceState,  PersistableBundle persistentState) {
        super.onCreate(null, persistentState);

        try {
            // ONLY TO TEST ONE ACTIVITY, DELETE IN PROD
            //ServerHandler.initInstance(getApplicationContext());

            this.sharedPreferenceManager = new SharedPreferenceManager(getApplicationContext());
            this.serverHandler = ServerHandler.getInstance();
            //getWindow().requestFeature(Window.FEATURE_CONTENT_TRANSITIONS);

        } catch (Exception e) {
            e.printStackTrace();
        }

        setContentView(getLayoutResourceId());
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(null);

        try {
            // ONLY TO TEST ONE ACTIVITY, DELETE IN PROD
            //ServerHandler.initInstance(getApplicationContext());

            this.sharedPreferenceManager = new SharedPreferenceManager(getApplicationContext());
            this.serverHandler = ServerHandler.getInstance();
            //getWindow().requestFeature(Window.FEATURE_CONTENT_TRANSITIONS);


        } catch (Exception e) {
            e.printStackTrace();
        }

        setContentView(getLayoutResourceId());
    }

    public void returnHome(VolleyError error){
        if(error != null){
            String code = ErrorNetwork.getErrorCode(error);
            String message = ErrorNetwork.getVolleyError(error, getApplicationContext());
            String res = code + " " + message;
            Toast.makeText(getApplicationContext(), res , Toast.LENGTH_LONG).show();

            if(code.equals(ErrorNetwork.ERROR_CODE_INCORRECT_TOKEN_VALUE))
                sharedPreferenceManager.clearCache();

            if(!(this instanceof LoginActivity)){
                sharedPreferenceManager.clearCache();
                Intent intent = new Intent(this, LoginActivity.class);
                startActivity(intent);
            }
        } else {
            sharedPreferenceManager.clearCache();
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
        }

    }
    public ServerHandler getServerHandler() {
        return serverHandler;
    }

    public SharedPreferenceManager getSharedPreferenceManager() {
        return sharedPreferenceManager;
    }

    public void showSnackbarMessage(String message, int color){
        SnackbarBuilder.make(getRootView(), message, Snackbar.LENGTH_LONG, color).show();
    }

    protected abstract int getLayoutResourceId();
    protected abstract View getRootView();

}
