package com.example.code4all.data_pojo.tests;

public class Test {
    private String name;
    private Object[] results = new Object[2];

    public Test(String name, Object[] results) {
        this.name = name;
        this.results = results;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Object[] getResults() {
        return results;
    }

    public void setResults(Object[] results) {
        this.results = results;
    }
}
