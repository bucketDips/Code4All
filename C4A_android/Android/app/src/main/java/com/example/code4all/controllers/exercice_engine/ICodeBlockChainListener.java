package com.example.code4all.controllers.exercice_engine;

import com.example.code4all.customviews.CodeBlock;

public interface ICodeBlockChainListener {
    void onBlockAdded(CodeBlock codeBlock);
    void printBlock(CodeBlock target);
}
