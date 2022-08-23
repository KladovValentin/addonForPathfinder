
function constructCurrencyField(charName){
    let currencyField = document.createElement("div");
    currencyField.id = charName + "currencyField";
    currencyField.classList.add("currencyFieldDesign");
    currencyField.contentEditable = true;

    let tempCharacter = document.getElementById(charName+"CharPage");
    currencyField.innerText = tempCharacter.money;
    console.log(tempCharacter.money);

    currencyField.addEventListener("mouseleave",function(){
        tempCharacter.money = currencyField.innerText;
        updateCharacterParameters(charName);
    });

    tempCharacter.appendChild(currencyField);
}