package com.example.code4all.controllers.classes_menu

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.example.code4all.R

class ClassesMenuActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_classes_menu)
        val bundle : Bundle = Bundle()
        bundle.putString("token", intent.getStringExtra("token"))
    }



}
