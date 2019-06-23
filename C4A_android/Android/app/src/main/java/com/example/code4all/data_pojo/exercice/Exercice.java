package com.example.code4all.data_pojo.exercice;

import com.example.code4all.data_pojo.block.GridExerciceElement;

public class Exercice {
    private int id;
    private String title;
    private String text;
    private int isPublic;
    private ExerciceContent content;
    private int author_id;
    private int classe_id;


    public Exercice(int id, String title, String text, ExerciceContent content, int isPublic, int author_id, int classe_id) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.content = content;
        this.isPublic = isPublic;
        this.author_id = author_id;
        this.classe_id = classe_id;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(int isPublic) {
        this.isPublic = isPublic;
    }

    public ExerciceContent getContent() {
        return content;
    }

    public void setContent(ExerciceContent content) {
        this.content = content;
    }

    public int getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(int author_id) {
        this.author_id = author_id;
    }

    public int getClasse_id() {
        return classe_id;
    }

    public void setClasse_id(int classe_id) {
        this.classe_id = classe_id;
    }
}
