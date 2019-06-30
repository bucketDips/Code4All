package com.example.codinschool.controllers.store;

import android.content.Context;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.Snackbar;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ProgressBar;
import android.widget.TextView;
import com.android.volley.VolleyError;
import com.example.codinschool.R;
import com.example.codinschool.customviews.ExerciceGridLayoutItem;
import com.example.codinschool.customviews.MyAppCompatActivity;
import com.example.codinschool.data_pojo.exercice.Exercice;
import com.example.codinschool.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.example.codinschool.serverhandler.IAPICallbackJsonArray;
import com.example.codinschool.serverhandler.IAPICallbackJsonObject;
import com.example.codinschool.viewtools.SnackbarBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class StoreActivity extends MyAppCompatActivity{
    private GridView storeGrid;
    private ArrayList<Exercice> exercicesOfTheStore;
    private TextView textViewError;
    private ProgressBar progressBar;
    private ConstraintLayout root;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
        root = findViewById(R.id.root);
        storeGrid = findViewById(R.id.storeGrid);
        textViewError = findViewById(R.id.textViewError);
        progressBar = findViewById(R.id.progressBar);

        serverHandler.getAllExerciceFromStoreNotOwned(sharedPreferenceManager.getTokenSaved(), new IAPICallbackJsonArray() {
            @Override
            public void onSuccessResponse(@NotNull JSONArray result) {
                int size = result.length();
                progressBar.setVisibility(View.GONE);
                if(size > 0){
                    storeGrid.setVisibility(View.GONE);
                    for(int i = 0; i < size; i++){
                        try {
                            exercicesOfTheStore.add(gson.fromJson(String.valueOf(result.getJSONObject(i)), Exercice.class));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    storeGrid.setAdapter(new ExerciceGridAdapter(exercicesOfTheStore, getApplicationContext()));
                } else {
                    textViewError.setVisibility(View.VISIBLE);
                    textViewError.setText(getResources().getString(R.string.store_empty_exercice_list));
                    storeGrid.setVisibility(View.GONE);
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                textViewError.setVisibility(View.VISIBLE);
                textViewError.setText(getResources().getString(R.string.network_error_network_error));
            }
        });
    }



    @Override
    public View onCreateView(String name, Context context, AttributeSet attrs) {
        return super.onCreateView(name, context, attrs);
    }

    @Override
    protected int getLayoutResourceId() {
        return 0;
    }

    @Override
    protected View getRootView() {
        return root;
    }



    private class ExerciceGridAdapter extends BaseAdapter{

        private ArrayList<Exercice> exercices;
        private Context context;
        private LayoutInflater layoutInflater;
        private View.OnClickListener listener;

        private int index = 0;
        private int[] images = new int[]{
                R.drawable.frompackabacus,
                R.drawable.frompackacousticguitar,
                R.drawable.frompackalarmclock,
                R.drawable.frompackaudio,
                R.drawable.frompackbiology,
                R.drawable.frompackbook,
                R.drawable.frompackbrainstorm,
                R.drawable.frompackcalculation,
                R.drawable.frompackchat,
                R.drawable.frompackconference,
                R.drawable.frompackdesktop,
                R.drawable.frompackemail,
                R.drawable.frompackemail1,
                R.drawable.frompackereader,
                R.drawable.frompackereader1,
                R.drawable.frompackereader2,
                R.drawable.frompackfootball,
                R.drawable.frompackgraduate,
                R.drawable.frompackidcard,
                R.drawable.frompacklaptop,
                R.drawable.frompacklaw,
                R.drawable.frompacklearning,
                R.drawable.frompacklecture,
                R.drawable.frompacklecture1,
                R.drawable.frompacklecture,
                R.drawable.frompacklibrary,
                R.drawable.frompacknotebook,
        };



        ExerciceGridAdapter(ArrayList<Exercice> exercices, Context context){
            this.exercices = exercices;
            this.context = context;
            this.layoutInflater = LayoutInflater.from(context);
            this.listener = new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    ExerciceGridLayoutItem exerciceGridLayoutItem = (ExerciceGridLayoutItem) v;
                    serverHandler.forkThisExerciceWithTheUser(sharedPreferenceManager.getTokenSaved(), exerciceGridLayoutItem.getExercice().getId(), new IAPICallbackJsonObject() {
                        @Override
                        public void onSuccessResponse(@NotNull JSONObject result) {
                            exercices.remove(exerciceGridLayoutItem.getExercice());
                            Snackbar snackbar = SnackbarBuilder.make(getRootView(),getResources().getString(R.string.fork_succes), Snackbar.LENGTH_LONG, R.color.white);
                            snackbar.show();
                        }

                        @Override
                        public void onErrorResponse(@NotNull VolleyError error) {
                        }
                    });
                }
            };
        }

        @Override
        public int getCount() {
            return exercices.size();
        }

        @Override
        public Object getItem(int position) {
            return exercices.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            if(convertView != null) {
                return new ExerciceGridLayoutItem(context, (Exercice) getItem(position), listener, getIdImage());
            }

            return convertView;
        }

        int getIdImage(){
            if(index > images.length)
                index = 0;

            return images[index];
        }
    }
}
