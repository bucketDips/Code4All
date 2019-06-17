package com.example.code4all.data;

import android.content.Context;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

public class DataManager {


    protected Context context;
    protected SharedPreferenceManager sharedPreferenceManager;
    protected ServerHandler serverHandler;

    public DataManager(ServerHandler serverHandler, Context context) {
        this.sharedPreferenceManager = new SharedPreferenceManager(context);
        this.serverHandler = serverHandler;
        this.context = context;
    }
}
