package com.example.code4all.controllers.exercices_menu;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import com.android.volley.VolleyError;
import com.example.code4all.R;

import com.example.code4all.customviews.MyAppCompatActivity;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.exercice.ExerciceManager;
import com.example.code4all.data_pojo.user.User;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.IAPICallbackJsonArray;
import com.example.code4all.viewtools.SnackbarBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * An activity representing a list of Exercices. This activity
 * has different presentations for handset and tablet-size devices. On
 * handsets, the activity presents a list of items, which when touched,
 * lead to a {@link ExerciceDetailActivity} representing
 * item details. On tablets, the activity presents the list of items and
 * item details side-by-side using two vertical panes.
 */
public class ExerciceListActivity extends MyAppCompatActivity {

    /**
     * Whether or not the activity is in two-pane mode, i.e. running on a tablet
     * device.
     */
    private final String TAG = "ExerciceListActivity";
    private boolean twoPaneMod;
    private ExerciceManager exerciceManager;
    private ArrayList<Exercice> myExercices;
    private ArrayList<Exercice> fromStoreExercices;
    private ArrayList<Exercice> fromClassesExercices;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        toolbar.setTitle(getTitle());

        if (findViewById(R.id.exercice_detail_container) != null) {
            // The detail container view will be present only in the
            // large-screen layouts (res/values-w900dp).
            // If this view is present, then the
            // activity should be in two-pane mode.
            twoPaneMod = true;
        }
        CoordinatorLayout rootView = findViewById(R.id.root);
        ArrayList<RecyclerView> recyclerViews = new ArrayList<>();

        View root = findViewById(R.id.exercice_lists);
        recyclerViews.add(root.findViewById(R.id.my_exercice_list));
        recyclerViews.add(root.findViewById(R.id.from_store_exercice_list));
        recyclerViews.add(root.findViewById(R.id.from_classes_exercice_list));

        ArrayList<ImageButton> imageButtons = new ArrayList<>();
        imageButtons.add(root.findViewById(R.id.imageButtonDropDown));
        imageButtons.add(root.findViewById(R.id.imageButtonDropDown2));
        imageButtons.add(root.findViewById(R.id.imageButtonDropDown3));


