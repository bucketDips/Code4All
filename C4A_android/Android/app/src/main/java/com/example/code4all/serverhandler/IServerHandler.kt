package com.example.code4all.serverhandler

interface IServerHandler {
    fun login(mail: String, password: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
}