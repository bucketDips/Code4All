package com.example.code4all.serverhandler

import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import org.json.JSONObject
import org.json.JSONException
import java.util.*
import kotlin.collections.ArrayList as ArrayList1


object ServerHandler_old {




    /*
    private var serverHandler: ServerHandler_old? = null

    fun initInstance(serverHandlerContract : IServerHandler) {
        this.serverHandler = ServerHandler_old(serverHandlerContract)
    }*/
    private var url : String = "http://51.158.110.231:3000/"
    private var instance : ServerHandler_old? = null

    init {
        this.instance = this
    }

    @Throws(Exception::class)
    fun getInstance(): ServerHandler_old {
        if (instance == null) throw Exception("Instance isnt initialized")
        else {
            return this
        }
    }

    @Throws(JSONException::class)
    fun getStringFromJsonObject(jsonObject: JSONObject, target: String): String {
        return if (jsonObject.has(target))
            jsonObject.getString(target)
        else
            ""
    }

    @Throws(JSONException::class)
    fun getStringListFromJsonObject(jsonObject: JSONObject, targets: ArrayList<String>): ArrayList<String> {
        val res = ArrayList<String>()
        for (target: String in targets) {
            if (jsonObject.has(target))
                res.add(jsonObject.getString(target))
            else
                res.add("")
        }
        return res
    }
    /*
    override fun login(mail: String, password: String, iapiCallbackJsonObject: IAPICallbackJsonObject) {
        /*
            WHEN API IS READY */
        val url : String = ServerHandler_old.webServiceURL + "/" + user + login;
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, ServerHandler_old.url + "/" + user + login, ,
            Response.Listener({ obj, result -> obj.onSuccessResponse(result) }),
            Response.ErrorListener({ obj, error -> obj.onErrorResponse(error) })
        )

        val response = JSONObject()
        response.put("success", true)

        iapiCallbackJsonObject.onSuccessResponse(response)
    }
    */
}