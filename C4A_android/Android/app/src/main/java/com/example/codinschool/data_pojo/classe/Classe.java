package com.example.codinschool.data_pojo.classe;

import android.os.Parcel;
import android.os.Parcelable;


/**
 * The type Classe.
 */
public class Classe implements Parcelable {
    private int id;
    private String name;

    /**
     * Instantiates a new Classe.
     *
     * @param id   the id
     * @param name the name
     */
    public Classe(int id, String name) {
        this.id = id;
        this.name = name;
    }

    /**
     * Instantiates a new Classe.
     *
     * @param in the in
     */
    protected Classe(Parcel in) {
        id = in.readInt();
        name = in.readString();
    }

    /**
     * The constant CREATOR.
     */
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

    /**
     * Gets id.
     *
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name the name
     */
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
