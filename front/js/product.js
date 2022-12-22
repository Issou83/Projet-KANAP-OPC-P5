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
    // On vise l'emplacement souhaité pour y introduir la bonne valeur de product

    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altText}">`;
    document.getElementById("title").innerText = product.name;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = product.price;

    //Pour la couleur on utilise un boucle qui nous permettant d'extraire chaque couleur du tableau "colors"
    for (let i = 0; i < product.colors.length; i++) {
      console.log(product.colors[i]);

      //Injection des éléments de couleur dans le DOM, en fonction de notre id de produit"

      const optionColors = document.getElementById("colors");
      let newsOptions = document.createElement("option");
      newsOptions.setAttribute(`value`, product.colors[i]);

      newsOptions.innerText = product.colors[i];
      optionColors.appendChild(newsOptions);
    }

    //Stockage des éléments choisis dans la page 'product' pour futur utilisation dans la page du panier

    //Fonction qui nous permet au click du bouton, nous savegardons les infos choisis du produit selectionné
    document.getElementById("addToCart").addEventListener("click", function () {


        let array = []
        let arrayh = JSON.stringify(array);
        //Variable contenant les infos de l'article choisi
        let objJson = {
            id: idProduct,
            quantity: quantity.value,
            color: colors.value,
            };
        let objJsonh = JSON.stringify(objJson);

        //--------------------------------NOS CONDITIONS D'AJOUT DU PANIER-----------------------------------


        //Si le panier du localStorage est vide, on ajoute l'article selectionné dans un tableau

        //Recuperation du tableau dans le localStorage

        //Envoi de L'objet produit dans le panier

        // localStorage.setItem("obj", objIn);

        if (localStorage.length === 0) {
            console.log(localStorage.length);
            console.log("Le localStorage est vide");


            array.push(objJson)

            localStorage.setItem("array", arrayh)
            localStorage.setItem("objet", objJsonh)
        }

        //S'il n'est pas vide, le parcour mon panier pour trouver l'element comportant
        //l'Id et la couleur de mon article
        else  {
        //Envoi de L'objet produit dans le panier
            console.log(localStorage.length);
            console.log("Nous ajoutons un nouveau produit au localStorage");
        }








    });
  });

// Clear temporaire pour remise à Zero du tableau "localStorage"
//   localStorage.clear();
