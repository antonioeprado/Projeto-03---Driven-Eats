let check = false;
let count = 0;
const cardSelector = document.querySelectorAll(".card");
const button = document.querySelector("button");
button.setAttribute("disabled", "disabled");

cardSelector.forEach((element) => element.addEventListener("click", event => checkButton(event)));

function updateCheckoutButton(count) {
    let o = count !== 2 ? "os" : "mais um";
    let item = count !== 2 ? "itens" : "item";
    let valor = count !== 2 ? 3-count : "";

    if(count !== 3){
        button.innerText = `Selecione ${o} ${valor} ${item} \n para fechar o pedido.`;
    } else {
        button.innerText = "Fechar pedido.";
        button.removeAttribute("disabled");
        button.style.backgroundColor = "#32B72F";
    }
}


function checkButton(e) {
    const sectionSelector = (e.currentTarget.parentNode).querySelectorAll(".card");
    const cardSelected = e.currentTarget;
    
    
    sectionSelector.forEach(arguments => {
    if(arguments.id === "selected") {
        arguments.removeAttribute("id");
        check = false;
        count--;
        updateCheckoutButton(count);
    }
    });

    if(!check | count !== 0) {
        cardSelected.id = "selected";
        check = true;
        count++;
        updateCheckoutButton(count);
    }
}
