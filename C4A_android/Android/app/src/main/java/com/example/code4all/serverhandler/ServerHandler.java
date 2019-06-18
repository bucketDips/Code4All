package com.example.code4all.serverhandler;

import android.content.Context;
import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.code4all.data.classe.Classe;
import com.example.code4all.data.user.User;
import com.example.code4all.serverhandler.pixabay.IAPIHandler;
import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ServerHandler implements IServerHandler, IAPIHandler {

    private final String rootUrl = "http://51.158.110.231:3000";
    private final String authorization = "Authorization";
    private final String bearer = "Bearer ";


    // USERS ENDPOINTS
    private final String user = "/users";
    private final String connect = "/connect";
    private final String find_user = "/findUser";
    private final String reset_pwd = "/resetPwd";


    // CLASSES ENPOINTS
    private final String classes = "/classes";
    private final String create_classroom = "/createClassroom";
    private final String add_student_to_class = "/addStudentToClass";
    private final String get_classes_from_this_student = "/getStudentClassesById";
    private final String get_classes_from_this_professor = "/getProfessorClassesById";



    private static ServerHandler serverHandler;
    private final RequestQueue requestQueue;

    //private final RequestQueue requestQueue;
    //private final Context context;
    private HashMap<String, Object> listParams;

    private ServerHandler(Context context) {
        this.requestQueue = Volley.newRequestQueue(context);
    }

    public static void initInstance(Context context){
        serverHandler = new ServerHandler(context);
    }

    public static ServerHandler getInstance() throws Exception {
        if(serverHandler == null){
            throw new Exception("Instance isnt initialized");
        }

        return serverHandler;
    }




    @Override
    public void connect(@NotNull String mail, @NotNull String password, @NotNull IAPICallbackJsonObject callback) {
        String finalUrl = rootUrl + user + connect + "/" + mail + "/" + password;
        //RequestQueue requestQueue = Volley.newRequestQueue(context);

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, finalUrl, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        );

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void findUser(@NotNull String nameOrEmail, @NotNull String token, @NotNull IAPICallbackJsonArray callback) {
        String finalUrl = rootUrl + user + find_user + "/" + nameOrEmail;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET, finalUrl, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonArrayRequest);
    }

    @Override
    public void createClassroom(@NotNull String classname, @NotNull String token, @NotNull IAPICallbackJsonObject callback) {
        String finalUrl = rootUrl + classes + create_classroom + "/" + classname;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, finalUrl, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap<String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void resetPwd(@NotNull User user, @NotNull String token, @NotNull IAPICallbackJsonObject callback) {
        String finalUrl = rootUrl + user + reset_pwd + "/" + user.getEmail();

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, finalUrl, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap<String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void addUserToClass(@NotNull User user, @NotNull Classe classe, @NotNull String token, @NotNull IAPICallbackJsonObject callback) {
        String finalUrl = rootUrl + classes + add_student_to_class + "/" + user.getId() + "/" + classe.getId();

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, finalUrl, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap<String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void getAllClassromOfUserAsStudent(@NotNull String token, @NotNull IAPICallbackJsonArray callback) {
        String url = rootUrl + classes + get_classes_from_this_student;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonArrayRequest);
    }

    @Override
    public void getAllClassromOfUserAsProfessor(@NotNull String token, @NotNull IAPICallbackJsonArray callback) {
        String url = rootUrl + classes + get_classes_from_this_professor;
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonArrayRequest);
    }

    @Override
    public void getRandomPicture(IAPICallbackJsonObject callback) {
        String url = IAPIHandler.apiUrl.replaceFirst("%1", IAPIHandler.apiKey);

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        );

        this.requestQueue.add(jsonObjectRequest);
    }

    public static String getStringFromJsonObject(JSONObject jsonObject, String target) throws JSONException {
        if(jsonObject.has(target))
            return jsonObject.getString(target);
        else
            return "";
    }
}
