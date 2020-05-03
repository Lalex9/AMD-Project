package com.api;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

class OMDbWebServiceClientTest {

    @Test
    void searchMovieByTitle() {
        try {
            String reference = Files.readString(Path.of("src\\test\\java\\com\\api\\searchMovieByTitleReference.txt"));
            String callReuslt = OMDbWebServiceClient.searchMovieByTitle("Star Wars");
            assertEquals(reference, callReuslt, "Unexpected API call result.");
        } catch (IOException e) {
            assertEquals(1, 0, "Reference file not found.");
            e.printStackTrace();
        }
    }

    @Test
    void searchMovieByID() {
        try {
            String reference = Files.readString(Path.of("src\\test\\java\\com\\api\\searchMovieByIdReference.txt"));
            String callReuslt = OMDbWebServiceClient.searchMovieByID("tt0076759");
            assertEquals(reference, callReuslt, "Unexpected API call result.");
        } catch (IOException e) {
            assertEquals(1, 0, "Reference file not found.");
            e.printStackTrace();
        }
    }
}