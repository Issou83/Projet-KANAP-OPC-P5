//Recuperation produits du le localStorage
getArrayLocalstorage = () => {
  let arrayRecup = localStorage.getItem("arrayProd");
  let arrayLS = JSON.parse(arrayRecup);
  return arrayLS;
};
const dataStorage = getArrayLocalstorage();
const arrayPrices = [];
let PriceTotal = 0;
let Qtotal = 0;
for (i = 0; i < dataStorage.length; i++) {
  let productID = dataStorage[i].id;
  let productQuantity = dataStorage[i].quantity;
  let productColor = dataStorage[i].color;

  fetch("http://localhost:3000/api/products/" + productID)
    .then((dataProduct) => dataProduct.json())

    .then((productsAPI) => {
      let totalPricePerProduct = productsAPI.price * productQuantity;
      console.log(productsAPI.price);
      console.log(productQuantity);
      console.log(totalPricePerProduct);

      Qtotal += productQuantity;
      document.getElementById("totalQuantity").innerHTML = Qtotal;
      console.log(Qtotal);
    
      arrayPrices.push(totalPricePerProduct);
    
      arrayPrices.forEach((elementPrice) => {
      PriceTotal += elementPrice;
      console.log(PriceTotal);
      document.getElementById("totalPrice").innerHTML = PriceTotal;
      console.log(PriceTotal);})
    });
}
