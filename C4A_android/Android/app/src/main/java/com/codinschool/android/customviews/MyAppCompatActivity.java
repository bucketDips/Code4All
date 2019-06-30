package com.codinschool.android.customviews;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Toast;
import com.android.volley.VolleyError;
import com.codinschool.android.controllers.login.LoginActivity;
import com.codinschool.android.error.ErrorNetwork;
import com.codinschool.android.serverhandler.ServerHandler;
import com.codinschool.android.settings.SharedPreferenceManager;
import com.codinschool.android.viewtools.SnackbarBuilder;

/**
 * The type My app compat activity.
 */
public abstract class MyAppCompatActivity extends AppCompatActivity {

    /**
     * The Shared preference manager.
     */
    protected SharedPreferenceManager sharedPreferenceManager;
    /**
     * The Server handler.
     */
    protected ServerHandler serverHandler;

    @Override
    public void onCreate(Bundle savedInstanceState,  PersistableBundle persistentState) {
        super.onCreate(null, persistentState);

        try {
            this.sharedPreferenceManager = new SharedPreferenceManager(getApplicationContext());
            this.serverHandler = ServerHandler.getInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }

        setContentView(getLayoutResourceId());
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(null);
        try {
            this.sharedPreferenceManager = new SharedPreferenceManager(getApplicationContext());
            this.serverHandler = ServerHandler.getInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        setContentView(getLayoutResourceId());
    }

    /**
     * Return home.
     *
     * @param error the error
     */
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

    /**
     * Gets server handler.
     *
     * @return the server handler
     */
    public ServerHandler getServerHandler() {
        return serverHandler;
    }

    /**
     * Gets shared preference manager.
     *
     * @return the shared preference manager
     */
    public SharedPreferenceManager getSharedPreferenceManager() {
        return sharedPreferenceManager;
    }

    /**
     * Show snackbar message.
     *
     * @param message the message
     * @param color   the color
     */
    public void showSnackbarMessage(String message, int color){
        SnackbarBuilder.make(getRootView(), message, Snackbar.LENGTH_LONG, color).show();
    }

    /**
     * Gets layout resource id.
     *
     * @return the layout resource id
     */
    protected abstract int getLayoutResourceId();

    /**
     * Gets root view.
     *
     * @return the root view
     */
    protected abstract View getRootView();

}
