package com.example.code4all.controllers.classes_menu;

import android.os.Bundle;
import com.example.code4all.R;
import com.example.code4all.controllers.MyAppCompatActivity;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

public class ClasseListActivity extends MyAppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_classes_menu;
    }

    public ServerHandler getServerHandler(){
        return serverHandler;
    }

    public SharedPreferenceManager getSharedPreferenceManager(){
        return sharedPreferenceManager;
    }


}
