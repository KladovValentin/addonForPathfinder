package com.example.demo.ui;

import com.example.demo.serverData.ServerData;
import com.example.demo.spring.Player;

import javax.swing.*;
import javax.swing.plaf.FontUIResource;
import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class MainPanel extends JPanel {
    public JTextArea textArea;
    public boolean serverState = false;
    private JLabel yourClients = new JLabel("your clients:");
    private JTextArea clientsArea;

    public MainPanel() {
        setPreferredSize(new Dimension(200, 100));

        setFocusable(true);
        setName("mainPanel");
        Timer timerServerState = new Timer(1000,e->getServerState());
        Timer WriteServerState = new Timer(1000,e->writeToDisk());
        //Timer timerServerClients = new Timer(10, e->updateClients());
        initializeVariables();
        System.out.println("beforestart");
        timerServerState.start();
        WriteServerState.start();
        //timerServerClients.start();
        repaint();
    }

    private void initializeVariables(){
        textArea = new JTextArea();
        clientsArea = new JTextArea();
        JScrollPane scrollPane = new JScrollPane(textArea);
        JScrollPane scrollPaneClients = new JScrollPane(clientsArea);
        SpringLayout layout = new SpringLayout();
        layout.putConstraint(SpringLayout.EAST,scrollPane,0,SpringLayout.EAST,this);
        layout.putConstraint(SpringLayout.WEST,scrollPane,0,SpringLayout.WEST,this);
        layout.putConstraint(SpringLayout.NORTH,scrollPane,0,SpringLayout.NORTH,this);
        layout.putConstraint(SpringLayout.SOUTH,scrollPane,40,SpringLayout.NORTH,this);
        layout.putConstraint(SpringLayout.WEST,yourClients,5,SpringLayout.WEST,this);
        layout.putConstraint(SpringLayout.NORTH,yourClients,41,SpringLayout.NORTH,this);
        layout.putConstraint(SpringLayout.EAST,scrollPaneClients,0,SpringLayout.EAST,this);
        layout.putConstraint(SpringLayout.WEST,scrollPaneClients,0,SpringLayout.WEST,this);
        layout.putConstraint(SpringLayout.NORTH,scrollPaneClients,60,SpringLayout.NORTH,this);
        layout.putConstraint(SpringLayout.SOUTH,scrollPaneClients,0,SpringLayout.SOUTH,this);
        setLayout(layout);
        Font myFont = new FontUIResource("new font",0,20);
        textArea.setFont(myFont);
        clientsArea.setFont(myFont);
        textArea.setEditable(false);
        clientsArea.setEditable(false);
        add(scrollPane);
        add(scrollPaneClients);
        add(yourClients);
        repaint();
    }

    private void getServerState(){
        Process process;
        String[] cmd = {"curl","localhost:8080/checkstate"};
        try {
            process = Runtime.getRuntime().exec(cmd);
            InputStream stdout = process.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(stdout, StandardCharsets.UTF_8));
            String line1;
            while ((line1 = reader.readLine()) != null) {
                if(line1.equals("1")){
                    serverState = true;
                    textArea.setText("your server is ok");
                    return;
                }
            }
            serverState = false;
            textArea.setText("your server is not ok");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void updateClients(){
        clientsArea.setText("");
        for(Player p: ServerData.playerList){
            clientsArea.append(p.getName()+", pos: " + p.getPosX() + " " + p.getPosY() + "\n");
        }
    }

    private void writeToDisk(){
        ServerData.writeItemList();
        ServerData.writeCharacterList();
    }
}
