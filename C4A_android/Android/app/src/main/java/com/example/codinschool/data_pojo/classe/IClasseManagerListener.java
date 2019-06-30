package com.example.codinschool.data_pojo.classe;

import com.example.codinschool.error.ErrorNetwork;

import java.util.ArrayList;

/**
 * The interface Classe manager listener.
 */
public interface IClasseManagerListener {
   /**
    * On classe list as professor changed.
    *
    * @param classes the classes
    */
   void onClasseListAsProfessorChanged(ArrayList<Classe> classes);

   /**
    * On classe list as student changed.
    *
    * @param classes the classes
    */
   void onClasseListAsStudentChanged(ArrayList<Classe> classes);

   /**
    * On fail classe creation.
    *
    * @param errorNetwork the error network
    */
   void onFailClasseCreation(ErrorNetwork errorNetwork);
}
