function openNav(){
    document.getElementById("myNavBar").style.width = "12%";
    const main= document.getElementById("main");
    main.style.marginLeft = "12%"
    main.style.width="88%"

    const cabecera= document.getElementById("cabecera");
    cabecera.style.marginLeft="12%"
    cabecera.style.width= "78%";
    /*alert("Hello World!");*/
}
function hola(){
    alert("Hello World!");

}

function closeNav(){
    document.getElementById("myNavBar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    const cabecera= document.getElementById("cabecera");
    cabecera.style.marginLeft="0";
    cabecera.style.width="90%";

}