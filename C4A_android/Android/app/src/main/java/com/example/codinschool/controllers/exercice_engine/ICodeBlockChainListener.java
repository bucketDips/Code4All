package com.example.codinschool.controllers.exercice_engine;

import com.example.codinschool.customviews.CodeBlock;

/**
 * The interface Code block chain listener.
 */
public interface ICodeBlockChainListener {
    /**
     * On block added.
     *
     * @param codeBlock the code block
     */
    void onBlockAdded(CodeBlock codeBlock);

    /**
     * Print block.
     *
     * @param target the target
     */
    void printBlock(CodeBlock target);
}
