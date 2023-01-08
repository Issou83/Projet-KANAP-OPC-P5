//Recuperation produits du le localStorage
let arrayRecup = localStorage.getItem("arrayProd");
let arrayLS = JSON.parse(arrayRecup);


const arrayPrices = [];

//nous parcourons notre tableau
for (i = 0; i < arrayLS.length; i++) {
  let idArray = arrayLS[i].id;
  let colorArray = arrayLS[i].color;
  let quantityArray = arrayLS[i].quantity;


  //-----------------------Création des elements dans le DOM------------------------

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
      calculBasket = () => {
        CalculTotalQuantity = () => {
          let Qtotal = 0;
          arrayLS.forEach((element) => {
            Qtotal += element.quantity;
            document.getElementById("totalQuantity").innerHTML = Qtotal;

            CalculTotalPrice = () => {
              let PriceTotal = 0;
              let priceTotalPerProduct = product.price * inputNumber.value;
              console.log(inputNumber.value);
              console.log(product.price);
              console.log(priceTotalPerProduct);

              arrayPrices.push(priceTotalPerProduct);

              arrayPrices.forEach((elementPrice) => {
                PriceTotal += elementPrice;
              });
              console.log(arrayPrices);
              document.getElementById("totalPrice").innerHTML = PriceTotal;
            };
          });
        };
        CalculTotalQuantity();
        CalculTotalPrice();
      };

      calculBasket();
      //----------------------------Foncion de la modification de la quantité produit------------------------
      //Parent produit contenant les informations (id et couleur) du produit
      const productDelete = divDelete.closest(":not(div)");

      inputNumber.onchange = () => {
        if (inputNumber.value <= 100 && inputNumber.value > 0) {
          const productCurrentQuantity = arrayLS.find(
            (o) =>
              o.id === productDelete.dataset.id &&
              o.color === productDelete.dataset.color
          );
          productCurrentQuantity.quantity = +inputNumber.value;
          calculBasket();
          localStorage.setItem("arrayProd", JSON.stringify(arrayLS));
          window.location.reload();
        } else {
          alert("Saississez une quantité de Kanap entre 1 et 100 éléments");
        }
      };

      //------------------------------------fonction de produit à supprimer----------------------------------
      divDelete.onclick = () => {
        const productfound = arrayLS.find(
          (h) =>
            h.id === productDelete.dataset.id &&
            h.color === productDelete.dataset.color
        );
        const array = arrayLS.filter((productLS) => productLS != productfound);
        calculBasket();

        localStorage.setItem("arrayProd", JSON.stringify(array));

        //Suppression dans le DOM
        productDelete.remove();
        window.location.reload();
      };
    });
}

//-------------------------------Validation du formulaire------------------------------

//**Récupération des id depuis le DOM :**//

const buttunOrder = document.querySelector("#order");
buttunOrder.onclick = () => {


const inputFirstName = document.querySelector("#firstName");
let firstName = inputFirstName.value;
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

const inputLastName = document.querySelector("#lastName");
let lastName = inputLastName.value;
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");


const inputAddress = document.querySelector("#address");
let address = inputAddress.value;
const addressErrorMsg = document.querySelector("#addressErrorMsg");


const inputCity = document.querySelector("#city");
let city = inputCity.value;
const cityErrorMsg = document.querySelector("#cityErrorMsg");


const inputEmail = document.querySelector("#email");
let email = inputEmail.value;
const emailErrorMsg = document.querySelector("#emailErrorMsg");




// RegEx pour verifier le prénom, le nom, la ville :
const regexFirstName = /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/;
const regexLastName = /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/;
const regexCity = /^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$/;
const regexAddress = /^[a-zA-Z0-9\s,'-âä]{2,50}$/;
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;




  if (regexFirstName.test(firstName) === true) {
    firstNameErrorMsg.textContent = "";
  } else {
    firstNameErrorMsg.textContent = "Veuillez entrer un prénon valide!";
  }

  if (regexLastName.test(lastName) === true) {
    lastNameErrorMsg.textContent = "";
  } else {
    lastNameErrorMsg.textContent = "Veuillez entrer un nom valide!";
  }

  if (regexAddress.test(address) === true) {
    addressErrorMsg.textContent = "";
  } else {
    addressErrorMsg.textContent = "Veuillez entrer une adresse valide!";
  }

  if (regexCity.test(city) === true) {
    cityErrorMsg.textContent = "";
  } else {
    cityErrorMsg.textContent = "Veuillez entrer une ville valide!";
  }

  if (regexEmail.test(email) === true) {
    emailErrorMsg.textContent = "";
  } else {
    emailErrorMsg.textContent = "Veuillez entrer un email valide!";
  }




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



if (
  regexFirstName.test(firstName) === true &&
  regexLastName.test(lastName) === true &&
  regexCity.test(city) === true &&
  regexAddress.test(address) === true &&
  regexEmail.test(email) === true
) {
  let contact = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    address: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value,
  };

  let form = JSON.stringify(contact);
  localStorage.setItem("FormContac", form);
  console.log(contact);

} else {alert("Vérifiez votre saisie")}
}
