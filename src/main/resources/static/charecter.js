
class equipmentBoxClass {
    constructor() {
      this.occupied = false;
      this.occupationItemId = -1;
      this.hoverYN = false;
    }
}

class characterPageInfo{
    constructor() {
        this.charName = "Name";
        this.charImage = "images/chars/character.jpg";
        this.socketsNames = ["right hand", "left hand" , "armor" , "back" , "left bracer" ,  "right bracer" , "ring 1" , "ring 2" , "ring 3" , "ring 4"];
        this.socketsIds = ["righthand", "lefthand" , "armor" , "back" , "leftbracer" ,  "rightbracer" , "ring1" , "ring2" , "ring3" , "ring4"];
        this.socketsTypes = ["right hand", "left hand" , "armor" , "back" , "left bracer" ,  "right bracer" , "ring" , "ring" , "ring" , "ring"];

        this.quickBarFill = [false,false,false,false,false,false,false,false,false];
        this.quickBarItemIds = [-1,-1,-1,-1,-1,-1,-1,-1,-1];

        this.droppingDownLists = [];
        this.money = 0;
    }
}

class charIconButtonProperties {
    constructor() {
        this.hoverYN = false;
    }
}

function constructEquipmentBoxName(name,top,left,width){
    let equipmentBoxName = document.createElement("p");
    equipmentBoxName.classList.add("equipmentBoxName");  //style

    equipmentBoxName.id = "tDCharacterPage";
    //equipmentBoxName.style.position = "fixed";
    equipmentBoxName.style.top = top + '%';
    equipmentBoxName.style.left = left + width - 0.25 + '%';
    equipmentBoxName.innerHTML = name;
    return equipmentBoxName;
}

function constructEquipmentBox(charName, name, cellId, localX, localY){
    let box1 = document.createElement("img");

    //define box itself parameters - coordinates, position, image, width

    box1.classList.add("equipmentBox");
    box1.classList.add("equipmentBoxClass");
    box1.occupied = false;
    box1.occupationItemId = -1;
    box1.hoverYN = false;
    box1.id = charName + "CharPage" +cellId;
    //let cellWidth = baseImage.getBoundingClientRect().width;
    let boxWidth = 6.25;
    let top = localY;
    let left = localX;
    
    box1.style.top = top + '%';
    box1.style.left = left + '%';// +'calc(33vw*0.05)';
    box1.style.width = boxWidth + '%';
    box1.src = "images/equipBox.jpg";


    //adding event listener with description
    box1.addEventListener("mouseenter", function(){
        if(document.getElementById("tDCharacterPage")){
            document.getElementById("tDCharacterPage").remove();
        }
        document.getElementById(charName + "CharPage").appendChild(constructEquipmentBoxName(name,top,left,boxWidth));
    });
    box1.addEventListener("mouseleave", function(){
        if(document.getElementById("tDCharacterPage")){
            document.getElementById("tDCharacterPage").remove();
        }
    });

    // dragging
    box1.addEventListener("dragover", (event) => {
        event.preventDefault();
        box1.style.zIndex = "1000";
        if(document.getElementById("tDCharacterPage")){
            document.getElementById("tDCharacterPage").remove();
        }
        document.getElementById(charName + "CharPage").appendChild(constructEquipmentBoxName(name,top,left,boxWidth));
      });
    box1.addEventListener("drop", (event) => {
        event.preventDefault();
        box1.hoverYN = true;
    });
    box1.addEventListener("mouseleave",function(){
        box1.hoverYN = false;
        box1.style.zIndex = "0";
        if(document.getElementById("tDCharacterPage")){
            document.getElementById("tDCharacterPage").remove();
        }
    });
    return box1;
}

function manageCharImageContextMenu(event, charName){
    event.preventDefault();
    const { clientX: mouseX, clientY: mouseY } = event;
    const contextMenu = document.getElementById("imageCharacterContext-menu");
    const changeIconItemButton = document.getElementById("changeImageCharacterButton");
    contextMenu.enactingCharName = charName;
  
    contextMenu.classList.add("visible");
    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;
  
    //_________________quiting context menu listener
    document.querySelector("body").addEventListener("click",e => {
      if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
      }
    }, {once: true});
  }

