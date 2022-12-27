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
    console.log(product.colors);
    // On peut désormais introduir les éléments du produit dans leurs emplcements respectifs
    // On vise l'emplacement souhaité pour y introduir la bonne valeur du produit choisi

    const imageContainer = document.querySelector("div.item__img");
    const imageProduct = document.createElement("img");
    imageContainer.appendChild(imageProduct);
    imageProduct.setAttribute("src", product.imageUrl);

    document.getElementById("title").innerText = product.name;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = product.price;

    //Pour la couleur on utilise une boucle qui nous permet d'extraire chaque couleur du tableau "colors"
    for (let i = 0; i < product.colors.length; i++) {
      console.log(product.colors[i]);

      //Injection des éléments de couleur dans le DOM, en fonction de notre id de produit"

      const optionColors = document.getElementById("colors");
      let newsOptions = document.createElement("option");
      newsOptions.setAttribute("value", product.colors[i]);

      newsOptions.innerText = product.colors[i];
      optionColors.appendChild(newsOptions);
    }
  });

//---------------------Stockage des éléments choisis dans la page 'product' pour futur utilisation dans la page du panier-------------------

document.getElementById("addToCart").addEventListener("click", function () {

  // Je récupère mon panier dans le localstorage
  let arryrecup = localStorage.getItem("arrayProd");
  let array = JSON.parse(arryrecup);



  // S'il est vide j'ajoute mon article dans un tableau
  if (localStorage.length === 0) {
    // je mets à jour le localstorage

    //Variable du tableau qui contiendra nos produit selectionnés pour le localStorage (à destination du panier)
    let array = [];

    //Variable de l'objet choisi
    let objProduct = {
      id: idProduct,
      quantity: quantity.value,
      color: colors.value,
    };

    // On injecte notre 1er produit dans le tableau
    array.push(objProduct);

    //On envoi le tout dans le localStorage
    let arrayh = JSON.stringify(array);
    localStorage.setItem("arrayProd", arrayh);
    console.log(array.length);
    console.log("Nous ajoutons un 1er produit");
  }

  // S'il n'est pas vide, Je parcours mon panier pour trouver l'élement comportant l'id et la couleur de mon aricle
  else  {

    for (element of array) {
      console.log(element.id);
    }

    //Variable de l'objet choisi
    let objProduct = {
      id: idProduct,
      quantity: quantity.value,
      color: colors.value,
    };

    array.push(objProduct);
    console.log(array);

    let arrayUp = JSON.stringify(array);
    localStorage.setItem("arrayProd", arrayUp);
    console.log(`Nous ajoutons un nouveau produit au localStorage, il y a maintenant ${array.length} produits`);

  }



});
