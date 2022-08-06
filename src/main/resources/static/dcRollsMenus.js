class droppingDownList{
    constructor(){
        this.elementsIds = [];
        this.state = "hidden";
        this.listName = "";
    }
}

class droppingDownElement{
    constructor(){

    }
}

function createDroppingList(charName, listId, listName){
    
    /// creating here a container at which elements and buttons are placed relativly
    let droppingListContainer = document.createElement("div");
    droppingListContainer.id = charName + "DropListContainer" + listId;
    droppingListContainer.classList.add("droppingListContainerDesign");

    let tempCharacter = document.getElementById(charName+"CharPage");
    let position = tempCharacter.droppingDownLists.length;
    tempCharacter.droppingDownLists.push(listId);
    droppingListContainer.style.top = 10 + position * 20 + "%";
    droppingListContainer.style.left = "51" + "%";
    tempCharacter.appendChild(droppingListContainer);


    /// creating here primary button for list that open and closes it, 
    /// also it stores all info about itself and containing elements id cores
    /// clicking on it also serve as trigger for server verification and update of data
    let droppingListTemp = document.createElement("div");
    droppingListTemp.id = charName + "DropList" + listId;
    droppingListTemp.classList.add("droppingListDesign");
    droppingListTemp.classList.add("droppingDownList");
    
    droppingListTemp.innerText = listName;
    droppingListTemp.listName = listName;
    droppingListTemp.state = "hidden";
    droppingListTemp.elementsIds = [];

    //open-close elements below
    droppingListTemp.addEventListener("click",function(){
        if (droppingListTemp.state == "hidden"){
            verifyInfoAboutDropList(charName, listId);

            droppingListTemp.style.backgroundColor = "rgb(20, 20, 20)";
            droppingListTemp.style.color = "rgb(248, 248, 248)";
            //console.log(droppingListTemp.elementsIds.length);
            for (let i = 0; i < droppingListTemp.elementsIds.length; i++){
                document.getElementById(charName + "DropList" + listId + "Elem" + droppingListTemp.elementsIds[i]).style.display = "block";
                document.getElementById(charName + "DropList" + listId + "Elem" + droppingListTemp.elementsIds[i]).style.zIndex = "10";
            }
            document.getElementById(charName + "DropList" + listId + "Plus").style.display = "block";
            document.getElementById(charName + "DropList" + listId + "Plus").style.zIndex = "10";
            droppingListTemp.state = "shown";
        }
        else if (droppingListTemp.state == "shown"){
            updateInfoAboutDropList(charName, listId);

            droppingListTemp.style.backgroundColor = "rgb(223, 233, 230)";
            droppingListTemp.style.color = "rgb(20, 20, 20)";
            document.getElementById(charName + "DropList" + listId + "Plus").style.zIndex = "0";
            document.getElementById(charName + "DropList" + listId + "Plus").style.display = "none";
            //console.log(droppingListTemp.elementsIds.length);
            for (let i = 0; i < droppingListTemp.elementsIds.length; i++){
                document.getElementById(charName + "DropList" + listId + "Elem" + droppingListTemp.elementsIds[i]).style.zIndex = "0";
                document.getElementById(charName + "DropList" + listId + "Elem" + droppingListTemp.elementsIds[i]).style.display = "none";
            }
            console.log(charName + "DropList" + listId + "Elem" + droppingListTemp.elementsIds[droppingListTemp.elementsIds.length-1]);
            droppingListTemp.state = "hidden";
        }
    });

    droppingListContainer.appendChild(droppingListTemp);
    createDropListPlusElementButton(charName,listId);
}

function createDropListPlusElementButton(charName,listId){
    let dropListPlusElemButt = document.createElement("div");
    let droppingListContainer = document.getElementById(charName + "DropListContainer" + listId);
    let droppingList = document.getElementById(charName + "DropList" + listId);
    dropListPlusElemButt.id = charName + "DropList" + listId + "Plus";
    dropListPlusElemButt.classList.add("droppingListPlusButtonDesign");

    dropListPlusElemButt.contentEditable = false;
    dropListPlusElemButt.innerText = "+";
    dropListPlusElemButt.style.display = "none";

    dropListPlusElemButt.addEventListener("click", function(){
        let freeId = parseInt(0);
        let whilecondloc = true;
        while(whilecondloc){
            console.log(freeId);
            let counterEl = 0;
            for (let i = 0; i < droppingList.elementsIds.length; i++){
                counterEl+=1;
                if (droppingList.elementsIds[i] == String(freeId)){
                    freeId = freeId+1;
                    //console.log(freeId);
                    break;
                }
                /*if(i == droppingList.elementsIds.length - 1){
                    whilecondloc = false;
                    break;
                }*/
            }
            if(counterEl == droppingList.elementsIds.length){
                whilecondloc = false;
            }
        }
        addAnotherDropListElement(charName,listId,String(freeId));
        droppingList.elementsIds.push(String(freeId));
    })

    droppingListContainer.appendChild(dropListPlusElemButt);
}

