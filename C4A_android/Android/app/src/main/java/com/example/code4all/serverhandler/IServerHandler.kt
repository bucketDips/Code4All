package com.example.code4all.serverhandler

import com.example.code4all.data.classe.Classe
import com.example.code4all.data.user.User

interface IServerHandler {
    fun connect(mail: String, password: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun findUser(nameOrEmail: String, token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun createClassroom(classname: String, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun getAllClassromOfUserAsStudent(token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getAllClassromOfUserAsProfessor(token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun addUserToClass(user : User, classe : Classe, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun resetPwd(user: User, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)

}