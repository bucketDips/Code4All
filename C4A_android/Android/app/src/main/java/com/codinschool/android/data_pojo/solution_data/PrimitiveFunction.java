package com.codinschool.android.data_pojo.solution_data;

/**
 * The type Primitive function.
 */
class PrimitiveFunction extends Action {
    private String type;
    private Object[] actions;

    /**
     * Instantiates a new Primitive function.
     *
     * @param type    the type
     * @param actions the actions
     */
    PrimitiveFunction(String type, Object[] actions) {
        this.type = type;
        this.actions = actions;
    }
}