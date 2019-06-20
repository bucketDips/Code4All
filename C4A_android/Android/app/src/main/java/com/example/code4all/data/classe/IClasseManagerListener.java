package com.example.code4all.data.classe;

import com.example.code4all.data.classe.Classe;

import java.util.ArrayList;

public interface IClasseManagerListener {
   void onClasseListAsProfessorChanged(ArrayList<Classe> classes);
   void onClasseListAsStudentChanged(ArrayList<Classe> classes);
}