//construct image of character with opacity
function constructCharacterImage(charName,image){
    let newCharacterPage = document.getElementById(charName+"CharPage");

    let imageCharacter = document.createElement("img");
    imageCharacter.classList.add("imageOfChar");
    imageCharacter.src = image;
    imageCharacter.id = charName+"CharPage"+"Image";
    imageCharacter.addEventListener('contextmenu', (event) => {
        manageCharImageContextMenu(event,charName);
    })

    // dragging
    imageCharacter.addEventListener("dragover", (event) => {
        //event.preventDefault();
        for (let i = 0; i < newCharacterPage.socketsIds.length; i++){
            document.getElementById(charName + "CharPage" + newCharacterPage.socketsIds[i]).style.zIndex = "1000";
        }
    });
    imageCharacter.addEventListener("mouseleave",function(){
        for (let i = 0; i < newCharacterPage.socketsIds.length; i++){
            document.getElementById(charName + "CharPage" + newCharacterPage.socketsIds[i]).style.zIndex = "0";
        }
    });

    newCharacterPage.appendChild(imageCharacter);
    let imageWithHeight = document.getElementById(charName+"CharPage"+"Image");
    //console.log(imageWithHeight.getBoundingClientRect().height);
    //newCharacterPage.style.height = imageWithHeight.getBoundingClientRect().height + "px";
}


//construct boxes for equipment
function constructCharacterBoxes(charName){
    var newCharacterPage = document.getElementById(charName+"CharPage");
    for (let i = 0; i < 6; i++){
        newCharacterPage.appendChild( constructEquipmentBox (charName, newCharacterPage.socketsNames[i], newCharacterPage.socketsIds[i], 2.5, 5+15*i) );
    }
    for (let i = 0; i < newCharacterPage.socketsNames.length - 6; i++){
        newCharacterPage.appendChild( constructEquipmentBox (charName, newCharacterPage.socketsNames[i+6], newCharacterPage.socketsIds[i+6], 50-2.5-6.25, 5+15*i) );
    }
}


function constructCharacterPage(charName, image, money){
    let charPage = document.createElement("div");
    charPage.classList.add("characterPage");
    charPage.classList.add("characterPageInfo");
    charPage.charName = charName;
    charPage.charImage = image;
    charPage.money = money;
    charPage.socketsNames = ["primary", "secondary" , "head" , "armor" , "extra armor" , "back" , "boots" , "hands" , "amulet" , "belt" , "accessory 1" , "accessory 2"];
    charPage.socketsIds = ["primary", "secondary" , "head" , "armor" , "extraAarmor" , "back" , "boots", "hands" , "amulet" , "belt" , "accessory1" , "accessory2"];
    charPage.socketsTypes = ["primary", "secondary" , "head" , "armor" , "extra armor" , "back" , "boots" , "hands" , "amulet" , "belt" , "accessory 1" , "accessory 2"];
    charPage.quickBarFill = [false,false,false,false,false,false,false,false,false];
    charPage.quickBarItemIds = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    charPage.droppingDownLists = [];
    //quickBar.innerHTML = "I am quick bar";
    charPage.id = charName+"CharPage";
    document.querySelector("body").appendChild(charPage);
    constructCharacterImage(charName,image);
    constructCharacterBoxes(charName);
    constructCharIconButton(charName);
    createDroppingList(charName, "Attack", "attack rolls");
    createDroppingList(charName, "Damage", "damage rolls");
    createDroppingList(charName, "Ac", "AC values");
    constructCurrencyField(charName);
}

function constructCharacterPages(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", serverAddress+"getCharactersInfo", false);
    xmlHttp.send( null );
    var serverResponse = xmlHttp.responseText;
    console.log(serverResponse);
    let paramArray = serverResponse.split("_");
    for(let i = 0; i < paramArray.length; i++){
        let infoArrayParameters = paramArray[i].split("-`-");
        users.push(infoArrayParameters[0]);
        currentCharacter = infoArrayParameters[0];
        constructCharacterPage(infoArrayParameters[0], infoArrayParameters[1], infoArrayParameters[2]);
    }
    currentCharacter = users[0];
    createManageCharacterButtons();
}

