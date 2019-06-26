package com.example.code4all.controllers.exercices_menu;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.controllers.classes_menu.GridUsersAdapter;
import com.example.code4all.controllers.exercice_engine.ExerciceEngineActivity;
import com.example.code4all.controllers.main_menu.MainMenuActivity;
import com.example.code4all.customviews.MyAppCompatActivity;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.user.User;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class ExerciceDetailFragment extends Fragment {


    public static final String EXERCICE_JSON = "EXERCICE_JSON";
    public static final String EXERCICE_CREATOR_JSON = "EXERCICE_CREATOR_JSON";
    private MyAppCompatActivity parent;
    private TextView exerciceName;
    private TextView exerciceDescription;
    private ProgressBar progressBar;
    private Button buttonPlay;
    private Exercice exercice;
    private ImageView imageViewVisibility;
    private ConstraintLayout userView;
    private ConstraintLayout nameSection;
    private ConstraintLayout creatorSection;
    private TextView descriptionLabel;
    private User creator;
    private Gson gson;

    public ExerciceDetailFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        parent = (MyAppCompatActivity) getActivity();

        if (getArguments() != null && getArguments().containsKey(EXERCICE_JSON)) {
            String jsonExercice = getArguments().getString(EXERCICE_JSON);
            gson = new GsonBuilder().create();



            /*if(getArguments().containsKey(EXERCICE_CREATOR_JSON)){
                String userJson = getArguments().getString(EXERCICE_CREATOR_JSON);
                creator = gson.fromJson(userJson, User.class);
            }*/

            exercice = gson.fromJson(jsonExercice, Exercice.class);

            parent.getServerHandler().getExerciceById(exercice.getId(), parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonObject() {
                @Override
                public void onSuccessResponse(@NotNull JSONObject result) {

                    // if more detail of the exercice have been found

                    if(result.length() > 0){
                        try {
                            JSONObject jsonExercice = result.getJSONObject("exercice");
                            //JSONArray functions = result.getJSONArray("function");
                            exercice = gson.fromJson(String.valueOf(jsonExercice), Exercice.class);
                            if(exercice.getAuthor_id() > 0){
                                parent.getServerHandler().getUser(exercice.getAuthor_id(), parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonArray() {
                                    @Override
                                    public void onSuccessResponse(@NotNull JSONArray result) {
                                        try {
                                            JSONObject creatorJson = result.getJSONObject(0);
                                            creator = gson.fromJson(String.valueOf(creatorJson), User.class);

                                            if(exercice != null)
                                                showExerciceDetails(exercice);

                                        } catch (JSONException e) {
                                            e.printStackTrace();
                                        }
                                    }

                                    @Override
                                    public void onErrorResponse(@NotNull VolleyError error) {

                                    }
                                });
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        //exercice = gson.fromJson(String.valueOf(result), Exercice.class);
                    }
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {
                    // if no more detail have been found

                    showExerciceDetails(exercice);

                }
            });

            CollapsingToolbarLayout appBarLayout = parent.findViewById(R.id.toolbar_layout);
            if (appBarLayout != null) {
                appBarLayout.setTitle(exercice.getTitle());
            }
        }


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_exercice_detail, container, false);
        bindView(rootView);

        /*
        if(exercice != null)
            showExerciceDetails(exercice);
        */


        return rootView;
    }

    private void showExerciceDetails(Exercice exercice) {

        exerciceName.setText(exercice.getTitle());
        exerciceDescription.setText(exercice.getDescription());
        progressBar.setVisibility(View.GONE);

        buttonPlay.setVisibility(View.VISIBLE);
        nameSection.setVisibility(View.VISIBLE);
        descriptionLabel.setVisibility(View.VISIBLE);
        exerciceDescription.setVisibility(View.VISIBLE);

        ImageView userImage = userView.findViewById(R.id.userImage);
        userImage.setImageResource(GridUsersAdapter.getRandomPicture());
        TextView userName = userView.findViewById(R.id.userLabel);

        buttonPlay.setOnClickListener(v -> {
            Intent intent = new Intent(getActivity(), ExerciceEngineActivity.class);
            String exerciceJson = gson.toJson(exercice);
            String creatorJson = gson.toJson(creator);
            intent.putExtra(EXERCICE_JSON, exerciceJson);
            intent.putExtra(EXERCICE_CREATOR_JSON, creatorJson);

            parent.startActivity(intent);
        });




        if(creator != null){
            creatorSection.setVisibility(View.VISIBLE);
            userName.setText(creator.getName());
        } else {
            creatorSection.setVisibility(View.GONE);
        }

        if(exercice.getIsPublic()== 0)
            imageViewVisibility.setImageResource(R.drawable.invisible);
        else
            imageViewVisibility.setImageResource(R.drawable.visibl);

    }


    private void bindView(View rootView) {
        exerciceName = rootView.findViewById(R.id.exercice_name);
        exerciceDescription = rootView.findViewById(R.id.exercice_description);
        progressBar = rootView.findViewById(R.id.progressBar);
        buttonPlay = rootView.findViewById(R.id.buttonPlay);
        imageViewVisibility = rootView.findViewById(R.id.imageViewVisibility);
        creatorSection = rootView.findViewById(R.id.creatorSection);
        userView = rootView.findViewById(R.id.userView);
        descriptionLabel = rootView.findViewById(R.id.description);
        nameSection = rootView.findViewById(R.id.nameSection);



    }
}
