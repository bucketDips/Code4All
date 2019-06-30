package com.example.codinschool.data_pojo.classe;

import com.example.codinschool.data_pojo.user.User;

import java.util.ArrayList;

/**
 * The interface Classe manager.
 */
public interface IClasseManager {
    /**
     * Load classes from user.
     */
    void loadClassesFromUser();

    /**
     * Gets classes list as professor.
     *
     * @return the classes list as professor
     */
    ArrayList<Classe> getClassesListAsProfessor();

    /**
     * Gets classes list as student.
     *
     * @return the classes list as student
     */
    ArrayList<Classe> getClassesListAsStudent();

    /**
     * Does exist boolean.
     *
     * @param idClasse   the id classe
     * @param classeList the classe list
     * @return the boolean
     */
    Boolean doesExist(int idClasse, ArrayList<Classe> classeList);

    /**
     * Gets classe in classe list.
     *
     * @param idClasse   the id classe
     * @param classeList the classe list
     * @return the classe in classe list
     */
    Classe getClasseInClasseList(int idClasse, ArrayList<Classe> classeList);

    /**
     * Gets professors of this classe.
     *
     * @param idClasse the id classe
     * @param callback the callback
     */
    void getProfessorsOfThisClasse(Classe idClasse, IClasseCallback callback);

    /**
     * Gets students of this classe.
     *
     * @param idClasse the id classe
     * @param callback the callback
     */
    void getStudentsOfThisClasse(Classe idClasse, IClasseCallback callback);

    /**
     * Find classe classe.
     *
     * @param idClasse the id classe
     * @return the classe
     */
    Classe findClasse(int idClasse);

    /**
     * Load classe classe.
     *
     * @param idClasse the id classe
     * @return the classe
     */
    Classe loadClasse(int idClasse);

    /**
     * Is in this list boolean.
     *
     * @param user  the user
     * @param users the users
     * @return the boolean
     */
    boolean isInThisList(User user, ArrayList<User> users);

    /**
     * Create classe.
     *
     * @param classeName the classe name
     */
    void createClasse(String classeName);

    /**
     * Add classe to list.
     *
     * @param classe     the classe
     * @param classeList the classe list
     */
    void addClasseToList(Classe classe, ArrayList<Classe> classeList);

    /**
     * Delete classe.
     *
     * @param classe the classe
     */
    void deleteClasse(Classe classe);

    /**
     * Add student to classe.
     *
     * @param user   the user
     * @param classe the classe
     */
    void addStudentToClasse(User user, Classe classe);

    /**
     * Remove student from classe.
     *
     * @param user   the user
     * @param classe the classe
     */
    void removeStudentFromClasse(User user, Classe classe);

}
