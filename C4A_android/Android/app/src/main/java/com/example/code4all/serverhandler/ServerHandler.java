package com.example.code4all.serverhandler;

import android.content.Context;
import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.code4all.data.Classe;
import com.example.code4all.data.User;
import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Map;

public class ServerHandler implements IServerHandler{

    private final String url = "http://51.158.110.231:3000";
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
    public void connect(@NotNull String mail, @NotNull String password, @NotNull IAPICallbackJsonObject iapiCallbackJsonObject) {
        String finalUrl = url + user + connect + "/" + mail + "/" + password;
        //RequestQueue requestQueue = Volley.newRequestQueue(context);

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, finalUrl, null,
                iapiCallbackJsonObject::onSuccessResponse,
                iapiCallbackJsonObject::onErrorResponse
        );

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void find_user(@NotNull String nameOrEmail, @NotNull String token, @NotNull IAPICallbackJsonObject iapiCallbackJsonObject) {
        String finalUrl = url + user + find_user + "/" + nameOrEmail;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, finalUrl, null,
                iapiCallbackJsonObject::onSuccessResponse,
                iapiCallbackJsonObject::onErrorResponse
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
    public void create_classroom(@NotNull String classname, @NotNull String token, @NotNull IAPICallbackJsonObject iapiCallbackJsonObject) {
        String finalUrl = url + classes + create_classroom + "/" + classname;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, finalUrl, null,
                iapiCallbackJsonObject::onSuccessResponse,
                iapiCallbackJsonObject::onErrorResponse
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
    public void reset_pwd(@NotNull User user, @NotNull String token, @NotNull IAPICallbackJsonObject iapiCallbackJsonObject) {
        String finalUrl = url + user + reset_pwd + "/" + user.getEmail();

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, finalUrl, null,
                iapiCallbackJsonObject::onSuccessResponse,
                iapiCallbackJsonObject::onErrorResponse
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
    public void add_user_to_class(@NotNull User user, @NotNull Classe classe, @NotNull String token, @NotNull IAPICallbackJsonObject iapiCallbackJsonObject) {
        String finalUrl = url + classes + add_student_to_class + "/" + user.getId() + "/" + classe.getId();

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, finalUrl, null,
                iapiCallbackJsonObject::onSuccessResponse,
                iapiCallbackJsonObject::onErrorResponse
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
}
