package com.codinschool.android.controllers.exercice_engine;

import com.codinschool.android.customviews.CodeBlock;

import java.util.LinkedList;

/**
 * The type Code block chain.
 */
public class CodeBlockChain extends LinkedList<CodeBlock> {

    private ICodeBlockChainListener listener;

    /**
     * Instantiates a new Code block chain.
     *
     * @param listener the listener
     */
    public CodeBlockChain(ICodeBlockChainListener listener){
        this.listener = listener;
    }

    @Override
    public boolean add(CodeBlock codeBlock) {
        listener.onBlockAdded(codeBlock);
        return super.add(codeBlock);
    }

    @Override
    public void add(int index, CodeBlock element) {
        listener.onBlockAdded(element);
        super.add(index, element);
    }

    /**
     * Add to this parent.
     *
     * @param target the target
     * @param parent the parent
     */
    void addToThisParent(CodeBlock target, CodeBlock parent){
        for(int i = 0; i < this.size(); i ++){
            if(this.get(i).equals(parent)){
                if(parent.getContainer() != null){
                    add(i, target);
                }
            }
        }
    }
}
