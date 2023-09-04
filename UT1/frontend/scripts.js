const formGet= document.getElementById("getUser");
const formPost = document.getElementById("postUser");

formGet.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const id = e.target.id.value;
    let message="";    
    await fetch(`http://127.0.0.1:3000/user/${id}`).then((response)=> response.json()).then((data)=>{
        const p = document.createElement("p");
        if(data.message){
            message= "User not found";
        }
        else{
            message = `ID: ${data.id} | Name: ${data.first_name} | LastName: ${data.last_name} | Age: ${data.age}`;
        }
        document.getElementById("getText").innerHTML= message;
    });
});

formPost.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const age = e.target.age.value;
    let message= '';
    await fetch(`http://127.0.0.1:3000/user/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({first_name:firstName, last_name: lastName, age: age}),
    }).then((response)=>response.json()).then((data)=>{
        message= data.message;
    });
    document.getElementById("postText").innerHTML= message;
});





function add_item(elem){
    const input= elem.parentElement.previousElementSibling.firstElementChild;
    const button= document.createElement("a");
    button.setAttribute("class","btn btn-primary added-card");
    button.innerHTML= input.value;
    button.setAttribute("draggable","true");
    button.setAttribute("ondragstart","drag(event);");
    button.id= "drag1";

    const createdModal= createModal(button,input.value);
    const addBtn= elem.parentElement.parentElement.parentElement.previousElementSibling;
    addBtn.before(button);
    button.after(createdModal);
    /*const button= document.createElement("a");
    button.setAttribute("class","btn btn-primary added-card");
    button.innerHTML= input;
    const btn= document.getElementById(idBtn);
    btn.before(button)*/
}
function createModal(button, input){
    const modal= document.getElementById("exampleModal").cloneNode(true);
    console.log(modal);
    modal.id=`modal-${input}`;
    modal.setAttribute("aria-labelledby",`${input}ModalLabel`);
    modal.getElementsByClassName("modal-title")[0].id=`${input}ModalLabel`;
    modal.getElementsByClassName("modal-title")[0].innerHTML=input;
    button.setAttribute("data-bs-toggle","modal");
    button.setAttribute("data-bs-target",`#modal-${input}`);
    return modal;
}


function normal_card(elem)
{
    let parent= elem.parentElement;
    if(elem.id=="newList-close"){
        while(parent.id!="newList-div"){
            parent= parent.parentElement;
        }
        parent.lastElementChild.previousElementSibling.style="null";
        return;
    }

    if(elem.id=="close-card-btn"){      
        while(parent.className!="card-body"){
            parent= parent.parentElement;
        }
        parent.lastElementChild.previousElementSibling.style="null";
        return;
    }

    //const addCard = document.getElementById(elem);
    //addCard.style=null;
}
function newCard(elem){
    const buttonDiv= document.getElementById(elem);
    const card= document.getElementsByClassName("card");
    const newCard= card.item(1).cloneNode(true);
    const div= document.createElement("div");
    div.className="col-sm-4";
    setAtributes(newCard);
    buttonDiv.before(div);
    div.appendChild(newCard);
}

function setAtributes(elem){
    const input= document.getElementById("input-newList");  
    const actual= elem;
    const newCardChild= actual.children;
    console.log(actual);
    if(actual.className=="card"){
        setAtributes(newCardChild[0]);
    }
    if(actual.className=="card-body"){
        actual.getElementsByClassName("card-title")[0].innerHTML= input.value;
        const btn= actual.lastElementChild.previousElementSibling;
        btn.id= "addCard-"+input.value;
        btn.setAttribute("href",`#collapse-${input.value}`);
        btn.setAttribute("aria-controls",`collapse-${input.value}`);
        newCardChild[2].id="collapse-"+input.value;
        const elements= Array.from(actual.getElementsByClassName("added-card"));
        elements.forEach(elem => {
            elem.remove();
        });
        /*const optionsBtn= actual.getElementsByClassName("options-btn")[0];
        optionsBtn.setAttribute("role","button");
        optionsBtn.setAttribute("data-bs-toggle","dropdown");
        optionsBtn.setAttribute("aria-expanded","false");
        optionsBtn.setAttribute("href","#");*/

        setAtributes(newCardChild[2]);
    }
    if(actual.className=="collapse"){
        setAtributes(newCardChild[0]);
    }
    if(actual.className=="row input-div"){
        newCardChild[1].children[0].id= `${input.value}-add`; 
        newCardChild[2].children[0].setAttribute("href",`#collapse-${input.value}`);
        newCardChild[2].children[0].setAttribute("aria-controls",`collapse-${input.value}`);
    }
}
function removeCard(elem){
    let actual= elem.parentElement;
    while(actual.className!="card"){
        actual= actual.parentElement;
    }
    actual.parentElement.remove();
}

function saveDescription(elem){
    const input= elem.previousElementSibling.value;
    const rootDiv= elem.parentElement.parentElement;
    console.log(rootDiv.className);
    const p= document.createElement("p");
    rootDiv.firstElementChild.style.display= "none";
    p.innerHTML=input;
    p.setAttribute("class","description-p");
    rootDiv.appendChild(p);
    if(input===""){
        elem.parentElement.previousElementSibling.style.display="flex";
        rootDiv.parentElement.getElementsByClassName("editDescription-btn")[0].style.display="none";
    }
    else{
        rootDiv.parentElement.getElementsByClassName("editDescription-btn")[0].style.display="flex";
    }
}
function editDescription(elem){

    modalDescription= elem.parentElement.parentElement;
    const input= modalDescription.getElementsByClassName("input-description")[0].value;
    const p= modalDescription.getElementsByClassName("description-p")[0].remove();
}
function changeBackground(){

    getInfo();

}
async function getInfo()
{
    const url = 'https://dad-jokes.p.rapidapi.com/random/joke/png';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cb7be6f2damsh84f60806c140067p176f29jsn1c69aed2287d',
		'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
	}
};
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        const imgData= data.body.image;
        const img= document.createElement("img");
        img.setAttribute("src",imgData);
        img.style.backgroundColor="white";
        img.style.width="50vw";

        const div= document.createElement("div");
        
        div.className="col-sm-4 joke-div";
        div.appendChild(img);
        
        document.getElementById("main").lastElementChild.after(div);
        //console.log(payload);
        } catch (error) {
        console.error(error);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
  }

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);

}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}