package com.example.code4all.controllers.login

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.android.volley.VolleyError
import com.example.code4all.controllers.main_menu.MainMenuActivity
import com.example.code4all.serverhandler.IAPICallbackJsonObject
import com.example.code4all.serverhandler.ServerHandler
import com.example.code4all.settings.SharedPreferenceManager
import com.example.code4all.tools.Log
import com.example.code4all.viewtools.Keyboard
import kotlinx.android.synthetic.main.fragment_login.*
import kotlinx.android.synthetic.main.fragment_login.view.*
import org.json.JSONObject


class LoginFragment : Fragment() {


    val serverHandler : ServerHandler = ServerHandler.getInstance()
    private lateinit var sharedPreferenceManager: SharedPreferenceManager


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val fragment =  inflater.inflate(com.example.code4all.R.layout.fragment_login, container, false)
        sharedPreferenceManager = SharedPreferenceManager(context)

        fragment.buttonConnect.setOnClickListener{ v ->
            try {
                onClickLogin(v)
            } catch (e: InterruptedException) {
                e.printStackTrace()
            }
        }
        return fragment

    }

    private fun onClickLogin(v: View) {
        activity?.let { Keyboard.hide(it, v) }

        Log.printLog("I click on the button", Log.LogType.Infos)
        serverHandler.connect(username.text.toString(), password.text.toString(), object: IAPICallbackJsonObject{
            override fun onSuccessResponse(result: JSONObject) {
                Log.printLog(result.toString(), Log.LogType.Infos)

                val res = result.getString("success")
                val code = result.getString("code")

                if (res == "true"){
                    val intent = Intent(activity, MainMenuActivity::class.java)
                    val token = result.getString("token")
                    sharedPreferenceManager.saveToken(token)

                    startActivity(intent)
                } else {
                    Toast.makeText(v.context, code, Toast.LENGTH_SHORT).show()
                }

            }

            override fun onErrorResponse(error: VolleyError) {
                //val e = ErrorNetwork(error, context)
                //Toast.makeText(context, e.getErrorMessage(), Toast.LENGTH_LONG).show()
                Toast.makeText(v.context, "An error has occured", Toast.LENGTH_SHORT).show()

                Log.printLog(error.toString(), Log.LogType.Infos)
            }
        })

    }
}