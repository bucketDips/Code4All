package com.example.code4all.controllers.classes_menu;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.app.DialogFragment;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;
import com.android.volley.VolleyError;
import com.example.code4all.R;
import com.example.code4all.data.classe.Classe;
import com.example.code4all.data.user.User;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.serverhandler.IAPICallbackJsonObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Objects;

import static com.android.volley.VolleyLog.TAG;

public class ClasseSettingDialogFragment extends DialogFragment {

    private CardView root;
    private EditText editTextEmail;
    private Button buttonAdd;
    private TextView textViewError;
    private ProgressBar progressBar;
    private RecyclerView userList;
    private ClasseActivity parent;
    private ArrayList<User> usersSelected;
    private RecyclerViewUsersAdapter recyclerViewUserAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_classe_setting, null);
        Bundle bundle = getArguments();
        parent = (ClasseActivity) getActivity();

        this.setCancelable(true);

        if (bundle != null) {
            Classe classe = bundle.getParcelable("classeJson");
            loadUI(dialogFragment);

            buttonAdd.setVisibility(View.INVISIBLE);
            if(classe != null){
                buttonAdd.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        progressBar.setVisibility(View.VISIBLE);
                        for(User user : usersSelected){
                            parent.getServerHandler().addStudentToClass(user, classe, parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonObject() {
                                @Override
                                public void onSuccessResponse(@NotNull JSONObject result) {
                                    Snackbar.make(parent.getRootView(), user.getName() + " have been added as Student to " + classe.getName(), Snackbar.LENGTH_LONG).show();
                                }

                                @Override
                                public void onErrorResponse(@NotNull VolleyError error) {
                                    Snackbar.make(parent.getRootView(), user.getName() + " could not be added as Student to " + classe.getName(), Snackbar.LENGTH_LONG).show();
                                }
                            });
                        }
                    }
                });
            }
            root.setClipToOutline(true);
        }
        return dialogFragment;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }

    private void loadUI(View dialogFragment) {
        root = dialogFragment.findViewById(R.id.root);
        editTextEmail = dialogFragment.findViewById(R.id.editTextNameOrEmail);
        buttonAdd = dialogFragment.findViewById(R.id.buttonAdd);
        progressBar = dialogFragment.findViewById(R.id.progressBar);
        userList = dialogFragment.findViewById(R.id.userList);
        ArrayList<User> users = new ArrayList<User>();
        //users.add(new User(3,"USERTEST","toto", "test@gmail.com",1));
        recyclerViewUserAdapter = new RecyclerViewUsersAdapter(users, getContext(), new IRecyclerViewUsersAdapterListener() {

            @Override
            public void onUserSelected(User user) {

                if(usersSelected == null){
                    usersSelected = new ArrayList<>();
                }


                if(usersSelected.size() > 0){
                    buttonAdd.setVisibility(View.VISIBLE);
                    if(!usersSelected.contains(user)){
                        usersSelected.add(user);
                    } else {
                        usersSelected.remove(user);
                    }
                } else {
                    buttonAdd.setVisibility(View.INVISIBLE);
                    usersSelected.add(user);
                }
                logUsersSelected();
            }
        });
        userList.setAdapter(recyclerViewUserAdapter);
        userList.setLayoutManager(new LinearLayoutManager(getContext()));

        editTextEmail.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                if(s.toString().length() >= 3){
                    parent.getServerHandler().findUser(s.toString(), parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonArray() {
                        @Override
                        public void onSuccessResponse(@NotNull JSONArray result) {

                            Gson gson = new GsonBuilder().create();
                            ArrayList<User> users = new ArrayList<>();
                            for(int i = 0; i < result.length(); i++){
                                try {
                                    User user = gson.fromJson(String.valueOf(result.getJSONObject(i)), User.class);
                                    //Log.d(TAG, "User found : " + user.toString());
                                    users.add(user);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                            recyclerViewUserAdapter.updateData(users);
                        }

                        @Override
                        public void onErrorResponse(@NotNull VolleyError error) {
                            try {
                                ErrorNetwork errorNetwork = new ErrorNetwork(error, Objects.requireNonNull(getActivity()).getApplicationContext());
                                //textViewError.setText(errorNetwork.diplayErrorMessage());
                                Log.d(TAG, "onErrorResponse: " + errorNetwork.diplayErrorMessage());
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                }
            }
        });
    }

    public void logUsersSelected() {
        StringBuilder message = new StringBuilder("Users selected are : ");
        for(User user : usersSelected){
            message.append(user.getName()).append(" ").append(user.getEmail()).append(" / ");
        }

        Log.d("logUsersSelected", message.toString());
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        return super.onCreateDialog(savedInstanceState);
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        super.onDismiss(dialog);
    }

}
