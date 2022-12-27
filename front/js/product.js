//On recupére l'URL de la page courante
var str = window.location.href;
//On peut ensuite en extraire l'id du produit concerné, dans la partie paramétres de l'URL
var url = new URL(str);
var idProduct = url.searchParams.get("id");

//Envoi d'une requête HTTP de type GET au service web
fetch("http://localhost:3000/api/products/" + idProduct)
  //Récupération des données du "product" au format json
  .then((dataProduct) => dataProduct.json())

  //Récupèration des données
  .then((product) => {
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
      quantity: parseInt(document.getElementById("quantity").value),
      color: document.getElementById("colors").value,
    };

    // On injecte notre 1er produit dans le tableau
    array.push(objProduct);

    //On envoi le tout dans le localStorage
    let arrayh = JSON.stringify(array);
    localStorage.setItem("arrayProd", arrayh);
  }

  // S'il n'est pas vide, Je parcours mon panier pour trouver l'élement comportant l'id et la couleur de mon aricle
  else {
    /*On initialise un marqueur(temoin) qui nous servira de temoin pour l'etat de notre condition: 
    -> Si le produit (par son id et sa couleur) est deja dans le localstorage = on incremente sa quantité*/
    var found = false;
    //On parcour le tableau deja existant
    for (i = 0; i < array.length; i++) {
      //Si l' id et la couleur son present... 
      if (
        array[i].id == idProduct &&
        array[i].color == document.getElementById("colors").value
      ) {
        //...alors, on increment
        array[i].quantity += parseInt(
          document.getElementById("quantity").value
        );
        //...nous pouvons renvoyer le tableau dans le localstorage
        let arrayh = JSON.stringify(array);
        localStorage.setItem("arrayProd", arrayh);
        //Puisque notre condition est remplie, notre marqueur passe a true
        found = true;
      }
    }
    //Si notre marqueur est sur false, alors cela veut dire que notre produit (par son id et sa couleur) n'est pas present
    //-->dans ce cas on le rajooute en plus au tableau
    if (found == false) {
      let objProduct = {
        id: idProduct,
        quantity: parseInt(document.getElementById("quantity").value),
        color: document.getElementById("colors").value,
      };

      // On injecte un produit supplementaire dans le tableau
      array.push(objProduct);

      //On envoi le tout dans le localStorage
      let arrayh = JSON.stringify(array);
      localStorage.setItem("arrayProd", arrayh);
    }
  }
});
