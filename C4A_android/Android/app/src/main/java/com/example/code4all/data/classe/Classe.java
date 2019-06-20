package com.example.code4all.data.classe;

import android.os.Parcel;
import android.os.Parcelable;
import pub.devrel.bundler.BundlerClass;

import java.io.Serializable;


public class Classe implements Parcelable {
    private int id;
    private String name;

    public Classe(int id, String name) {
        this.id = id;
        this.name = name;
    }

    protected Classe(Parcel in) {
        id = in.readInt();
        name = in.readString();
    }

    public static final Creator<Classe> CREATOR = new Creator<Classe>() {
        @Override
        public Classe createFromParcel(Parcel in) {
            return new Classe(in);
        }

        @Override
        public Classe[] newArray(int size) {
            return new Classe[size];
        }
    };

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeStringArray(new String[] {String.valueOf(this.id),
                this.name});
    }
}