function addjustCharPageHeight(){
    for(let i = 0; i < users.length; i++){
        let imageWithHeight = document.getElementById(users[i]+"CharPage"+"Image");
        let newCharacterPage = document.getElementById(users[i]+"CharPage");
        //console.log(imageWithHeight.getBoundingClientRect().height);
        newCharacterPage.style.height = imageWithHeight.getBoundingClientRect().height + "px";
    }
}

function showOnlyThisCharPage(charName){
    for(let i = 0; i < users.length; i++){
        document.getElementById(users[i] + "CharPage").style.display = "none";
    }
    document.getElementById(charName + "CharPage").style.display = "block";
    for (let i = 0; i < items.length; i++) {
        items[i].style.transitionDuration = "0s";
    }
    displayOnlyThisType(currentPage);
    placeItemsInCells();
    for (let i = 0; i < items.length; i++) {
        items[i].style.transitionDuration = "0.2s";
    }
    document.getElementById("inventoryHeader").innerText = charName + " inventory";
}

function updateCharacterParameters(charName){
    let locCharPage = document.getElementById(charName + "CharPage");
    let infoToSend = String(locCharPage.charName);
    infoToSend +="_"+String(locCharPage.charName);
    infoToSend +="-`-"+String(locCharPage.charImage);
    infoToSend +="-`-"+String(locCharPage.money);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", serverAddress+"updateCharacterParameters?info="+encodeURIComponent(infoToSend), false);
    xmlHttp.send( null );
}

function changeCurrentCharacter(newCharName){
    currentCharacter = newCharName;
    displayOnlyThisType(currentPage);
    for (let i = 0; i < users.length; i++) {
        let locCharPage = document.getElementById(users[i] + "CharPage");
        if (users[i] == currentCharacter){
            locCharPage.style.display = "block";
        }
        else{
            locCharPage.style.display = "none";
        }
    }
    document.getElementById("inventoryHeader").innerText = newCharName + " inventory";
}

function fastResizeCharIconButton(charName){
    for(let i = 0; i < users.length; i++){
        document.getElementById(users[i] + "CharPage").style.display = "none";
    }
    document.getElementById(charName + "CharPage").style.display = "block";

    let charImage = document.getElementById(charName+"CharPage"+"Image");
    let icon = document.getElementById(charName + "CharPage" + "IconButton");
    icon.style.height = charImage.height/charImage.width * icon.getBoundingClientRect().width + "px";
    icon.innerText = charName;

    for(let i = 0; i < users.length; i++){
        document.getElementById(users[i] + "CharPage").style.display = "none";
    }
    document.getElementById(currentCharacter + "CharPage").style.display = "block";
}

function constructCharIconButton(charName){
    let icon = document.createElement("div");
    icon.classList.add("charIconButtonStyle");
    icon.classList.add("charIconButtonProperties");
    icon.hoverYN = false; //for dragging items to this button and change their "owner"
    //console.log("url('"+document.getElementById(charName+"CharPage").charImage + "')");
    icon.style.backgroundImage = "url('"+ document.getElementById(charName+"CharPage").charImage + "')";
    //icon.src = document.getElementById(charName+"CharPage").charImage;
    icon.id = charName + "CharPage" + "IconButton";
    let positionIndex = 0;
    for(let i = 0; i < users.length; i++){
        if(users[i] != charName){
            continue;
        }
        positionIndex = i;
    }
    icon.style.top = 70 + '%';
    icon.style.left = 5*positionIndex + 0.5 + '%';// +'calc(33vw*0.05)';


    //resizing when hovering
    icon.addEventListener("mouseenter", function(){
        fastResizeCharIconButton(charName);
    });
    icon.addEventListener("mouseout", function(){
        icon.style.height = "8%";
        icon.innerText = "";
    });

    //change current charpage when clicking
    icon.addEventListener("click", function(){
        currentCharacter = charName;
        showOnlyThisCharPage(currentCharacter);
        addjustCharPageHeight();
        showOnlyThisCharPage(currentCharacter);
    });

    // dragging
    icon.addEventListener("dragover", (event) => {
        event.preventDefault();
        //fastResizeCharIconButton(charName);
    });
    icon.addEventListener("drop", (event) => {
        event.preventDefault();
        icon.hoverYN = true;
    });
    icon.addEventListener("mouseleave",function(){
        icon.hoverYN = false;
    });
    
    document.querySelector("body").appendChild(icon);
}

