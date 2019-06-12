package com.example.code4all.controllers.main_menu

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView
import com.example.code4all.R
import com.example.code4all.controllers.classes_menu.ClassesMenuActivity
import com.example.code4all.settings.SharedPreferenceManager
import com.example.code4all.tools.Log
import kotlinx.android.synthetic.main.activity_main_menu.*

class MainMenuActivity : AppCompatActivity() {
    val intent_list = ArrayList<Intent>()
    private lateinit var sharedPreferenceManager: SharedPreferenceManager


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_menu)
        sharedPreferenceManager = SharedPreferenceManager(applicationContext)


        val token = sharedPreferenceManager.getTokenSaved()



        intent_list.add(Intent(this, ClassesMenuActivity::class.java).putExtra("token", token))
        intent_list.add(Intent(this, MainMenuActivity::class.java).putExtra("token", token))

        //token = intent_list.getStringExtra("token")

        button1.setOnClickListener{onClickButtonMenu(button1)}
        button2.setOnClickListener{onClickButtonMenu(button2)}
        //Toast.makeText(applicationContext, token, Toast.LENGTH_SHORT).show()
    }


    fun onClickButtonMenu(imageView: ImageView){
        val id = imageView.tag.toString()

        startActivity(intent_list[id.toInt()])
    }

    override fun onBackPressed() {
    }
}
