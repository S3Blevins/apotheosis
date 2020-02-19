/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.beans.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author sterling
 */
public class UserSettings implements Serializable {
    private String[] genreList = {"ROCK", "HIP-HOP", "POP", "CLASSICAL", "COUNTRY", 
        "GRUNGE", "R-N-B", "TECHNO", "EMO", "ELECTRONIC", "WORLD-MUSIC", "METAL"};
    
    private String[] tagList = {"HAPPY", "GROOVE", "SOUL", "AFROBEAT", "ANIME", 
        "CHILL", "AMBIENT", "DETROIT-TECHNO", "SLEEP", "WORK-OUT", "STUDY", "RAINY-DAY"};
    
    //private static HashMap genrePresence;
    //private static HashMap genrePresence;
    
    private ArrayList<metadata> genres;
    private ArrayList<metadata> tags;
    
    public UserSettings() {
        genres = new ArrayList<metadata>();
        tags = new ArrayList<metadata>();
    }
    
    public ArrayList<metadata> getGenres() {
        return genres;
    }
    
    public int getGenreCount() {
        return genres.size();
    }
    
    public ArrayList<metadata> getTags() {
        return tags;
    }
    
    public int getTagsCount() {
        return tags.size();
    }
    
    // NOTE: A getter is required to work with JSTL
    public String[] getGenreList() {
        return genreList;
    }
    
    public String[] getTagList() {
        return tagList;
    }
    
    public int addGenre(String name, int order) {
        
        int i;
        for (i = 0; i < genres.size(); i++) {
            if(genres.get(i).getName().equals(name)) {
                return -1;
            }
        }
        
        metadata newData = new metadata(name, order);
        
        genres.add(newData);
        
        return i + 1;
    }
    
    public void removeGenre(String name) {
        
        for (int i = 0; i < genres.size(); i++) {
            if(genres.get(i).getName().equals(name)) {
                genres.remove(i);
            }
        }
    }
    
    public void removeGenre(int order) {
        
        for (int i = 0; i < genres.size(); i++) {
            if(genres.get(i).getOrder() == order) {
                genres.remove(i);
            }
        }
    }
    
    public int addTag(String name, int order) {
        
        int i;
        for (i = 0; i < tags.size(); i++) {
            if(tags.get(i).getName().equals(name)) {
                return -1;
            }
        }
        
        metadata newData = new metadata(name, order);
        
        tags.add(newData);
        
        return i + 1;
    }
    
    public void removeTag(String name) {
        
        for (int i = 0; i < tags.size(); i++) {
            if(tags.get(i).getName().equals(name)) {
                tags.remove(i);
            }
        }
    }
    
    public void removeTag(int order) {
        
        for (int i = 0; i < tags.size(); i++) {
            if(tags.get(i).getOrder() == order) {
                tags.remove(i);
            }
        }
    }
    
    public static boolean contains(ArrayList<metadata> data, String name) {
        
        for (int i = 0; i < data.size(); i++) {
            if(data.get(i).getName().equals(name)) {
                return true;
            }
        }
        
        return false;
    }
    
    public void clearLists() {
        genres.clear();
        tags.clear();
    }
    /*
    static {
        genrePresence= new HashMap();
        genrePresence.put("ROCK", false);
        genrePresence.put("RAP", false);
        genrePresence.put("POP", false);
        genrePresence.put("CLASSICAL", false);
        genrePresence.put("COUNTRY", false);
        genrePresence.put("GRUNGE", false);
        genrePresence.put("TRAP", false);
        genrePresence.put("TECHNO", false);
        genrePresence.put("OLDIES", false);
        genrePresence.put("ELECTRONICA", false);
        genrePresence.put("WORLD", false);
        genrePresence.put("METAL", false);
    }

    public static boolean getGenrePresence(String id) {
        return (boolean)genrePresence.get(id);
    }
    */
}