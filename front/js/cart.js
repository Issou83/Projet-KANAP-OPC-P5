//Recuperation produits du le localStorage
let arrayRecup = localStorage.getItem("arrayProd");
let arrayLS = JSON.parse(arrayRecup);

// Initilisation du ableau pour le prix total des produit (inclut dans la bou)
const arrayPriceTotal = [];

//nous parcourons notre tableau
for (i = 0; i < arrayLS.length; i++) {
  let idArray = arrayLS[i].id;
  let colorArray = arrayLS[i].color;
  let quantityArray = arrayLS[i].quantity;

  //Injectons maintenant nos produit et leurs infos

  //Création du container de produit
  const sectionProduct = document.getElementById("cart__items");
  const containerProduct = document.createElement("article");
  sectionProduct.appendChild(containerProduct);
  containerProduct.className = `cart__item`;
  containerProduct.dataset.id = idArray;
  containerProduct.dataset.color = colorArray;

  //Envoi d'une requête HTTP de type GET au service web
  fetch("http://localhost:3000/api/products/" + idArray)
    //Récupération des données du "product" au format json
    .then((dataProduct) => dataProduct.json())
    //Récupèration des données
    .then((product) => {
      //Création de la div de l'image et de la div du contenu de la carte
      const divImage = document.createElement("div");
      containerProduct.appendChild(divImage);
      divImage.className = `cart__item__img`;

      let image = document.createElement("img");
      divImage.appendChild(image);
      image.setAttribute("src", product.imageUrl);
      image.setAttribute("alt", `Photographie d'un canapé`);

      //Cration de la div "contenue"
      const divContent = document.createElement("div");
      containerProduct.appendChild(divContent);
      divContent.className = `cart__item__content`;

      //Cration de la div "description"
      const divDescription = document.createElement("div");
      divContent.appendChild(divDescription);
      divDescription.className = `cart__item__content__description`;

      let productName = document.createElement("h2");
      divDescription.appendChild(productName);
      productName.innerText = product.name;

      let productColor = document.createElement("p");
      divDescription.appendChild(productColor);
      productColor.innerText = colorArray;

      let productPrice = document.createElement("p");
      divDescription.appendChild(productPrice);
      productPrice.innerText = product.price + " €";

      //Création de la div "settings"
      const divSettings = document.createElement("div");
      divContent.appendChild(divSettings);
      divSettings.className = `cart__item__content__settings`;

      const divQuantity = document.createElement("div");
      divSettings.appendChild(divQuantity);
      divQuantity.className = `cart__item__content__settings__quantity`;

      let productQuantity = document.createElement("p");
      divQuantity.appendChild(productQuantity);
      productQuantity.innerText = "Qte : ";

      let inputNumber = document.createElement("input");
      divQuantity.appendChild(inputNumber);

      inputNumber.className = "itemQuantity";
      inputNumber.setAttribute("type", "number");
      inputNumber.setAttribute("name", "itemQuantity");
      inputNumber.setAttribute("min", 1);
      inputNumber.setAttribute("max", 100);
      inputNumber.setAttribute("value", quantityArray);
      inputNumber.dataset.id = idArray;
      inputNumber.dataset.color = colorArray;

      //----------------------------Foncion de la modification de la quantité produit-----------------------------

      /*On effectuer une condition appliquée sur
        leur valeur/"value" si leur valeur (modifiée) est conprise entre 0 et 100 alors...e.target fait donc reference à l'input"*/
      inputNumber.onchange = () => {
        console.log(arrayLS);
        //Si une valeur par l'utilisateur es comprise entre 0 et 100
        if (inputNumber.value <= 100 && inputNumber.value > 0) {
          //...On trouve leur paire dans le localstorage(qui contient l'ancienne quantité) qui la mème id et la méme couleur
          const productCurrentQuantity = arrayLS.find(
            (o) =>
              o.id === inputNumber.dataset.id &&
              o.color === inputNumber.dataset.color
          );

          //...et on leur ajoute la valeur que l'on cherchait à ecouter lors du déclanchement de l'evenement (onchange)
          productCurrentQuantity.quantity = +inputNumber.value;

          //Nous pouvons tout renvoyer le tableau dans le localstorage
          localStorage.setItem("arrayProd", JSON.stringify(arrayLS));

          var Qtotal = 0;
          arrayLS.forEach((element) => {
            Qtotal += element.quantity;
            console.log(Qtotal);
          });
          document.getElementById("totalQuantity").innerHTML = Qtotal;
        } else {
          alert("Saississez une quantité de Kanap entre 1 et 100 éléments");
        }
        
      };
      //Nous pouvons tout renvoyer le tableau dans le localstorage
      localStorage.setItem("arrayProd", JSON.stringify(arrayLS));

      var Qtotal = 0;
      arrayLS.forEach((element) => {
        Qtotal += element.quantity;
        console.log(Qtotal);
      });
      document.getElementById("totalQuantity").innerHTML = Qtotal;

      //Création du "bouton" supprimer
      let divDelete = document.createElement("div");
      divSettings.appendChild(divDelete);
      divDelete.className = `cart__item__content__settings__delete`;
      divSettings.dataset.id = idArray;
      divSettings.dataset.color = colorArray;

      let deleteItem = document.createElement("p");
      divDelete.appendChild(deleteItem);
      deleteItem.className = "deleteItem";
      deleteItem.innerText = "Supprimer";

      //------------------------------------fonction de roduit à supprimer----------------------------------

      divDelete.onclick = () => {
        //On cherche le bon produit présent dans notre tableau récuperer du local Storage
        const productfound = arrayLS.find(
          (h) =>
            h.id === divSettings.dataset.id &&
            h.color === divSettings.dataset.color
        );

        //...et on filtre ce méme tableau pour en supprimer le produit sur lequel nous avous cliqué
        const array = arrayLS.filter((productLS) => productLS != productfound);

        //On renvoie le tableau modifié dans le localstorage

        localStorage.setItem("arrayProd", JSON.stringify(array));

        //Suppression dans le DOM
        sectionProduct.removeChild(containerProduct)

      };

    });

  // --------------------------------Total Qauntity------------------

  let arrayTotalQuantite = [];

  arrayTotalQuantite.push(quantityArray);

  // Additionner les quantités qu'il y'a dans le tableau de la variable "tableauQuantite" :
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const quantiteTotal = arrayTotalQuantite.reduce(reducer, 0);

  totalQuantity.textContent = quantiteTotal;

  //   -------------------------------Total Price-------------------
  // const TTPriceAndQ = quantityArray * product.price
  // arrayPriceTotal.push(TTPriceAndQ)
  // const reducery = (accumulator, currentValue) => accumulator + currentValue;
  // const PriceTotal = arrayPriceTotal.reduce(reducery, 0);
  // console.log(PriceTotal);
  // totalPrice.textContent = PriceTotal
  // const TTPriceAndQ = quantityArray * product.price
  // arrayPriceTotal.push(TTPriceAndQ)
  // const reducery = (accumulator, currentValue) => accumulator + currentValue;
  // const PriceTotal = arrayPriceTotal.reduce(reducery, 0);
  // console.log(PriceTotal);
  // totalPrice.textContent = PriceTotal
}
//-------------------------------
