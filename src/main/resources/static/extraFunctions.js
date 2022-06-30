let items = [];
let itemTypes = ["equipment", "usefulGear", "spendable", "questItems", "randomStuff"];
let currentPage = "randomStuff";
let currentCharacter = "";
let serverAddress = "http://26.3.41.21:8080/";
let itemIconsFileList = [];
let charIconsFileList = [];
let users = [];



function speakText(text){
    let voices = [];
    let synth = window.speechSynthesis;
    
    let utter = new SpeechSynthesisUtterance();
  
    utter.lang = 'en-US';
    utter.text = text;
    utter.volume = 0.5;
    voices = window.speechSynthesis.getVoices();
    utter.voice = voices[0];
  
    synth.speak(utter);
  }
  