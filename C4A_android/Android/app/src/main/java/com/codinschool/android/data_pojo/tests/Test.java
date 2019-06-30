package com.codinschool.android.data_pojo.tests;

/**
 * The type Test.
 */
public class Test {
    private String name;
    private Object[] result = new Object[2];

    /**
     * Instantiates a new Test.
     *
     * @param name   the name
     * @param result the result
     */
    public Test(String name, Object[] result) {
        this.name = name;
        this.result = result;
    }

    /**
     * Gets name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name the name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get results object [ ].
     *
     * @return the object [ ]
     */
    public Object[] getResults() {
        return result;
    }

    /**
     * Sets results.
     *
     * @param results the results
     */
    public void setResults(Object[] results) {
        this.result = results;
    }
}
