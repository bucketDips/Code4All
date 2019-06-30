package com.example.codinschool.data_pojo.solution_data;

/**
 * The type Boucle.
 */
public class Boucle extends PrimitiveFunction{
    private int start;
    private int end;

    /**
     * Instantiates a new Boucle.
     *
     * @param type    the type
     * @param start   the start
     * @param end     the end
     * @param actions the actions
     */
    public Boucle(String type, int start, int end, Object[] actions) {
        super(type, actions);

        this.start = start;
        this.end = end;
    }
}
