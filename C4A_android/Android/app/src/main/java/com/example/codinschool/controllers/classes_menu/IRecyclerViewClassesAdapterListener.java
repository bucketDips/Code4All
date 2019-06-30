package com.example.codinschool.controllers.classes_menu;

import com.example.codinschool.data_pojo.classe.Classe;

/**
 * The interface Recycler view classes adapter listener used to control user actions on the recyclerview.
 */
public interface IRecyclerViewClassesAdapterListener {
    /**
     * On click delete.
     *
     * @param classe the classe
     */
    void onClickDelete(Classe classe);

    /**
     * On classe selected.
     *
     * @param classe the classe
     */
    void onClasseSelected(Classe classe);
}
