package com.example.codinschool.data_pojo.file;

/**
 * The type File.
 */
public class File {
    private int id;
    private String name;
    private int sender;
    private int exercice_id;
    private int file_id;
    private String url;

    /**
     * Instantiates a new File.
     *
     * @param id          the id
     * @param name        the name
     * @param sender      the sender
     * @param exercice_id the exercice id
     * @param file_id     the file id
     * @param url         the url
     */
    public File(int id, String name, int sender, int exercice_id, int file_id, String url) {
        this.id = id;
        this.name = name;
        this.sender = sender;
        this.exercice_id = exercice_id;
        this.file_id = file_id;
        this.url = url;
    }

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

    /**
     * Gets sender.
     *
     * @return the sender
     */
    public int getSender() {
        return sender;
    }

    /**
     * Sets sender.
     *
     * @param sender the sender
     */
    public void setSender(int sender) {
        this.sender = sender;
    }

    /**
     * Gets exercice id.
     *
     * @return the exercice id
     */
    public int getExercice_id() {
        return exercice_id;
    }

    /**
     * Sets exercice id.
     *
     * @param exercice_id the exercice id
     */
    public void setExercice_id(int exercice_id) {
        this.exercice_id = exercice_id;
    }

    /**
     * Gets file id.
     *
     * @return the file id
     */
    public int getFile_id() {
        return file_id;
    }

    /**
     * Sets file id.
     *
     * @param file_id the file id
     */
    public void setFile_id(int file_id) {
        this.file_id = file_id;
    }

    /**
     * Gets url.
     *
     * @return the url
     */
    public String getUrl() {
        return "http://" + url;
    }

    /**
     * Sets url.
     *
     * @param url the url
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Is a gif boolean.
     *
     * @return the boolean
     */
    public boolean isAGif() {
        String url = getUrl();
        return url.indexOf(".gif",url.length() - ".gif".length()) > 0;

    }
}
