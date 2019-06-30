package com.example.codinschool.controllers.main_menu;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.CardView;
import android.util.Log;
import android.view.View;
import com.android.volley.VolleyError;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.load.resource.drawable.DrawableTransitionOptions;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.example.codinschool.R;
import com.example.codinschool.controllers.store.StoreActivity;
import com.example.codinschool.customviews.MyAppCompatActivity;
import com.example.codinschool.controllers.classes_menu.ClasseActivity;
import com.example.codinschool.controllers.exercices_menu.ExerciceListActivity;
import com.example.codinschool.data_pojo.user.IUserManagerListener;
import com.example.codinschool.data_pojo.user.User;
import com.example.codinschool.data_pojo.user.UserManager;
import com.example.codinschool.databinding.ActivityMainMenuBinding;
import com.example.codinschool.serverhandler.IAPICallbackJsonObject;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * The type Main menu activity.
 */
public class MainMenuActivity extends MyAppCompatActivity {
    private ArrayList<Intent> intents;
    /**
     * The Binding.
     */
    ActivityMainMenuBinding binding;
    private static final String TAG = "MainMenuActivity";

    /**
     * Instantiates a new Main menu activity.
     */
    public MainMenuActivity() {
        super();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main_menu);

        try {
            serverHandler.getRandomPicture(new IAPICallbackJsonObject() {
                @Override
                public void onSuccessResponse(@NotNull JSONObject result) {
                    bindUi(result);
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {
                    setUpBasicBackground();
                }
            });

            UserManager userManager = new UserManager(getApplicationContext(), serverHandler);
            userManager.setListener(new IUserManagerListener() {
                @Override
                public void onUserSaved() {

                }

                @Override
                public void onUserLoaded(User user) {
                    renderTextViews(user);
                }

                @Override
                public void onUserLoadFail(String user, VolleyError error) {
                    returnHome(error);
                }
            });

            userManager.loadUserFromSharedPreference();
        } catch (Exception e) {
            e.printStackTrace();
        }

        intents = new ArrayList<>();
        intents.add(new Intent(this, ClasseActivity.class));
        intents.add(new Intent(this, ExerciceListActivity.class));
        intents.add(new Intent(this, StoreActivity.class));

        binding.button1.setOnClickListener(v -> onClickButtonMenu(binding.button1));
        binding.button2.setOnClickListener(v -> onClickButtonMenu(binding.button2));
        binding.button3.setOnClickListener(v -> onClickButtonMenu(binding.button3));
        binding.disconnectButton.setOnClickListener(v -> returnHome(null));

        binding.datalabel.setText(getString(R.string.datalabel,DateFormat.getDateTimeInstance().format(new Date())));
        binding.creditsToIconsCreator.setText(getString(R.string.icon_label_credits, "Smashicons, Freepik"));
    }

    @SuppressLint("RestrictedApi")
    private void setUpBasicBackground() {
        binding.background.setImageResource(R.color.black);
        binding.pixabayLegend.setVisibility(View.INVISIBLE);
        showUi();

    }

    private void bindUi(JSONObject result) {
        loadBackgroundImage(result);
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_main_menu;
    }

    @Override
    protected View getRootView() {
        return findViewById(R.id.root);
    }

    private void loadBackgroundImage(JSONObject result) {
        try {
            JSONArray jsonArray = result.getJSONArray("hits");
            double randomNumber = Math.random() * ( jsonArray.length() - 1);

            JSONObject pictureChoosen = jsonArray.getJSONObject((int) randomNumber);
            String url = pictureChoosen.getString("largeImageURL");

            Glide.with(this).load(url).listener(new RequestListener<Drawable>() {
                @SuppressLint("RestrictedApi")
                @Override
                public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<Drawable> target, boolean isFirstResource) {
                    showUi();
                    binding.pixabayLegend.setVisibility(View.GONE);
                    return false;
                }

                @SuppressLint("RestrictedApi")
                @Override
                public boolean onResourceReady(Drawable resource, Object model, Target<Drawable> target, DataSource dataSource, boolean isFirstResource) {
                    showUi();
                    return false;
                }
            }).fitCenter().placeholder(R.color.white).transition(DrawableTransitionOptions.withCrossFade(1000)).centerCrop().into(binding.background);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /**
     * Render text views.
     *
     * @param user the user
     */
    void renderTextViews(User user){

        if(user != null){
            binding.title.setText(getString(R.string.welcoming_msg, user.getName()));
        } else
            binding.title.setText(getString(R.string.welcoming_msg,""));

        String message = "";
        if(user!=null){
            message = getString(R.string.message_user_connected, user.getEmail());
        }

        Snackbar.make(binding.background, message, Snackbar.LENGTH_LONG).show();
    }

    /**
     * On click button menu.
     *
     * @param imageView the image view
     */
    void onClickButtonMenu(CardView imageView){
        String id = imageView.getTag().toString();
        startActivity(intents.get(Integer.parseInt(id)));
    }

    @Override
    protected void onResume() {
        super.onResume();

    }

    @Override
    public void onBackPressed() {

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @SuppressLint("RestrictedApi")
    private void showUi(){
        binding.disconnectButton.setVisibility(View.VISIBLE);
        binding.background.setVisibility(View.VISIBLE);
        binding.rows.setVisibility(View.VISIBLE);
        binding.title.setVisibility(View.VISIBLE);
        binding.progressBar.setVisibility(View.GONE);
    }

}
