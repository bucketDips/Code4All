package com.example.code4all.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.code4all.R
import com.example.code4all.data.Exercice
import pub.devrel.bundler.EasyBundler

class ExerciceLayoutFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //var e : Exercice = EasyBundler.fromBundle(savedInstanceState, Exercice)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_exercice_layout, container, false)
    }
}
