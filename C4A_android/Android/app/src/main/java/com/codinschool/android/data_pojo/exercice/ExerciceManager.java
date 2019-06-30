package com.codinschool.android.data_pojo.exercice;

import android.content.Context;
import com.android.volley.VolleyError;
import com.codinschool.android.data_pojo.DataManager;
import com.codinschool.android.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.codinschool.android.error.ErrorNetwork;
import com.codinschool.android.serverhandler.IAPICallbackJsonObject;
import com.codinschool.android.serverhandler.ServerHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * The type Exercice manager.
 */
public class ExerciceManager extends DataManager implements IExerciceManager{

    private IOnExerciceLoadedListener listener;
    private ArrayList<Exercice> exercicesList;
    private ArrayList<Exercice> myExerciceList;
    private ArrayList<Exercice> fromStoreExerciceList;
    private ArrayList<Exercice> fromClassesExerciceList;

    /**
     * Instantiates a new Exercice manager.
     *
     * @param serverHandler the server handler
     * @param context       the context
     */
    public ExerciceManager(ServerHandler serverHandler, Context context) {
        super(serverHandler, context);
        this.exercicesList = new ArrayList<>();
        this.myExerciceList = new ArrayList<>();
        this.fromStoreExerciceList = new ArrayList<>();
        this.fromClassesExerciceList = new ArrayList<>();
    }


    /**
     * Sets listener.
     *
     * @param listener the listener
     */
    public void setListener(IOnExerciceLoadedListener listener) {
        this.listener = listener;
    }

    @Override
    public void getExerciceOfTheUserConnected() {
        serverHandler.getAllExercicesOfTheUserSession(sharedPreferenceManager.getTokenSaved(), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
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
                        Exercice exercice = gson.fromJson(String.valueOf(exercicesJsonArray.getJSONObject(i)), Exercice.class);
                        allExercices.add(exercice);
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
                try {
                    ErrorNetwork errorNetwork = new ErrorNetwork(error, context);
                    listener.onExercicesLoadedFail(errorNetwork);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @Override
    public void getExerciceById(int idExercice) {
        serverHandler.getExerciceById(idExercice, sharedPreferenceManager.getTokenSaved(), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                if(result.has("exercice")){

                    Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();

                    try {
                        JSONObject exerciceJson = result.getJSONObject("exercice");
                        Exercice exercice = gson.fromJson(String.valueOf(exerciceJson), Exercice.class);

                        if(exercice != null){
                            ArrayList<Exercice> exercices = new ArrayList<>();
                            exercices.add(exercice);
                            listener.onExercicesLoaded(exercices, null, null);
                        }



                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                try {
                    ErrorNetwork errorNetwork = new ErrorNetwork(error, context);
                    listener.onExercicesLoadedFail(errorNetwork);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Gets exercices list.
     *
     * @return the exercices list
     */
    public ArrayList<Exercice> getExercicesList() {
        return exercicesList;
    }

    /**
     * Get exercice exercice.
     *
     * @param position the position
     * @return the exercice
     */
    public Exercice getExercice(int position){
        return exercicesList.get(position);
    }

    /**
     * Gets my exercice list.
     *
     * @return the my exercice list
     */
    public ArrayList<Exercice> getMyExerciceList() {
        return myExerciceList;
    }

    /**
     * Gets from classes exercice list.
     *
     * @return the from classes exercice list
     */
    public ArrayList<Exercice> getFromClassesExerciceList() {
        return fromClassesExerciceList;
    }

    /**
     * Gets from store exercice list.
     *
     * @return the from store exercice list
     */
    public ArrayList<Exercice> getFromStoreExerciceList() {
        return fromStoreExerciceList;
    }

    /**
     * The interface On exercice loaded listener.
     */
    public interface IOnExerciceLoadedListener {
        /**
         * On exercices loaded.
         *
         * @param myExercices          the my exercices
         * @param fromStoreExercices   the from store exercices
         * @param fromClassesExercices the from classes exercices
         */
        void onExercicesLoaded(ArrayList<Exercice> myExercices, ArrayList<Exercice> fromStoreExercices, ArrayList<Exercice> fromClassesExercices);

        /**
         * On exercices loaded fail.
         *
         * @param errorNetwork the error network
         */
        void onExercicesLoadedFail(ErrorNetwork errorNetwork);
    }
}
