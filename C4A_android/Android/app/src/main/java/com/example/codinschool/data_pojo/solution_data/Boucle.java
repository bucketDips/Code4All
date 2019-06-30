package com.example.codinschool.data_pojo.solution_data;

public class Boucle extends PrimitiveFunction{
    private int start;
    private int end;

    public Boucle(String type, int start, int end, Object[] actions) {
        super(type, actions);

        this.start = start;
        this.end = end;
    }
}
