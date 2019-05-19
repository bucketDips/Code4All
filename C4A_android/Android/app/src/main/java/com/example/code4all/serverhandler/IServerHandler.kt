package com.example.code4all.serverhandler

interface IServerHandler {
     fun connect(mail: String, password: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
}