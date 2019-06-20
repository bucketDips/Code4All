package com.example.code4all.controllers.main_menu;

import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.controllers.MyAppCompatActivity;
import com.example.code4all.controllers.classes_menu.ClasseActivity;
import com.example.code4all.data.user.IUserManagerListener;
import com.example.code4all.data.user.User;
import com.example.code4all.data.user.UserManager;
import com.example.code4all.databinding.ActivityMainMenuBinding;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;

public class MainMenuActivity extends MyAppCompatActivity {
    private ArrayList<Intent> intents;
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
                    loadUI(result);
                }

                @Override
                public void onErrorResponse(@NotNull VolleyError error) {

                }
            });

            UserManager userManager = new UserManager(getApplicationContext(), serverHandler);
            userManager.setListener(new IUserManagerListener() {
                @Override
                public void onUserSaved() {
                    Log.d(TAG, TAG + "onUserSaved");
                }

                @Override
                public void onUserLoaded(User user) {
                    Log.d(TAG, TAG + "onUserLoaded");

                    renderTextViews(user);
                    //Toast.makeText(getApplicationContext(), TAG + "onUserLoaded()", Toast.LENGTH_LONG).show();
                }

                @Override
                public void onUserLoadFail(String user, VolleyError error) {
                    Toast.makeText(getApplicationContext(), "User load has fail", Toast.LENGTH_LONG).show();
                }
            });

            userManager.loadUserFromSharedPreference();
            //User user = sharedPreferenceManager.getUserInfos();

        } catch (Exception e) {
            e.printStackTrace();
        }

        intents = new ArrayList<>();
        intents.add(new Intent(this, ClasseActivity.class));
        intents.add(new Intent(this, MainMenuActivity.class));

        binding.button1.setOnClickListener(v -> onClickButtonMenu(binding.button1));
        binding.button2.setOnClickListener(v -> onClickButtonMenu(binding.button2));
        binding.datalabel.setText(getString(R.string.datalabel,DateFormat.getDateTimeInstance().format(new Date())));
    }

    private void loadUI(JSONObject result) {
        loadBackgroundImage(result);
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
                    binding.rows.setVisibility(View.VISIBLE);
                    binding.title.setVisibility(View.VISIBLE);
                    binding.progressBar.setVisibility(View.GONE);
                    Log.d(TAG, "Image downloaded");
                }

                @Override
                public void onError() {
                    Log.d(TAG, "Can't dl the image");
                    binding.background.setVisibility(View.GONE);
                    binding.rows.setVisibility(View.VISIBLE);
                    binding.title.setVisibility(View.VISIBLE);
                    binding.progressBar.setVisibility(View.GONE);
                    binding.title.setTextColor(getResources().getColor(R.color.black));
                }
            });

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    void renderTextViews(User user){

        if(user != null){
            Log.d(TAG, user.getName());
            binding.title.setText(getString(R.string.welcoming_msg, user.getName()));
        }
        else
            binding.title.setText(getString(R.string.welcoming_msg,""));

        String message = "";
        if(user!=null){
            message = getString(R.string.message_user_connected, user.getEmail());
        }

        Snackbar.make(binding.background, message, Snackbar.LENGTH_LONG).show();
    }

    void onClickButtonMenu(ImageView imageView){
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
        sharedPreferenceManager.clearCache();
        Log.d(TAG, "Cache cleared");
        super.onDestroy();
    }

}
