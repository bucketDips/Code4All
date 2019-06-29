package com.example.code4all.data_pojo.solution_data;

import com.example.code4all.controllers.exercice_engine.CodeExerciceFragment;

class PrimitiveFunction extends Action {
    private String type;
    private Object[] actions;

    PrimitiveFunction(String type, Object[] actions) {
        this.type = type;
        this.actions = actions;
    }
}