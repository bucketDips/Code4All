package com.example.code4all.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.support.v4.app.FragmentPagerAdapter
import android.support.v4.view.ViewPager
import com.example.code4all.R
import com.example.code4all.data.Exercice
import kotlinx.android.synthetic.main.fragment_exercice_list.*
import org.json.JSONArray
import pub.devrel.bundler.EasyBundler


class ExerciceListFragment : Fragment() {
    private val exercices : ArrayList<Exercice> = ArrayList()
    private val exerciceFragmentList : ArrayList<ExerciceLayoutFragment> = ArrayList()
    //private val sectionPagerAdapter : SectionsPagerAdapter? = null


    init {
        exercices.add(Exercice("Exercice 1", "blablabla", JSONArray()))
        exercices.add(Exercice("Exercice 2", "Blalalalalalal", JSONArray()))
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val v = inflater.inflate(R.layout.fragment_exercice_list, container, false)
        //setupView(savedInstanceState)
        return v
    }

    fun setupView(bundle: Bundle?){
        for (exercice in exercices) {
            val exerciceLayoutFragment = ExerciceLayoutFragment()
            exerciceLayoutFragment.arguments = EasyBundler.toBundle(exercice)
            exerciceFragmentList.add(exerciceLayoutFragment)
        }

        val sectionPagerAdapter = fragmentManager?.let { SectionsPagerAdapter(it, exercices) }
        viewPager.adapter = sectionPagerAdapter

    }

    internal inner class SectionsPagerAdapter(fm: FragmentManager, val exercices: ArrayList<Exercice>) : FragmentPagerAdapter(fm) {

        override fun getItem(position: Int): Fragment? {
            return exerciceFragmentList.get(position)
        }

        override fun getCount(): Int {
            // Show 2 total pages.
            return exercices.size
        }
    }
}
