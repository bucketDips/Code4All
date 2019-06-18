package com.example.code4all.serverhandler.pixabay;

import com.example.code4all.serverhandler.IAPICallbackJsonObject;

public interface IAPIHandler {
    String apiKey = "12798900-ca01678f7e4820e80f3435d26";
    String apiUrl = "https://pixabay.com/api/?key=%1&image_type=photo";
    void getRandomPicture(IAPICallbackJsonObject callbackJsonObject);
}
