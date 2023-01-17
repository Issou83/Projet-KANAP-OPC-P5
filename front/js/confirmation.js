//On récupere l'id dans l'url de la page
const Url = window.location.search

//...cette id contient un "?" qu'il faut supprimer pour l'affichage 
const orderId = Url.slice(1)
document.getElementById("orderId").innerHTML = orderId


