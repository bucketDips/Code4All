package com.example.code4all.data_pojo.file;

public class File {
    private int id;
    private String name;
    private int sender;
    private int exercice_id;
    private int file_id;
    private String url;

    public File(int id, String name, int sender, int exercice_id, int file_id, String url) {
        this.id = id;
        this.name = name;
        this.sender = sender;
        this.exercice_id = exercice_id;
        this.file_id = file_id;
        this.url = url;
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

    public int getSender() {
        return sender;
    }

    public void setSender(int sender) {
        this.sender = sender;
    }

    public int getExercice_id() {
        return exercice_id;
    }

    public void setExercice_id(int exercice_id) {
        this.exercice_id = exercice_id;
    }

    public int getFile_id() {
        return file_id;
    }

    public void setFile_id(int file_id) {
        this.file_id = file_id;
    }

    public String getUrl() {
        return "http://" + url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isAGif() {
        String url = getUrl();
        return url.indexOf(".gif",url.length() - ".gif".length()) > 0;

    }
}
