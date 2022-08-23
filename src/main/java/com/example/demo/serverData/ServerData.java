package com.example.demo.serverData;

import com.example.demo.spring.Player;
import com.example.demo.spring.Item;
import com.example.demo.spring.Character;


import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner; // Import the Scanner class to read text files


public class ServerData {
    public static ArrayList<Player> playerList = new ArrayList<>();
    public static int timesTheButtonWasPressed = 0;
    static String basePath = "D:\\helpful\\Java\\addonForPathfinder\\src\\main\\";

    public static ArrayList<Item> itemList = new ArrayList<Item>();

    public static ArrayList<String> itemIcons = new ArrayList<String>();
    public static ArrayList<String> charIcons = new ArrayList<String>();
    public static ArrayList<Character> characters = new ArrayList<Character>();

    public static String voiceText = "";

    public static Player getPlayer(String name){
        for(Player p: playerList){
            if(p.getName().equals(name)) return p;
        }
        return null;
    }

    public static void readItemIcons(){
        try {
            //itemIcons = new ArrayList<>();
            // Create a file object
            File f = new File(basePath + "resources\\static\\images\\items");

            // Get all the names of the files present
            // in the given directory
            File[] files = f.listFiles();

            System.out.println("Files are:");

            // Display the names of the files
            for (int i = 0; i < files.length; i++) {
                String tempName = files[i].getName();
                System.out.println(tempName);
                itemIcons.add(tempName);
            }

            File f1 = new File(basePath + "resources\\static\\images\\chars");
            File[] files1 = f1.listFiles();
            for (int i = 0; i < files1.length; i++) {
                String tempName = files1[i].getName();
                System.out.println(tempName);
                charIcons.add(tempName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void readCharacterList(){
        try {
            File infile = new File(basePath + "java\\com\\example\\demo\\serverData\\characterList.txt");
            Scanner myReader = new Scanner(infile);
            String name = "";
            String imageSrc = "";
            int money = 0;
            while (myReader.hasNextLine()) {
                name = myReader.nextLine();
                imageSrc = myReader.nextLine();
                money = Integer.parseInt(myReader.nextLine());
                characters.add(new Character(name,imageSrc,money));
                String newLine = myReader.nextLine();
                while(!newLine.equals("next Character")){
                    String[] parts = newLine.split(";");
                    List<String> parts1 = Arrays.asList(parts);
                    if (parts1.size() == 2){
                        parts1.add("-");
                    }
                    characters.get(characters.size()-1).getDropList(parts[0]).addNewElement(parts1.get(1), parts1.get(2));
                    newLine = myReader.nextLine();
                }
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
    public static void writeCharacterList(){
        try {
            FileWriter outfile = new FileWriter(basePath + "java\\com\\example\\demo\\serverData\\characterList.txt");
            for(int x = 0; x < ServerData.characters.size(); x++){
                outfile.write(String.valueOf(ServerData.characters.get(x).getName()) + "\r\n");
                outfile.write(String.valueOf(ServerData.characters.get(x).getImageSrc()) + "\r\n");
                outfile.write(String.valueOf(ServerData.characters.get(x).getMoney()) + "\r\n");
                for(int i = 0; i < characters.get(x).getDropList("Attack").elements.size(); i++){
                    outfile.write("Attack;" + String.valueOf(ServerData.characters.get(x).getDropList("Attack").getId(i)) + ";" + String.valueOf(ServerData.characters.get(x).getDropList("Attack").getText(i)) + "\r\n");
                }
                for(int i = 0; i < characters.get(x).getDropList("Damage").elements.size(); i++){
                    outfile.write("Damage;" + String.valueOf(ServerData.characters.get(x).getDropList("Damage").getId(i)) + ";" + String.valueOf(ServerData.characters.get(x).getDropList("Damage").getText(i)) + "\r\n");
                }
                for(int i = 0; i < characters.get(x).getDropList("Ac").elements.size(); i++){
                    outfile.write("Ac;" + String.valueOf(ServerData.characters.get(x).getDropList("Ac").getId(i)) + ";" + String.valueOf(ServerData.characters.get(x).getDropList("Ac").getText(i)) + "\r\n");
                }
                outfile.write("next Character");
                if (x < ServerData.characters.size() - 1){
                    outfile.write("\r\n");
                }
            }
            outfile.close();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    public static void readItemList(){
        try {
            File infile = new File(basePath + "java\\com\\example\\demo\\serverData\\itemList.txt");
            Scanner myReader = new Scanner(infile);
            int lineCount = 0;
            String name = "";
            String type = "";
            String description = "";
            float weight = 0;
            float volume = 0;
            int amount = 0;
            boolean equipped = false;
            String whoseItemIs = "";
            String itemSecondaryType = "";
            String iconSrc = "";
            int id = 0;
            while (myReader.hasNextLine()) {
                id = Integer.parseInt(myReader.nextLine());
                name = myReader.nextLine();
                type = myReader.nextLine();
                String newLine = myReader.nextLine();
                description = "";
                while(!newLine.equals("end of description")){
                    description = description + newLine;
                    newLine = myReader.nextLine();
                }
                weight = Float.parseFloat(myReader.nextLine());
                volume = Float.parseFloat(myReader.nextLine());
                amount = Integer.parseInt(myReader.nextLine());
                equipped = Boolean.parseBoolean(myReader.nextLine());
                whoseItemIs = myReader.nextLine();
                itemSecondaryType = myReader.nextLine();
                iconSrc = myReader.nextLine();
                itemList.add(new Item(name,type,description,weight,volume,amount,equipped,whoseItemIs,itemSecondaryType,iconSrc,id));
                System.out.println(name);
                String emptyLine = myReader.nextLine();
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    public static void writeItemList(){
        try {
            FileWriter outfile = new FileWriter(basePath + "java\\com\\example\\demo\\serverData\\itemList.txt");
            for(int x = 0; x < ServerData.itemList.size(); x++){
                outfile.write(String.valueOf(ServerData.itemList.get(x).getId()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getName()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getType()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getDescription()) + "\r\n");
                outfile.write(String.valueOf("end of description") + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getWeight()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getVolume()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getAmount()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getEquipped()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getWhoseItemIs()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getItemSecondaryType()) + "\r\n");
                outfile.write(String.valueOf(ServerData.itemList.get(x).getIconSrc()) + "\r\n");
                outfile.write("\r\n");
            }
            outfile.close();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}


