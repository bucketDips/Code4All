package com.example.codinschool.data_pojo.tests;

public class Test {
    private String name;
    private Object[] result = new Object[2];

    public Test(String name, Object[] result) {
        this.name = name;
        this.result = result;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Object[] getResults() {
        return result;
    }

    public void setResults(Object[] results) {
        this.result = results;
    }
}
