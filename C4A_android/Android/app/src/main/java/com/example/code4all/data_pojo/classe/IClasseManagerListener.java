package com.example.code4all.data_pojo.classe;

import com.example.code4all.error.ErrorNetwork;

import java.util.ArrayList;

public interface IClasseManagerListener {
   void onClasseListAsProfessorChanged(ArrayList<Classe> classes);
   void onClasseListAsStudentChanged(ArrayList<Classe> classes);
   void onFailClasseCreation(ErrorNetwork errorNetwork);
}
