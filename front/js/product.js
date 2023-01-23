//Récupération de l'URL de la page courante pour en extraire l'identifiant du produit
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");

/*Récupération et affichage de l'image et des informations (nom, description et prix)
 du produit choisi auprès de l'API, à l'aide de l'id du produit*/
async function display() {
  let product = await fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => {
    return response.json();
  });

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
}
display();

//Fonction d'envoi au localStorage

function addToLocalStorage() {
  let arrayProducts = JSON.stringify(cart);
  localStorage.setItem("arrayProd", arrayProducts);
}

//----------------------------------Ajout produit au panier------------------------------------

//Fonction d'écoute du clic sur le bouton "Ajouter au panier": stockage du produit dans le stockage local
document.getElementById("addToCart").addEventListener("click", function () {
  let choiceQuantity = parseInt(document.getElementById("quantity").value);
  let choiceColor = document.getElementById("colors").value;

  if (choiceColor === "" || choiceQuantity === 0) {
    alert("Veulliez choisir une couleur et une quantité minimum de 1 article");
    
  } else {
    //Recuperation du tableau de produits present dans le localstorage
    function getCart() {
      let arrayToLocalStorage = localStorage.getItem("arrayProd");
      if (arrayToLocalStorage === null) {
        return [];
      }
      return JSON.parse(arrayToLocalStorage);
    }

    cart = getCart();

    //Si le localstorage est vide
    if (cart.length === null) {
      let objProduct = {
        id: idProduct,
        quantity: choiceQuantity,
        color: choiceColor,
      };
      cart.push(objProduct);
      addToLocalStorage();
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
          cart[i].quantity += parseInt(
            document.getElementById("quantity").value
          );

          //Limite de 100 explemplaires imposée
          if (cart[i].quantity > 100 || cart[i].quantity < 1) {
            cart[i].quantity = 1;
            alert("Attention: Vous avez saisie une quantité inapropriée");
          }
          addToLocalStorage();
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
        addToLocalStorage();
      }
    }
  }
});
