//Recuperation produits du le localStorage
let arrayRecup = localStorage.getItem("arrayProd");
let arrayLS = JSON.parse(arrayRecup);



//nous parcourons notre tableau
for (i = 0; i < arrayLS.length; i++) {
  //   var elArray = arrayLS[i];
  let idArray = arrayLS[i].id;
  let colorArray = arrayLS[i].color;
  let quantityArray = arrayLS[i].quantity;





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

      inputNumber.className = "itemQuantity";
      inputNumber.setAttribute("type", "number");
      inputNumber.setAttribute("name", "itemQuantity");
      inputNumber.setAttribute("min", 1);
      inputNumber.setAttribute("max", 100);
      inputNumber.setAttribute("value", quantityArray);

      inputNumber.setAttribute("id", idArray + colorArray)
      console.log(inputNumber.id);
      /*On injecte à nos produits un id:id/couleur (renseigner par le tableau du localstorage) 
      pour pouvoir ensuite agir sur le bon produit, lors d'une modif de la quantité*/



      //------------Mise à jour de la quantité produit dans le "arrayLS"-----------------------------

      /*On commence par viser notre input contenant l'information que nous voulons écouter, 
      choisie par son id/couleur que nous lui avons injecté dans le HTMLcollection (en ligne 80)*/
      const changeItemQ = document.getElementsByClassName("itemQuantity");

      /*On fait une boucle qui nous permet de parcourir les produits du HTMLcollection
      et trouver toutes les infos qu'il(s) contiennent...id, couleur, quantité...*/
      for (let a = 0; a < changeItemQ.length; a++) {

        //On les stock dans une variable
        const changeItemQuantity = changeItemQ[a];

        /*nous n'avons plus qu' à les cibler et effectuer une condition appliquée sur
        leur valeur/"value" si leur valeur (modifiée) est conprise entre 0 et 100 alors...e.target fait donc reference à l'input"*/
        changeItemQuantity.onchange = (e) => {
          console.log(e.target);
          if (e.target.value <= 100 && e.target.value > 0) {
            //...On trouve leur paire dans le localstorage(qui contient l'ancienne quantité) qui la mème id et la méme couleur
            const productCurrentQuantity = arrayLS.find((o) => o.id + o.color === changeItemQuantity.id);

            //...et on leur ajoute la valeur que l'on cherchait à ecouter lors du déclanchement de l'evenement (onchange)
            productCurrentQuantity.quantity = +e.target.value;
            console.log(e.target.value);
            //Nous pouvons tout renvoyer dans le local storage
            localStorage.setItem("arrayProd", JSON.stringify(arrayLS));
            window.location.reload();
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



      //-------------------------------------------Produit à supprimer----------------------------------
      //On vise notre élément "Supprimer" pour pouvoir l'écouter
      const deleteButton = document.getElementsByClassName(
        "cart__item__content__settings__delete"
      );

      //On recherche chaque elements "supprmer" des produits presents (dans le HTMLcollection)
      for (let a = 0; a < deleteButton.length; a++) {
        console.log(deleteButton);
        console.log(deleteButton[a]);
        //On les stock dans une variable
        const singleButton = deleteButton[a];

        //On leur assigne un evenement au clic
        singleButton.onclick = (d) => {
          console.log(d.target);

          /*On met dans une variable leurs ancetres respectifs "article",
          ce qui nous permetent de les viser lors de la suppression. Ils renferment notemment les infos qui identifient nos produits*/
          const parentOfDelete = singleButton.closest("article");
          console.log(parentOfDelete.dataset.id);

          //Nous n'avons plus qu'à trouver trouver le bon produit présent dans notre tableau récuperer du local Storage  
          const productfound = arrayLS.find((h) => h.id + h.color === parentOfDelete.dataset.id + parentOfDelete.dataset.color);
          console.log(productfound);
          
          //...et à filtrer ce méme tableau pour en supprimer le produit sur lequel nous avous cliqué
          const array = arrayLS.filter((productLS) => productLS != productfound);

          //On renvoie le tableau modifié dans le localstorage 
          console.log(array);
          localStorage.setItem("arrayProd", JSON.stringify(array));
          window.location.reload();
        };
      }

    });

// --------------------------------Total Qauntity------------------

let tableauTotalQuantite = [];
      console.log(tableauTotalQuantite);

      for (let i = 0; i < arrayLS.length; i++) {
        let nombreArticle = arrayLS[i].quantity;
        tableauTotalQuantite.push(nombreArticle);
     }
     console.log(tableauTotalQuantite);
     // Additionner les quantités qu'il y'a dans le tableau de la variable "tableauQuantite" :
     const reducer = (accumulator, currentValue) => accumulator + currentValue;
     const quantiteTotal = tableauTotalQuantite.reduce(reducer, 0);
     console.log(quantiteTotal);

     totalQuantity.textContent = quantiteTotal

  



  
  
//   -------------------------------Total Price-------------------


}

