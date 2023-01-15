//Récupération de l'URL de la page courante pour en extraire l'identifiant du produit
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");

/*Récupération et affichage de l'image et des informations (nom, description et prix)
 du produit choisi auprès de l'API, à l'aide de l'id du produit*/
fetch("http://localhost:3000/api/products/" + idProduct)
  .then((dataProduct) => dataProduct.json())
  .then((product) => {
    const imageContainer = document.querySelector("div.item__img");
    const imageProduct = document.createElement("img");
    imageContainer.appendChild(imageProduct);
    imageProduct.setAttribute("src", product.imageUrl);

    document.getElementById("title").innerText = product.name;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = product.price;

    for (let i = 0; i < product.colors.length; i++) {
      const optionColors = document.getElementById("colors");
      let newsOptions = document.createElement("option");
      newsOptions.setAttribute("value", product.colors[i]);

      newsOptions.innerText = product.colors[i];
      optionColors.appendChild(newsOptions);
    }
  });

//Fonction d'envoi au localStorage

  function addToLocalStorage() {
    let arrayProducts = JSON.stringify(cart);
    localStorage.setItem("arrayProd", arrayProducts);
  }

//Fonction d'écoute du clic sur le bouton "Ajouter au panier": stockage du produit dans le stockage local
document.getElementById("addToCart").addEventListener("click", function () {
  

//Recuperation du tableau de produits present dans le localstorage
function getCart() {
  let arrayRecup = localStorage.getItem("arrayProd");
  if (arrayRecup === null) {
    return [];
  }
  return JSON.parse(arrayRecup);
}

cart = getCart();

  //Si le localstorage est vide
  if (localStorage.length === null) {
    console.log(localStorage.length);
    let cart = [];
    let objProduct = {
      id: idProduct,
      quantity: parseInt(document.getElementById("quantity").value),
      color: document.getElementById("colors").value,
    };

    cart.push(objProduct);

    addToLocalStorage()
  }

  //Condition utilisant un indicateur pour la modification de la quantité d'un produit déjà existant ou l'ajout d'un nouveau produit
  else {
    /*Initialisation d'un indicateur qui nous servira de témoin pour l'état de notre condition :
-> Si le produit (par son identifiant et sa couleur) est déjà dans le stockage local, on incrémente sa quantité*/
    var productFound = false;

    for (i = 0; i < cart.length; i++) {
      if (
        cart[i].id == idProduct &&
        cart[i].color == document.getElementById("colors").value
      ) {
        cart[i].quantity += parseInt(document.getElementById("quantity").value);

        addToLocalStorage()

        productFound = true;
      }
    }
    /*"Si notre indicateur est sur false, cela signifie que notre produit 
    (par son identifiant et sa couleur) n'est pas présent, dans ce cas on l'ajoute également au tableau*/
    if (productFound == false) {
      let objProduct = {
        id: idProduct,
        quantity: parseInt(document.getElementById("quantity").value),
        color: document.getElementById("colors").value,
      };

      cart.push(objProduct);

      addToLocalStorage()
    }
  }
  console.log(cart);
});
