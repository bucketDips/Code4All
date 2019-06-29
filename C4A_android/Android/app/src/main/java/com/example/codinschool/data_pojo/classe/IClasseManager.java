package com.example.codinschool.data_pojo.classe;

import com.example.codinschool.data_pojo.user.User;

import java.util.ArrayList;

public interface IClasseManager {
    void loadClassesFromUser();
    ArrayList<Classe> getClassesListAsProfessor();
    ArrayList<Classe> getClassesListAsStudent();
    Boolean doesExist(int idClasse, ArrayList<Classe> classeList);
    Classe getClasseInClasseList(int idClasse, ArrayList<Classe> classeList);
    void getProfessorsOfThisClasse(Classe idClasse, IClasseCallback callback);
    void getStudentsOfThisClasse(Classe idClasse, IClasseCallback callback);
    Classe findClasse(int idClasse);
    Classe loadClasse(int idClasse);
    boolean isInThisList(User user, ArrayList<User> users);
    void createClasse(String classeName);
    void addClasseToList(Classe classe, ArrayList<Classe> classeList);
    void deleteClasse(Classe classe);
    void addStudentToClasse(User user, Classe classe);
    void removeStudentFromClasse(User user, Classe classe);

}
