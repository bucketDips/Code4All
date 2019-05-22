package com.example.code4all.data;

import pub.devrel.bundler.BundlerClass;

@BundlerClass
public class User {
    private int id;
    private String name;
    private String password;
    private String email;
    private int valid;

    public User(int id, String name, String password, String email, int valid) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.valid = valid;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
