//Recuperation produits du le localStorage
let arrayRecup = localStorage.getItem("arrayProd");
let objJson = JSON.parse(arrayRecup);


for (i = 0; i < objJson.length; i++) {
console.log(objJson[i].id)
}
