package com.example.codinschool.data_pojo.classe;

import com.example.codinschool.error.ErrorNetwork;

import java.util.ArrayList;

public interface IClasseManagerListener {
   void onClasseListAsProfessorChanged(ArrayList<Classe> classes);
   void onClasseListAsStudentChanged(ArrayList<Classe> classes);
   void onFailClasseCreation(ErrorNetwork errorNetwork);
}
