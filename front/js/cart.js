function getCart() {
  let arrayRecup = localStorage.getItem("arrayProd");
  if (arrayRecup === null) {
    return [];
  }
  return JSON.parse(arrayRecup);
}

async function renderTotal() {
  let totalQuantity = 0;
  let totalPrice = 0;
  cart = getCart();

  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;

    let product = await fetch("http://localhost:3000/api/products/" + cart[i].id
    ).then((response) => {
      return response.json();
    });

    totalPrice += cart[i].quantity * product.price;
  }
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;
}

const arryaIdproducts = [];

cart = getCart();
for (let i = 0; i < cart.length; i++) {
  let idProduct = cart[i].id;
  let colorProduct = cart[i].color;
  let quantityProduct = cart[i].quantity;

  //-----------------------Création des elements dans le DOM------------------------

 
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((dataProduct) => dataProduct.json())

    .then((product) => {
      //Création du container de produit
      const sectionProduct = document.getElementById("cart__items");
      const containerProduct = document.createElement("article");
      sectionProduct.appendChild(containerProduct);
      containerProduct.className = `cart__item`;
      containerProduct.dataset.id = idProduct;
      containerProduct.dataset.color = colorProduct;

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
      productColor.innerText = colorProduct;

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
      inputNumber.setAttribute("value", quantityProduct);

      //Création du "bouton" supprimer
      const divDelete = document.createElement("div");
      divSettings.appendChild(divDelete);
      divDelete.className = `cart__item__content__settings__delete`;

      const deleteItem = document.createElement("p");
      divDelete.appendChild(deleteItem);
      deleteItem.className = "deleteItem";
      deleteItem.innerText = "Supprimer";

      //Affichage initial du total quantité et prix
      renderTotal();

      //Balise du DOM ou se trouve les informations id et couleur produit, c'est aussi notre contenant produit
      const baliseArticle = divDelete.closest(":not(div)");

      //----------------------------Foncion de la modification de la quantité produit------------------------
      inputNumber.onchange = () => {
        if (inputNumber.value <= 100 && inputNumber.value > 0) {
          cart = getCart();
          const productCurrentQuantity = cart.find(
            (o) =>
              o.id === baliseArticle.dataset.id &&
              o.color === baliseArticle.dataset.color
          );
          productCurrentQuantity.quantity = inputNumber.value;

          let arrayh = JSON.stringify(cart);
          localStorage.setItem("arrayProd", arrayh);

        } else {
          alert("Saississez une quantité de Kanap entre 1 et 100 éléments");
        }
        renderTotal();
        console.log(cart);
      };

      //------------------------------------Fonction de produit à supprimer----------------------------------
      divDelete.onclick = () => {
        cart = getCart();
        const productfound = cart.find(
          (h) =>
            h.id === baliseArticle.dataset.id &&
            h.color === baliseArticle.dataset.color
        );

        const index = cart.indexOf(productfound);
        cart.splice(index, 1);

        const productDelete = baliseArticle.closest(":not(div)");
        productDelete.remove();
        
        let arrayh = JSON.stringify(cart);
          localStorage.setItem("arrayProd", arrayh);
        renderTotal();
      };
    });

  /*Tableau qui contient les id des produits stockés dans notre localstorage
  (anticipé pour la commande)*/
  arryaIdproducts.push(idProduct);
}

//-------------------------------Validation du formulaire------------------------------

//Variables contenants de regex

