package com.example.code4all.settings

import android.content.Context
import android.content.SharedPreferences
import android.preference.PreferenceManager
import com.example.code4all.R


class SharedPreferenceManager(context: Context){
    private var context: Context = context
    private var cache: SharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
    private var editor: SharedPreferences.Editor = cache.edit()

    fun isAccountRemembered(): Boolean {
        return cache.getBoolean(context.getString(R.string.remember_me), false)
    }
}