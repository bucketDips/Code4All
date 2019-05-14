package com.example.code4all.tools

import android.util.Log.i
const val LOGLABEL = "LOG"


object Log {
    enum class LogType {
        Normal, Infos, Danger
    }

    fun printLog(message: String, logType: LogType){
        val tag = LOGLABEL + logType.name.toUpperCase()
        i(tag, message)
    }
}