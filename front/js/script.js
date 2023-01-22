//Récupération des données des produits et leur affichage sur la page

async function display() {
  
  let products = await fetch("http://localhost:3000/api/products/")
  .then((response) => {
    return response.json();
  });

    for (let product of products) {

      let items = document.getElementById("items");
      const newLink = document.createElement("a");
      newLink.setAttribute(`href`, `./product.html?id=${product._id}`);
      items.appendChild(newLink);

      const article = document.createElement("article");
      newLink.appendChild(article);

      const img = document.createElement("img");
      img.setAttribute(`src`, product.imageUrl);
      img.setAttribute(`alt`, product.altTxt);
      article.appendChild(img);

      const name = document.createElement("h3");
      name.classList.add(`productName`);
      article.appendChild(name);
      name.innerText = product.name;

      const description = document.createElement(`p`);
      description.classList.add(`produitDescription`);
      article.appendChild(description);
      description.innerText = product.description;

    }
}
display()
