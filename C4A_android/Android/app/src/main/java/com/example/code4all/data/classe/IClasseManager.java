package com.example.code4all.data.classe;

import com.example.code4all.data.user.User;

import java.util.ArrayList;

public interface IClasseManager {
    void loadClassesFromUser();
    ArrayList<Classe> getClasses();
    Classe findClasse(int idClasse);
    void createClasse(String classeName);
    void addClasseToList(Classe classe);
    void deleteClasse(Classe classe);
    void addStudentToClasse(User user, Classe classe);
    void removeStudentFromClasse(User user, Classe classe);

}
