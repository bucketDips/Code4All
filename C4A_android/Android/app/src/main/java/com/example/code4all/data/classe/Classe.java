package com.example.code4all.data.classe;

import pub.devrel.bundler.BundlerClass;


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
