package com.example.code4all.serverhandler

import com.android.volley.VolleyError
import org.json.JSONArray
import org.json.JSONObject


interface IAPICallbackJsonArray {
    // Handling the response from server
    fun onSuccessResponse(result: JSONArray)

    // Handling of error request and action on the activity
    fun onErrorResponse(error: VolleyError)
}
