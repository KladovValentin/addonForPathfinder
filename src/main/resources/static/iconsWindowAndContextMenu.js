
class customItemContextMenu {
    constructor() {
      this.enactingItemId = -1;
    }
}
class customCharImageContextMenu {
  constructor() {
    this.enactingCharName = "a";
  }
}

class changeIconWindowClass {
  constructor() {
    this.activationParameter = -1;
  }
}


function removeItem(tempItem){
    var infoToSend = String(tempItem.itemId);
    //remove occupation of equipment
    if (tempItem.equipped){
      let charPageName = tempItem.whoseItemIs + "CharPage";
      let boxid = transformItemSecTypeToBoxId(charPageName, tempItem);
      document.getElementById(boxid).occupied = false;
      document.getElementById(boxid).occupationItemId = 0;
    }
    //remove from item list
    removeFromListById(tempItem.itemId);
    //remove from page
    tempItem.remove();
    //remove description if any
    if (document.getElementById("tempDesc")){
      document.getElementById("tempDesc").remove();
    }
    //remove on server
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", serverAddress+"removeItem?info="+encodeURIComponent(infoToSend), false);
    xmlHttp.send( null );
}
  
function handleChangingItemIcon(activationParameter){
    const changeItemIconWindow = document.getElementById("changeItemIconWindow");
    changeItemIconWindow.activationParameter = activationParameter;
    changeItemIconWindow.classList.add("visible1");
    if (activationParameter == 1){
      for(let i = 0; i < itemIconsFileList.length; i++){
        document.getElementById("changeItemIconItem"+String(i)).style.display = "block";
      }
    }
    else if (activationParameter == 2){
      for(let i = 0; i < charIconsFileList.length; i++){
        document.getElementById("changeCharIconItem"+String(i)).style.display = "block";
      }
    }
}
  
  //function that transform secondary item type to prospective equipment box id
function transformItemSecTypeToBoxId(charPageName, newItem){
    let sectype = newItem.itemSecondaryType;
    let equipmentBoxId = charPageName;
    let charpage = document.getElementById(newItem.whoseItemIs + "CharPage");
    for (let i = 0; i < charpage.socketsIds.length; i++){

      if(sectype == charpage.socketsTypes[i]){

        //check on several sockets of the same type - occupied / not occupied
        let boxOfEquipmentExtra = document.getElementById(equipmentBoxId + charpage.socketsIds[i]);
        if(i+1<charpage.socketsIds.length && boxOfEquipmentExtra.occupied && boxOfEquipmentExtra.occupationItemId != newItem.itemId){
          if(charpage.socketsTypes[i+1] == charpage.socketsTypes[i]){
            continue;
          }
        }

        return equipmentBoxId + charpage.socketsIds[i];
      }
    }
    return "none";
}
  
function equipUnequipItemBase(newItemId){
  let newItem = items[newItemId];
  if (newItem.itemSecondaryType == "quickBar"){
    
    // just unequip
    if (newItem.equipped){
      
      //find slot where it is and free it
      let charpage = document.getElementById(newItem.whoseItemIs + "CharPage");
      for (let i = 0; i < 9; i++){
        if (charpage.quickBarItemIds[i] != newItem.itemId){
          continue;
        }
        charpage.quickBarFill[i] = false;
        charpage.quickBarItemIds[i] = -1;
        break;
      }
        
      //find a cell in inventory to place item in
      currentPage = newItem.itemType;
      newItem.itemCell = findFreeCell();
      currentPage = newItem.itemType;
    }
      
    //just equip
    else if (!newItem.equipped){
      //find first free slot
      let boxid = -1;
      for (let i = 0; i < 9; i++){
        let charpage = document.getElementById(newItem.whoseItemIs + "CharPage");
        if (charpage.quickBarFill[i] == false){
          boxid = i;
          charpage.quickBarFill[i] = true;
          charpage.quickBarItemIds[i] = newItem.itemId;
          break;
        }
      }     
      //check if id or type is correct
      if (boxid == -1){
        alert("no free slot available!"); 
        return;
      }
    }

    newItem.equipped = newItem.equipped ? false : true;
    placeItemsInCells();
    displayOnlyThisType(currentPage);
    return;
  }



    //get box id according to type
    let charPageName = newItem.whoseItemIs + "CharPage";
    let boxid = transformItemSecTypeToBoxId(charPageName, newItem);
    //check if id or type is correct
    console.log(boxid);
    if (boxid == "none"){
      alert("equipment subtype is not valid!"); 
      return;
    }

    //_________equip or unequip____________\\

    let boxOfEquipment = document.getElementById(boxid);
  
    //ocuppied - unequip one that occupies
    if (boxOfEquipment.occupied == true && !newItem.equipped){
      newItem.equipped = newItem.equipped ? false : true;
      let currentPaget = currentPage;
      currentPage = newItem.itemType;
      items[findIndexInItems(boxOfEquipment.occupationItemId)].itemCell = findFreeCell();
      currentPage = currentPaget;
      newItem.equipped = newItem.equipped ? false : true;
      items[findIndexInItems(boxOfEquipment.occupationItemId)].equipped = false;
      updateItemInfo(findIndexInItems(boxOfEquipment.occupationItemId));
    }
  
    //change occupation. If it is being unequiped - it will be placed in cells automatically each second
    boxOfEquipment.occupied = false;
    if (!newItem.equipped){
      boxOfEquipment.occupied = true;
      if (newItem.itemSecondaryType != "quickBar"){
        boxOfEquipment.occupationItemId = newItem.itemId;
      }
      newItem.style.top = boxOfEquipment.getBoundingClientRect().top + 'px';
      newItem.style.left = boxOfEquipment.getBoundingClientRect().left +'px';
    }


    //change cell on first free without equipped on the appropriate page
    currentPage = newItem.itemType;
    newItem.itemCell = findFreeCell();
    console.log(newItem.itemCell);
    currentPage = newItem.itemType;

    newItem.equipped = newItem.equipped ? false : true;

    placeItemsInCells();
    displayOnlyThisType(currentPage);
}
function equipUnequipItem(newItemId){
  let newItem = items[newItemId];
  equipUnequipItemBase(newItemId);
  updateItemInfo(findIndexInItems(newItem.itemId));
}

