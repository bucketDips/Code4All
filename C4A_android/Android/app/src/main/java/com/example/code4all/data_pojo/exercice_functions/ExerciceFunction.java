package com.example.code4all.data_pojo.exercice_functions;

public class ExerciceFunction {
    public static final String PRIMARY_FUNCTION_NAME_FOR = "boucle";
    public static final String PRIMARY_FUNCTION_NAME_IF = "condition";

    private int id;
    private int exercice_id;
    private String code;
    private String name;
    private String description;
    private int colorid;


    public ExerciceFunction(int id, int exercice_id, String code, String name, String description) {
        this.id = id;
        this.exercice_id = exercice_id;
        this.code = code;
        this.name = name;
        this.description = description;
    }

    public int getColorid() {
        return colorid;
    }

    public void setColorid(int colorid) {
        this.colorid = colorid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getExercice_id() {
        return exercice_id;
    }

    public void setExercice_id(int exercice_id) {
        this.exercice_id = exercice_id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
