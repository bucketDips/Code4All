package com.example.code4all.controllers.classes_menu;

import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.Toast;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.customviews.MyAppCompatActivity;
import com.example.code4all.data_pojo.classe.Classe;
import com.example.code4all.data_pojo.classe.ClasseManager;
import com.example.code4all.data_pojo.user.IUserManagerListener;
import com.example.code4all.data_pojo.user.User;
import com.example.code4all.data_pojo.user.UserManager;
import com.example.code4all.error.ErrorNetwork;
import org.json.JSONException;

public class ClasseActivity extends MyAppCompatActivity{

    private UserManager userManager;
    private ConstraintLayout root;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        userManager = new UserManager(getApplicationContext(), getServerHandler());
        userManager.setListener(new IUserManagerListener() {
            @Override
            public void onUserSaved() {
            }

            @Override
            public void onUserLoaded(User user) {
                // user = null when it's fail (user not found).
                /*
                ClasseSettingDialogFragment dialogFragment = (ClasseSettingDialogFragment) getSupportFragmentManager().findFragmentByTag("CLASSE_SETTING_DIALOG_FRAGMENT");
                if (dialogFragment != null) {
                    dialogFragment.setResult(user != null);
                }*/
            }

            @Override
            public void onUserLoadFail(String user, VolleyError error) {
                try {
                    ErrorNetwork errorNetwork = new ErrorNetwork(error, getApplicationContext());
                    Toast.makeText(getApplicationContext(), errorNetwork.diplayErrorMessage(), Toast.LENGTH_LONG).show();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        root = findViewById(R.id.container);
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_classes_menu;
    }

    public void displayClasseDetailsFragment(Fragment fragment, Classe classe){
        FragmentManager fragmentManager = getSupportFragmentManager();

        Bundle bundle = new Bundle();
        //bundle.putString("classeJson", classeString);
        bundle.putParcelable("classeJson", classe);

        fragment.setArguments(bundle);

        FrameLayout frameLayout = findViewById(R.id.fragment_detail_container);
        frameLayout.setVisibility(View.VISIBLE);
        fragmentManager.beginTransaction()
                .replace(R.id.fragment_detail_container, fragment)
                .setCustomAnimations(android.R.animator.fade_in, android.R.animator.fade_out)
                .commit();

    }

    void displayClasseCreationDialogFragment(){
        ClasseCreationDialogFragment dialogFragment = new ClasseCreationDialogFragment();
        dialogFragment.show(getSupportFragmentManager(),"CLASSE_CREATION_DIALOG_FRAGMENT");

    }


    void displayClasseSettingDialogFragment(Classe classeSelected){
        ClasseSettingDialogFragment dialogFragment = new ClasseSettingDialogFragment();
        //dialogFragment.setListener(this);
        Bundle bundle = new Bundle();
        bundle.putParcelable("classeJson", classeSelected);

        dialogFragment.setArguments(bundle);
        dialogFragment.show(getSupportFragmentManager(),"CLASSE_SETTING_DIALOG_FRAGMENT" );
    }

    public void removeClasseDetailFragment() {

        FrameLayout frameLayout = findViewById(R.id.fragment_detail_container);
        frameLayout.setVisibility(View.GONE);

        if(getSupportFragmentManager().findFragmentById(R.id.fragment_detail_container) != null) {
            getSupportFragmentManager()
                    .beginTransaction()
                    .setCustomAnimations(android.R.animator.fade_in, android.R.animator.fade_out)
                    .remove(getSupportFragmentManager().findFragmentById(R.id.fragment_detail_container)).commit();
        }
    }

    public Boolean isClasseDetailFragmentShown(){
        FrameLayout frameLayout = findViewById(R.id.fragment_detail_container);
        int visibility = frameLayout.getVisibility();
        return visibility != View.GONE && visibility != View.INVISIBLE;
    }

    public void refreshClasseDetailFragment(){
        ClasseDetailsFragment classeDetailsFragment = (ClasseDetailsFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_detail_container);
        if (classeDetailsFragment != null) {
            classeDetailsFragment.refreshClasseData();
        }
    }

    public ClasseManager getClasseManager(){
        ClassesListFragment classesListFragment = (ClassesListFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_classes_list);
        return classesListFragment.getClasseManager();
    }

    public UserManager getUserManager() {
        return userManager;
    }

    public View getRootView(){
        return root;
    }
}
