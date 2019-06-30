package com.example.codinschool.customviews;

/**
 * The interface Code block listener.
 */
public interface ICodeBlockListener {
    /**
     * On click button up.
     *
     * @param codeBlock the code block
     */
    void onClickButtonUp(CodeBlock codeBlock);

    /**
     * On click button down.
     *
     * @param codeBlock the code block
     */
    void onClickButtonDown(CodeBlock codeBlock);
}
