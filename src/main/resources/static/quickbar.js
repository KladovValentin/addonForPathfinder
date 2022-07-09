

function constructQuickBarPanel(){
    let quickBar = document.createElement("div");
    quickBar.classList.add("quickBar");
    //quickBar.innerHTML = "I am quick bar";
    quickBar.id = "quickBar";
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    quickBar.style.height = 4*windowWidth/windowHeight/0.9 + "%";
    document.body.appendChild(quickBar);
}

function addCellsToQuickBar(){
    for (let i = 0; i < 9; i++){
        let box1 = document.createElement("img");
        box1.classList.add("quickBarCells");
        box1.classList.add("equipmentBoxClass");
        box1.src = "images/equipBox.jpg";
        box1.id = "quickBarCell" + i.toString();
        box1.style.left = 2 + i*8 + i*3 + "%";
        box1.style.bottom = "5%";
        box1.hoverYN = false;
        box1.occupied = false;
        box1.occupationItemId = -1;
        document.getElementById("quickBar").appendChild(box1);

        //adding event listener with description
        box1.addEventListener("mouseenter", function(){
            if(document.getElementById("tDCharacterPage")){
                document.getElementById("tDCharacterPage").remove();
            }
            let top = -30;
            let left = -7+i*11.45;
            let boxWidth = 9;
            document.getElementById("quickBar").appendChild(constructEquipmentBoxName("quick"+String(i+1),top,left,boxWidth));

            box1.addEventListener("mouseleave", function(){
                if(document.getElementById("tDCharacterPage")){
                    document.getElementById("tDCharacterPage").remove();
                }
            });
        });

        // dragging
        box1.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        box1.addEventListener("drop", (event) => {
            event.preventDefault();
            box1.hoverYN = true;
        });
        box1.addEventListener("mouseleave",function(){
            box1.hoverYN = false;
        });
    }
}

function constructQuickBar(){
    constructQuickBarPanel();
    addCellsToQuickBar();
}