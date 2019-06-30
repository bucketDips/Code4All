package com.example.codinschool.error;

import android.content.Context;
import com.android.volley.*;
import com.example.codinschool.R;
import com.example.codinschool.serverhandler.ServerHandler;
import org.json.JSONException;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;

/**
 * The type Error network.
 */
public class ErrorNetwork extends VolleyError {

    /**
     * The constant ERROR_MESSAGE_KEY.
     */
//    Keys for json search
    public static final String ERROR_MESSAGE_KEY = "message";
    /**
     * The constant ERROR_CODE_KEY.
     */
    public static final String ERROR_CODE_KEY = "code";

    /**
     * The constant ERROR_CODE_INCORRECT_TOKEN_VALUE.
     */
    public static final String ERROR_CODE_INCORRECT_TOKEN_VALUE = "INCORRECT_TOKEN";



    private JSONObject errorContent;


    /**
     * Instantiates a new network error .
     *
     * @param volleyError the volley error
     * @param context     the context
     * @throws JSONException the json exception
     */
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

    /**
     * Parse volley error string.
     *
     * @param error   the error
     * @param context the context
     * @return the string
     */
    public static String parseVolleyError(VolleyError error, Context context){
        try {
            if(error.networkResponse == null)
                return getVolleyError(error, context);

            String responseBody = new String(error.networkResponse.data, StandardCharsets.UTF_8);
            JSONObject data = new JSONObject(responseBody);
            String message = data.getString(ERROR_MESSAGE_KEY);
            return message;
        } catch (JSONException e){e.printStackTrace();}

        return null;
    }

    /**
     * Get error code string.
     *
     * @param error the error
     * @return the string
     */
    public static String getErrorCode(VolleyError error){
        try {
            String responseBody = new String(error.networkResponse.data, StandardCharsets.UTF_8);
            JSONObject data = new JSONObject(responseBody);
            return data.getString(ERROR_CODE_KEY);
        } catch (JSONException e){e.printStackTrace();}

        return null;
    }

    /**
     * Get volley error string.
     *
     * @param error   the error
     * @param context the context
     * @return the string
     */
    public static String getVolleyError(VolleyError error, Context context){
        try {
            if (error instanceof NetworkError) {
                return context.getString(R.string.network_error_network_error);

            } else if (error instanceof ServerError) {
                return context.getString(R.string.network_error_server_error);

            } else if (error instanceof AuthFailureError) {
                String responseBody = new String(error.networkResponse.data, StandardCharsets.UTF_8);
                JSONObject data = new JSONObject(responseBody);
                return data.getString(ERROR_MESSAGE_KEY);

            } else if (error instanceof ParseError) {
                return context.getString(R.string.network_error_parser_error);

            } else if (error instanceof TimeoutError) {
                return context.getString(R.string.network_error_time_out);
            }

        }
        catch (JSONException ignored) {}

        return null;
    }


    private String setMessage(VolleyError error, Context context) {
        return "";
    }

    /**
     * Diplay error message string.
     *
     * @return the string
     */
    public String diplayErrorMessage(){
        try {
            return ServerHandler.getStringFromJsonObject(errorContent, ERROR_MESSAGE_KEY);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return "";
    }
}
