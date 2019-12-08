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
    private int order;
    
    public metadata() {
        name = "";
        order = -1;
    }
    
    public metadata(String name, int order) {
        this.name = name;
        this.order = order;
    }

    public String getName() {
        return name;
    }

    public void setName(String metaName) {
        this.name = metaName;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int metaOrder) {
        this.order = metaOrder;
    }
    
}
