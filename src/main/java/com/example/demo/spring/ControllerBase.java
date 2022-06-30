package com.example.demo.spring;

import com.example.demo.spring.Player;
import com.example.demo.spring.Item;

import com.example.demo.serverData.ServerData;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ControllerBase {

    private static final String template = "Hello, %s, from SanaFan!";
    private final AtomicLong counter = new AtomicLong();


    @GetMapping("/")
    public String index() {
        return "Hello, from SanaFan!";
    }

    @GetMapping("/checkstate")
    public String checkState() {
        return "1";
    }

    @GetMapping("/sendinfo")
    public int sendInfo(@RequestParam(value = "name", defaultValue = "none") String name,
                        @RequestParam(value = "direction", defaultValue = "none") String direction,
                        @RequestParam(value = "posX", defaultValue = "none") String posX,
                        @RequestParam(value = "posY", defaultValue = "none") String posY,
                        @RequestParam(value = "state", defaultValue = "none") String state) {
        Objects.requireNonNull(ServerData.getPlayer(name)).updateInfo(direction, posX, posY, state);
        return 1;
    }

    @GetMapping("/getinfo")
    public String getInfo() {
        String info = "";
        for(Player p: ServerData.playerList){
            info+=p.getInfo();
            info+="\n";
        }
        return info;
    }

    @GetMapping("/addplayer")
    public int addPlayer(@RequestParam(value = "name", defaultValue = "none") String name) {
        String[] parts = name.split("-");
        ServerData.playerList.add(new Player(parts[0]));
        return 1;
    }

    @GetMapping("/removeplayer")
    public int removePlayer(@RequestParam(value = "name", defaultValue = "none") String name) {
        int indexToRemove = -1;
        for(int i = 0; i < ServerData.playerList.size(); i++){
            if(ServerData.playerList.get(i).getName().equals(name)) indexToRemove = i;
        }
        if(indexToRemove>-1) ServerData.playerList.remove(indexToRemove);
        return 1;
    }

    @CrossOrigin()
    @GetMapping("/checkhtml")
    public String checkHTML() {
        ServerData.timesTheButtonWasPressed++;
        return String.valueOf(ServerData.timesTheButtonWasPressed);
    }





    @CrossOrigin()
    @GetMapping("/genNewItem")
    public String genNewItem(@RequestParam(value = "info", defaultValue = "none") String info) {
        String[] parts = info.split(";");
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
        ServerData.itemList.add(new Item(name,type,description,weight,volume,amount, equipped, whoseItemIs, itemSecondaryType,iconSrc, id));
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/updateItemParameters")
    public String updateItemParameters(@RequestParam(value = "info", defaultValue = "none") String info) {
        String[] parts = info.split("_");
        int itemsIndex = 0;
        for(int x = 0; x < ServerData.itemList.size(); x++){
            if(ServerData.itemList.get(x).getId() == Integer.parseInt(parts[0])){
                itemsIndex = x;
                break;
            }
        }
        ServerData.itemList.get(itemsIndex).setNewParameters(parts[1]);
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/removeItem")
    public String removeItem(@RequestParam(value = "info", defaultValue = "none") String info) {
        int itemsIndex = -1;
        for(int x = 0; x < ServerData.itemList.size(); x++){
            if(ServerData.itemList.get(x).getId() == Integer.parseInt(info)){
                itemsIndex = x;
                break;
            }
        }
        if(itemsIndex == -1){
            return "no such id";
        }
        ServerData.itemList.remove(itemsIndex);
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/getUpdates")
    public String getUpdates() {
        String answer = "";
        for(int x = 0; x < ServerData.itemList.size(); x++){
            answer = answer + String.valueOf(ServerData.itemList.get(x).getId()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getName()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getType()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getDescription()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getWeight()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getVolume()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getAmount()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getEquipped()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getWhoseItemIs()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getItemSecondaryType()) + ";";
            answer = answer + String.valueOf(ServerData.itemList.get(x).getIconSrc());
            if(x < ServerData.itemList.size() - 1){
                answer = answer + "_";
            }
        }
        return answer;
    }

    //___________________________________characters section_________________________
    @CrossOrigin()
    @GetMapping("/genNewCharacter")
    public String genNewCharacter(@RequestParam(value = "info", defaultValue = "none") String info) {
        String[] parts = info.split(";");
        String name = parts[0];
        String imageSrc = parts[1];
        ServerData.characters.add(new Character(name,imageSrc));
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/updateCharacterParameters")
    public String updateCharacterParameters(@RequestParam(value = "info", defaultValue = "none") String info) {
        String[] parts = info.split("_");
        int itemsIndex = 0;
        for(int x = 0; x < ServerData.characters.size(); x++){
            if(ServerData.characters.get(x).getName().equals(parts[0])){
                itemsIndex = x;
                break;
            }
        }
        ServerData.characters.get(itemsIndex).setNewParameters(parts[1]);
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/removeCharacter")
    public String removeCharacter(@RequestParam(value = "info", defaultValue = "none") String info) {
        int itemsIndex = -1;
        for(int x = 0; x < ServerData.characters.size(); x++){
            System.out.println(info);
            System.out.println(ServerData.characters.get(x).getName());
            System.out.println(ServerData.characters.get(x).getName().equals(info));
            if(ServerData.characters.get(x).getName().equals(info)){
                itemsIndex = x;
                break;
            }
        }
        if(itemsIndex == -1){
            return "no such id";
        }
        ServerData.characters.remove(itemsIndex);
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/getCharactersInfo")
    public String getCharactersInfo() {
        String answer = "";
        for(int x = 0; x < ServerData.characters.size(); x++){
            answer = answer + String.valueOf(ServerData.characters.get(x).getName()) + ";";
            answer = answer + String.valueOf(ServerData.characters.get(x).getImageSrc());
            if(x < ServerData.characters.size() - 1){
                answer = answer + "_";
            }
        }
        return answer;
    }

    //___________________________________Drop List section_________________________
    @CrossOrigin()
    @GetMapping("/updateDropListInfo")
    public String updateDropListInfo(@RequestParam(value = "info", defaultValue = "none") String info) {
        String[] parts = info.split("_");
        String charName = parts[0].split(";")[0];
        String dropListId = parts[0].split(";")[1];
        int charIndex = 0;
        for(int x = 0; x < ServerData.characters.size(); x++){
            if(ServerData.characters.get(x).getName().equals(charName)){
                charIndex = x;
                break;
            }
        }
        if(parts.length <= 1){
           return "hui";
        }
        ServerData.characters.get(charIndex).getDropList(dropListId).updateDropListElementsInfo(parts[1]);
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/removeDropListElement")
    public String removeDropListElement(@RequestParam(value = "info", defaultValue = "none") String info) {
        String[] parts = info.split("_");
        String charName = parts[0].split(";")[0];
        String dropListId = parts[0].split(";")[1];
        int charIndex = 0;
        for(int x = 0; x < ServerData.characters.size(); x++){
            if(ServerData.characters.get(x).getName().equals(charName)){
                charIndex = x;
                break;
            }
        }
        ServerData.characters.get(charIndex).getDropList(dropListId).removeElement(parts[1]);
        return "ok";
    }

    @CrossOrigin()
    @GetMapping("/getDropListInfo")
    public String getDropListInfo(@RequestParam(value = "info", defaultValue = "none") String info) {
        String charName = info.split(";")[0];
        String dropListId = info.split(";")[1];
        int charIndex = 0;
        for(int x = 0; x < ServerData.characters.size(); x++){
            if(ServerData.characters.get(x).getName().equals(charName)){
                charIndex = x;
                break;
            }
        }
        String answer = "";
        for(int x = 0; x < ServerData.characters.get(charIndex).getDropList(dropListId).elements.size(); x++){
            answer = answer + String.valueOf(ServerData.characters.get(charIndex).getDropList(dropListId).getId(x)) + ";";
            answer = answer + String.valueOf(ServerData.characters.get(charIndex).getDropList(dropListId).getText(x));
            if(x < ServerData.characters.get(charIndex).getDropList(dropListId).elements.size() - 1){
                answer = answer + "_";
            }
        }
        return answer;
    }


    //__________________________________icons section________________________________
    @CrossOrigin()
    @GetMapping("/getItemIconFileNames")
    public String getItemIconFileNames() {
        String answer = "";
        for(int x = 0; x < ServerData.itemIcons.size(); x++){
            answer = answer + String.valueOf(ServerData.itemIcons.get(x));
            if(x < ServerData.itemIcons.size() - 1){
                answer = answer + ";";
            }
        }
        return answer;
    }
    @CrossOrigin()
    @GetMapping("/getCharIconFileNames")
    public String getCharIconFileNames() {
        String answer = "";
        for(int x = 0; x < ServerData.charIcons.size(); x++){
            answer = answer + String.valueOf(ServerData.charIcons.get(x));
            if(x < ServerData.charIcons.size() - 1){
                answer = answer + ";";
            }
        }
        System.out.println(answer);
        return answer;
    }
}
