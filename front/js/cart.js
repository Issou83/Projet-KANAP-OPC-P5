//Recuperation produits du le localStorage
let arrayRecup = localStorage.getItem("arrayProd");
let arrayLS = JSON.parse(arrayRecup);

//nous parcourons notre tableau
for (i = 0; i < arrayLS.length; i++) {
  console.log(arrayLS[i]);
  //   var elArray = arrayLS[i];
  const idArray = arrayLS[i].id;
  const colorArray = arrayLS[i].color;
  const quantityArray = arrayLS[i].quantity;
  console.log(quantityArray);
  console.log(colorArray);
  //Injectons maintenant nos produit et leurs infos

  //Création du container de produit
  const sectionProduct = document.getElementById("cart__items");
  const containerProduct = document.createElement("article");
  sectionProduct.appendChild(containerProduct);
  containerProduct.className = `cart__item`;
  containerProduct.setAttribute("data-id", idArray);
  containerProduct.setAttribute("data-color", colorArray);

  //Envoi d'une requête HTTP de type GET au service web
  fetch("http://localhost:3000/api/products/" + idArray)
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
      //On injecte à notre produit une identification id/couleur (renseigner par le tableau du localstorage)
      inputNumber.id = `${idArray + colorArray}`;
      console.log(inputNumber.id);
      inputNumber.className = "itemQuantity";

      inputNumber.setAttribute("type", "number");
      inputNumber.setAttribute("name", "itemQuantity");
      inputNumber.setAttribute("min", 1);
      inputNumber.setAttribute("max", 100);
      inputNumber.setAttribute("value", quantityArray);
      console.log(quantityArray);
      //   mise à jour de la quantité dans le localstorage lors d'un changement dans la quantité du produit

      //On commence par viser notre input contenant l'information que nous voulons écouter, choisie par son id/couleur que nous lui avons injecté dans le HTMLcollection (en ligne 80)
      const changeItemQ = document.getElementsByClassName("itemQuantity");


      //On fait une boucle qui nous permet de parcourir le(s) produit(s) du HTMLcollection et trouver toutes les infos qu'il(s) contiennent...id, couleur, quantité...
      for (let a = 0; a < changeItemQ.length; a++) {
        console.log(changeItemQ);

        //on les stock dans une variable
        const changeItemQuantity = changeItemQ[a];
        console.log(changeItemQuantity);

        //nous n'avons plus qu' à les cibler et effectuer une condition appliquée sur leur valeur/"value" si leur valeur (modifiée) est conprise entre 0 et 100 alors...e.target fait donc reference à l'input"
        changeItemQuantity.onchange = (e) => {
            console.log(e.target.id);
          if (e.target.value <= 100 && e.target.value > 0) {
            //...on trouve leur paire dans le localstorage(qui contient l'ancienne quantité)
            const productCurrentQuantity = arrayLS.find(
              (o) => o.id + o.color === changeItemQuantity.id
            );

            //...et on leur ajoute la valeur que l'on cherchait à ecouter lors du déclanchement de l'evenement (onchange)
            productCurrentQuantity.quantity =+ e.target.value;

            //Nous pouvons tout renvoyer dans le local storage
            localStorage.setItem("arrayProd", JSON.stringify(arrayLS));
          } else {
            alert("Saississez une quantité de Kanap entre 1 et 100 éléments");
          }
        };
      }

      let divDelete = document.createElement("div");
      divSettings.appendChild(divDelete);
      divDelete.className = `cart__item__content__settings__delete`;

      let deleteItem = document.createElement("p");
      divDelete.appendChild(deleteItem);
      deleteItem.className = "deleteItem";
      deleteItem.innerText = "Supprimer";
      
      //On vise notre élément "Supprimer" pour pouvoir l'écouter
      const deleteButton =  document.getElementsByClassName("cart__item__content__settings__delete")


      for (let a = 0; a < deleteButton.length; a++) {
        console.log(deleteButton[a]);
        const singleButton = deleteButton[a]

        singleButton.onclick = (d) => {
        console.log(d.target);
        const D = singleButton.closest('article')
            console.log(D.dataset.id);
        const elefound = arrayLS.find((h) => h.id + h.color === D.dataset.id + D.dataset.color);
          console.log(elefound)

            const array = arrayLS.filter(ele => ele !=elefound)
            
            console.log(array);
            let arrayh = JSON.stringify(array);
            localStorage.setItem("arrayProd", arrayh);
        }

      }
    });
}
