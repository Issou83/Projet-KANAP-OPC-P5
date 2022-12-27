//Recuperation produits du le localStorage
let arrayRecup = localStorage.getItem("arrayProd");
let objJson = JSON.parse(arrayRecup);

//nous parcourons notre tableau
for (i = 0; i < objJson.length; i++) {
  console.log(objJson[i].id);

  //Injectons maintenant nos produit et leurs infos

  //Création du container de produit
  const sectionProduct = document.getElementById("cart__items");
  const containerProduct = document.createElement("article");
  sectionProduct.appendChild(containerProduct);
  containerProduct.className = `cart__item`;
  containerProduct.setAttribute("data-id", objJson[i].id);
  containerProduct.setAttribute("data-color", objJson[i].color);

  //Envoi d'une requête HTTP de type GET au service web
  fetch("http://localhost:3000/api/products/" + objJson[i].id)
    //Récupération des données du "product" au format json
    .then((dataProduct) => dataProduct.json())

    //Récupèration des données
    .then((product) => {
      console.log(product);
      //Création de la div de l'image et de la div du contenu de la carte
      const divImage = document.createElement("div");
      containerProduct.appendChild(divImage);
      divImage.className = `cart__item__img`;

      let image = document.createElement("img");
      divImage.appendChild(image);
      image.setAttribute("src", product.imageUrl);
      image.setAttribute("alt", `Photographie d'un canapé`);
    });
}