function placeAllManageCharButtons(){
    let newCharNameSpace = document.getElementById("newChar" + "CharPage" + "NameSpace");
    let confirmCharButton = document.getElementById("confirmChar" + "CharPage" + "IconButton");
    let newCharButton = document.getElementById("newChar" + "CharPage" + "IconButton");
    let confirmDelCharButton = document.getElementById("confirmDelChar" + "CharPage" + "IconButton");
    let delCharButton = document.getElementById("delChar" + "CharPage" + "IconButton");

    let positionIndex = users.length + 1;
    newCharNameSpace.style.left = 5*positionIndex + 0.5 + '%';

    positionIndex = users.length+2;
    confirmCharButton.style.left = 5*positionIndex + 0.5 + '%';

    positionIndex = users.length;
    newCharButton.style.left = 5*positionIndex + 0.5 + '%';

    positionIndex = users.length+1;
    confirmDelCharButton.style.left = 5*positionIndex + 0.5 + '%';
    
    positionIndex = users.length;
    delCharButton.style.left = 5*positionIndex + 0.5 + '%';

}

function createNewCharacter(charName){
    users.push(charName);
    placeAllManageCharButtons();
    constructCharacterPage(charName, "images/chars/character.jpg",0);
    currentCharacter = charName;
    showOnlyThisCharPage(currentCharacter);

    let infoToSend = String(charName);
    infoToSend +="-`-"+String("images/chars/character.jpg");
    infoToSend +="-`-"+String("0");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", serverAddress+"genNewCharacter?info="+encodeURIComponent(infoToSend), false);
    xmlHttp.send( null );
}

function removeCharacter(charName){
    let removeIndex = -1;
    for (let i = 0; i < users.length; i++){
        if (users[i] != charName){
            continue;
        }
        removeIndex = i;
    }
    if (removeIndex == -1){
        return;
    }

    //if there are items - give them to the first user and remove from equipment
    for (let i = 0; i < items.length; i++){
        if (items[i].whoseItemIs == users[removeIndex]){
            items[i].equipped = false;
            if (removeIndex == 0){
                items[i].whoseItemIs = users[1];
            }
            else if (removeIndex >= 1){
                items[i].whoseItemIs = users[0];
            }
            let currentCharactert = currentCharacter;
            currentCharacter = items[i].whoseItemIs;
            items[i].itemCell = findFreeCell();
            placeItemInCell(items[i]);
            currentCharacter = currentCharactert;
            updateItemInfo(i);
        }
    }

    //remove all character-related elements from page
    document.getElementById(charName+"CharPage").remove();
    document.getElementById(charName + "CharPage" + "IconButton").remove();

    //remove from user list
    users.splice(removeIndex, 1);

    //shift buttons
    placeAllManageCharButtons();

    //show existing user
    currentCharacter = users[0];
    showOnlyThisCharPage(users[0]);

    //remove on server
    var xmlHttp = new XMLHttpRequest();
    let infoToSend = String(charName);
    xmlHttp.open( "GET", serverAddress+"removeCharacter?info="+encodeURIComponent(infoToSend), false);
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
}

