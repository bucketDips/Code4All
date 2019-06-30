package com.codinschool.android.controllers.classes_menu;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.codinschool.android.R;
import com.codinschool.android.data_pojo.classe.Classe;
import com.codinschool.android.data_pojo.classe.ClasseManager;
import com.codinschool.android.data_pojo.classe.IClasseManagerListener;
import com.codinschool.android.error.ErrorNetwork;
import com.codinschool.android.serverhandler.ServerHandler;
import com.codinschool.android.settings.SharedPreferenceManager;
import com.codinschool.android.tools.DialogBoxBuilder;
import com.codinschool.android.tools.IBasicDialogCallBack;
import com.codinschool.android.viewtools.SnackbarBuilder;

import java.util.ArrayList;

/**
 * The type Classes list fragment.
 */
public class ClassesListFragment extends Fragment{
    private static final String TAG = "ClassesListFragment";
    private View fragment;
    private ServerHandler serverHandler;
    private SharedPreferenceManager cache;
    private RecyclerView RecyclerViewListAsProfessor;
    private RecyclerView RecyclerViewListAsStudent;
    private ClasseManager classeManager;
    private AlertDialog alertDialog;
    private IRecyclerViewClassesAdapterListener recyclerViewAdapterListener;
    private Classe classeSelected;
    private ClasseActivity parent;
    private FloatingActionButton buttonCreateClasse;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        fragment = inflater.inflate(R.layout.fragment_classes_list, container, false);
        parent = (ClasseActivity) getActivity();
        Context context = getContext();

        if(parent != null){
            cache = parent.getSharedPreferenceManager();
            serverHandler = parent.getServerHandler();

            RecyclerViewListAsProfessor = fragment.findViewById(R.id.classeslistAsProfessor);
            RecyclerViewListAsStudent = fragment.findViewById(R.id.classeListAsStudent);
            buttonCreateClasse = fragment.findViewById(R.id.buttonCreation);

            buttonCreateClasse.setOnClickListener(v -> parent.displayClasseCreationDialogFragment());

            recyclerViewAdapterListener = new IRecyclerViewClassesAdapterListener() {
                @Override
                public void onClickDelete(Classe classe) {
                    createAlertDialog(getString(R.string.empty_message_for_dialog_fragment, "Are you sure ?"), "Yes", "No", classe).show();
                }

                @Override
                public void onClasseSelected(Classe classe) {
                    if(classeSelected == null){
                        classeSelected = classe;
                        parent.displayClasseDetailsFragment(new ClasseDetailsFragment(), classeSelected);
                    } else {
                        if(!classeSelected.equals(classe)){
                            classeSelected = classe;
                            parent.displayClasseDetailsFragment(new ClasseDetailsFragment(), classeSelected);
                        } else {
                            if(!parent.isClasseDetailFragmentShown()){
                                classeSelected = classe;
                                parent.displayClasseDetailsFragment(new ClasseDetailsFragment(), classeSelected);
                            }
                        }
                    }
                }
            };


            ArrayList<Classe> classesAsProfessor = new ArrayList<>();
            ArrayList<Classe> classesAsStudent = new ArrayList<>();

            RecyclerViewClassesAdapter recyclerViewAdapterProfessor = new RecyclerViewClassesAdapter(classesAsProfessor, recyclerViewAdapterListener);
            RecyclerViewClassesAdapter recyclerViewAdapterStudent = new RecyclerViewClassesAdapter(classesAsStudent, recyclerViewAdapterListener);

            RecyclerViewListAsProfessor.setAdapter(recyclerViewAdapterProfessor);
            RecyclerViewListAsStudent.setAdapter(recyclerViewAdapterStudent);

            RecyclerViewListAsStudent.setLayoutManager(new LinearLayoutManager(context));
            RecyclerViewListAsProfessor.setLayoutManager(new LinearLayoutManager(context));


            classeManager = new ClasseManager(fragment.getContext(),serverHandler , classesAsProfessor, classesAsStudent);
            classeManager.setListener(new IClasseManagerListener() {
                @Override
                public void onClasseListAsProfessorChanged(ArrayList<Classe> classes) {
                    renderRecyclerViewAsProfessor(classes);
                }

                @Override
                public void onClasseListAsStudentChanged(ArrayList<Classe> classes) {
                    renderRecyclerViewAsStudent(classes);
                }

                @Override
                public void onFailClasseCreation(ErrorNetwork errorNetwork) {
                    SnackbarBuilder.make(parent.getRootView(), errorNetwork.diplayErrorMessage(), Snackbar.LENGTH_LONG, R.color.white).show();
                }
            });
            classeManager.loadClassesFromUser();
        }
        return fragment;
    }


    private AlertDialog createAlertDialog(String dialogMessage, String labelButton1, String labelButton2, Classe classeToDelete){
        return DialogBoxBuilder.build(getContext(), getString(R.string.empty_message_for_dialog_fragment, dialogMessage),
                labelButton1, labelButton2, getLayoutInflater(), new IBasicDialogCallBack() {
                    @Override
                    public void onClickButton1(View view, AlertDialog dialogBox) {
                        classeManager.deleteClasse(classeToDelete);
                        if (classeToDelete.equals(classeSelected)){
                            parent.removeClasseDetailFragment();
                        }
                        dialogBox.dismiss();
                    }

                    @Override
                    public void onClickButton2(View view, AlertDialog dialogBox) {
                        dialogBox.dismiss();
                    }
                });
    }

    private void renderRecyclerViewAsProfessor(ArrayList<Classe> classes){
        RecyclerViewClassesAdapter recyclerViewAdapter = new RecyclerViewClassesAdapter(classes,recyclerViewAdapterListener);
        RecyclerViewListAsProfessor.setAdapter(recyclerViewAdapter);
    }

    private void renderRecyclerViewAsStudent(ArrayList<Classe> classes){
        RecyclerViewClassesAdapter recyclerViewAdapter = new RecyclerViewClassesAdapter(classes,recyclerViewAdapterListener);
        RecyclerViewListAsStudent.setAdapter(recyclerViewAdapter);
    }

    /**
     * Gets classe manager.
     *
     * @return the classe manager
     */
    public ClasseManager getClasseManager() {
        return classeManager;
    }
}
