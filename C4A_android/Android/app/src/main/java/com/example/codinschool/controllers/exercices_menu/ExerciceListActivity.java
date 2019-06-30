package com.example.codinschool.controllers.exercices_menu;

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
import com.example.codinschool.R;

import com.example.codinschool.customviews.MyAppCompatActivity;
import com.example.codinschool.data_pojo.exercice.Exercice;
import com.example.codinschool.data_pojo.exercice.ExerciceManager;
import com.example.codinschool.data_pojo.grid_exercice_element.MyExclusionStrategy;
import com.example.codinschool.error.ErrorNetwork;
import com.example.codinschool.viewtools.SnackbarBuilder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

/**
 * The type Exercice list activity.
 */
public class ExerciceListActivity extends MyAppCompatActivity {

    /**
     * Whether or not the activity is in two-pane mode, i.e. running on a tablet
     * device.
     */
    private final String TAG = "ExerciceListActivity";
    private boolean twoPaneMod;
    private ExerciceManager exerciceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        toolbar.setTitle(getTitle());

        if (findViewById(R.id.exercice_detail_container) != null) {
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

    /**
     * Gets exercice manager.
     *
     * @return the exercice manager
     */
    public ExerciceManager getExerciceManager() {
        return exerciceManager;
    }

    @Override
    protected int getLayoutResourceId() {
        return R.layout.activity_exercice_list;
    }

    @Override
    protected View getRootView() {
        return findViewById(R.id.root);
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

                }

                @Override
                public void onExercicesLoadedFail(ErrorNetwork errorNetwork) {

                    SnackbarBuilder.make(rootView, errorNetwork.diplayErrorMessage(), Snackbar.LENGTH_LONG, R.color.white).show();
                    recyclerView1.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
                    recyclerView2.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
                    recyclerView3.setAdapter(new SimpleItemRecyclerViewAdapter(new ArrayList<>(), twoPaneMod));
                }
            });

            exerciceManager.getExerciceOfTheUserConnected();
        }

    }

    /**
     * The type Simple item recycler view adapter.
     */
    public class SimpleItemRecyclerViewAdapter extends RecyclerView.Adapter<SimpleItemRecyclerViewAdapter.ViewHolder> {

        private final View.OnClickListener onClickListener = new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                int position = getItemPositionClick(view);
                Exercice exerciceToSend = exerciceManager.getExercice(position);

                Gson gson = new GsonBuilder().setExclusionStrategies(new MyExclusionStrategy()).create();
                String exerciceJson = gson.toJson(exerciceToSend);

                if (twoPanneMod) {
                    Bundle arguments = new Bundle();
                    arguments.putString(ExerciceDetailFragment.EXERCICE_JSON, exerciceJson);
                    ExerciceDetailFragment fragment = new ExerciceDetailFragment();
                    fragment.setArguments(arguments);
                    getSupportFragmentManager().beginTransaction()
                            .replace(R.id.exercice_detail_container, fragment)
                            .commit();
                } else {
                    Context context = view.getContext();
                    Intent intent = new Intent(context, ExerciceDetailActivity.class);
                    intent.putExtra(ExerciceDetailFragment.EXERCICE_JSON, exerciceJson);
                    startActivity(intent);
                }
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


        /**
         * Instantiates a new Simple item recycler view adapter.
         *
         * @param exercices the exercices
         * @param twoPane   the two pane
         */
        SimpleItemRecyclerViewAdapter(ArrayList<Exercice> exercices, boolean twoPane) {
            this.exercices = exercices;
            //this.parentActivity = parent;
            this.twoPanneMod = twoPane;
        }

        /**
         * Gets exercices.
         *
         * @return the exercices
         */
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

        /**
         * The type View holder.
         */
        public class ViewHolder extends RecyclerView.ViewHolder {
            /**
             * The Classe name.
             */
            final TextView classeName;
            /**
             * The Exercice name.
             */
            final TextView exerciceName;

            /**
             * Instantiates a new View holder.
             *
             * @param view the view
             */
            ViewHolder(View view) {
                super(view);
                classeName = view.findViewById(R.id.classeName);
                exerciceName = view.findViewById(R.id.exerciceName);
            }
        }
    }
}
