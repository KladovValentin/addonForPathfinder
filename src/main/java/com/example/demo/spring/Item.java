package com.example.demo.spring;

import com.example.demo.serverData.ServerData;

import java.util.HashMap;

public class Item {
    private String name;
    private String type;
    private String description;
    private float weight;
    private float volume;
    private int amount;
    private boolean equipped;
    private String whoseItemIs;
    private String itemSecondaryType;
    private String iconSrc;
    private int id;


    public Item(String name, String type, String description, float weightt, float volumet, int amountt, boolean equippedt, String whoseItemIst, String itemSecondaryTypet, String iconSrct, int idt) {
        this.name = name;
        this.type = type;
        this.description = description;
        weight = weightt;
        volume = volumet;
        amount = amountt;
        equipped = equippedt;
        whoseItemIs = whoseItemIst;
        itemSecondaryType = itemSecondaryTypet;
        iconSrc = iconSrct;
        id = idt;
    }

    public String getName() {
        return name;
    }
    public String getType() {
        return type;
    }
    public String getDescription() {
        return description;
    }
    public float getWeight() {
        return weight;
    }
    public float getVolume() {
        return volume;
    }
    public int getAmount() {
        return amount;
    }
    public boolean getEquipped() {
        return equipped;
    }
    public String getWhoseItemIs() {
        return whoseItemIs;
    }
    public String getItemSecondaryType() {
        return itemSecondaryType;
    }
    public int getId() {
        return id;
    }
    public String getIconSrc() {
        return iconSrc;
    }

    public void setName(String newName) {
        this.name =newName;
    }
    public void setType(String newType) {
        this.type =newType;
    }
    public void setDescription(String newDescr) {
        this.description =newDescr;
    }
    public void setWeight(float newWeight) {
        this.weight =newWeight;
    }
    public void setVolume(float newVolume) {
        this.volume =newVolume;
    }
    public void setAmount(int newAmount) {
        this.amount =newAmount;
    }
    public void setEquipped(boolean newEquipped) {
        this.equipped = newEquipped;
    }
    public void setWhoseItemIs(String newWhoseItemIs) {
        this.whoseItemIs = newWhoseItemIs;
    }
    public void setItemSecondaryType(String newItemSecondaryType) {
        this.itemSecondaryType =newItemSecondaryType;
    }
    public void setId(int newId) {
        this.id =newId;
    }
    public void setIconSrc(String newIconSrc) {
        this.iconSrc =newIconSrc;
    }

    public void setNewParameters(String newParameters) {
        String[] parts = newParameters.split(";");
        String name = parts[1];
        String type = parts[2];
        String description = parts[3];
        float weight = Float.parseFloat(parts[4]);
        float volume = Float.parseFloat(parts[5]);
        int amount = Integer.parseInt(parts[6]);
        boolean equipped = Boolean.parseBoolean(parts[7]);
        String whoseItemIs = parts[8];
        String itemSecondaryType = parts[9];
        String iconSrc = parts[10];
        int id = Integer.parseInt(parts[0]);
        setName(name);
        setType(type);
        setDescription(description);
        setWeight(weight);
        setVolume(volume);
        setAmount(amount);
        setEquipped(equipped);
        setWhoseItemIs(whoseItemIs);
        setItemSecondaryType(itemSecondaryType);
        setIconSrc(iconSrc);
        setId(id);
    }
}