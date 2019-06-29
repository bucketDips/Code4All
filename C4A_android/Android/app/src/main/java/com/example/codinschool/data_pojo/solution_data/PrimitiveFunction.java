package com.example.codinschool.data_pojo.solution_data;

class PrimitiveFunction extends Action {
    private String type;
    private Object[] actions;

    PrimitiveFunction(String type, Object[] actions) {
        this.type = type;
        this.actions = actions;
    }
}