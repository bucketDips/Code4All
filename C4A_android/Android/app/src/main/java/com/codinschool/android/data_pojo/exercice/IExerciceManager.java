package com.codinschool.android.data_pojo.exercice;

/**
 * The interface Exercice manager.
 */
public interface IExerciceManager {
    /**
     * Gets exercice of the user connected.
     */
    void getExerciceOfTheUserConnected();

    /**
     * Gets exercice by id.
     *
     * @param idExercice the id exercice
     */
    void getExerciceById(int idExercice);
}
