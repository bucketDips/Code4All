package com.example.code4all.settings

import android.content.Context
import com.android.volley.*
import com.example.code4all.R
import com.example.code4all.serverhandler.ServerHandler
import org.json.JSONException
import org.json.JSONObject
import java.io.UnsupportedEncodingException


const val ERROR_MESSAGE_KEY = "error"
const val ERROR_CODE_KEY = "errorCode"

class ErrorNetwork @Throws(UnsupportedEncodingException::class, JSONException::class)
constructor(volleyError: VolleyError, context: Context?) {

    private val errorContent: JSONObject = JSONObject()

    val errorCode: String
        @Throws(JSONException::class)
        get() = ServerHandler.getStringFromJsonObject(errorContent, ERROR_CODE_KEY)

    init {
        errorContent.put(ERROR_MESSAGE_KEY, setMessage(volleyError, context))
    }

    @Throws(UnsupportedEncodingException::class, JSONException::class)
    private fun setMessage(error: VolleyError, context: Context?): String {
        if (error.networkResponse != null) {
            if (error.networkResponse.data != null) {
                val dataJsonMessage = JSONObject(String(error.networkResponse.data))
                return ServerHandler.getStringFromJsonObject(dataJsonMessage, ERROR_MESSAGE_KEY)
            }
        }

        context?.let {
            return when (error) {
                is NetworkError -> context.getString(R.string.network_error_network_error)
                is ServerError -> context.getString(R.string.network_error_server_error)
                is AuthFailureError -> context.getString(R.string.network_error_auth_failure)
                is ParseError -> context.getString(R.string.network_error_parser_error)
                is TimeoutError -> context.getString(R.string.network_error_time_out)
                else -> ""
            }
        }
        return ""
    }

    fun getErrorMessage(): String {
        try {
            return ServerHandler.getStringFromJsonObject(errorContent, ERROR_MESSAGE_KEY)
        } catch (e: JSONException) {
            e.printStackTrace()
        }

        return ""
    }
}
