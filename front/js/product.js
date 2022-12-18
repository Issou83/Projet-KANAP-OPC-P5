//On recupére l'URL de la page courante
var str = window.location.href;
//On peut ensuite en extraire l'id du produit concerné, dans la partie paramétres de l'URL
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);

//Envoi d'une requête HTTP de type GET au service web
fetch("http://localhost:3000/api/products/" + idProduct)
  //Récupération des données du "product" au format json
  .then((dataProduct) => dataProduct.json())
  //Récupèration des données
  .then((product) => {
    console.log(product);
    console.log(product.name);
    console.log(product.description);
    console.log(product.price);
    console.log(product.imageUrl);

    // On peut désormais introduir les éléments du produit dans leurs emplcements respectifs
    // On vise l'emplacement souhaité pour y introduir la bonne valeur de product

    document.querySelector('.item__img').innerHTML = (`<img src="${product.imageUrl}" alt="${product.altText}">`);
    document.getElementById("title").innerText = product.name;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = product.price;

  });



