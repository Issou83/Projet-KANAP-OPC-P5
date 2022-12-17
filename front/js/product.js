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
    //Boucle nous permettant d'extraire chaque element du tableau "products"
    console.log(product);
    console.log(product.name);
    console.log(product.description);
    console.log(product.price);
    console.log(product.imageUrl);
    
    //On peut désormais introduir les éléments du produit dans la page
    //On vise l'emplacement souhaité poue y introduir la bonne variable


  
  });
