package com.codinschool.android.controllers.classes_menu;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SwitchCompat;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.*;
import com.android.volley.VolleyError;
import com.codinschool.android.R;
import com.codinschool.android.customviews.MyDialogFragment;
import com.codinschool.android.customviews.MyEditText;
import com.codinschool.android.data_pojo.classe.Classe;
import com.codinschool.android.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.codinschool.android.data_pojo.user.User;
import com.codinschool.android.serverhandler.IAPICallbackJsonArray;
import com.codinschool.android.serverhandler.IAPICallbackJsonObject;
import com.codinschool.android.viewtools.SnackbarBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * The type Classe setting dialog fragment.
 */
public class ClasseSettingDialogFragment extends MyDialogFragment {

    private CardView root;
    private MyEditText editTextEmail;
    private Button buttonAdd;
    private ProgressBar progressBar;
    private RecyclerView userList;
    private RecyclerView userToAddList;
    private ClasseActivity parent;
    private ArrayList<User> usersSelected;
    private RecyclerViewUsersAdapter recyclerViewUserAdapter;
    private RecyclerViewUsersAdapter recyclerViewUserToAddAdapter;
    private TextView newUserListLabel;
    private SwitchCompat switchProfessor;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View dialogFragment = inflater.inflate(R.layout.dialog_fragment_classe_setting, null);
        Bundle bundle = getArguments();
        parent = (ClasseActivity) getActivity();

        this.setCancelable(true);

        if (bundle != null) {
            Classe classe = bundle.getParcelable("classeJson");
            bindUi(dialogFragment);

            buttonAdd.setVisibility(View.INVISIBLE);
            if(classe != null){
                buttonAdd.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        progressBar.setVisibility(View.VISIBLE);
                        if(!switchProfessor.isChecked()){
                            for(User user : usersSelected){
                                parent.getServerHandler().addStudentToClass(user, classe, parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonObject() {
                                    @Override
                                    public void onSuccessResponse(@NotNull JSONObject result) {
                                        SnackbarBuilder.make(parent.getRootView(),
                                                usersSelected.size() + " students have been added to " + classe.getName(),
                                                Snackbar.LENGTH_LONG,
                                                ContextCompat.getColor(parent.getApplicationContext(), R.color.white))
                                                .show();
                                        parent.refreshClasseDetailFragment();
                                        dismiss();
                                    }

                                    @Override
                                    public void onErrorResponse(@NotNull VolleyError error) {
                                        Snackbar.make(parent.getRootView(), user.getName() + " could not be added as Student to " + classe.getName(), Snackbar.LENGTH_LONG).show();
                                        dismiss();
                                    }
                                });
                            }
                        } else {
                            for(User user : usersSelected){
                                parent.getServerHandler().addProfessorToClass(user, classe, parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonObject() {
                                    @Override
                                    public void onSuccessResponse(@NotNull JSONObject result) {
                                        SnackbarBuilder.make(parent.getRootView(),
                                                usersSelected.size() + " professors have been added to " + classe.getName(),
                                                Snackbar.LENGTH_LONG,
                                                ContextCompat.getColor(parent.getApplicationContext(), R.color.white))
                                                .show();
                                        parent.refreshClasseDetailFragment();
                                        dismiss();
                                    }

                                    @Override
                                    public void onErrorResponse(@NotNull VolleyError error) {
                                        Snackbar.make(parent.getRootView(), user.getName() + " could not be added as Student to " + classe.getName(), Snackbar.LENGTH_LONG).show();
                                        dismiss();
                                    }
                                });
                            }
                        }

                    }
                });
            }
        }
        return dialogFragment;
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void setCancelable(boolean cancelable) {
        super.setCancelable(cancelable);
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }

    private void bindUi(View dialogFragment) {
        root = dialogFragment.findViewById(R.id.root);
        editTextEmail = dialogFragment.findViewById(R.id.editTextNameOrEmail);
        buttonAdd = dialogFragment.findViewById(R.id.buttonAdd);
        progressBar = dialogFragment.findViewById(R.id.progressBar);
        newUserListLabel = dialogFragment.findViewById(R.id.newUserListLabel);
        switchProfessor = dialogFragment.findViewById(R.id.switchProfessor);


        userList = dialogFragment.findViewById(R.id.userList);
        userToAddList = dialogFragment.findViewById(R.id.newUserList);

        ArrayList<User> users = new ArrayList<User>();
        usersSelected = new ArrayList<>();
        recyclerViewUserAdapter = new RecyclerViewUsersAdapter(users, getContext(), new IRecyclerViewUsersAdapterListener() {

            @Override
            public void onUserSelected(User user) {
                buttonAdd.setVisibility(View.VISIBLE);
                newUserListLabel.setVisibility(View.VISIBLE);

                if(usersSelected.size() > 0){
                    if(!usersSelected.contains(user)){
                        usersSelected.add(user);
                    } else {
                        usersSelected.remove(user);
                        if(usersSelected.size() == 0){
                            buttonAdd.setVisibility(View.INVISIBLE);
                            newUserListLabel.setVisibility(View.GONE);
                        }
                    }
                    recyclerViewUserToAddAdapter.notifyDataSetChanged();
                } else {
                    usersSelected.add(user);
                    recyclerViewUserToAddAdapter.notifyDataSetChanged();
                }
                logUsersSelected();
            }
        });

        recyclerViewUserToAddAdapter = new RecyclerViewUsersAdapter(usersSelected, getContext(), new IRecyclerViewUsersAdapterListener() {
            @Override
            public void onUserSelected(User user) {
                usersSelected.remove(user);
                recyclerViewUserToAddAdapter.notifyDataSetChanged();
                logUsersSelected();

                if(usersSelected.size() == 0){
                    newUserListLabel.setVisibility(View.GONE);
                    buttonAdd.setVisibility(View.GONE);
                }
            }
        });


        userList.setAdapter(recyclerViewUserAdapter);
        userList.setLayoutManager(new LinearLayoutManager(getContext()));

        userToAddList.setAdapter(recyclerViewUserToAddAdapter);
        userToAddList.setLayoutManager(new LinearLayoutManager(getContext()));




        editTextEmail.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                progressBar.setVisibility(View.VISIBLE);
                if(s.toString().length() >= 3){
                    parent.getServerHandler().findUser(s.toString(), parent.getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonArray() {
                        @Override
                        public void onSuccessResponse(@NotNull JSONArray result) {
                            progressBar.setVisibility(View.GONE);

                            Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
                            ArrayList<User> users = new ArrayList<>();
                            for(int i = 0; i < result.length(); i++){
                                try {
                                    User user = gson.fromJson(String.valueOf(result.getJSONObject(i)), User.class);
                                    users.add(user);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                            recyclerViewUserAdapter.updateData(users);

                        }

                        @Override
                        public void onErrorResponse(@NotNull VolleyError error) {
                            progressBar.setVisibility(View.GONE);

                        }
                    });
                } else {
                    recyclerViewUserAdapter.clearData();
                }
            }
        });
    }

    /**
     * Log users selected.
     */
    public void logUsersSelected() {
        StringBuilder message = new StringBuilder("Users selected are : ");
        for(User user : usersSelected){
            message.append(user.getName()).append(" ").append(user.getEmail()).append(" / ");
        }
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        Dialog dialog = super.onCreateDialog(savedInstanceState);
        dialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);

        return dialog;
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        super.onDismiss(dialog);
    }

}
