package com.example.code4all.fragments

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.android.volley.VolleyError
import com.example.code4all.activities.MenuActivity
import com.example.code4all.serverhandler.IAPICallbackJsonObject
import com.example.code4all.serverhandler.ServerHandler
import com.example.code4all.settings.ErrorNetwork
import com.example.code4all.tools.Log
import com.example.code4all.viewtools.Keyboard
import kotlinx.android.synthetic.main.fragment_login.*
import kotlinx.android.synthetic.main.fragment_login.view.*
import org.json.JSONObject


class LoginFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val fragment =  inflater.inflate(com.example.code4all.R.layout.fragment_login, container, false)

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
        ServerHandler.getInstance().login(username.text.toString(), password.text.toString(), object: IAPICallbackJsonObject{
            override fun onSuccessResponse(result: JSONObject) {
                val intent = Intent(activity, MenuActivity::class.java)
                startActivity(intent)
            }

            override fun onErrorResponse(error: VolleyError) {
                val e = ErrorNetwork(error, context)
                Toast.makeText(context, e.getErrorMessage(), Toast.LENGTH_LONG).show()
            }
        })

    }
}