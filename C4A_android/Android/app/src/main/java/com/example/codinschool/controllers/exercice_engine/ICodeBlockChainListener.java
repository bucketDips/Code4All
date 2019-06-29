package com.example.codinschool.controllers.exercice_engine;

import com.example.codinschool.customviews.CodeBlock;

public interface ICodeBlockChainListener {
    void onBlockAdded(CodeBlock codeBlock);
    void printBlock(CodeBlock target);
}
