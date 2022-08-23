package com.example.demo.spring;
import com.example.demo.serverData.ServerData;

import java.util.ArrayList;

public class Character {
    private String name;
    private String imageSrc;
    private int money;

    public DropList attackRolls = new DropList();
    public DropList damageRolls = new DropList();
    public DropList acRolls = new DropList();

    public Character(String name, String imageSrc, int money){
        this.name = name;
        this.imageSrc = imageSrc;
        this.money = money;
    }

    public String getName() {
        return name;
    }
    public String getImageSrc() {
        return imageSrc;
    }
    public int getMoney() {
        return money;
    }

    public void setMoney(int newMoney) { this.money = newMoney; }
    public void setName(String newName) { this.name = newName; }
    public void setImageSrc(String newImageSrc) { this.imageSrc = newImageSrc; }

    public void setNewParameters(String newParameters) {
        String[] parts = newParameters.split("-`-");
        String name = parts[0];
        String imageSrc = parts[1];
        int money = Integer.parseInt(parts[2]);
        setMoney(money);
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
