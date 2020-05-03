package com.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class OMDbWebServiceClient {
    private static final String SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&apikey=2def0cff";
    private static final String ID_URL = "http://www.omdbapi.com/?i=ID&apikey=2def0cff";


    private static String sendGetRequest(String requestURL) {
        StringBuffer response = new StringBuffer();

        try {
            URL url = new URL(requestURL);
            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "*/*");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            InputStream stream = connection.getInputStream();
            InputStreamReader reader = new InputStreamReader(stream);
            BufferedReader buffer = new BufferedReader(reader);
            String line;
            while ((line = buffer.readLine()) != null) {
                response.append(line);
            }
            buffer.close();
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return response.toString();
    }

    public static String searchMovieByTitle(String title) {
        String requestURL = SEARCH_URL.replaceAll("TITLE", title).replaceAll(" ", "%20");
        return sendGetRequest(requestURL);
    }

    public static String searchMovieByID(String id) {
        String requestURL = ID_URL.replaceAll("ID", id).replaceAll(" ", "%20");
        return sendGetRequest(requestURL);
    }
}
