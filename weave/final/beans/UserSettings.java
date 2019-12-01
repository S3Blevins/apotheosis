/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.beans.*;
import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 * @author sterling
 */
public class UserSettings implements Serializable {
    
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
    
    public int addData(String name, boolean type) {
        // if the boolean is true, then change the attribute to tags
        // done for reduction of repeat code
        ArrayList<metadata> data = genres;
        if(type) {
            data = tags;
        }
        
        int i;
        for (i = 0; i < data.size(); i++) {
            if(data.get(i).getName().equals(name)) {
                return -1;
            }
        }
        
        metadata newData = new metadata(name, i+1);
        
        genres.add(newData);
        
        return i + 1;
    }
    
    public void removeData(String name, boolean type) {
        // if the boolean is true, then change the attribute to tags
        // done for reduction of repeat code
        ArrayList<metadata> data = genres;
        if(type) {
            data = tags;
        }
        
        for (int i = 0; i < data.size(); i++) {
            if(data.get(i).getName().equals(name)) {
                data.remove(i);
            }
        }
    }
    
    public boolean containsData(String name, boolean type) {
        // if the boolean is true, then change the attribute to tags
        // done for reduction of repeat code
        ArrayList<metadata> data = genres;
        if(type) {
            data = tags;
        }
        
        for (int i = 0; i < data.size(); i++) {
            if(data.get(i).getName().equals(name)) {
                return true;
            }
        }
        
        return false;
    }
    
}
