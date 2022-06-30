

function constructQuickBarPanel(){
    let quickBar = document.createElement("div");
    quickBar.classList.add("quickBar");
    //quickBar.innerHTML = "I am quick bar";
    quickBar.id = "quickBar";
    document.body.appendChild(quickBar);
}

function addCellsToQuickBar(){
    for (let i = 0; i < 9; i++){
        let box1 = document.createElement("img");
        box1.classList.add("quickBarCells");
        box1.src = "images/equipBox.jpg";
        box1.id = "quickBarCell" + i.toString();
        document.getElementById("quickBar").appendChild(box1);
    }
}

function constructQuickBar(){
    constructQuickBarPanel();
    addCellsToQuickBar();
}