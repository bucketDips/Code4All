package com.example.codinschool.controllers.store;

import android.content.Context;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.Snackbar;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;
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

/**
 * The type Store activity.
 */
public class StoreActivity extends MyAppCompatActivity{
    private GridView storeGrid;
    private ArrayList<Exercice> exercicesOfTheStore;
    private TextView textViewError;
    private ProgressBar progressBar;
    private ConstraintLayout root;
    private TextView iconCredits;
    private EditText myEditText;
    private ExerciceGridAdapter exerciceGridAdapter;


    private IStoreActivity listener = new IStoreActivity() {
        @Override
        public void onClickAdded(Exercice exercice) {
            serverHandler.forkThisExerciceWithTheUser(sharedPreferenceManager.getTokenSaved(), exercice.getId(), new IAPICallbackJsonObject() {
                @Override
                public void onSuccessResponse(@NotNull JSONObject result) {
                    exercicesOfTheStore.remove(exercice);
                    ExerciceGridAdapter exerciceGridAdapter = (ExerciceGridAdapter) storeGrid.getAdapter();
                    exerciceGridAdapter.notifyDataSetChanged();
                    Snackbar snackbar = SnackbarBuilder.make(getRootView(),getResources().getString(R.string.fork_succes), Snackbar.LENGTH_LONG, R.color.white);
                    snackbar.show();

                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {
                }
            });
        }
    };

    private void bindUi(){
        root = findViewById(R.id.root);
        storeGrid = findViewById(R.id.storeGrid);
        textViewError = findViewById(R.id.textViewError);
        progressBar = findViewById(R.id.progressBar);
        iconCredits = findViewById(R.id.iconCredits);
        myEditText = findViewById(R.id.myEditText);
    }

    /**
     * Here we are going to get data about the exercices available in the store, then populate our recyclerview
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        bindUi();
        Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
        iconCredits.setText(getString(R.string.icon_label_credits, "Icon Pond"));

        serverHandler.getAllExerciceFromStoreNotOwned(sharedPreferenceManager.getTokenSaved(), new IAPICallbackJsonArray() {
            @Override
            public void onSuccessResponse(@NotNull JSONArray result) {
                int size = result.length();
                progressBar.setVisibility(View.GONE);
                if(size > 0){
                    exercicesOfTheStore = new ArrayList<>();
                    for(int i = 0; i < size; i++){
                        try {
                            //Exercice exercice = gson.fromJson(String.valueOf(result.getJSONObject(i)), Exercice.class);
                            //if(exercice != null)
                            JSONObject object = result.getJSONObject(i);
                            Exercice exercice = new Exercice();
                            exercice.setId(object.getInt("exerciceId"));
                            exercice.setTitle(object.getString("title"));
                            exercice.setDescription(object.getString("description"));
                            exercice.setAuthorName(object.getString("authorName"));

                            exercicesOfTheStore.add(exercice);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                    exerciceGridAdapter = new ExerciceGridAdapter(exercicesOfTheStore, getApplicationContext(), listener);
                    storeGrid.setAdapter(exerciceGridAdapter);

                    storeGrid.setVisibility(View.VISIBLE);

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

        myEditText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                ArrayList<Exercice> exerciceArrayList =lookForAnExercce(s.toString());
                exerciceGridAdapter.changeData(exerciceArrayList);
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    private void ajustGridHeight(GridView storeGrid, ArrayList<Exercice> list) {
        int row = list.size()/storeGrid.getNumColumns();
        storeGrid.getLayoutParams().height = row * 150;
    }


    /**
     * Return a list of exercice close to the title typed
     * @param titleOfTheExercice
     * @return
     */
    private ArrayList<Exercice> lookForAnExercce(String titleOfTheExercice){
        if(titleOfTheExercice.equals(""))
            return exercicesOfTheStore;

        ArrayList<Exercice> tempsList = new ArrayList<>();
        for(Exercice exercice :exercicesOfTheStore){
            if(exercice.getTitle().contains(titleOfTheExercice)){
                tempsList.add(exercice);
            }
        }

        return tempsList;
    }

    /**
     * This method should return the 10 (max) last exercice of the list
     * @param exercicesToCheck
     * @return
     */
    private ArrayList<Exercice> get10LastExerciceAdd(ArrayList<Exercice> exercicesToCheck){
        ArrayList<Exercice> exercices = new ArrayList<>();

        // size = 14
        // i = 14
        //

        int size = exercicesToCheck.size();
        for(int i = 0; i < 10 && i < (size); i++){
            exercices.add(exercicesToCheck.get((size - i)-1));
        }

        return exercices;
    }

    @Override
    public View onCreateView(String name, Context context, AttributeSet attrs) {
        return super.onCreateView(name, context, attrs);
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_store;
    }

    @Override
    protected View getRootView() {
        return root;
    }

    private class ExerciceGridAdapter extends BaseAdapter{

        private ArrayList<Exercice> exercices;
        private Context context;
        private LayoutInflater layoutInflater;
        private IStoreActivity listener;

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


        /**
         * Instantiates a new Exercice grid adapter.
         *
         * @param exercices the exercices
         * @param context   the context
         * @param listener  the listener
         */
        ExerciceGridAdapter(ArrayList<Exercice> exercices, Context context, IStoreActivity listener){
            this.exercices = exercices;
            this.context = context;
            this.layoutInflater = LayoutInflater.from(context);
            this.listener = listener;
        }

        private void changeData(ArrayList<Exercice> newExerciceList){
            this.exercices = newExerciceList;
            notifyDataSetChanged();
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

            return new ExerciceGridLayoutItem(context, (Exercice) getItem(position), listener, getIdImage(exercices.get(position).getId()));
        }

        /**
         * Get id image int.
         *
         * @return the int
         * @param id
         */
        int getIdImage(int id){
            return images[id % images.length];
        }
    }
}
