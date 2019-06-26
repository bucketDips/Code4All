package com.example.code4all.data_pojo.exercice;

import com.example.code4all.data_pojo.exercice_functions.ExerciceFunction;
import com.example.code4all.data_pojo.file.File;
import com.example.code4all.data_pojo.grid_exercice_element.*;

public class Exercice {
    private int id;
    private String title;
    private String description;
    private int isPublic;
    private int author_id;
    private String code;
    private Block[] blocks;
    private int columns;
    private Label[] labels;
    private int rows;
    private NonPlayerCharacter[] npcs;
    private int patternId;
    private PlayableCharacter[] pcs;
    private int classe_id;
    private ExerciceFunction[] functions;
    private File[] fichiers;



    public Exercice(int id, String title, String description, int isPublic, int author_id, String code, int classe_id, int rows, int columns, Block[] blocks, NonPlayerCharacter[] npcs, PlayableCharacter[] pcs, Label[] labels, int patternId, ExerciceFunction[] functions, File[] fichiers) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isPublic = isPublic;
        this.author_id = author_id;
        this.code = code;
        this.classe_id = classe_id;
        this.rows = rows;
        this.columns = columns;
        this.blocks = blocks;
        this.npcs = npcs;
        this.pcs = pcs;
        this.labels = labels;
        this.patternId = patternId;
        this.functions = functions;
        this.fichiers = fichiers;
    }

    public ExerciceFunction[] getFunctions() {
        return functions;
    }

    public void setFunctions(ExerciceFunction[] functions) {
        this.functions = functions;
    }

    public File[] getFichiers() {
        return fichiers;
    }

    public void setFichiers(File[] fichiers) {
        this.fichiers = fichiers;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(int isPublic) {
        this.isPublic = isPublic;
    }

    public int getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(int author_id) {
        this.author_id = author_id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getClasse_id() {
        return classe_id;
    }

    public void setClasse_id(int classe_id) {
        this.classe_id = classe_id;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getColumns() {
        return columns;
    }

    public void setColumns(int columns) {
        this.columns = columns;
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

    public int getPatternId() {
        return patternId;
    }

    public void setPatternId(int patternId) {
        this.patternId = patternId;
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
