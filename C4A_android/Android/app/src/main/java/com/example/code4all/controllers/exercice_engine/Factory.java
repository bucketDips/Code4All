package com.example.code4all.controllers.exercice_engine;

import android.content.Context;
import android.view.View;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

public abstract class Factory {
    protected Context context;
    protected SharedPreferenceManager cache;
    protected ServerHandler serverHandler;

    Factory(Context context, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler) {
        this.context = context;
        this.cache = sharedPreferenceManager;
        this.serverHandler = serverHandler;
    }

    protected abstract View build(View root);

    public Context getContext() {
        return context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    public SharedPreferenceManager getCache() {
        return cache;
    }

    public void setCache(SharedPreferenceManager cache) {
        this.cache = cache;
    }

    public ServerHandler getServerHandler() {
        return serverHandler;
    }

    public void setServerHandler(ServerHandler serverHandler) {
        this.serverHandler = serverHandler;
    }
}
