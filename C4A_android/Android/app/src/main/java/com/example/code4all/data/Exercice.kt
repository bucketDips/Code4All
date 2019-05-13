package com.example.code4all.data

import org.json.JSONArray
import pub.devrel.bundler.BundlerClass

@BundlerClass
class Exercice constructor(val name: String, val description: String, val content : JSONArray) {
    companion object{

    }
}