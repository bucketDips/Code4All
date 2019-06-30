package com.example.codinschool.data_pojo.exercice_functions;

/**
 * The type Exercice function.
 */
public class ExerciceFunction {
    /**
     * The constant PRIMARY_FUNCTION_NAME_FOR.
     */
    public static final String PRIMARY_FUNCTION_NAME_FOR = "boucle";
    /**
     * The constant PRIMARY_FUNCTION_NAME_IF.
     */
    public static final String PRIMARY_FUNCTION_NAME_IF = "condition";

    private int id;
    private int exercice_id;
    private String code;
    private String name;
    private String description;
    private int colorid;


    /**
     * Instantiates a new Exercice function.
     *
     * @param id          the id
     * @param exercice_id the exercice id
     * @param code        the code
     * @param name        the name
     * @param description the description
     */
    public ExerciceFunction(int id, int exercice_id, String code, String name, String description) {
        this.id = id;
        this.exercice_id = exercice_id;
        this.code = code;
        this.name = name;
        this.description = description;
    }

    /**
     * Gets colorid.
     *
     * @return the colorid
     */
    public int getColorid() {
        return colorid;
    }

    /**
     * Sets colorid.
     *
     * @param colorid the colorid
     */
    public void setColorid(int colorid) {
        this.colorid = colorid;
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
     * Gets exercice id.
     *
     * @return the exercice id
     */
    public int getExercice_id() {
        return exercice_id;
    }

    /**
     * Sets exercice id.
     *
     * @param exercice_id the exercice id
     */
    public void setExercice_id(int exercice_id) {
        this.exercice_id = exercice_id;
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
     * Gets name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name the name
     */
    public void setName(String name) {
        this.name = name;
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
}
