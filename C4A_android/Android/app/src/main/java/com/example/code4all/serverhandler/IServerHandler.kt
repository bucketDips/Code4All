package com.example.code4all.serverhandler

import com.example.code4all.data_pojo.classe.Classe
import com.example.code4all.data_pojo.user.User

interface IServerHandler {
    fun connect(mail: String, password: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun findUser(nameOrEmail: String, token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getUser(idUser: Int, token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun createClassroom(classname: String, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)

    fun getAllClassesOfUserAsStudent(token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getAllClassesOfUserAsProfessor(token: String, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getStudentListOfAClasse(token: String, classeId: Int, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getProfessorListOfAClasse(token: String, classeId : Int, iapiCallbackJsonArray: IAPICallbackJsonArray)
    fun getClasseDetails(token: String, classeId: Int, iapiCallbackJsonObject: IAPICallbackJsonObject)

    fun addStudentToClass(user : User, classe : Classe, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun addProfessorToClass(user : User, classe : Classe, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)
    fun resetPwd(user: User, token: String, iapiCallbackJsonObject: IAPICallbackJsonObject)

    fun getAllExercicesOfTheUserSession(tokenSaved: String, callback: IAPICallbackJsonObject)
    fun getExerciceById(idExercice: Int, tokenSaved: String, callback: IAPICallbackJsonObject)
    fun getFileById(patternId: Int, tokenSaved: String, iapiCallbackJsonObject: IAPICallbackJsonObject) {

    }

}