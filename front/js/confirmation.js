//Récuperation de l'id dans l'url de la page
var str = window.location.href;
var url = new URL(str);
var orderId = url.searchParams.get("id");


document.getElementById("orderId").innerHTML = orderId


