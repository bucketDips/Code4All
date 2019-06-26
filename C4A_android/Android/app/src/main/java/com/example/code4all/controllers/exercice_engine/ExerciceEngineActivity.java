package com.example.code4all.controllers.exercice_engine;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentManager;
import android.util.Log;
import android.view.View;
import com.android.volley.ParseError;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.customviews.MyAppCompatActivity;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.exercice.ExerciceContent;
import com.example.code4all.data_pojo.exercice.ExerciceManager;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.viewtools.SnackbarBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

public class ExerciceEngineActivity extends MyAppCompatActivity implements GridExerciceFragment.OnFragmentInteractionListener{

    static final String EXERCICE_JSON = "EXERCICE_JSON";
    static final String EXERCICE_FILES_JSON_ARRAY = "EXERCICE_FILES_JSON_ARRAY";
    static final String EXERCICE_FUNCTION_JSON_ARRAY = "EXERCICE_FUNCTION_JSON_ARRAY";
    private final String TAG = "ExerciceEngineActivity";
    private ExerciceManager exerciceManager;
    private ConstraintLayout root;
    private boolean testMod = false;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        root = findViewById(R.id.root);

        if(testMod){
            //String exerciceJson = intent.getExtras().getString(EXERCICE_JSON);
            serverHandler.getExerciceById(6, getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonObject() {
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
                    returnHome(error);
                    //SnackbarBuilder.make(root, ErrorNetwork.getVolleyError(error), Snackbar.LENGTH_LONG, R.color.white).show();
                    //showGridExerciceFragment(getSupportFragmentManager(), "");
                }
            });

        } else {
            if(getIntent().hasExtra(EXERCICE_JSON)){
                String exerciceJson = getIntent().getExtras().getString(EXERCICE_JSON);
                //showGridExerciceFragment(getSupportFragmentManager(), exerciceJson);
                showCodeExerciceFragment(getSupportFragmentManager(), exerciceJson);
            }
        }
    }

    private void showGridExerciceFragment(FragmentManager supportFragmentManager, String exerciceJson) {
        Bundle bundle = new Bundle();
        bundle.putString(ExerciceEngineActivity.EXERCICE_JSON, exerciceJson);
        GridExerciceFragment gridExerciceFragment = new GridExerciceFragment();
        gridExerciceFragment.setArguments(bundle);

        supportFragmentManager.beginTransaction().replace(R.id.fragment_grid_holder, gridExerciceFragment).commit();
    }

    private void showCodeExerciceFragment(FragmentManager supportFragmentManager, String exerciceJson) {
        Bundle bundle = new Bundle();
        bundle.putString(ExerciceEngineActivity.EXERCICE_JSON, exerciceJson);
        CodeExerciceFragment codeExerciceFragment = new CodeExerciceFragment();
        codeExerciceFragment.setArguments(bundle);

        supportFragmentManager.beginTransaction().replace(R.id.fragment_code_blocks, codeExerciceFragment).commit();
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
    protected View getRootView() {
        return root;
    }

    @Override
    public void onGridLoaded() {
        Log.d(TAG, "onFragmentInteraction");
    }
}