function splitItemAmount(newItemId){
  let newItem = items[newItemId];
  let inputField = document.createElement("div");
  inputField.contentEditable = true;
  inputField.classList.add("inputField");
  inputField.innerText = String(Math.floor(newItem.itemAmount/2));
  document.querySelector("body").appendChild(inputField);

  let confirmField = document.createElement("div");
  confirmField.classList.add("confirmField");
  confirmField.innerText = "confirm";
  confirmField.addEventListener('click',function(){
    constructNewItem(newItem.itemIconSrc, findFreeCell());
    items[items.length-1].itemName = newItem.itemName;
    items[items.length-1].itemIconSrc = newItem.itemIconSrc;
    items[items.length-1].itemDescription = newItem.itemDescription;
    items[items.length-1].itemAmount = parseInt(inputField.innerText);
    items[items.length-1].itemSecondaryType = newItem.itemSecondaryType;
    
    newItem.itemAmount -= parseInt(inputField.innerText);

    updateItemInfo(findIndexInItems(newItem.itemId));
    constructNewItemOnServer(items.length - 1);
    inputField.remove();
    confirmField.remove();
    cancelField.remove();
  });
  document.querySelector("body").appendChild(confirmField);

  let cancelField = document.createElement("div");
  cancelField.classList.add("cancelField");
  cancelField.innerText = "cancel";
  cancelField.addEventListener('click',function(){
    inputField.remove();
    confirmField.remove();
    cancelField.remove();
  });
  document.querySelector("body").appendChild(cancelField);
}

function preCreateItemContextMenu(){
  let contextMenut = document.getElementById("itemPrimaryContext-menu");
  contextMenut.classList.add("customItemContextMenu");
  contextMenut.enactingItemId = -1;
  const deleteItemButton = document.getElementById("deleteItemButton");
  const equipItemButton = document.getElementById("equipItemButton");
  const changeIconItemButton = document.getElementById("changeIconItemButton");
  const SplitItemButton = document.getElementById("SplitItemButton");

  //_________________deleting listener
  deleteItemButton.addEventListener("click", function(){
    let contextMenu = document.getElementById("itemPrimaryContext-menu");
    let newItem = items[findIndexInItems(contextMenu.enactingItemId)];
    contextMenu.classList.remove("visible");
    removeItem(newItem);
  });

  //_________________equipping listener
  equipItemButton.addEventListener("click", function(){
    let contextMenu = document.getElementById("itemPrimaryContext-menu");
    let newItem = items[findIndexInItems(contextMenu.enactingItemId)];
    let newItemId = findIndexInItems(contextMenu.enactingItemId);
    //delete context menu
    contextMenu.classList.remove("visible");
    //remove description if any
    if (document.getElementById("tempDesc")){
      document.getElementById("tempDesc").remove();
    }
    equipUnequipItem(newItemId);
  });

  //_________________change icon listener
  changeIconItemButton.addEventListener("click", function(){
    let contextMenu = document.getElementById("itemPrimaryContext-menu");
    contextMenu.classList.remove("visible");
    handleChangingItemIcon(1);
  });

  //_________________split listener
  SplitItemButton.addEventListener("click", function(){
    let contextMenu = document.getElementById("itemPrimaryContext-menu");
    contextMenu.classList.remove("visible");
    let newItemId = findIndexInItems(contextMenu.enactingItemId);
    splitItemAmount(newItemId);
  });
}

