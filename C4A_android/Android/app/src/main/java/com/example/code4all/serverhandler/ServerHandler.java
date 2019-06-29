package com.example.code4all.serverhandler;

import android.content.Context;
import android.util.Log;
import com.android.volley.*;
import com.android.volley.toolbox.*;
import com.example.code4all.data_pojo.classe.Classe;
import com.example.code4all.data_pojo.user.User;
import com.example.code4all.error.ErrorNetwork;
import com.example.code4all.serverhandler.pixabay.IAPIHandler;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class ServerHandler implements IServerHandler, IAPIHandler {
    private final String TAG = "ServeurHandler";

    //private final String rootUrl = "http://51.158.110.231:3000";
    private final String rootUrl = "http://212.47.235.40:3000";
    private final String authorization = "Authorization";
    private final String bearer = "Bearer ";


    // USERS ENDPOINTS
    private final String user = "/users";
    private final String connect = "/connect";
    private final String find_user = "/findUser";
    private final String reset_pwd = "/resetPwd";
    private final String get_user ="/getUser";



    // CLASSES ENPOINTS
    private final String classes = "/classes";
    private final String create_classroom = "/createClassroom";
    private final String add_student_to_class = "/addStudentToClass";
    private final String add_professor_to_class = "/addProfessorToClass";

    private final String get_classes_from_this_student = "/getStudentClassesById";
    private final String get_classes_from_this_professor = "/getProfessorClassesById";

    private final String get_all_professor_of_this_classe = "/getProfessorListInClass";
    private final String get_all_student_of_this_classe = "/getStudentListInClass";

    private final String get_classe_details = "/getClassDetail";


    // EXERCICE ENDPOINTS
    private final String exercices = "/exercices";
    private final String get_user_exercices = "/getUserExercices";
    private final String get_exercice = "/getExercice";
    private final String execute_Exercice = "/executeExercice";


    private static ServerHandler serverHandler;
    private final RequestQueue requestQueue;

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
        String finalUrl = rootUrl +  user + find_user + "/" + nameOrEmail;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET, finalUrl, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
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
    public void addStudentToClass(@NotNull User user, @NotNull Classe classe, @NotNull String token, @NotNull IAPICallbackJsonObject callback) {
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
    public void addProfessorToClass(@NotNull User user, @NotNull Classe classe, @NotNull String token, @NotNull IAPICallbackJsonObject callback) {
        String finalUrl = rootUrl + classes + add_professor_to_class + "/" + user.getId() + "/" + classe.getId();

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
    public void getAllClassesOfUserAsStudent(@NotNull String token, @NotNull IAPICallbackJsonArray callback) {
        String url = rootUrl + classes + get_classes_from_this_student;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonArrayRequest);
    }

    @Override
    public void getAllClassesOfUserAsProfessor(@NotNull String token, @NotNull IAPICallbackJsonArray callback) {
        String url = rootUrl + classes + get_classes_from_this_professor;
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonArrayRequest);
    }

    @Override
    public void getRandomPicture(IAPICallbackJsonObject callback) {
        String url = IAPIHandler.PIXABAY_API_URL.replaceFirst("%1", IAPIHandler.PIXABAY_API_KEY + "&q=school");

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


    @Override
    public void getStudentListOfAClasse(@NotNull String token, int classeId, @NotNull IAPICallbackJsonArray callback) {
        String url = rootUrl + classes + get_all_student_of_this_classe + '/' + String.valueOf(classeId);

        JsonArrayRequest jsonObjectRequest = new JsonArrayRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);

    }

    @Override
    public void getProfessorListOfAClasse(@NotNull String token, int classeId, @NotNull IAPICallbackJsonArray callback) {
        String url = rootUrl + classes + get_all_professor_of_this_classe + '/' + String.valueOf(classeId);

        JsonArrayRequest jsonObjectRequest = new JsonArrayRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void getClasseDetails(@NotNull String token, int classeId, @NotNull IAPICallbackJsonObject callback) {
        String url = rootUrl + classes + get_classe_details + '/' + String.valueOf(classeId);

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void getAllExercicesOfTheUserSession(@NotNull String token, @NotNull IAPICallbackJsonObject callback) {
        String url = rootUrl + exercices + get_user_exercices;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);
    }

    @Override
    public void getUser(int idUser, @NotNull String token, @NotNull IAPICallbackJsonArray callback) {
        String url = rootUrl + user + get_user + '/' + idUser;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET, url, null,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonArrayRequest);
    }

    @Override
    public void getExerciceById(int idExercice, @NotNull String token, @NotNull IAPICallbackJsonObject callback) {
        String url = rootUrl + exercices + get_exercice + '/' + idExercice;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject result) {
                        callback.onSuccessResponse(result);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        callback.onErrorResponse(error);
                    }
                }
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);
    }


    @Override
    public void executeExercice(JSONObject parameters, String exercice, String solution, @NotNull String token, @NotNull IAPICallbackJsonObject callback) {
        String url = rootUrl + exercices + execute_Exercice;
        HashMap<String, Object> listParams = preparePostParams("exercice",parameters);
        JSONObject parametersRequest = new JSONObject(listParams);

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.POST, url, parametersRequest,
                callback::onSuccessResponse,
                callback::onErrorResponse
        ){
            @Override
            public Map<String, String> getHeaders() {
                HashMap <String, String> headers = new HashMap<>();
                headers.put(authorization, bearer + token);
                return headers;
            }
        };

        this.requestQueue.add(jsonObjectRequest);


    }

    @Override
    public void getFileById(@NotNull JSONObject parameterJson, int patternId, @NotNull String tokenSaved, @NotNull IAPICallbackJsonObject iapiCallbackJsonObject) {

    }

    public class CustomJsonArrayRequest extends JsonRequest<JSONArray> {

        public CustomJsonArrayRequest(int method, String url, JSONObject jsonRequest,
                                      Response.Listener<JSONArray> listener, Response.ErrorListener errorListener) {
            super(method, url, (jsonRequest == null) ? null : jsonRequest.toString(), listener,
                    errorListener);
        }

        @Override
        protected Response<JSONArray> parseNetworkResponse(NetworkResponse response) {
            try {
                String jsonString = new String(response.data,
                        HttpHeaderParser.parseCharset(response.headers, PROTOCOL_CHARSET));
                return Response.success(new JSONArray(jsonString),
                        HttpHeaderParser.parseCacheHeaders(response));
            } catch (UnsupportedEncodingException e) {
                return Response.error(new ParseError(e));
            } catch (JSONException je) {
                return Response.error(new ParseError(je));
            }
        }
    }


    private static HashMap<String,Object> preparePostParams(Object... args){
        if((args.length%2) == 0){
            HashMap<String,Object> listParams = new HashMap<>();
            for(int i = 0; i < args.length; i = i+2){

                if(args[i+1].equals(0)||args[i+1].equals(false)){
                    args[i+1] = "";
                }
                if(args[i+1].equals(true)){
                    args[i+1] = 1;
                }

                if(!(args[i+1].equals(""))){
                    listParams.put((String)args[i], args[i+1]);
                }

                System.out.println("args :" + (String)args[i] + " args + 1: " + args[i+1]);

            }

            return listParams;

        } else if(args.length == 0){

            HashMap<String,Object> listParams = new HashMap<>();

            return listParams;

        } else {
            // one value is missing
            return null;
        }
    }
}
