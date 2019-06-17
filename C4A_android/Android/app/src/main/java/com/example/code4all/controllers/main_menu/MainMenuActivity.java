package com.example.code4all.controllers.main_menu;

import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.controllers.MyAppCompatActivity;
import com.example.code4all.controllers.classes_menu.ClasseListActivity;
import com.example.code4all.data.user.IUserManagerListener;
import com.example.code4all.data.user.User;
import com.example.code4all.data.user.UserManager;
import com.example.code4all.databinding.ActivityMainMenuBinding;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;
import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainMenuActivity extends MyAppCompatActivity {
    private ArrayList<Intent> intents;
    private SharedPreferenceManager sharedPreferenceManager;
    ActivityMainMenuBinding binding;
    private static final String TAG = "MainMenuActivity";

    public MainMenuActivity() {
        super();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main_menu);

        try {
            serverHandler.getRandomPicture(new IAPICallbackJsonObject() {
                @Override
                public void onSuccessResponse(@NotNull JSONObject result) {
                    loadBackgroundImage(result);
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {

                }
            });

            UserManager userManager = new UserManager(getApplicationContext(), ServerHandler.getInstance());
            userManager.setListener(new IUserManagerListener() {
                @Override
                public void onUserSaved() {
                    Log.d(TAG, TAG + "onUserSaved");
                }

                @Override
                public void onUserLoaded(User user) {
                    Log.d(TAG, TAG + "onUserLoaded");

                    renderTitle(user);
                    Toast.makeText(getApplicationContext(), TAG + "onUserLoaded()", Toast.LENGTH_LONG).show();
                }
            });

            userManager.loadUserFromSharedPreference();
            //User user = sharedPreferenceManager.getUserInfos();

        } catch (Exception e) {
            e.printStackTrace();
        }

        intents = new ArrayList<>();
        intents.add(new Intent(this, ClasseListActivity.class));
        intents.add(new Intent(this, MainMenuActivity.class));

        binding.button1.setOnClickListener(v -> onClickButtonMenu(binding.button1));
        binding.button2.setOnClickListener(v -> onClickButtonMenu(binding.button2));

    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_main_menu;
    }

    private void loadBackgroundImage(JSONObject result) {
        try {
            JSONArray jsonArray = result.getJSONArray("hits");
            double randomNumber = Math.random() * ( jsonArray.length() - 1);

            JSONObject pictureChoosen = jsonArray.getJSONObject((int) randomNumber);
            String url = pictureChoosen.getString("largeImageURL");

            Picasso.with(this).load(url).fit().centerCrop().into(binding.background, new Callback() {
                @Override
                public void onSuccess() {
                    binding.background.setVisibility(View.VISIBLE);
                    Log.d(TAG, "Image downloaded");
                }

                @Override
                public void onError() {
                    Log.d(TAG, "Can't dl the image");
                    binding.background.setVisibility(View.GONE);
                }
            });

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    void renderTitle(User user){

        if(user != null){
            Log.d(TAG, user.getName());
            binding.title.setText(getString(R.string.welcoming_msg, user.getName()));
        }
        else
            binding.title.setText(getString(R.string.welcoming_msg,""));
    }
    void onClickButtonMenu(ImageView imageView){
        String id = imageView.getTag().toString();

        startActivity(intents.get(Integer.parseInt(id)));
    }

    @Override
    public void onBackPressed() {

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        sharedPreferenceManager.clearCache();
        Log.d(TAG, "Cache cleared");
    }

    /*public void setupFragment(Fragment fragment){
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.container, fragment);
        fragmentTransaction.commit();
    }*/
}
