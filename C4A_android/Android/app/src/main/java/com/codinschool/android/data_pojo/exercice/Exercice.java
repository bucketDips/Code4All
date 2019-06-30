package com.codinschool.android.data_pojo.exercice;

import com.codinschool.android.data_pojo.exercice_functions.ExerciceFunction;
import com.codinschool.android.data_pojo.file.File;
import com.codinschool.android.data_pojo.grid_exercice_element.*;

/**
 * The type Exercice.
 */
public class Exercice {
    private int id;
    private String title;
    private String description;
    private int isPublic;
    private int author_id;
    private String code;
    private String authorName;
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
    private ExerciceFunction[] tests;

    /**
     * Instantiates a new Exercice.
     */
    public Exercice(){}

    /**
     * Instantiates a new Exercice.
     *
     * @param id          the id
     * @param title       the title
     * @param description the description
     * @param isPublic    the is public
     * @param author_id   the author id
     * @param code        the code
     * @param classe_id   the classe id
     * @param rows        the rows
     * @param columns     the columns
     * @param blocks      the blocks
     * @param npcs        the npcs
     * @param pcs         the pcs
     * @param labels      the labels
     * @param patternId   the pattern id
     * @param functions   the functions
     * @param fichiers    the fichiers
     * @param tests       the tests
     */
    public Exercice(int id, String title, String description, int isPublic, int author_id, String code, int classe_id, int rows, int columns, Block[] blocks, NonPlayerCharacter[] npcs, PlayableCharacter[] pcs, Label[] labels, int patternId, ExerciceFunction[] functions, File[] fichiers, ExerciceFunction[] tests) {
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
        this.tests = tests;
    }

    /**
     * Gets author name.
     *
     * @return the author name
     */
    public String getAuthorName() {
        return authorName;
    }

    /**
     * Sets author name.
     *
     * @param authorName the author name
     */
    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    /**
     * Get functions exercice function [ ].
     *
     * @return the exercice function [ ]
     */
    public ExerciceFunction[] getFunctions() {
        return functions;
    }

    /**
     * Sets functions.
     *
     * @param functions the functions
     */
    public void setFunctions(ExerciceFunction[] functions) {
        this.functions = functions;
    }

    /**
     * Get fichiers file [ ].
     *
     * @return the file [ ]
     */
    public File[] getFichiers() {
        return fichiers;
    }

    /**
     * Get tests exercice function [ ].
     *
     * @return the exercice function [ ]
     */
    public ExerciceFunction[] getTests() {
        return tests;
    }

    /**
     * Sets tests.
     *
     * @param tests the tests
     */
    public void setTests(ExerciceFunction[] tests) {
        this.tests = tests;
    }

    /**
     * Sets fichiers.
     *
     * @param fichiers the fichiers
     */
    public void setFichiers(File[] fichiers) {
        this.fichiers = fichiers;
    }

    /**
     * Gets id.
     *
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(int id) {
        this.id = id;
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
     * Gets description.
     *
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets description.
     *
     * @param description the description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets is public.
     *
     * @return the is public
     */
    public int getIsPublic() {
        return isPublic;
    }

    /**
     * Sets is public.
     *
     * @param isPublic the is public
     */
    public void setIsPublic(int isPublic) {
        this.isPublic = isPublic;
    }

    /**
     * Gets author id.
     *
     * @return the author id
     */
    public int getAuthor_id() {
        return author_id;
    }

    /**
     * Sets author id.
     *
     * @param author_id the author id
     */
    public void setAuthor_id(int author_id) {
        this.author_id = author_id;
    }

    /**
     * Gets code.
     *
     * @return the code
     */
    public String getCode() {
        return code;
    }

    /**
     * Sets code.
     *
     * @param code the code
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * Gets classe id.
     *
     * @return the classe id
     */
    public int getClasse_id() {
        return classe_id;
    }

    /**
     * Sets classe id.
     *
     * @param classe_id the classe id
     */
    public void setClasse_id(int classe_id) {
        this.classe_id = classe_id;
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
