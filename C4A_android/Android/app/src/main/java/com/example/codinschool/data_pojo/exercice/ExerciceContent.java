package com.example.codinschool.data_pojo.exercice;

import com.example.codinschool.data_pojo.grid_exercice_element.*;

/**
 * The type Exercice content.
 */
public class ExerciceContent {
    private String title;
    private String text;
    private int rows;
    private int columns;
    private int patternId;

    private Block[] blocks;
    private NonPlayerCharacter[] npcs;
    private PlayableCharacter[] pcs;
    private Label[] labels;

    /**
     * Instantiates a new Exercice content.
     *
     * @param title     the title
     * @param text      the text
     * @param rows      the rows
     * @param columns   the columns
     * @param patternId the pattern id
     * @param blocks    the blocks
     * @param npcs      the npcs
     * @param pcs       the pcs
     * @param labels    the labels
     */
    public ExerciceContent(String title, String text, int rows, int columns, int patternId, Block[] blocks, NonPlayerCharacter[] npcs, PlayableCharacter[] pcs, Label[] labels) {
        this.title = title;
        this.text = text;
        this.rows = rows;
        this.columns = columns;
        this.patternId = patternId;
        this.blocks = blocks;
        this.npcs = npcs;
        this.pcs = pcs;
        this.labels = labels;
    }

    /**
     * Gets title.
     *
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets title.
     *
     * @param title the title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Gets text.
     *
     * @return the text
     */
    public String getText() {
        return text;
    }

    /**
     * Sets text.
     *
     * @param text the text
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * Gets rows.
     *
     * @return the rows
     */
    public int getRows() {
        return rows;
    }

    /**
     * Sets rows.
     *
     * @param rows the rows
     */
    public void setRows(int rows) {
        this.rows = rows;
    }

    /**
     * Gets columns.
     *
     * @return the columns
     */
    public int getColumns() {
        return columns;
    }

    /**
     * Sets columns.
     *
     * @param columns the columns
     */
    public void setColumns(int columns) {
        this.columns = columns;
    }

    /**
     * Gets pattern id.
     *
     * @return the pattern id
     */
    public int getPatternId() {
        return patternId;
    }

    /**
     * Sets pattern id.
     *
     * @param patternId the pattern id
     */
    public void setPatternId(int patternId) {
        this.patternId = patternId;
    }

    /**
     * Get blocks block [ ].
     *
     * @return the block [ ]
     */
    public Block[] getBlocks() {
        return blocks;
    }

    /**
     * Sets blocks.
     *
     * @param blocks the blocks
     */
    public void setBlocks(Block[] blocks) {
        this.blocks = blocks;
    }

    /**
     * Get npcs non player character [ ].
     *
     * @return the non player character [ ]
     */
    public NonPlayerCharacter[] getNpcs() {
        return npcs;
    }

    /**
     * Sets npcs.
     *
     * @param npcs the npcs
     */
    public void setNpcs(NonPlayerCharacter[] npcs) {
        this.npcs = npcs;
    }

    /**
     * Get pcs playable character [ ].
     *
     * @return the playable character [ ]
     */
    public PlayableCharacter[] getPcs() {
        return pcs;
    }

    /**
     * Sets pcs.
     *
     * @param pcs the pcs
     */
    public void setPcs(PlayableCharacter[] pcs) {
        this.pcs = pcs;
    }

    /**
     * Get labels label [ ].
     *
     * @return the label [ ]
     */
    public Label[] getLabels() {
        return labels;
    }

    /**
     * Sets labels.
     *
     * @param labels the labels
     */
    public void setLabels(Label[] labels) {
        this.labels = labels;
    }
}
