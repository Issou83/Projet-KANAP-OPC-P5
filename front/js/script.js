//Envoi d'une requête HTTP de type GET au service web
fetch("http://localhost:3000/api/products")
//Récupération du tableau "products" au format json
.then((data) => data.json())
//Récupèration des données 
.then((products) => {
//Boucle nous permettant d'extraire chaque element du tableau "products"
for (let product of products) {
  console.log(product)
//Injection des éléments dans le DOM
document.getElementById("items").innerHTML += 
 (`<a href="./product.html?id=42">
<article>
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  <h3 class="productName">${product.name}</h3>
  <p class="productDescription">${product.description}</p>
</article>
</a>`)
}}
)

