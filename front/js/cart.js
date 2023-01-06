//Recuperation produits du le localStorage
let arrayRecup = localStorage.getItem("arrayProd");
let arrayLS = JSON.parse(arrayRecup);
let arrayPrices = [];
//nous parcourons notre tableau
for (i = 0; i < arrayLS.length; i++) {
  let idArray = arrayLS[i].id;
  let colorArray = arrayLS[i].color;
  let quantityArray = arrayLS[i].quantity;


  //-----------------------Injectons maintenant nos produit et leurs infos------------------------

  //Envoi d'une requête HTTP de type GET au service web
  fetch("http://localhost:3000/api/products/" + idArray)
    //Récupération des données du "product" au format json
    .then((dataProduct) => dataProduct.json())
    //Récupèration des données
    .then((product) => {
      //Création du container de produit
      const sectionProduct = document.getElementById("cart__items");
      const containerProduct = document.createElement("article");
      sectionProduct.appendChild(containerProduct);
      containerProduct.className = `cart__item`;
      containerProduct.dataset.id = idArray;
      containerProduct.dataset.color = colorArray;

      //Création de la div de l'image et de la div du contenu de la carte
      const divImage = document.createElement("div");
      containerProduct.appendChild(divImage);
      divImage.className = `cart__item__img`;

      const image = document.createElement("img");
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

      const productName = document.createElement("h2");
      divDescription.appendChild(productName);
      productName.innerText = product.name;

      const productColor = document.createElement("p");
      divDescription.appendChild(productColor);
      productColor.innerText = colorArray;

      const productPrice = document.createElement("p");
      divDescription.appendChild(productPrice);
      productPrice.innerText = product.price + " €";

      //Création de la div "settings"
      const divSettings = document.createElement("div");
      divContent.appendChild(divSettings);
      divSettings.className = `cart__item__content__settings`;

      const divQuantity = document.createElement("div");
      divSettings.appendChild(divQuantity);
      divQuantity.className = `cart__item__content__settings__quantity`;

      const productQuantity = document.createElement("p");
      divQuantity.appendChild(productQuantity);
      productQuantity.innerText = "Qte : ";

      const inputNumber = document.createElement("input");
      divQuantity.appendChild(inputNumber);

      inputNumber.className = "itemQuantity";
      inputNumber.setAttribute("type", "number");
      inputNumber.setAttribute("name", "itemQuantity");
      inputNumber.setAttribute("min", 1);
      inputNumber.setAttribute("max", 100);
      inputNumber.setAttribute("value", quantityArray);

      //Création du "bouton" supprimer
      const divDelete = document.createElement("div");
      divSettings.appendChild(divDelete);
      divDelete.className = `cart__item__content__settings__delete`;

      const deleteItem = document.createElement("p");
      divDelete.appendChild(deleteItem);
      deleteItem.className = "deleteItem";
      deleteItem.innerText = "Supprimer";

      //------------------------------Calcules des totaux de la quantité et prix des produits------------------------

      CalculTotalQuantity = () => {
        var Qtotal = 0;
        arrayLS.forEach((element) => {
          Qtotal += element.quantity;
          document.getElementById("totalQuantity").innerHTML = Qtotal;
        });
      };

      CalcuculTotalPrice = () => {
        
        var PriceTotal = 0;
        const priceTotalPerProduct = product.price * quantityArray;

        arrayPrices.push(priceTotalPerProduct);
        console.log(arrayPrices);

        arrayPrices.forEach((elementPrice) => {
          PriceTotal += elementPrice
          document.getElementById("totalPrice").innerHTML = PriceTotal;
          console.log();
        })
        
      };

      //Stockage du parent produit contenant les informations (id et couleur) du produit
      const productDelete = divDelete.closest(":not(div)");

      //----------------------------Foncion de la modification de la quantité produit------------------------

      /*On effectuer une condition appliquée sur
      leur valeur/"value" si leur valeur (modifiée) est conprise entre 0 et 100 alors...*/
      inputNumber.onchange = () => {
        console.log(arrayLS);
        //Si une valeur rentrée par l'utilisateur est comprise entre 0 et 100
        if (inputNumber.value <= 100 && inputNumber.value > 0) {
          /*...On trouve le produit dans le localstorage qui la mème id et la méme couleur 
          que le produit contenant l'input que l'on à modifié*/
          const productCurrentQuantity = arrayLS.find(
            (o) =>
              o.id === productDelete.dataset.id &&
              o.color === productDelete.dataset.color
          );

          /*...et on lui ajoute la valeur que 
          l'on cherchait à ecouter lors du déclanchement de l'evenement (onchange)*/
          productCurrentQuantity.quantity = +inputNumber.value;

          //Nous pouvons tout renvoyer le tableau dans le localstorage
          localStorage.setItem("arrayProd", JSON.stringify(arrayLS));
        } else {
          alert("Saississez une quantité de Kanap entre 1 et 100 éléments");
        }
        //Mise à jour de la quantité total et du prix total
        CalculTotalQuantity();
        
        CalcuculTotalPrice();
      };

      //------------------------------------fonction de roduit à supprimer----------------------------------

      divDelete.onclick = () => {
        //On cherche le bon produit présent dans notre tableau récuperer du local Storage

        console.log(arrayLS);
        const productfound = arrayLS.find(
          (h) =>
            h.id === productDelete.dataset.id &&
            h.color === productDelete.dataset.color
        );
        console.log(productfound);
        //...et on filtre ce méme tableau pour en supprimer le produit sur lequel nous avous cliqué
        const array = arrayLS.filter((productLS) => productLS != productfound);
        console.log(arrayLS);
        //On renvoie le tableau modifié dans le localstorage
        localStorage.setItem("arrayProd", JSON.stringify(array));

        //Suppression dans le DOM

        productDelete.remove();
        console.log(productDelete);
        // window.location.reload();

        //Mise à jour de la quantité total et du prix total
        CalculTotalQuantity();
        CalcuculTotalPrice();
        window.location.reload();
      };

      CalculTotalQuantity();
      CalcuculTotalPrice();
    });
}
//-------------------------------Validation du formulaire------------------------------
