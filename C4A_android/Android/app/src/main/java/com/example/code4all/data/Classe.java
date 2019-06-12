package com.example.code4all.data;

import pub.devrel.bundler.BundlerClass;

@BundlerClass
public class Classe {
    private int id;
    private String name;

    Classe() { }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
