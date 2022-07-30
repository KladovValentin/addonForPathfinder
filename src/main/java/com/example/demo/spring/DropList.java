package com.example.demo.spring;

import com.example.demo.serverData.ServerData;

import java.util.ArrayList;

public class DropList {

    public ArrayList<DropListElement> elements = new ArrayList<DropListElement>();

    public DropList(){

    }

    public String getId(int index) { return elements.get(index).getId(); }
    public String getText(int index) {
        return elements.get(index).getText();
    }

    public void addNewElement(String id, String text){
        elements.add(new DropListElement(id,text));
    }

    public void updateDropListElementsInfo(String inputInfo){
        String[] parts = inputInfo.split("-`-");
        for(int i = 0; i < parts.length; i++) {
            boolean exist = false;
            //find corresponding element
            for (int x = 0; x < elements.size(); x++) {
                if (!parts[i].equals(getId(x))) {
                    continue;
                }
                //found if - change parameters
                exist = true;
                elements.get(x).setText(parts[i + 1]);
            }
            if (exist) {
                i = i + 1;
                continue;
            }
            //add new if not on a server
            addNewElement(parts[i], parts[i + 1]);
            i = i + 1;
        }
    }

    public void removeElement(String elementId) {
        int indexToRemove = -1;
        for (int i = 0; i < elements.size(); i++) {
            if (!getId(i).equals(elementId)){
                continue;
            }
            indexToRemove = i;
        }
        if (indexToRemove != -1){
            elements.remove(indexToRemove);
        }
    }

}

