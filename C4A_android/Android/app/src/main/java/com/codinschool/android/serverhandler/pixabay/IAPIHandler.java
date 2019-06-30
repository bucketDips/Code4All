package com.codinschool.android.serverhandler.pixabay;

import com.codinschool.android.serverhandler.IAPICallbackJsonObject;

/**
 * The interface Iapi handler.
 */
public interface IAPIHandler {
    /**
     * The constant PIXABAY_API_KEY.
     */
    String PIXABAY_API_KEY = "12798900-ca01678f7e4820e80f3435d26";
    /**
     * The constant PIXABAY_API_URL.
     */
    String PIXABAY_API_URL = "https://pixabay.com/api/?key=%1&image_type=photo";

    /**
     * Gets random picture.
     *
     * @param callbackJsonObject the callback json object
     */
    void getRandomPicture(IAPICallbackJsonObject callbackJsonObject);
}
