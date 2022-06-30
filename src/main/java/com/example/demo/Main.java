package com.example.demo;

import com.example.demo.serverData.ServerData;
import com.example.demo.spring.SpringApplicationMain;
import com.example.demo.ui.MainFrame;
import org.springframework.boot.SpringApplication;

import javax.swing.*;

public class Main {

	public static void main(String[] args) {
		System.out.println("main called");
		ServerData.readItemIcons();
		ServerData.readCharacterList();
		ServerData.readItemList();
		SwingUtilities.invokeLater(MainFrame::new);
		SpringApplication.run(SpringApplicationMain.class, args);
	}
}
