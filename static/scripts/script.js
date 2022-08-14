let check = false;
let count = 0;
let nome, endereco;

const modal = document.querySelector("#modal");
const pratoModal = document.querySelector(".prato");
const bebidaModal = document.querySelector(".bebida");
const sobremesaModal = document.querySelector(".sobremesa");
const precoPratoModal = document.querySelector(".preco-prato");
const precoBebidaModal = document.querySelector(".preco-bebida");
const precoSobremesaModal = document.querySelector(".preco-sobremesa");
const precoTotalModal = document.querySelector(".preco-total");
const submitLink = document.querySelector("a");
const cancelButton = document.querySelector(".cancel");
const submitButton = document.querySelector(".submit");
const cardSelector = document.querySelectorAll(".card");
const cardList = [];
const button = document.querySelector("button");
button.setAttribute("disabled", "disabled");

cardSelector.forEach((element) => element.addEventListener("click", event => checkButton(event)));

function checkoutCart() {

    let prato, bebida, sobremesa, preco;

    nome = prompt("Digite seu nome: ");
    endereco = prompt("Digite seu endereço: ");    
    
    cardList.forEach((arguments) => {
        if(arguments["container-pratos"]) prato = arguments["container-pratos"].children;
        if(arguments["container-bebidas"]) bebida = arguments["container-bebidas"].children;
        if(arguments["container-sobremesas"]) sobremesa = arguments["container-sobremesas"].children;
    });

    pratoModal.innerText = prato.item(1).innerText;
    precoPratoModal.innerText = prato.item(3).innerText;
    bebidaModal.innerText = bebida.item(1).innerText;
    precoBebidaModal.innerText = bebida.item(3).innerText;
    sobremesaModal.innerText = sobremesa.item(1).innerText;
    precoSobremesaModal.innerText = sobremesa.item(3).innerText;

    preco = Number((precoPratoModal.innerText.slice(3)).replace(",", ".")) + Number((precoBebidaModal.innerText.slice(3)).replace(",", ".")) + Number((precoSobremesaModal.innerText.slice(3)).replace(",", "."));
    precoTotalModal.innerText = `R$ ${String(preco.toFixed(2)).replace(".", ",")}`;

    modal.style.display = "flex";

    if(nome, endereco !== null) {
        const mensagem = `Olá, gostaria de fazer o pedido:
        - Prato: ${pratoModal.innerText}
        - Bebida: ${bebidaModal.innerText}
        - Sobremesa: ${sobremesaModal.innerText}
        Total: ${precoTotalModal.innerText}
        
        Nome: ${nome}
        Endereço: ${endereco}`;
        const url = `https://wa.me/5532988770112?text=${encodeURIComponent(mensagem)}`;
        console.log(url)
        submitLink.setAttribute("href", url);
    }
}


function updateCheckoutButton(count) {

    let o = count !== 2 ? "os" : "mais um";
    let item = count !== 2 ? "itens" : "item";
    let contagem = count !== 2 ? 3-count : "";

    if(count !== 3){
        button.innerText = `Selecione ${o} ${contagem} ${item} \n para fechar o pedido.`;
    } else {
        button.innerText = "Fechar pedido.";
        button.removeAttribute("disabled");
        button.style.backgroundColor = "#32B72F";
        button.addEventListener("click", () => checkoutCart());
        cancelButton.addEventListener("click", () => modal.style.display = "none")
        
    }
}


function checkButton(e) {

    const sectionSelector = (e.currentTarget.parentNode).querySelectorAll(".card");
    const section = e.currentTarget.parentNode.parentNode.className;
    const cardSelected = e.currentTarget;  
    let cardObj = {};
    cardObj[section] = cardSelected;  
    
    sectionSelector.forEach(arguments => {
    if(arguments.className.includes("selected")) {
        arguments.classList.remove("selected");
        check = false;
        cardList.splice(cardList.findIndex((arguments) => arguments[section]), 1);
        count--;
        updateCheckoutButton(count);
    }
    });

    if(!check | count !== 0) {
        cardSelected.classList.add("selected");
        check = true;
        cardList.push(cardObj);
        count++;
        updateCheckoutButton(count);
    }
}

