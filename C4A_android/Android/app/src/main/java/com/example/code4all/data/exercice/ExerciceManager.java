package com.example.code4all.data.exercice;

import android.content.Context;
import com.android.volley.VolleyError;
import com.example.code4all.data.DataManager;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.serverhandler.ServerHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Map;

public class ExerciceManager extends DataManager implements IExerciceManager{

    private IOnExerciceLoadedListener listener;
    private ArrayList<Exercice> exercicesList;
    private ArrayList<Exercice> myExerciceList;
    private ArrayList<Exercice> fromStoreExerciceList;
    private ArrayList<Exercice> fromClassesExerciceList;

    public ExerciceManager(ServerHandler serverHandler, Context context) {
        super(serverHandler, context);
        this.exercicesList = new ArrayList<>();
        this.myExerciceList = new ArrayList<>();
        this.fromStoreExerciceList = new ArrayList<>();
        this.fromClassesExerciceList = new ArrayList<>();
    }




    public void setListener(IOnExerciceLoadedListener listener) {
        this.listener = listener;
    }

    @Override
    public void getExerciceOfTheUserConnected() {
        serverHandler.getExercices(sharedPreferenceManager.getTokenSaved(), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                // int array for exercices type split
                Gson gson = new GsonBuilder().create();
                ArrayList<Exercice> myExercices = new ArrayList<>();
                ArrayList<Exercice> fromStoreExercices = new ArrayList<>();
                ArrayList<Exercice> fromClassesExercices = new ArrayList<>();

                ArrayList<Exercice> allExercices = new ArrayList<>();

                try {
                    JSONArray exercicesJsonArray = result.getJSONArray("perso");
                    JSONObject exercicesForked = result.getJSONObject("forked");

                    JSONArray exercicesForkedFromStore = exercicesForked.getJSONArray("fromStore");
                    JSONArray exercicesForkedFromClasse = exercicesForked.getJSONArray("fromClasses");



                    for(int i = 0; i < exercicesJsonArray.length(); i++){
                        allExercices.add(gson.fromJson(String.valueOf(exercicesJsonArray.getJSONObject(i)), Exercice.class));
                        myExercices.add(gson.fromJson(String.valueOf(exercicesJsonArray.getJSONObject(i)), Exercice.class));
                    }



                    for(int y = 0; y < exercicesForkedFromStore.length(); y++){
                        allExercices.add(gson.fromJson(String.valueOf(exercicesForkedFromStore.getJSONObject(y)), Exercice.class));
                        fromStoreExercices.add(gson.fromJson(String.valueOf(exercicesForkedFromStore.getJSONObject(y)), Exercice.class));
                    }


                    for(int z = 0; z < exercicesForkedFromClasse.length(); z++){
                        allExercices.add(gson.fromJson(String.valueOf(exercicesForkedFromClasse.getJSONObject(z)), Exercice.class));
                        fromClassesExercices.add(gson.fromJson(String.valueOf(exercicesForkedFromClasse.getJSONObject(z)), Exercice.class));
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
                exercicesList.addAll(allExercices);

                myExerciceList.addAll(myExercices);
                fromStoreExerciceList.addAll(fromStoreExercices);
                fromClassesExerciceList.addAll(fromClassesExercices);


                listener.onExercicesLoaded(myExercices, fromStoreExercices, fromClassesExercices);
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                listener.onExercicesLoadedFail();
            }
        });
    }

    public ArrayList<Exercice> getExercicesList() {
        return exercicesList;
    }

    public Exercice getExercice(int position){
        return exercicesList.get(position);
    }

    public ArrayList<Exercice> getMyExerciceList() {
        return myExerciceList;
    }

    public ArrayList<Exercice> getFromClassesExerciceList() {
        return fromClassesExerciceList;
    }

    public ArrayList<Exercice> getFromStoreExerciceList() {
        return fromStoreExerciceList;
    }

    public interface IOnExerciceLoadedListener {
        void onExercicesLoaded(ArrayList<Exercice> myExercices, ArrayList<Exercice> fromStoreExercices, ArrayList<Exercice> fromClassesExercices);
        void onExercicesLoadedFail();
    }
}
