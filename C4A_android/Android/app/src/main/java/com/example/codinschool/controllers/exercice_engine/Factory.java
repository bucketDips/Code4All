package com.example.codinschool.controllers.exercice_engine;

import android.content.Context;
import android.view.View;
import android.widget.LinearLayout;
import com.example.codinschool.serverhandler.ServerHandler;
import com.example.codinschool.settings.SharedPreferenceManager;

/**
 * The type Factory.
 */
public abstract class Factory {
    /**
     * The Context.
     */
    protected Context context;
    /**
     * The Cache.
     */
    protected SharedPreferenceManager cache;
    /**
     * The Server handler.
     */
    protected ServerHandler serverHandler;

    /**
     * Instantiates a new Factory.
     *
     * @param context                 the context
     * @param sharedPreferenceManager the shared preference manager
     * @param serverHandler           the server handler
     */
    Factory(Context context, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler) {
        this.context = context;
        this.cache = sharedPreferenceManager;
        this.serverHandler = serverHandler;
    }

    /**
     * Build view.
     *
     * @param root the root
     * @return the view
     */
    protected abstract View build(LinearLayout root);

    /**
     * Gets context.
     *
     * @return the context
     */
    public Context getContext() {
        return context;
    }

    /**
     * Sets context.
     *
     * @param context the context
     */
    public void setContext(Context context) {
        this.context = context;
    }

    /**
     * Gets cache.
     *
     * @return the cache
     */
    public SharedPreferenceManager getCache() {
        return cache;
    }

    /**
     * Sets cache.
     *
     * @param cache the cache
     */
    public void setCache(SharedPreferenceManager cache) {
        this.cache = cache;
    }

    /**
     * Gets server handler.
     *
     * @return the server handler
     */
    public ServerHandler getServerHandler() {
        return serverHandler;
    }

    /**
     * Sets server handler.
     *
     * @param serverHandler the server handler
     */
    public void setServerHandler(ServerHandler serverHandler) {
        this.serverHandler = serverHandler;
    }
}
