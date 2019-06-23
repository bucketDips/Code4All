package com.example.code4all.controllers.exercice_engine;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.FragmentManager;
import android.util.Log;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.customviews.MyAppCompatActivity;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.exercice.ExerciceContent;
import com.example.code4all.data_pojo.exercice.ExerciceManager;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

public class ExerciceEngineActivity extends MyAppCompatActivity implements GridExerciceFragment.OnFragmentInteractionListener{

    static final String EXERCICE_JSON = "EXERCICE_JSON";
    private final String TAG = "ExerciceEngineActivity";
    private ExerciceManager exerciceManager;
    private ConstraintLayout root;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        root = findViewById(R.id.root);

        Intent intent = getIntent();
        Gson gson = new GsonBuilder().create();

        if(!intent.hasExtra(EXERCICE_JSON)){
            //String exerciceJson = intent.getExtras().getString(EXERCICE_JSON);

            serverHandler.getExerciceById(23, getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonObject() {
                @Override
                public void onSuccessResponse(@NotNull JSONObject result) {
                    try {
                        String exerciceJson = result.getString("exercice");
                        showGridExerciceFragment(getSupportFragmentManager(), exerciceJson);


                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {

                }
            });
            //Exercice exercice = gson.fromJson(exerciceJson, Exercice.class);


            //Log.d(TAG, exercice.getTitle());
            //Log.d(TAG, exercice.getContent());
        }





        /*
        exerciceManager = new ExerciceManager(serverHandler, getApplicationContext());
        exerciceManager.setListener(new ExerciceManager.IOnExerciceLoadedListener() {
            @Override
            public void onExercicesLoaded(ArrayList<Exercice> myExercices, ArrayList<Exercice> fromStoreExercices, ArrayList<Exercice> fromClassesExercices) {
                Log.d(TAG, myExercices.get(0).toString());
            }

            @Override
            public void onExercicesLoadedFail(ErrorNetwork errorNetwork) {
                SnackbarBuilder.make(root, errorNetwork.diplayErrorMessage(), Snackbar.LENGTH_LONG, R.color.white);
            }
        });*/
    }

    private void showGridExerciceFragment(FragmentManager supportFragmentManager, String exerciceJson) {
        Bundle bundle = new Bundle();
        bundle.putString(ExerciceEngineActivity.EXERCICE_JSON, exerciceJson);
        GridExerciceFragment gridExerciceFragment = new GridExerciceFragment();
        gridExerciceFragment.setArguments(bundle);

        supportFragmentManager.beginTransaction().replace(R.id.fragment_grid_holder, gridExerciceFragment).commit();
    }

    @Override
    public FragmentManager getSupportFragmentManager() {
        return super.getSupportFragmentManager();
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_exercice_engine;
    }

    @Override
    public void onGridLoaded() {
        Log.d(TAG, "onFragmentInteraction");
    }
}
