//On recupére l'URL de la page courante pour en extraire l'id produit
var str = window.location.href;

var url = new URL(str);
var idProduct = url.searchParams.get("id");

/*Recuperation et affichage de l'image et informations (nom, description et prix)
 du produit choisi aupres de l'API, à l'aide de l'id produit*/
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


//Fonction d'ecoute du clic au bouton "Ajouter au panier" ,on stocke le produit dans le localstorage
document.getElementById("addToCart").addEventListener("click", function () {

//Envoi du taleau produits dans le local storage
function setCart() {
  let arrayh = JSON.stringify(cart);
  localStorage.setItem("arrayProd", arrayh); 
}

  let arrayProduct = localStorage.getItem("arrayProd");
  let cart = JSON.parse(arrayProduct);

  //Si le localstorage est vide
  if (localStorage.length === 0) {
    let cart = [];
    let objProduct = {
      id: idProduct,
      quantity: parseInt(document.getElementById("quantity").value),
      color: document.getElementById("colors").value,
    };

    cart.push(objProduct);

    setCart()
  }

  //Condition à l'aide d'un marqueur, pour la modification de quantite d'un produit deja existant ou l'ajout d'un nouveau produit
  else {
    /*On initialise un marqueur qui nous servira de temoin pour l'etat de notre condition: 
    -> Si le produit (par son id et sa couleur) est deja dans le localstorage = on incremente sa quantité*/
    var found = false;

    for (i = 0; i < cart.length; i++) {
      //Si le produit est present... 
      if (
        cart[i].id == idProduct &&
        cart[i].color == document.getElementById("colors").value
      ) {
        //...on modifie sa increment
        cart[i].quantity += parseInt(document.getElementById("quantity").value);
        
        setCart()
        found = true;
      }
    }
    /*Si notre marqueur est sur false, alors cela veut dire que notre produit (par son id et sa couleur)
     n'est pas present dans ce cas on le rajooute en plus au tableau*/
    if (found == false) {

      let objProduct = {
        id: idProduct,
        quantity: parseInt(document.getElementById("quantity").value),
        color: document.getElementById("colors").value,
      };

      cart.push(objProduct);
      setCart()
    }
  }
});
