//On récupere l'id dans l'url de la page
const idUrl = window.location.search
console.log(idUrl);


//...cette id contient un "?" qu'il faut supprimer pour l'affichage 
const orderId = idUrl.slice(1)
console.log(orderId);

document.getElementById("orderId").innerHTML = orderId


//On vide le localStorage pour effectuer un mise à zero de la session utilisateur
localStorage.clear()