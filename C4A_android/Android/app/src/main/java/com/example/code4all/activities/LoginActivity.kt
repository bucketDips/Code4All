package com.example.code4all.activities

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.code4all.R
import com.example.code4all.serverhandler.ServerHandler
import com.example.code4all.tools.Log
import kotlinx.android.synthetic.main.fragment_login.*

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
    }

}
