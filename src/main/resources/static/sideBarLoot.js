

//create div box with id

//create button with id

//create animation in .css file and move simultaniously button and box  

function createOpenCloseSideBarSwitch(){
    let sideBarLootOpenClose = document.getElementById("sideBarOpenClose");

    sideBarLootOpenClose.style.right = "0%";
    sideBarLootOpenClose.style.top = "20px";
    sideBarLootOpenClose.innerHTML = "&lt;";

    sideBarLootOpenClose.addEventListener("mouseenter",function(){
        let sideBarLoot = document.getElementById("sideBarLoot");
        console.log(sideBarLoot.getBoundingClientRect().left);
        if(sideBarLootOpenClose.innerHTML == "&gt;"){
            sideBarLoot.style.transform += 'translateX('+100+'%)';
            sideBarLootOpenClose.innerHTML = "&lt;";
            //sideBarLootOpenClose.style.left = sideBarLoot.getBoundingClientRect().left-20+200 +'px';
            sideBarLootOpenClose.style.right = '0%';
            //sideBarLootOpenClose.transform += 'translateX('+200+'px)';
        }
        else if(sideBarLootOpenClose.innerHTML == "&lt;"){
            sideBarLoot.style.transform += 'translateX(-'+100+'%)';
            sideBarLootOpenClose.innerHTML = "&gt;";
            //sideBarLootOpenClose.style.left = sideBarLoot.getBoundingClientRect().left-20-200 +'px';
            sideBarLootOpenClose.style.right = '20%';
            //sideBarLootOpenClose.transform += 'translateX(-'+200+'px)';
        }
        console.log(sideBarLootOpenClose.style.right);
    });
}


function createLootBox(){
    //define box itself parameters - coordinates, position, image, width
    let box1 = document.createElement("img");
    box1.classList.add("lootChest");
    box1.id = "lootChest"+"1";
    box1.src = "images/treasureChestOpened.png";
    let sideBarLoott = document.getElementById("sideBarLoot");
    sideBarLoott.appendChild(box1);

    box1.addEventListener("click", function(){
        if (box1.src.includes("Opened")){
            box1.src = "images/treasureChestClosed1.png";
        }
        else if (box1.src.includes("Closed")){
            box1.src = "images/treasureChestOpened.png";
        }
    });
}

function createTextBox(){
    //define box itself parameters - coordinates, position, image, width
    let box1 = document.createElement("div");
    box1.classList.add("sideBartextBox");
    box1.id = "sbTextBox"+"1";
    
    let infoToSend =     "To fix description of the item - press MMB or hold 3s";
    infoToSend +="<br><br>"+ "To equip - drag an item to the quipment/quickbar socket";
    infoToSend +="<br><br>"+ "After that you can equip/unequip via context menu";
    infoToSend +="<br><br>"+ "You can transfer an item to another char/type";
    infoToSend +="<br><br>"+ "by dragging it to char icon / type button";
    infoToSend +="<br><br>"+ "But try to drag it only from inventory section";
    infoToSend +="<br><br>"+ "To delete roll note - press MMB";
    infoToSend +="<br><br>"+ "There are some other minor features";
    infoToSend +="<br><br>"+ "If you face any problem - try refreshing a page";

    box1.innerHTML = infoToSend;

    let sideBarLoott = document.getElementById("sideBarLoot");
    sideBarLoott.appendChild(box1);
}


createOpenCloseSideBarSwitch();
createLootBox();
createTextBox();