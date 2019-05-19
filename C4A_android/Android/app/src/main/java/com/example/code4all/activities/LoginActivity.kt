package com.example.code4all.activities

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.example.code4all.R
import com.example.code4all.serverhandler.ServerHandler

class LoginActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ServerHandler.initInstance(applicationContext)

        setContentView(R.layout.activity_login)


    }
}
