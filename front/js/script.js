//Envoi d'une requête HTTP de type GET au service web
fetch("http://localhost:3000/api/products")
  //Récupération du tableau "products" au format json
  .then((data) => data.json())
  //Récupèration des données
  .then((products) => {
    //Boucle nous permettant d'extraire chaque objet du tableau "products"
    for (let product of products) {
      console.log(product);
      //Injection des éléments dans le DOM : dans notre section portant l'id `items` "

      /*  document.getElementById("items").innerHTML += 
    (`<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
    </a>`)*/

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
  });
