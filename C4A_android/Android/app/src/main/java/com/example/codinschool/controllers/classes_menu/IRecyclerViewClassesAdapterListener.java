package com.example.codinschool.controllers.classes_menu;

import com.example.codinschool.data_pojo.classe.Classe;

public interface IRecyclerViewClassesAdapterListener {
    void onClickDelete(Classe classe);
    void onClasseSelected(Classe classe);
}
