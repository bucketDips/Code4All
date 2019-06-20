package com.example.code4all.error;

import android.content.Context;
import com.android.volley.*;
import com.example.code4all.R;
import com.example.code4all.serverhandler.ServerHandler;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

public class ErrorNetwork extends VolleyError {

//    Keys for json search
    private final String ERROR_MESSAGE_KEY = "error";
    private final String ERROR_CODE_KEY = "errorCode";

    private JSONObject errorContent;


    public ErrorNetwork(VolleyError volleyError, Context context) throws JSONException {
        errorContent = new JSONObject();
        errorContent.put(ERROR_MESSAGE_KEY, setMessage(volleyError, context));

//            int statusCode = volleyError.networkResponse.statusCode;
//            if (volleyError.networkResponse.data != null) {
//                JSONObject dataJsonMessage = new JSONObject(new String(volleyError.networkResponse.data, "UTF-8"));
//                errorContent.put(ERROR_MESSAGE_KEY, ServerHandler.getStringFromJsonObject(dataJsonMessage, ERROR_MESSAGE_KEY));
//            } else {
//                errorContent.put(ERROR_MESSAGE_KEY, "Check your internet connection");
//            }

    }

    private String setMessage(VolleyError error, Context context) {
        /*
        if (error.networkResponse != null) {
            if (error.networkResponse.data != null) {
                JSONObject dataJsonMessage = new JSONObject(new String(error.networkResponse.data, StandardCharsets.UTF_8));
                return ServerHandler.getStringFromJsonObject(dataJsonMessage, ERROR_MESSAGE_KEY);
            }
        }*/
        if (error instanceof NetworkError) {
             return context.getString(R.string.network_error_network_error);
        } else if (error instanceof ServerError) {
            return context.getString(R.string.network_error_server_error);
        } else if (error instanceof AuthFailureError) {
            return context.getString(R.string.network_error_auth_failure);
        } else if (error instanceof ParseError) {
            return context.getString(R.string.network_error_parser_error);
        } else if (error instanceof TimeoutError) {
            return context.getString(R.string.network_error_time_out);
        }
        return "";
    }
    public String diplayErrorMessage(){
        try {
            return ServerHandler.getStringFromJsonObject(errorContent, ERROR_MESSAGE_KEY);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return "";
    }

    public String getErrorCode() throws JSONException {
        return ServerHandler.getStringFromJsonObject(errorContent, ERROR_CODE_KEY);
    }
}
