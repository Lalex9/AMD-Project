package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "Lists") // This tells Hibernate to make a table out of this class
public class ListEntry {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String listName;
    private String listContent;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public String getListContent() {
        return listContent;
    }

    public void setListContent(String listContent) {
        this.listContent = listContent;
    }

    @Override
    public String toString() {
        return "ListEntry{" +
                "id=" + id +
                ", listName='" + listName + '\'' +
                ", listContent='" + listContent + '\'' +
                '}';
    }
}
