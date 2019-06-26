package com.example.code4all.controllers.exercice_engine;

import android.content.Context;
import android.support.constraint.ConstraintLayout;
import android.view.View;
import com.example.code4all.data_pojo.exercice.Exercice;
import com.example.code4all.data_pojo.exercice_functions.CodeBlock;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class CodeBlocksChainFactory extends Factory {


    List<ExerciceFunction> functionsList;
    LinkedList<CodeBlock> codeBlocks;

    CodeBlocksChainFactory(ExerciceFunction[] functions, Context context, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler) {
        super(context, sharedPreferenceManager, serverHandler);
        this.functionsList = Arrays.asList(functions);
        this.codeBlocks = new LinkedList<>();
    }

    @Override
    protected View build(View view) {
        ConstraintLayout root = (ConstraintLayout) view;

        return root;
    }
}
