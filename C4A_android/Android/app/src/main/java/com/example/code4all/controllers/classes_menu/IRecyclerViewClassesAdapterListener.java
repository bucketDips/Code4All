package com.example.code4all.controllers.classes_menu;

import com.example.code4all.data.classe.Classe;

public interface IRecyclerViewClassesAdapterListener {
    public void onClickDelete(Classe classe);
    public void onClasseSelected(Classe classe);
}