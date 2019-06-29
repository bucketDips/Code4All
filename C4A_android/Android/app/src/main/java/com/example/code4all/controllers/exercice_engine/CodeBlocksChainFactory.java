package com.example.code4all.controllers.exercice_engine;

import android.content.Context;
import android.view.View;
import android.widget.LinearLayout;
import com.example.code4all.customviews.CodeBlock;
import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;
import com.example.code4all.serverhandler.ServerHandler;
import com.example.code4all.settings.SharedPreferenceManager;

import java.util.Arrays;
import java.util.List;

public class CodeBlocksChainFactory extends Factory implements ICodeBlockChainListener{


    private final CodeExerciceFragment.DragInputListener onDragListener;
    private List<ExerciceFunction> functionsList;
    private CodeBlockChain headOfTheChain;
    private LinearLayout root;

    CodeBlocksChainFactory(ExerciceFunction[] functions, Context context, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler, CodeExerciceFragment.DragInputListener dragInputListener) {
        super(context, sharedPreferenceManager, serverHandler);
        this.functionsList = Arrays.asList(functions);
        this.headOfTheChain = new CodeBlockChain(this);
        this.onDragListener = dragInputListener;
    }

    void rebuild(){
        root.removeAllViews();
        parcours(headOfTheChain);
    }

    void parcours(CodeBlockChain headOfTheChain){

        for(int i = 0; i < headOfTheChain.size(); i ++){
            CodeBlock block = headOfTheChain.get(i);

        }
    }

    void pushCodeBlock(CodeBlock codeBlock){
        headOfTheChain.addLast(codeBlock);
    }

    private CodeBlock pop(){
        return headOfTheChain.pop();
    }

    public void addCodeBlockToParent(CodeBlock target, CodeBlock parent){
        headOfTheChain.addToThisParent(target, parent);
    }

    @Override
    public void onBlockAdded(CodeBlock codeBlock) {
        root.addView(codeBlock);
    }

    @Override
    public void printBlock(CodeBlock codeBlock) {

    }

    @Override
    protected View build(LinearLayout view) {
        root = (LinearLayout) view;
        root.setOnDragListener(onDragListener);
        return root;
    }
}
