package com.example.code4all.controllers.classes_menu;

import com.example.code4all.data_pojo.classe.Classe;

public interface IRecyclerViewClassesAdapterListener {
    void onClickDelete(Classe classe);
    void onClasseSelected(Classe classe);
}
