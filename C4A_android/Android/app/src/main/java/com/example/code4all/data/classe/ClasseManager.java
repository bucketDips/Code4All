package com.example.code4all.data.classe;

import android.content.Context;
import android.util.Log;
import com.android.volley.VolleyError;
import com.example.code4all.data.DataManager;
import com.example.code4all.data.user.User;
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

    private ArrayList<Classe> classeList;
    private int separatorIndex;
    private IClasseManagerListener listener;

    public ClasseManager(Context context, ServerHandler serverHandler) {
        super(serverHandler, context);
        this.classeList = new ArrayList<>();
    }

    public void setListener(IClasseManagerListener listener) {
        this.listener = listener;
    }

    @Override
    public void loadClassesFromUser() {
        String token = sharedPreferenceManager.getTokenSaved();
        Gson gson = new GsonBuilder().create();

        if(token != null){
            serverHandler.getAllClassromOfUserAsProfessor(token, new IAPICallbackJsonArray() {
                @Override
                public void onSuccessResponse(@NotNull JSONArray result) {
                    for(int i = 0; i < result.length(); i++){
                        try {
                            classeList.add(gson.fromJson(String.valueOf(result.getJSONObject(i)), Classe.class));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        separatorIndex = i;
                    }

                    serverHandler.getAllClassromOfUserAsStudent(token, new IAPICallbackJsonArray() {
                        @Override
                        public void onSuccessResponse(@NotNull JSONArray result) {
                            for(int i = 0; i < result.length(); i++){
                                try {
                                    classeList.add(gson.fromJson(String.valueOf(result.getJSONObject(i)), Classe.class));
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                            listener.onDataChanged(getClasses());
                        }

                        @Override
                        public void onErrorResponse(@NotNull VolleyError error) {
                            Log.d(TAG, "onErrorResponse getAllClassromOfUserAsStudent");
                        }
                    });
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {
                    Log.d(TAG, "onErrorResponse getAllClassromOfUserAsProfessor");
                }
            });
            listener.onDataChanged(this.classeList);
        }
    }

    @Override
    public ArrayList<Classe> getClasses() {
        return this.classeList;
    }

    @Override
    public Classe findClasse(int idClasse) {
        for(Classe classe : this.classeList){
            if(classe.getId() == idClasse)
                return classe;
        }

        return null;
    }

    @Override
    public void createClasse(String classeName) {
        String token = sharedPreferenceManager.getTokenSaved();
        serverHandler.createClassroom(classeName, token, new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {

            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {

            }
        });
        Classe classe = new Classe(classeList.size()+1, classeName);
        addClasseToList(classe);
    }


    @Override
    public void addClasseToList(Classe classe) {
        this.classeList.add(classe);
    }

    @Override
    public void deleteClasse(Classe classe) {
        this.classeList.remove(classe);
    }

    @Override
    public void addStudentToClasse(User user, Classe classe) {
        //TODO
    }

    @Override
    public void removeStudentFromClasse(User user, Classe classe) {
        //TODO
    }
}
