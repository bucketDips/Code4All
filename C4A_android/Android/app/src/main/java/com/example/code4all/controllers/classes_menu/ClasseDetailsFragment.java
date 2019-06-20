package com.example.code4all.controllers.classes_menu;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.constraint.ConstraintLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.GridView;
import android.widget.ProgressBar;
import android.widget.TextView;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.data.classe.Classe;
import com.example.code4all.data.classe.ClasseManager;
import com.example.code4all.data.user.User;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.viewtools.SnackbarBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class ClasseDetailsFragment extends Fragment{

    private final String TAG = "ClasseDetailsFragment";
    private GridView gridViewProfessors;
    private GridView gridViewStudents;
    private Classe classeSelected;
    private ArrayList<User> professors;
    private ArrayList<User> students;
    private ClasseActivity parent;
    private FloatingActionButton buttonSearch;
    private ClasseManager classeManager;
    private ProgressBar progressBar;
    private ConstraintLayout content;
    private TextView professorLabel;
    private TextView studentLabel;
    private TextView classeDetailLabel;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View fragment = inflater.inflate(R.layout.fragment_classe_details, container, false);
        parent = (ClasseActivity) getActivity();
        loadUI(fragment);
        getData(getArguments());

        return fragment;
    }

    private void getData(Bundle bundle) {
        if (bundle != null) {
            classeSelected = bundle.getParcelable("classeJson");
        }

        classeManager = parent.getClasseManager();
        professors = new ArrayList<>();
        students = new ArrayList<>();

        refreshClasseData();


    }


    void refreshClasseData(){
        parent.getServerHandler().getClasseDetails(parent.getSharedPreferenceManager().getTokenSaved(), classeSelected.getId(), new IAPICallbackJsonObject() {
            @Override
            public void onSuccessResponse(@NotNull JSONObject result) {
                try {
                    Gson gson = new GsonBuilder().create();

                    JSONArray professorsList = result.getJSONArray("profList");
                    JSONArray studentList = result.getJSONArray("studentList");

                    //ArrayList<User> professors = new ArrayList<>();
                    //ArrayList<User> students = new ArrayList<>();
                    professors.clear();
                    students.clear();

                    for(int i = 0; i < professorsList.length(); i++){
                        professors.add(gson.fromJson(professorsList.getJSONObject(i).toString(), User.class));
                    }

                    if(parent.getClasseManager().isInThisList(parent.getSharedPreferenceManager().getUserInfos(), professors))
                        buttonSearch.show();

                    for(int y = 0; y < studentList.length(); y++){
                        students.add(gson.fromJson(studentList.getJSONObject(y).toString(), User.class));
                    }

                    classeDetailLabel.setText(getString(R.string.classe_label, classeSelected.getName(), professors.size() + students.size()));
                    professorLabel.setText(getString(R.string.professors_label, String.valueOf(professors.size()) + " user(s)"));
                    studentLabel.setText(getString(R.string.students_label, String.valueOf(students.size()) + " user(s)"));

                    populateProfessorsGrid(professors);
                    populateStudentsGrid(students);

                    showUi();

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onErrorResponse(@NotNull VolleyError error) {
                try {
                    ErrorNetwork errorNetwork = new ErrorNetwork(error, getContext());
                    SnackbarBuilder.make(getView(), "Can't download the classe info ..." + errorNetwork.diplayErrorMessage(), Snackbar.LENGTH_LONG,
                            ContextCompat.getColor(parent.getApplicationContext(), R.color.white))
                            .show();
                    parent.removeClasseDetailFragment();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void showUi() {
        content.setVisibility(View.VISIBLE);
        progressBar.setVisibility(View.GONE);
    }

    private void loadUI(View fragment) {
        classeDetailLabel = fragment.findViewById(R.id.classeLabel);
        gridViewProfessors = fragment.findViewById(R.id.gridProfessors);
        gridViewStudents = fragment.findViewById(R.id.gridStudents);
        buttonSearch = fragment.findViewById(R.id.buttonSearch);
        progressBar = fragment.findViewById(R.id.progressBar);
        content = fragment.findViewById(R.id.content);
        studentLabel = fragment.findViewById(R.id.studentLabel);
        professorLabel = fragment.findViewById(R.id.professorLabel);

        //buttonSearch.hide();

        buttonSearch.setOnClickListener(v -> parent.displayClasseSettingDialogFragment(classeSelected));

        Button buttonClose = fragment.findViewById(R.id.buttonClose);

        buttonClose.setOnClickListener(v -> parent.removeClasseDetailFragment());

        //populateProfessorsGrid(new ArrayList<>());
        //populateStudentsGrid(new ArrayList<>());

        //TODO DELETE THIS TWO LINE WHEN API ENDPOINT IS FIXED
        //populateProfessorsGrid(professors);
        //populateStudentsGrid(students);
    }



    private void populateProfessorsGrid(ArrayList<User> professors){
        this.professors = professors;
        gridViewProfessors.setAdapter(new GridUsersAdapter(professors, getContext()));
        gridViewProfessors.setNumColumns(professors.size());
    }

    private void populateStudentsGrid(ArrayList<User> students){
        this.students = students;
        gridViewStudents.setAdapter(new GridUsersAdapter(students, getContext()));
    }
}
