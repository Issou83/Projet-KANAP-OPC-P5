//Recuperation du tableau de produit dans le localStorage
getArrayLocalstorage = () => {
  let arrayRecup = localStorage.getItem("arrayProd");
  let arrayLS = JSON.parse(arrayRecup);
  return arrayLS;
};

//Calcul de la quantité toltal panier
calculQuantity = () => {
  let totalQuantityBasket = 0;
  totalQuantityBasket += productQuantity;

  document.getElementById("totalQuantity").innerHTML = totalQuantityBasket;
  return productQuantity
};

//Calcul du prix total panier
colculPriceTotal = () => {
  let totalPriceBasket = 0;
  let totalPricePerProduct = productsAPI.price * productQuantity;

  arrayPrices.push(totalPricePerProduct);
  arrayPrices.forEach((elementPrice) => {
    totalPriceBasket += elementPrice;

    document.getElementById("totalPrice").innerHTML = totalPriceBasket;
  });
};