        for(int i = 0; i < imageButtons.size(); i++){
            int finalI = i;
            imageButtons.get(i).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    RecyclerView recyclerView = recyclerViews.get(finalI);
                    if(recyclerView.getVisibility() == View.VISIBLE){
                        recyclerViews.get(finalI).setVisibility(View.GONE);
                        imageButtons.get(finalI).setImageResource(android.R.drawable.arrow_down_float);
                    } else {
                        recyclerViews.get(finalI).setVisibility(View.VISIBLE);
                        imageButtons.get(finalI).setImageResource(android.R.drawable.arrow_up_float);
                    }
                }
            });
        }

        //assert recyclerView1 != null;
        setupRecyclerView(recyclerViews.get(0), recyclerViews.get(1), recyclerViews.get(2), rootView);
    }

    public ExerciceManager getExerciceManager() {
        return exerciceManager;
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_exercice_list;
    }

    private void setupRecyclerView(RecyclerView recyclerView1, RecyclerView recyclerView2, RecyclerView recyclerView3, CoordinatorLayout rootView) {

        recyclerView1.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        recyclerView2.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        recyclerView3.setLayoutManager(new LinearLayoutManager(getApplicationContext()));

        boolean testMod = false;
        if(testMod){
            recyclerView1.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
            recyclerView2.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
            recyclerView3.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
        }else{
            exerciceManager = new ExerciceManager(getServerHandler(), getApplicationContext());
            exerciceManager.setListener(new ExerciceManager.IOnExerciceLoadedListener() {
                @Override
                public void onExercicesLoaded(ArrayList<Exercice> myExercices, ArrayList<Exercice> fromStoreExercices, ArrayList<Exercice> fromClassesExercices) {
                    recyclerView1.setAdapter(new SimpleItemRecyclerViewAdapter(myExercices, twoPaneMod));
                    recyclerView2.setAdapter(new SimpleItemRecyclerViewAdapter(fromStoreExercices, twoPaneMod));
                    recyclerView3.setAdapter(new SimpleItemRecyclerViewAdapter(fromClassesExercices, twoPaneMod));

                    Log.d(TAG, "allexercicelist :" + exerciceManager.getExercicesList().size());
                }

                @Override
                public void onExercicesLoadedFail(ErrorNetwork errorNetwork) {

                    SnackbarBuilder.make(rootView, errorNetwork.diplayErrorMessage(), Snackbar.LENGTH_LONG, R.color.white).show();
                    Log.d(TAG, "onExercicesLoadedFail()");
                    recyclerView1.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
                    recyclerView2.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
                    recyclerView3.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
                }
            });

            exerciceManager.getExerciceOfTheUserConnected();
        }

    }

    public class SimpleItemRecyclerViewAdapter extends RecyclerView.Adapter<SimpleItemRecyclerViewAdapter.ViewHolder> {

        //private final ExerciceListActivity parentActivity;

        private final View.OnClickListener onClickListener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //exerciceManager.getExerciceById(Integer.parseInt(view.getTag().toString()));

                int position = getItemPositionClick(view);

                Log.d(TAG, "Position : "  + position);



                Exercice exerciceToSend = exerciceManager.getExercice(position);
                //Log.d(TAG, exerciceToSend.getTitle());

                Gson gson = new GsonBuilder().create();


                // get creator infos
                if(exerciceToSend.getAuthor_id() > 0)
                    getServerHandler().getUser(exerciceToSend.getAuthor_id(), getSharedPreferenceManager().getTokenSaved(), new IAPICallbackJsonArray() {
                        @Override
                        public void onSuccessResponse(@NotNull JSONArray result) {
                            try {
                                String exerciceJson = gson.toJson(exerciceToSend);
                                JSONObject creatorJson = result.getJSONObject(0);
                                User creator = gson.fromJson(String.valueOf(creatorJson), User.class);
                                String creatorJsonString = gson.toJson(creator);


                                if (twoPanneMod) {
                                    Bundle arguments = new Bundle();
                                    //arguments.putInt(ExerciceDetailFragment.ARG_ITEM_POSITION, position);*
                                    arguments.putString(ExerciceDetailFragment.EXERCICE_JSON, exerciceJson);
                                    arguments.putString(ExerciceDetailFragment.EXERCICE_CREATOR_JSON, creatorJsonString);
                                    ExerciceDetailFragment fragment = new ExerciceDetailFragment();
                                    fragment.setArguments(arguments);
                                    getSupportFragmentManager().beginTransaction()
                                            .replace(R.id.exercice_detail_container, fragment)
                                            .commit();
                                } else {
                                    Context context = view.getContext();
                                    Intent intent = new Intent(context, ExerciceDetailActivity.class);
                                    intent.putExtra(ExerciceDetailFragment.EXERCICE_JSON, exerciceJson);
                                    intent.putExtra(ExerciceDetailFragment.EXERCICE_CREATOR_JSON, creatorJsonString);
                                    //intent.putExtra(ExerciceDetailFragment.ARG_ITEM_POSITION, position);
                                    startActivity(intent);
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }

                        @Override
                        public void onErrorResponse(@NotNull VolleyError error) {

                        }
                    });
            }

            private int getItemPositionClick(View view) {
                int position = Integer.parseInt(view.getTag().toString());
                RecyclerView recyclerView = (RecyclerView) view.getParent();

                int recyclerViewId = recyclerView.getId();
                if(recyclerViewId == R.id.my_exercice_list){
                    // position stay the same
                }

                if(recyclerViewId == R.id.from_store_exercice_list){
                    position += getExerciceManager().getMyExerciceList().size();
                }

                if(recyclerViewId == R.id.from_classes_exercice_list){
                    position += getExerciceManager().getMyExerciceList().size() + getExerciceManager().getFromStoreExerciceList().size();
                }

                return position;
            }
        };

        private ArrayList<Exercice> exercices;
        private final boolean twoPanneMod;


        SimpleItemRecyclerViewAdapter(ArrayList<Exercice> exercices, boolean twoPane) {
            this.exercices = exercices;
            //this.parentActivity = parent;
            this.twoPanneMod = twoPane;
        }

        public ArrayList<Exercice> getExercices() {
            return exercices;
        }

        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.layout_exercice_list_item, parent, false);
            return new ViewHolder(view);
        }

        @Override
        public void onBindViewHolder(final ViewHolder holder, int position) {
            holder.classeName.setText(exercices.get(position).getTitle());
            holder.exerciceName.setText(exercices.get(position).getTitle());
            holder.exerciceName.setVisibility(View.GONE);

            //general position in the list
            holder.itemView.setTag(position);
            holder.itemView.setOnClickListener(onClickListener);
        }

        @Override
        public int getItemCount() {
            return exercices.size();
        }

        class ViewHolder extends RecyclerView.ViewHolder {
            final TextView classeName;
            final TextView exerciceName;

            ViewHolder(View view) {
                super(view);
                classeName = (TextView) view.findViewById(R.id.classeName);
                exerciceName = (TextView) view.findViewById(R.id.exerciceName);
            }
        }
    }
}
