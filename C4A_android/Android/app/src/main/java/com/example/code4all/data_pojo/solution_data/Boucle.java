package com.example.code4all.data_pojo.solution_data;

import com.example.code4all.controllers.exercice_engine.CodeExerciceFragment;

public class Boucle extends PrimitiveFunction{
    private int start;
    private int end;

    public Boucle(String type, int start, int end, Object[] actions) {
        super(type, actions);

        this.start = start;
        this.end = end;
    }
}
