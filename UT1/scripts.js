function add_item(idBtn,idInput){
    const button= document.createElement("a");
    const input= document.getElementById(idInput).value;
    button.setAttribute("class","btn btn-primary added-card");
    button.innerHTML= input;
    const btn= document.getElementById(idBtn);
    btn.before(button)
}


function normal_card(elem)
{
    const parent= elem.parentElement;
    while(parent.className=!"card-body"){
        parent=parent.parentElement;
    }
    parent.children[1].style=null;
    //const addCard = document.getElementById(elem);
    //addCard.style=null;
}
function newCard(elem){
    const buttonDiv= document.getElementById(elem);
    const card= document.getElementsByClassName("card");
    const newCard= card.item(1).cloneNode(true);
    const div= document.createElement("div");
    div.className="col-sm-4";
    setAtrributes(newCard);
    buttonDiv.before(div);
    div.appendChild(newCard);
}

function setAtrributes(elem){
    const input= document.getElementById("input-newList");  
    const actual= elem;
    const newCardChild= actual.children;
    console.log(actual);
    if(actual.className=="card"){
        setAtrributes(newCardChild[0]);
    }
    if(actual.className=="card-body"){
        newCardChild[0].innerHTML= input.value;
        newCardChild[1].id= "addCard-"+input.value;
        newCardChild[1].setAttribute("href",`#collapse-${input.value}`);
        newCardChild[1].setAttribute("aria-controls",`collapse-${input.value}`);
        newCardChild[2].id="collapse-"+input.value;
        setAtrributes(newCardChild[2]);
    }
    if(actual.className=="collapse"){
        setAtrributes(newCardChild[0]);
    }
    if(actual.className=="row input-div"){
        newCardChild[1].children[0].id= `${input.value}-add`; 
        newCardChild[2].children[0].setAttribute("href",`#collapse-${input.value}`);
        newCardChild[2].children[0].setAttribute("aria-controls",`collapse-${input.value}`);
    }

}