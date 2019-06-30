package com.codinschool.android.data_pojo;

import android.content.Context;
import com.codinschool.android.serverhandler.ServerHandler;
import com.codinschool.android.settings.SharedPreferenceManager;

/**
 * The type Data manager.
 */
public class DataManager {


    /**
     * The Context.
     */
    protected Context context;
    /**
     * The Shared preference manager.
     */
    protected SharedPreferenceManager sharedPreferenceManager;
    /**
     * The Server handler.
     */
    protected ServerHandler serverHandler;

    /**
     * Instantiates a new Data manager.
     *
     * @param serverHandler the server handler
     * @param context       the context
     */
    public DataManager(ServerHandler serverHandler, Context context) {
        this.sharedPreferenceManager = new SharedPreferenceManager(context);
        this.serverHandler = serverHandler;
        this.context = context;
    }
}
