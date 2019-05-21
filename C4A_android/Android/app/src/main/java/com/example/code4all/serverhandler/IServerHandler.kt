package com.example.code4all.serverhandler

import com.example.code4all.data.Classe
import com.example.code4all.data.User

interface IServerHandler {
    fun connect(mail: String, password: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun find_user(nameOrEmail: String, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun create_classroom(classname: String, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun add_user_to_class(user : User, classe : Classe, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun reset_pwd(user: User, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
}