package com.example.code4all.data_pojo.exercice;

import com.example.code4all.data_pojo.block.*;

public class ExerciceContent {
    private String title;
    private String text;
    //private int public;
    private int lines;
    private int columns;
    private int patternId;
    private Block[] blocks;
    private NonPlayerCharacter[] npcs;
    private PlayableCharacter[] pcs;
    private Label[] labels;

    public ExerciceContent(String title, String text, int lines, int columns, int patternId, Block[] blocks, NonPlayerCharacter[] npcs, PlayableCharacter[] pcs, Label[] labels) {
        this.title = title;
        this.text = text;
        this.lines = lines;
        this.columns = columns;
        this.patternId = patternId;
        this.blocks = blocks;
        this.npcs = npcs;
        this.pcs = pcs;
        this.labels = labels;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getLines() {
        return lines;
    }

    public void setLines(int lines) {
        this.lines = lines;
    }

    public int getColumns() {
        return columns;
    }

    public void setColumns(int columns) {
        this.columns = columns;
    }

    public int getPatternId() {
        return patternId;
    }

    public void setPatternId(int patternId) {
        this.patternId = patternId;
    }

    public Block[] getBlocks() {
        return blocks;
    }

    public void setBlocks(Block[] blocks) {
        this.blocks = blocks;
    }

    public NonPlayerCharacter[] getNpcs() {
        return npcs;
    }

    public void setNpcs(NonPlayerCharacter[] npcs) {
        this.npcs = npcs;
    }

    public PlayableCharacter[] getPcs() {
        return pcs;
    }

    public void setPcs(PlayableCharacter[] pcs) {
        this.pcs = pcs;
    }

    public Label[] getLabels() {
        return labels;
    }

    public void setLabels(Label[] labels) {
        this.labels = labels;
    }
}
