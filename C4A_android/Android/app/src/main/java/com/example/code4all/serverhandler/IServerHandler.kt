package com.example.code4all.serverhandler

import com.example.code4all.data.classe.Classe
import com.example.code4all.data.user.User
import java.util.ArrayList

interface IServerHandler {
    fun connect(mail: String, password: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun findUser(nameOrEmail: String, token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun createClassroom(classname: String, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun getAllClassesOfUserAsStudent(token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getAllClassesOfUserAsProfessor(token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getStudentListOfAClasse(token: String, classeId: Int, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getProfessorListOfAClasse(token: String, classeId : Int, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun addStudentToClass(user : User, classe : Classe, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun addProfessorToClass(user : User, classe : Classe, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun resetPwd(user: User, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)

}