function createManageCharacterButtons(){
    ///
    let newCharNameSpace = document.createElement("div");
    newCharNameSpace.classList.add("newCharNameSpaceStyle");
    newCharNameSpace.id = "newChar" + "CharPage" + "NameSpace";
    let positionIndex = users.length + 1;
    newCharNameSpace.style.height = 3.75 + '%';
    newCharNameSpace.style.top = 70 + '%';
    newCharNameSpace.style.left = 5*positionIndex + 0.5 + '%';
    newCharNameSpace.contentEditable = true;
    newCharNameSpace.style.display = "none";
    document.querySelector("body").appendChild(newCharNameSpace);
    
    ///
    let confirmCharButton = document.createElement("div");
    confirmCharButton.classList.add("charIconButtonStyle");
    confirmCharButton.style.color = "#ffffff";
    confirmCharButton.id = "confirmChar" + "CharPage" + "IconButton";
    positionIndex = users.length+2;
    confirmCharButton.style.height = 3.75 + '%';
    confirmCharButton.style.top = 70 + '%';
    confirmCharButton.style.left = 5*positionIndex + 0.5 + '%';
    confirmCharButton.style.display = "none";

    confirmCharButton.addEventListener("mouseenter", function(){
        confirmCharButton.innerText = "Confirm New Character";
    });
    confirmCharButton.addEventListener("mouseout", function(){
        confirmCharButton.innerText = "";
    });

    confirmCharButton.addEventListener("click", function(){
        if (newCharNameSpace.innerText == ""){
            alert("set a name please");
        }
        createNewCharacter(newCharNameSpace.innerText);
        newCharNameSpace.innerText = "";
        newCharNameSpace.style.display = "none";
        confirmCharButton.style.display = "none";
    });

    document.querySelector("body").appendChild(confirmCharButton);

    ///
    let newCharButton = document.createElement("div");
    newCharButton.classList.add("charIconButtonStyle");
    newCharButton.style.color = "#ffffff";
    newCharButton.id = "newChar" + "CharPage" + "IconButton";
    positionIndex = users.length;
    newCharButton.style.height = 3.75 + '%';
    newCharButton.style.top = 70 + '%';
    newCharButton.style.left = 5*positionIndex + 0.5 + '%';

    newCharButton.addEventListener("mouseenter", function(){
        newCharButton.innerText = "New Character";
    });
    newCharButton.addEventListener("mouseout", function(){
        newCharButton.innerText = "";
    });

    newCharButton.addEventListener("click", function(){
        if(newCharNameSpace.style.display == "none"){
            newCharNameSpace.style.display = "block";
            confirmCharButton.style.display = "block";
        }
        else{
            newCharNameSpace.innerText = "";
            newCharNameSpace.style.display = "none";
            confirmCharButton.style.display = "none";
        }
    });

    document.querySelector("body").appendChild(newCharButton);


    ///
    let confirmDelCharButton = document.createElement("div");
    confirmDelCharButton.classList.add("charIconButtonStyle");
    confirmDelCharButton.style.color = "#ffffff";
    confirmDelCharButton.style.backgroundColor = "#994848";
    confirmDelCharButton.id = "confirmDelChar" + "CharPage" + "IconButton";
    positionIndex = users.length+1;
    confirmDelCharButton.style.height = 3.75 + '%';
    confirmDelCharButton.style.top = 74.25 + '%';
    confirmDelCharButton.style.left = 5*positionIndex + 0.5 + '%';
    confirmDelCharButton.style.display = "none";

    confirmDelCharButton.addEventListener("mouseenter", function(){
        confirmDelCharButton.innerText = "Confirm Delete Current Character";
    });
    confirmDelCharButton.addEventListener("mouseout", function(){
        confirmDelCharButton.innerText = "";
    });

    confirmDelCharButton.addEventListener("click", function(){
        removeCharacter(currentCharacter);
        confirmDelCharButton.style.display = "none";
    });
    document.querySelector("body").appendChild(confirmDelCharButton);

    ///
    let delCharButton = document.createElement("div");
    delCharButton.classList.add("charIconButtonStyle");
    delCharButton.style.color = "#ffffff";
    delCharButton.style.backgroundColor = "#994848";
    delCharButton.id = "delChar" + "CharPage" + "IconButton";
    positionIndex = users.length;
    delCharButton.style.height = 3.75 + '%';
    delCharButton.style.top = 74.25 + '%';
    delCharButton.style.left = 5*positionIndex + 0.5 + '%';

    delCharButton.addEventListener("mouseenter", function(){
        delCharButton.innerText = "Remove Character";
    });
    delCharButton.addEventListener("mouseout", function(){
        delCharButton.innerText = "";
    });

    delCharButton.addEventListener("click", function(){
        if(confirmDelCharButton.style.display == "none"){
            confirmDelCharButton.style.display = "block";
        }
        else{
            confirmDelCharButton.style.display = "none";
        }
    });

    document.querySelector("body").appendChild(delCharButton);
}