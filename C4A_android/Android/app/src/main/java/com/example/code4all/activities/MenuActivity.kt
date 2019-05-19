package com.example.code4all.activities

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.Toast
import com.example.code4all.R
import com.example.code4all.tools.Log
import kotlinx.android.synthetic.main.activity_menu.*

class MenuActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_menu)

        //token = intent.getStringExtra("token")

        myClassesButton.setOnClickListener{onClickButtonMenu(myClassesButton)}
        //Toast.makeText(applicationContext, token, Toast.LENGTH_SHORT).show()
    }


    fun onClickButtonMenu(imageView: ImageView){
        val idView = imageView.id
        //Log.printLog(token, Log.LogType.Infos);
        //Toast.makeText(applicationContext, token, Toast.LENGTH_SHORT).show()
    }
}
