package com.example.demo.spring;

public class DropListElement {
    private String id;
    private String text;

    public DropListElement(String id, String text){
        this.id = id;
        this.text = text;
    }

    public String getId() { return id; }
    public String getText() {
        return text;
    }

    public void setId(String newId) { this.id = newId; }
    public void setText(String newText) { this.text = newText; }
}
