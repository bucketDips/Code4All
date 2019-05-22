package com.example.code4all.data;

import pub.devrel.bundler.BundlerClass;

@BundlerClass
public class Classe {
    private int id;
    private String name;

    public Classe(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
