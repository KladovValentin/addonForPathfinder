package com.example.demo.spring;
import com.example.demo.serverData.ServerData;

import java.util.ArrayList;

public class Character {
    private String name;
    private String imageSrc;

    public DropList attackRolls = new DropList();
    public DropList damageRolls = new DropList();
    public DropList acRolls = new DropList();

    public Character(String name, String imageSrc){
        this.name = name;
        this.imageSrc = imageSrc;
    }

    public String getName() {
        return name;
    }
    public String getImageSrc() {
        return imageSrc;
    }

    public void setName(String newName) { this.name = newName; }
    public void setImageSrc(String newImageSrc) { this.imageSrc = newImageSrc; }

    public void setNewParameters(String newParameters) {
        String[] parts = newParameters.split(";");
        String name = parts[0];
        String imageSrc = parts[1];
        setName(name);
        setImageSrc(imageSrc);
    }

    public DropList getDropList(String dropListId){
        switch (dropListId){
            case "Attack":
                return attackRolls;
            case "Damage":
                return damageRolls;
            case "Ac":
                return acRolls;
            default: break;
        }
        return attackRolls;
    }
}
