package com.example.demo.spring;

import java.util.HashMap;

public class Player {
    private final String name;
    public enum State {WALKING,STANDING,RUNNING}
    public enum Direction {UP,LEFT,DOWN,RIGHT,UP_LEFT,UP_RIGHT,DOWN_LEFT,DOWN_RIGHT}
    private State currentState;
    private Direction direction;
    private float posX;
    private float posY;

    public Player(String name) {
        currentState = State.STANDING;
        direction = Direction.DOWN;
        this.name = name;
        posX = 0;
        posY = 0;
    }

    public Direction getDirection() {
        return direction;
    }

    public State getCurrentState() {
        return currentState;
    }

    public float getPosX(){
        return posX;
    }

    public float getPosY() {
        return posY;
    }

    public String getName() {
        return name;
    }

    public HashMap<String,Object> getMap(){
        HashMap<String,Object> map = new HashMap<>();
        map.put("name", this.name);
        map.put("direction",this.direction);
        map.put("posX",posX);
        map.put("posY",posY);
        map.put("state",this.currentState);
        return map;
    }

    public String getInfo(){
        return "name:"+name+";direction:"+direction+";posX:"+posX+";posY:"+posY+";state:"+currentState;
    }

    public void updateInfo(HashMap<String,Object> map){
        direction = Direction.valueOf((String)map.get("direction"));
        posX = Float.parseFloat((String)map.get("posX"));
        posY = Float.parseFloat((String)map.get("posY"));
        currentState = State.valueOf((String)map.get("state"));
    }

    public void updateInfo(String direction, String posX, String posY, String state){
        this.direction = Direction.valueOf(direction);
        this.posX = Float.parseFloat(posX);
        this.posY = Float.parseFloat(posY);
        this.currentState = State.valueOf(state);
    }
}
