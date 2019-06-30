package com.example.codinschool.data_pojo.solution_data;

/**
 * The type Condition.
 */
public class Condition extends PrimitiveFunction {

    private String cond;

    /**
     * Instantiates a new Condition.
     *
     * @param cond    the cond
     * @param type    the type
     * @param actions the actions
     */
    public Condition(String cond, String type, Object[] actions) {
        super(type, actions);

        this.cond = cond;
    }
}