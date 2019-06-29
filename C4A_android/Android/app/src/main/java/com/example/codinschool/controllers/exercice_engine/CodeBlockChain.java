package com.example.codinschool.controllers.exercice_engine;

import com.example.codinschool.customviews.CodeBlock;

import java.util.LinkedList;

public class CodeBlockChain extends LinkedList<CodeBlock> {

    private ICodeBlockChainListener listener;

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

    void addToThisParent(CodeBlock target, CodeBlock parent){
        for(int i = 0; i < this.size(); i ++){
            if(this.get(i).equals(parent)){
                if(parent.getContainer() != null){
                    add(i, target);
                } else {
                    //parent.addAsAchild(target);
                }
            }
        }
    }
}
