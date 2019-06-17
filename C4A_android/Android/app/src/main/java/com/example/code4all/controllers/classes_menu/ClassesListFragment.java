package com.example.code4all.controllers.classes_menu;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.example.code4all.R;
import com.example.code4all.data.classe.Classe;
import com.example.code4all.data.classe.ClasseManager;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

import java.util.ArrayList;

public class ClassesListFragment extends Fragment{
    private static final String TAG = "ClassesListFragment";
    private View fragment;
    private ServerHandler serverHandler;
    private SharedPreferenceManager cache;
    private ClasseManager classeManager;
    private Context context;
    private RecyclerView recyclerView;



    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        fragment = inflater.inflate(R.layout.fragment_classes_list, container, false);
        ClasseListActivity parent = (ClasseListActivity) getActivity();
        if(parent!= null){
            cache = parent.getSharedPreferenceManager();
            serverHandler = parent.getServerHandler();

            classeManager = new ClasseManager(parent.getApplicationContext(),serverHandler);
            classeManager.setListener(this::renderRecyclerView);

        }

        loadRecyclerView();

        return fragment;
    }

    private void loadRecyclerView(){
    //        serverHandler.get_all_classrom_of_user();
        this.recyclerView = this.fragment.findViewById(R.id.classeslist);
        classeManager.loadClassesFromUser();

        //Log.d(TAG, classes.toString());
        Log.d(TAG, classeManager.getClasses().toString());
    }

    private void renderRecyclerView(ArrayList<Classe> classes){
        RecyclerViewAdapter recyclerViewAdapter = new RecyclerViewAdapter(classes, context);
        recyclerView.setAdapter(recyclerViewAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));

    }
}
