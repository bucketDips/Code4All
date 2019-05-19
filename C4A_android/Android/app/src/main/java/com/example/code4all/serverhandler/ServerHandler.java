package com.example.code4all.serverhandler;

import android.content.Context;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import org.jetbrains.annotations.NotNull;

import java.util.HashMap;

public class ServerHandler implements IServerHandler{

    private final String url = "http://51.158.110.231:3000";
    private final String connect = "/connect";
    private final String user = "/users";

    private static ServerHandler serverHandler;
    private final RequestQueue requestQueue;

    //private final RequestQueue requestQueue;
    //private final Context context;
    private HashMap<String, Object> listParams;

    private ServerHandler(Context context) {
        this.requestQueue = Volley.newRequestQueue(context);
    }

    public static void initInstance(Context context){
        serverHandler = new ServerHandler(context);
    }

    public static ServerHandler getInstance() throws Exception {
        if(serverHandler == null){
            throw new Exception("Instance isnt initialized");
        }

        return serverHandler;
    }




    @Override
    public void connect(@NotNull String mail, @NotNull String password, @NotNull IAPICallbackJsonObject iapiCallbackJsonObject) {
        String finalUrl = url + user + connect + "/" + mail + "/" + password;
        //RequestQueue requestQueue = Volley.newRequestQueue(context);

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, finalUrl, null,
                iapiCallbackJsonObject::onSuccessResponse,
                iapiCallbackJsonObject::onErrorResponse
        );

        this.requestQueue.add(jsonObjectRequest);
    }
}
