package com.codinschool.android.controllers.exercice_engine;

import android.content.Context;
import android.view.View;
import android.widget.LinearLayout;
import com.codinschool.android.customviews.CodeBlock;
import com.codinschool.android.data_pojo.exercice_functions.ExerciceFunction;
import com.codinschool.android.serverhandler.ServerHandler;
import com.codinschool.android.settings.SharedPreferenceManager;

import java.util.Arrays;
import java.util.List;

/**
 * The type Code blocks chain factory.
 */
public class CodeBlocksChainFactory extends Factory implements ICodeBlockChainListener{


    private final CodeExerciceFragment.DragInputListener onDragListener;
    private List<ExerciceFunction> functionsList;
    private CodeBlockChain headOfTheChain;
    private LinearLayout root;

    /**
     * Instantiates a new Code blocks chain factory.
     *
     * @param functions               the functions
     * @param context                 the context
     * @param sharedPreferenceManager the shared preference manager
     * @param serverHandler           the server handler
     * @param dragInputListener       the drag input listener
     */
    CodeBlocksChainFactory(ExerciceFunction[] functions, Context context, SharedPreferenceManager sharedPreferenceManager, ServerHandler serverHandler, CodeExerciceFragment.DragInputListener dragInputListener) {
        super(context, sharedPreferenceManager, serverHandler);
        this.functionsList = Arrays.asList(functions);
        this.headOfTheChain = new CodeBlockChain(this);
        this.onDragListener = dragInputListener;
    }

    /**
     * Rebuild.
     */
    void rebuild(){
        root.removeAllViews();
        parcours(headOfTheChain);
    }

    /**
     * Parcours.
     *
     * @param headOfTheChain the head of the chain
     */
    void parcours(CodeBlockChain headOfTheChain){

        for(int i = 0; i < headOfTheChain.size(); i ++){
            CodeBlock block = headOfTheChain.get(i);

        }
    }

    /**
     * Push code block.
     *
     * @param codeBlock the code block
     */
    void pushCodeBlock(CodeBlock codeBlock){
        headOfTheChain.addLast(codeBlock);
    }

    private CodeBlock pop(){
        return headOfTheChain.pop();
    }

    /**
     * Add code block to parent.
     *
     * @param target the target
     * @param parent the parent
     */
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
        root = view;
        root.setOnDragListener(onDragListener);
        return root;
    }
}
