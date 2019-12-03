/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.beans.*;
import java.io.Serializable;

/**
 *
 * @author sterling
 */
public class metadata implements Serializable {
    private String name;
    private int id;
    
    public metadata() {
        name = "";
        id = 0;
    }

    public metadata(String name) {
        this.name = name;
        this.id= 0;
    }
    
    public metadata(String name, int ID) {
        this.name= name;
        this.id =ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String metaName) {
        this.name = metaName;
    }

    public int getID() {
        return id;
    }

    public void setID(int metaID) {
        this.id = metaID;
    }
    
    
}
