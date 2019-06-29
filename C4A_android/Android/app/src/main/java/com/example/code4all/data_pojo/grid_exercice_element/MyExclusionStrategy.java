package com.example.code4all.data_pojo.grid_exercice_element;

import android.view.View;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

public class MyExclusionStrategy implements ExclusionStrategy {
    @Override
    public boolean shouldSkipField(FieldAttributes f) {
        return f.getDeclaringClass().equals(View.class);
    }

    @Override
    public boolean shouldSkipClass(Class<?> clazz) {
        return clazz.getClasses() == View.class.getClasses();
    }
}
