package com.example.codinschool.serverhandler

import com.android.volley.VolleyError
import org.json.JSONArray


interface IAPICallbackJsonArray {
    // Handling the response from server
    fun onSuccessResponse(result: JSONArray)

    // Handling of error request and action on the activity
    fun onErrorResponse(error: VolleyError)
}
