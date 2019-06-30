package com.example.codinschool.controllers.classes_menu;

import android.os.Bundle;
import android.support.constraint.ConstraintLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.Toast;
import com.android.volley.VolleyError;
import com.example.codinschool.R;
import com.example.codinschool.customviews.MyAppCompatActivity;
import com.example.codinschool.data_pojo.classe.Classe;
import com.example.codinschool.data_pojo.classe.ClasseManager;
import com.example.codinschool.data_pojo.user.IUserManagerListener;
import com.example.codinschool.data_pojo.user.User;
import com.example.codinschool.data_pojo.user.UserManager;
import com.example.codinschool.error.ErrorNetwork;
import org.json.JSONException;

/**
 * The type Classe activity.
 */
public class ClasseActivity extends MyAppCompatActivity{

    private UserManager userManager;
    private ConstraintLayout root;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        userManager = new UserManager(getApplicationContext(), getServerHandler());
        userManager.setListener(new IUserManagerListener() {
            @Override
            public void onUserSaved() { }

            @Override
            public void onUserLoaded(User user) { }

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

    /**
     * Display classe details fragment.
     *
     * @param fragment the fragment
     * @param classe   the classe
     */
    public void displayClasseDetailsFragment(Fragment fragment, Classe classe){
        FragmentManager fragmentManager = getSupportFragmentManager();

        Bundle bundle = new Bundle();
        bundle.putParcelable("classeJson", classe);

        fragment.setArguments(bundle);

        FrameLayout frameLayout = findViewById(R.id.fragment_detail_container);
        frameLayout.setVisibility(View.VISIBLE);
        fragmentManager.beginTransaction()
                .replace(R.id.fragment_detail_container, fragment)
                .setCustomAnimations(android.R.animator.fade_in, android.R.animator.fade_out)
                .commit();

    }

    /**
     * Display classe creation dialog fragment.
     */
    void displayClasseCreationDialogFragment(){
        ClasseCreationDialogFragment dialogFragment = new ClasseCreationDialogFragment();
        dialogFragment.show(getSupportFragmentManager(),"CLASSE_CREATION_DIALOG_FRAGMENT");

    }


    /**
     * Display classe setting dialog fragment.
     *
     * @param classeSelected the classe selected
     */
    void displayClasseSettingDialogFragment(Classe classeSelected){
        ClasseSettingDialogFragment dialogFragment = new ClasseSettingDialogFragment();
        Bundle bundle = new Bundle();
        bundle.putParcelable("classeJson", classeSelected);

        dialogFragment.setArguments(bundle);
        dialogFragment.show(getSupportFragmentManager(),"CLASSE_SETTING_DIALOG_FRAGMENT" );
    }

    /**
     * Remove classe detail fragment.
     */
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

    /**
     * Is classe detail fragment shown.
     *
     * @return the boolean
     */
    public Boolean isClasseDetailFragmentShown(){
        FrameLayout frameLayout = findViewById(R.id.fragment_detail_container);
        int visibility = frameLayout.getVisibility();
        return visibility != View.GONE && visibility != View.INVISIBLE;
    }

    /**
     * Refresh classe detail fragment.
     */
    public void refreshClasseDetailFragment(){
        ClasseDetailsFragment classeDetailsFragment = (ClasseDetailsFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_detail_container);
        if (classeDetailsFragment != null) {
            classeDetailsFragment.refreshClasseData();
        }
    }

    /**
     * Get classe manager classe manager.
     *
     * @return the classe manager
     */
    public ClasseManager getClasseManager(){
        ClassesListFragment classesListFragment = (ClassesListFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_classes_list);
        return classesListFragment.getClasseManager();
    }

    /**
     * Gets user manager.
     *
     * @return the user manager
     */
    public UserManager getUserManager() {
        return userManager;
    }

    public View getRootView(){
        return root;
    }
}
