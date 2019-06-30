package com.example.codinschool.viewtools

import android.content.Context
import android.view.View
import android.view.inputmethod.InputMethodManager

object Keyboard {
    fun hide(context: Context, v: View) {
        val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(v.windowToken, 0)

    }
}