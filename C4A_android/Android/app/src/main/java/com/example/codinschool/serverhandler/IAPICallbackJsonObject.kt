package com.example.codinschool.serverhandler

import com.android.volley.VolleyError
import org.json.JSONObject


interface IAPICallbackJsonObject {
    // Handling the response from server
    fun onSuccessResponse(result: JSONObject)

    // Handling of error request and action on the activity
    fun onErrorResponse(error: VolleyError)
}
