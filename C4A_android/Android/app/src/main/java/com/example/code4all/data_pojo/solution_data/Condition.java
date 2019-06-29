package com.example.code4all.data_pojo.solution_data;

import com.example.code4all.controllers.exercice_engine.CodeExerciceFragment;

public class Condition extends PrimitiveFunction {

    private String cond;

    public Condition(String cond, String type, Object[] actions) {
        super(type, actions);

        this.cond = cond;
    }
}