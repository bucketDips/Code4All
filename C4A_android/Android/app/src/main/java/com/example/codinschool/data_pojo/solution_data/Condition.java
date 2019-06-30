package com.example.codinschool.data_pojo.solution_data;

public class Condition extends PrimitiveFunction {

    private String cond;

    public Condition(String cond, String type, Object[] actions) {
        super(type, actions);

        this.cond = cond;
    }
}