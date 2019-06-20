package com.example.code4all.controllers.classes_menu;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.GridView;
import android.widget.TextView;
import com.example.code4all.R;
import com.example.code4all.data.classe.Classe;
import com.example.code4all.data.classe.ClasseManager;
import com.example.code4all.data.classe.IClasseCallback;
import com.example.code4all.data.user.User;

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

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View fragment = inflater.inflate(R.layout.fragment_classe_details, container, false);
        parent = (ClasseActivity) getActivity();
        getData(getArguments());
        loadUI(fragment);

        return fragment;
    }

    private void getData(Bundle bundle) {
        if (bundle != null) {
            classeSelected = bundle.getParcelable("classeJson");
        }

        classeManager = parent.getClasseManager();

        professors = new ArrayList<>();
        students = new ArrayList<>();

        professors.add(new User(2,"William", "dqsdqsdqsdqsdaze", "toto@gmail.com", 1));

        students.add(new User(2,"Robin", "dqsdqsdqsdqsdaze", "toto@gmail.com", 1));
        students.add(new User(2,"Jean", "dqsdqsdqsdqsdaze", "toto@gmail.com", 1));
        students.add(new User(2,"Eric", "dqsdqsdqsdqsdaze", "toto@gmail.com", 1));
        students.add(new User(2,"Louis", "dqsdqsdqsdqsdaze", "toto@gmail.com", 1));
        students.add(new User(2,"Loghan", "dqsdqsdqsdqsdaze", "toto@gmail.com", 1));
        students.add(new User(2,"Steven", "dqsdqsdqsdqsdaze", "toto@gmail.com", 1));

        classeManager.getStudentsOfThisClasse(classeSelected, new IClasseCallback() {
            @Override
            public void onListLoaded(ArrayList<User> students) {
                //populateStudentsGrid(students);
            }
        });

        classeManager.getProfessorsOfThisClasse(classeSelected, new IClasseCallback() {
            @Override
            public void onListLoaded(ArrayList<User> professors1) {
                //populateProfessorsGrid(professors1);
            }
        });
    }

    private void loadUI(View fragment) {
        TextView textView = fragment.findViewById(R.id.classeLabel);
        textView.setText(getString(R.string.classe_label, classeSelected.getName(), 5));
        gridViewProfessors = fragment.findViewById(R.id.gridProfessors);
        gridViewStudents = fragment.findViewById(R.id.gridStudents);
        buttonSearch = fragment.findViewById(R.id.buttonSearch);

        buttonSearch.setOnClickListener(v -> parent.displayClasseSettingDialogFragment(classeSelected));

        Button buttonClose = fragment.findViewById(R.id.buttonClose);

        buttonClose.setOnClickListener(v -> parent.removeClasseDetailFragment());

        //populateProfessorsGrid(new ArrayList<>());
        //populateStudentsGrid(new ArrayList<>());

        //TODO DELETE THIS TWO LINE WHEN API ENDPOINT IS FIXED
        populateProfessorsGrid(professors);
        populateStudentsGrid(students);
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