function addAnotherDropListElement(charName,listId, elementId){
    let dropListElem = document.createElement("div");
    let droppingListContainer = document.getElementById(charName + "DropListContainer" + listId);
    let droppingList = document.getElementById(charName + "DropList" + listId);
    dropListElem.id = charName + "DropList" + listId + "Elem" + elementId;
    //console.log(dropListElem.id);
    dropListElem.classList.add("droppingListElementDesign");

    dropListElem.contentEditable = true;
    dropListElem.innerText = "";
    dropListElem.style.zIndex = "100";
    dropListElem.style.display = "block";

    //removing on clicking middle mouse button
    dropListElem.addEventListener('auxclick', function(e) {
        if (e.button == 1) {
            let indexToDelete = -1;
            for (let i = 0; i < droppingList.elementsIds.length; i++){
                if (droppingList.elementsIds[i] != elementId){
                    continue;
                }
                indexToDelete = i;
            }
            if (indexToDelete != -1){
                droppingList.elementsIds.splice(indexToDelete,1);
                dropListElem.remove();

                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET", serverAddress+"removeDropListElement?info="+encodeURIComponent(charName+"-`-"+listId+"_"+elementId), false);
                xmlHttp.send( null );
                
            }
        }
    })

    droppingListContainer.appendChild(dropListElem);
}


function updateInfoAboutDropList(charName, droppListId){
    // update info
    let droppingList = document.getElementById(charName + "DropList" + droppListId);

    // info how to find this droplist
    let infoToSend = String(charName);
    infoToSend +="-`-"+String(droppListId);
    // split
    infoToSend +="_";
    for (let i = 0; i < droppingList.elementsIds.length; i++){
        // element id to find one and text
        if (i != 0){
            infoToSend +="-`-";
        }
        infoToSend += String(droppingList.elementsIds[i]);
        infoToSend +="-`-"+String(document.getElementById(charName + "DropList" + droppListId + "Elem" + droppingList.elementsIds[i]).innerText);
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", serverAddress+"updateDropListInfo?info="+encodeURIComponent(infoToSend), false);
    xmlHttp.send( null );
}


function verifyInfoAboutDropList(charName, droppListId){
    // update info
    let droppingList = document.getElementById(charName + "DropList" + droppListId);

    let infoToSend = String(charName);
    infoToSend +="-`-"+String(droppListId);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", serverAddress+"getDropListInfo?info="+encodeURIComponent(infoToSend), false);
    xmlHttp.send( null );
    let serverResponse = xmlHttp.responseText;
    console.log(serverResponse);
    if(serverResponse == ""){
        return;
    }
    let paramArray = serverResponse.split("_");
    for(let i = 0; i < paramArray.length; i++){
        let exsist = false;
        let infoArrayParameters = paramArray[i].split("-`-");
        for (let i = 0; i < droppingList.elementsIds.length; i++){
            //find corresponding element
            if (droppingList.elementsIds[i] != infoArrayParameters[0]){
                continue;
            }
            //found if - check and change parameters
            exsist = true;
            let element = document.getElementById(charName + "DropList" + droppListId + "Elem" + droppingList.elementsIds[i]);
            if (element.innerText == infoArrayParameters[1]){
                continue;
            }
            element.innerText = infoArrayParameters[1];
        }
        if (exsist){
            continue;
        }
        //didnt find id that exist on server but not on page - create new with this text
        addAnotherDropListElement(charName,droppListId,infoArrayParameters[0]);
        droppingList.elementsIds.push(infoArrayParameters[0]);
        let element = document.getElementById(charName + "DropList" + droppListId + "Elem" + infoArrayParameters[0]);
        element.innerText = infoArrayParameters[1];
    }

    //check if element exsist on the page but not on a server - delete
    /*for (let i = 0; i < droppingList.elementsIds.length; i++){
        let deleteElYN = true;
        for(let j = 0; j < paramArray.length; j++){
            let infoArrayParameters = paramArray[j].split("-`-");
            if (droppingList.elementsIds[i] != infoArrayParameters[0]){
                continue;
            }
            deleteElYN = false;
        }
        if (deleteElYN){
            document.getElementById(charName + "DropList" + droppListId + "Elem" + droppListId.elementsIds[i]).remove();
            droppingList.elementsIds.splice(i,1);
        }

    }*/
}