//Manque lettres accentuées**********************************************
//*********************************************************************************************** */
const regexFirstName = /^([A-Za-z]{2})?([-]{0,1})?([A-Za-z]{2,20})$/;
const regexLastName = /^([A-Za-z]{2})?([-]{0,1})?([A-Za-z]{2,20})$/;
const regexAddress = /^[a-zA-Z0-9\s,'-âä]{10,50}$/;
const regexCity = /^([A-Za-z]{2})?([-]{0,1})?([A-Za-z]{2,20})$/;
const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

//Création de conditions sur onchange de chaques input du formulaire de contact
const inputFirstName = document.querySelector("#firstName");

inputFirstName.oninput = () => {
  let firstName = inputFirstName.value;
  const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

  if (regexFirstName.test(firstName) === true) {
    firstNameErrorMsg.textContent = "";
    inputFirstName.style.border = "4px solid green";
  } else {
    firstNameErrorMsg.textContent = "Veuillez entrer un prénon valide svp!";
    inputFirstName.style.border = "1px solid red";
  }
};
//------------------------------
const inputLastName = document.querySelector("#lastName");

inputLastName.oninput = () => {
  let lastName = inputLastName.value;
  const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  if (regexLastName.test(lastName) === true) {
    lastNameErrorMsg.textContent = "";
    inputLastName.style.border = "4px solid green";
  } else {
    lastNameErrorMsg.textContent = "Veuillez entrer un prénon valide svp!";
    inputLastName.style.border = "1px solid red";
  }
};

//------------------------------
const inputAddress = document.querySelector("#address");

inputAddress.oninput = () => {
  let address = inputAddress.value;
  const addressErrorMsg = document.querySelector("#addressErrorMsg");

  if (regexAddress.test(address) === true) {
    addressErrorMsg.textContent = "";
    inputAddress.style.border = "4px solid green";
  } else {
    addressErrorMsg.textContent = "Veuillez entrer un prénon valide svp!";
    inputAddress.style.border = "1px solid red";
  }
};
//-------------------------------

const inputCity = document.querySelector("#city");

inputCity.oninput = () => {
  let city = inputCity.value;
  const cityErrorMsg = document.querySelector("#cityErrorMsg");

  if (regexCity.test(city) === true) {
    cityErrorMsg.textContent = "";
    inputCity.style.border = "4px solid green";
  } else {
    cityErrorMsg.textContent = "Veuillez entrer un prénon valide svp!";
    inputCity.style.border = "1px solid red";
  }
};
//--------------------------------

const inputEmail = document.querySelector("#email");

inputEmail.oninput = () => {
  let email = inputEmail.value;
  const emailErrorMsg = document.querySelector("#emailErrorMsg");

  if (regexEmail.test(email) === true) {
    emailErrorMsg.textContent = "";
    inputEmail.style.border = "4px solid green";
  } else {
    emailErrorMsg.textContent = "Veuillez entrer un prénon valide svp!";
    inputEmail.style.border = "1px solid red";
  }
};

//Au click du bouton on impose que tout les champs soient saisis correctements
const buttunOrder = document.querySelector("#order");
buttunOrder.onclick = () => {
  //
  let firstName = inputFirstName.value;
  let lastName = inputLastName.value;
  let address = inputAddress.value;
  let city = inputCity.value;
  let email = inputEmail.value;

  console.log(inputFirstName.value);
  console.log(inputLastName.value);
  console.log(inputAddress.value);
  console.log(inputCity.value);
  console.log(inputEmail.value);

  console.log(regexFirstName.test(firstName));
  console.log(regexLastName.test(lastName));
  console.log(regexCity.test(city));
  console.log(regexAddress.test(address));
  console.log(regexEmail.test(email));

  //Contrôler l'envoi car impossible si la balise "type" est renseigné avec "suubmit"*******************************************
  //******************************************************************************************************************************
  if (
    regexFirstName.test(firstName) &&
    regexLastName.test(lastName) &&
    regexCity.test(city) &&
    regexAddress.test(address) &&
    regexEmail.test(email) === true
  ) {
    /*Si la condition est remplie ,on peut envoyer notre objet attendu par l'API
    (d'après la spec.) à savoir : l'objet contact et le tableau d'id(represantant les produits) sous formr de string*/
    const order = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: arryaIdproducts,
    };
    console.log(typeof products);

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((res) => {
        const idOfCommand = res;
        console.log(idOfCommand);

        //On envoi l'id de l'url en page confirmation pour le recuperer
        window.location.href = `confirmation.html?${idOfCommand.orderId}`;
      });
  } else {
    alert("Vérifiez votre saisie");
  }
};