function preCreateCharImageContextMenu(){
  let contextMenut = document.getElementById("imageCharacterContext-menu");
  contextMenut.classList.add("customCharImageContextMenu");
  contextMenut.enactingImageId = -1;
  const changeImageCharacterButton = document.getElementById("changeImageCharacterButton");

  //_________________change icon listener
  changeImageCharacterButton.addEventListener("click", function(){
    let contextMenu = document.getElementById("imageCharacterContext-menu");
    contextMenu.classList.remove("visible");
    handleChangingItemIcon(2);
  });
}

// on load make this function to handle changing item icons window
function createItemIcons(){

    // get file names of icons (without image/)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", serverAddress+"getItemIconFileNames", false);
    xmlHttp.send( null );
    var serverResponse = xmlHttp.responseText;
    let fileNames = serverResponse.split("-`-");
    for(let i = 0; i < fileNames.length; i++){
      itemIconsFileList.push(fileNames[i]);
    }
    let xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.open( "GET", serverAddress+"getCharIconFileNames", false);
    xmlHttp2.send( null );
    let serverResponse1 = xmlHttp2.responseText;
    let fileNames1 = serverResponse1.split("-`-");
    for(let i = 0; i < fileNames1.length; i++){
      charIconsFileList.push(fileNames1[i]);
    }

    // create image icons
    let changeItemIconWindow = document.getElementById("changeItemIconWindow");
    changeItemIconWindow.classList.add("changeIconWindowClass");
    changeItemIconWindow.activationParameter = -1;
    for(let i = 0; i < itemIconsFileList.length; i++){
      let icont = document.createElement("img");
      icont.classList.add("itemIcon");
      icont.id = "changeItemIconItem"+String(i);
      icont.src = "images/items/" + itemIconsFileList[i];
      icont.style.display = "none";

      icont.style.top = String(5.5+(i-i%9)/9*20) + '%';
      icont.style.left = String(1.5+(i%9)*11) + '%';

      changeItemIconWindow.appendChild(icont);

      //add event listeners to them to change icons
      icont.addEventListener("click", function(){
        let changeItemIconWindowt = document.getElementById("changeItemIconWindow");
        let contextMenu = document.getElementById("itemPrimaryContext-menu");
        let locItem = items[findIndexInItems(contextMenu.enactingItemId)];
        locItem.src = icont.src;
        locItem.itemIconSrc = icont.src;
        updateItemInfo(findIndexInItems(locItem.itemId));
        for(let j = 0; j < itemIconsFileList.length; j++){
          document.getElementById("changeItemIconItem"+String(j)).style.display = "none";
        }
        changeItemIconWindow.classList.remove("visible1");
      });
    }
    for(let i = 0; i < charIconsFileList.length; i++){
      let icont = document.createElement("img");
      icont.classList.add("itemIcon");
      icont.id = "changeCharIconItem"+String(i);
      let sourcet = "images/chars/" + charIconsFileList[i];
      icont.src = "images/chars/" + charIconsFileList[i];
      icont.style.display = "none";

      icont.style.top = String(5.5+(i-i%9)/9*20) + '%';
      icont.style.left = String(1.5+(i%9)*11) + '%';

      changeItemIconWindow.appendChild(icont);

      //add event listeners to them to change icons
      icont.addEventListener("click", function(){
        let contextMenu = document.getElementById("imageCharacterContext-menu");
        let locImage = document.getElementById(contextMenu.enactingCharName + "CharPage" + "Image");
        let locCharPage = document.getElementById(contextMenu.enactingCharName + "CharPage");
        locImage.src = sourcet;
        console.log(sourcet);
        locCharPage.charImage = sourcet;
        placeItemsInCells();
        updateCharacterParameters(contextMenu.enactingCharName);
        for(let j = 0; j < charIconsFileList.length; j++){
          document.getElementById("changeCharIconItem"+String(j)).style.display = "none";
        }
        changeItemIconWindow.classList.remove("visible1");
      });
    }

    //_________________quiting window listener
    closeBut = document.getElementById("changeItemIconWindowCloseButt");
    closeBut.addEventListener("click", function(){
      for(let i = 0; i < itemIconsFileList.length; i++){
        document.getElementById("changeItemIconItem"+String(i)).style.display = "none";
      }
      for(let i = 0; i < charIconsFileList.length; i++){
        document.getElementById("changeCharIconItem"+String(i)).style.display = "none";
      }
      changeItemIconWindow.classList.remove("visible1");
    });


}
