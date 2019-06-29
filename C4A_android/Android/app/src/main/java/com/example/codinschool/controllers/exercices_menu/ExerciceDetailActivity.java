package com.example.codinschool.controllers.exercices_menu;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.Toolbar;
import android.view.Surface;
import android.view.View;
import android.support.v7.app.ActionBar;
import android.view.MenuItem;
import android.view.WindowManager;
import com.example.codinschool.R;
import com.example.codinschool.customviews.MyAppCompatActivity;

/**
 * An activity representing a single Exercice detail screen. This
 * activity is only used on narrow width devices. On tablet-size devices,
 * item details are presented side-by-side with a list of items
 * in a {@link ExerciceListActivity}.
 */
public class ExerciceDetailActivity extends MyAppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.activity_exercice_detail);
        Toolbar toolbar = findViewById(R.id.detail_toolbar);
        setSupportActionBar(toolbar);

        //fixScreenRotation();

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Like coming soon", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }


        if (savedInstanceState == null) {
            // Create the detail fragment and add it to the activity
            // using a fragment transaction.
            Bundle arguments = new Bundle();

            Intent intent = getIntent();
            if(intent != null){
                String jsonExercice = intent.getStringExtra(ExerciceDetailFragment.EXERCICE_JSON);
                if(intent.hasExtra(ExerciceDetailFragment.EXERCICE_CREATOR_JSON))
                    arguments.putString(ExerciceDetailFragment.EXERCICE_CREATOR_JSON, intent.getStringExtra(ExerciceDetailFragment.EXERCICE_CREATOR_JSON));

                arguments.putString(ExerciceDetailFragment.EXERCICE_JSON, jsonExercice);
                ExerciceDetailFragment fragment = new ExerciceDetailFragment();
                fragment.setArguments(arguments);
                getSupportFragmentManager().beginTransaction()
                        .add(R.id.exercice_detail_container, fragment)
                        .commit();
            }


            //int position = getIntent().getIntExtra(ExerciceDetailFragment.ARG_ITEM_POSITION,0);
            //arguments.putInt(ExerciceDetailFragment.ARG_ITEM_POSITION, position);

        }
    }

    private void fixScreenRotation() {
        final int screenOrientation = ((WindowManager) getBaseContext().getSystemService(Context.WINDOW_SERVICE)).getDefaultDisplay().getOrientation();
        switch (screenOrientation) {
            case Surface.ROTATION_180:
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT);
                break;
            case Surface.ROTATION_270:
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
                break;
            case Surface.ROTATION_0:
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                break;
            case Surface.ROTATION_90:
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                break;
        }
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_exercice_detail;
    }

    @Override
    protected View getRootView() {
        return findViewById(R.id.root);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == android.R.id.home) {
            // This ID represents the Home or Up button. In the case of this
            // activity, the Up button is shown. For
            // more details, see the Navigation pattern on Android Design:
            //
            // http://developer.android.com/design/patterns/navigation.html#up-vs-back
            //
            navigateUpTo(new Intent(this, ExerciceListActivity.class));
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
