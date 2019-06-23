package com.example.code4all.data_pojo.classe;

import android.content.Context;
import android.util.Log;
import com.android.volley.VolleyError;
import com.example.code4all.data_pojo.DataManager;
import com.example.code4all.data_pojo.user.User;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.serverhandler.ServerHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ClasseManager extends DataManager implements IClasseManager{

    private static final String TAG = "ClasseManager";

    private ArrayList<Classe> classeListAsProfessor;
    private ArrayList<Classe> classeListAsStudent;
    private IClasseManagerListener listener;

    //private HashMap<Integer, ArrayList<User>> Classes

    public ClasseManager(Context context, ServerHandler serverHandler, ArrayList<Classe> classeListAsProfessor, ArrayList<Classe> classeListAsStudent) {
        super(serverHandler, context);
        this.classeListAsProfessor = classeListAsProfessor;
        this.classeListAsStudent = classeListAsStudent;
    }

    public void setListener(IClasseManagerListener listener) {
        this.listener = listener;
    }

    @Override
    public void loadClassesFromUser() {
        String token = sharedPreferenceManager.getTokenSaved();
        Gson gson = new GsonBuilder().create();

        if(token != null){
            serverHandler.getAllClassesOfUserAsProfessor(token, new IAPICallbackJsonArray() {
                @Override
                public void onSuccessResponse(@NotNull JSONArray result) {
                    for(int i = 0; i < result.length(); i++){
                        try {
                            Classe classe = gson.fromJson(String.valueOf(result.getJSONObject(i)), Classe.class);
                            classeListAsProfessor.add(classe);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    listener.onClasseListAsProfessorChanged(classeListAsProfessor);
                }
                @Override
                public void onErrorResponse(@NotNull VolleyError error) {
                    Log.d(TAG, "onErrorResponse getAllClassesOfUserAsProfessor");
                }
            });

            serverHandler.getAllClassesOfUserAsStudent(token, new IAPICallbackJsonArray() {
                @Override
                public void onSuccessResponse(@NotNull JSONArray result) {
                    for(int i = 0; i < result.length(); i++){
                        try {
                            Classe classe = gson.fromJson(String.valueOf(result.getJSONObject(i)), Classe.class);
                            classeListAsStudent.add(classe);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    listener.onClasseListAsStudentChanged(classeListAsStudent);
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {
                    Log.d(TAG, "onErrorResponse getAllClassesOfUserAsStudent");
                }
            });
        }
    }

    @Override
    public ArrayList<Classe> getClassesListAsProfessor() {
        return this.classeListAsProfessor;
    }

    @Override
    public ArrayList<Classe> getClassesListAsStudent() {
        return this.classeListAsStudent;
    }

    @Override
    public Boolean doesExist(int idClasse, ArrayList<Classe> classeList) {
        for(Classe classe : classeList){
            if(classe.getId() == idClasse)
                return true;
        }
        return false;
    }

    @Override
    public Classe getClasseInClasseList(int idClasse, ArrayList<Classe> classeList) {

        if(doesExist(idClasse, classeList)){
            for(Classe classe : classeList){
                if(classe.getId() == idClasse)
                    return classe;
            }
        }

        return null;
    }

    @Override
    public void getProfessorsOfThisClasse(Classe classe, IClasseCallback callback) {
        serverHandler.getProfessorListOfAClasse(sharedPreferenceManager.getTokenSaved(), classe.getId(), new IAPICallbackJsonArray() {
            @Override
            public void onSuccessResponse(@NotNull JSONArray result) {

                ArrayList<User> professors = new ArrayList<>();
                Gson gson = new GsonBuilder().create();

                for(int i = 0; i < result.length(); i++){
                    try {
                        professors.add(gson.fromJson(String.valueOf(result.getJSONObject(i)), User.class));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                callback.onListLoaded(professors);
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                try {
                    ErrorNetwork errorNetwork = new ErrorNetwork(error, context);
                    Log.d(TAG, "onError " + errorNetwork.diplayErrorMessage());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    public void getStudentsOfThisClasse(Classe classe, IClasseCallback callback) {
        serverHandler.getStudentListOfAClasse(sharedPreferenceManager.getTokenSaved(), classe.getId(), new IAPICallbackJsonArray() {
            @Override
            public void onSuccessResponse(@NotNull JSONArray result) {

                ArrayList<User> students = new ArrayList<>();
                Gson gson = new GsonBuilder().create();

                for(int i = 0; i < result.length(); i++){
                    try {
                        students.add(gson.fromJson(String.valueOf(result.getJSONObject(i)), User.class));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                callback.onListLoaded(students);
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                try {
                    ErrorNetwork errorNetwork = new ErrorNetwork(error, context);
                    Log.d(TAG, "onError " + errorNetwork.diplayErrorMessage());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }


    // Find a classe with it's id looking both classesList
    @Override
    public Classe findClasse(int idClasse) {

        Classe classe = getClasseInClasseList(idClasse, classeListAsProfessor);
        if(classe != null){
            return classe;
        }

        classe = getClasseInClasseList(idClasse, classeListAsStudent);
        if(classe != null){
            return classe;
        }

        return null;
    }

    @Override
    public Classe loadClasse(int idClasse) {
        return null;
    }

    @Override
    public boolean isInThisList(User user, ArrayList<User> users) {
        for(User userToCheck : users){
            if(userToCheck.getName().equals(user.getName()))
                return true;
        }

        return false;
    }

    @Override
    public void createClasse(String classeName) {
        String token = sharedPreferenceManager.getTokenSaved();
        serverHandler.createClassroom(classeName, token, new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                try {
                    int idClasseInserted = result.getInt("insertId");
                    Classe classe = new Classe(idClasseInserted, classeName);
                    classeListAsProfessor.add(classe);

                    listener.onClasseListAsProfessorChanged(classeListAsProfessor);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                try {
                    ErrorNetwork errorNetwork = new ErrorNetwork(error, context);
                    listener.onFailClasseCreation(errorNetwork);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }


    @Override
    public void addClasseToList(Classe classe, ArrayList<Classe> classeList) {
        classeList.add(classe);
    }

    @Override
    public void deleteClasse(Classe classe) {

        ArrayList<Classe> listToCheck = this.classeListAsProfessor;
        if(listToCheck != null){
            if(doesExist(classe.getId(), listToCheck)){
                if(listToCheck.remove(classe))
                    listener.onClasseListAsProfessorChanged(listToCheck);
            }
        }

        listToCheck = this.classeListAsStudent;
        if(listToCheck != null) {
            if(doesExist(classe.getId(), listToCheck)){
                if(listToCheck.remove(classe))
                    listener.onClasseListAsStudentChanged(listToCheck);
            }
        }

    }

    @Override
    public void addStudentToClasse(User user, Classe classe) {
        String token = sharedPreferenceManager.getTokenSaved();
        serverHandler.addStudentToClass(user, classe, token, new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                listener.onClasseListAsProfessorChanged(getClassesListAsProfessor());
                listener.onClasseListAsStudentChanged(getClassesListAsStudent());
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {

            }
        });
    }

    @Override
    public void removeStudentFromClasse(User user, Classe classe) {
        //TODO
    }

    public void printAllClasses(){
        Log.d(TAG, "ClasseListAsProfessor");
        for(Classe classe : getClassesListAsProfessor()){
            Log.d(TAG, classe.toString());
        }

        for(Classe classe : getClassesListAsStudent()){
            Log.d(TAG, classe.toString());
        }
        Log.d(TAG, "ClasseListAsStudent");


    }
}
