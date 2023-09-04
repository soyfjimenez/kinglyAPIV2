

document.addEventListener('DOMContentLoaded', function () {
  const sockSelector = document.getElementById('sockSelector');
  const compactTextilesSelector = document.getElementById('compactTextilesSelector');
  const packagingSelector = document.getElementById('packagingSelector');
  const knitwearSelector = document.getElementById('knitwearSelector');
  const towelsSelector = document.getElementById('towelsSelector');
  const newProductButton = document.getElementById('newProductButton');

  sockSelector.addEventListener('click', function () {
    drawProductTable("socks", "productTable");
    styleSelected(this);
  });

  compactTextilesSelector.addEventListener('click', function () {
    drawProductTable("compactTextiles", "productTable");
    styleSelected(this);
  });

  packagingSelector.addEventListener('click', function () {
    drawProductTable("packaging", "productTable");
    styleSelected(this);
  });

  knitwearSelector.addEventListener('click', function () {
    drawProductTable("knitwear", "productTable");
    styleSelected(this);
  });

  towelsSelector.addEventListener('click', function () {
    drawProductTable("towels", "productTable");
    styleSelected(this);
  });

  newProductButton.addEventListener('click', function () {
    fillModalEdit();
  });
});








function styleSelected(element) {
  document.querySelectorAll(".categorySelector .cat").forEach(button => {
    button.classList.remove("btn-primary");
    button.classList.add("btn-outline-primary");
  })
  element.classList.remove("btn-outline-primary");
  element.classList.add("btn-primary");
}


async function fillModalEdit(ref) {
  const productModal = new bootstrap.Modal(document.getElementById('productModal'));
  if (ref == null) {
    productModal.show();
    const form = document.getElementById("productModal");
    const formInputs = form.querySelectorAll("input, textarea");
    formInputs.forEach(input => {
      if (input.type !== "submit" && input.type !== "button") {
        input.value = "";
      }
    });
    fillPrices();
    return;
  }

  const productJSON = (await getSingleProduct(ref))[0];
  productJSON.prices = JSON.parse(productJSON.prices)
  productModal.show();
  document.getElementById("staticBackdropLabel").innerHTML = productJSON.productTitle;

  document.getElementById("reference").value = productJSON.ref;
  document.getElementById("title").value = productJSON.productTitle;
  document.getElementById("description").value = productJSON.productDesc;
  document.getElementById("composition").value = productJSON.composition;

  // Campo de categoria
  document.getElementById("cat").value = productJSON.cat;

  // Campos de precio
  fillPrices(productJSON.prices)


  //SOLUCION TEMPORAL
  if(productJSON.price150){
  let pricesTemporal = {
    150: productJSON.price150,
    250: productJSON.price250,
    350: productJSON.price350,
    500: productJSON.price500,
    750: productJSON.price750,
    1000: productJSON.price1000,
    1500: productJSON.price1500,
    2500: productJSON.price2500,
    3500: productJSON.price3500,
    5000: productJSON.price5000,
    10000: productJSON.price1000
  }
fillPrices(pricesTemporal);
console.log("Prices temporal pintado");
}


  // /SOLUCION TEMPORAL
  // document.getElementById("price150").value = productJSON.price150 ? productJSON.price150 : "";
  // document.getElementById("price250").value = productJSON.price250 ? productJSON.price250 : "";
  // document.getElementById("price350").value = productJSON.price350 ? productJSON.price350 : "";
  // document.getElementById("price500").value = productJSON.price500 ? productJSON.price500 : "";
  // document.getElementById("price750").value = productJSON.price750 ? productJSON.price750 : "";
  // document.getElementById("price1000").value = productJSON.price1000 ? productJSON.price1000 : "";
  // document.getElementById("price1500").value = productJSON.price1500 ? productJSON.price1500 : "";
  // document.getElementById("price2500").value = productJSON.price2500 ? productJSON.price2500 : "";
  // document.getElementById("price3500").value = productJSON.price3500 ? productJSON.price3500 : "";
  // document.getElementById("price5000").value = productJSON.price5000 ? productJSON.price5000 : "";
  // document.getElementById("price10000").value = productJSON.price10000 ? productJSON.price10000 : "";

  //Traducciones
  document.getElementById("titleFrench").value = productJSON.productTitleFrench;
  document.getElementById("descriptionFrench").value = productJSON.productDescFrench;
  document.getElementById("compositionFrench").value = productJSON.compositionFrench;
  document.getElementById("titleSpanish").value = productJSON.productTitleSpanish;
  document.getElementById("descriptionSpanish").value = productJSON.productDescSpanish;
  document.getElementById("compositionSpanish").value = productJSON.compositionSpanish;
  document.getElementById("titleGerman").value = productJSON.productTitleGerman;
  document.getElementById("descriptionGerman").value = productJSON.productDescGerman;
  document.getElementById("compositionGerman").value = productJSON.compositionGerman;
  document.getElementById("titleItalian").value = productJSON.productTitleItalian;
  document.getElementById("descriptionItalian").value = productJSON.productDescItalian;
  document.getElementById("compositionItalian").value = productJSON.compositionItalian;
}

async function updateProduct() {
  //const productModal = new bootstrap.Modal(document.getElementById('productModal'));

  const form = document.getElementById("productForm");
  let formData = new FormData(form);
  console.log(formData);
  let formObject = {};
  let pricesObject = {}
  let finalPrices = {};
  formData.forEach((value, key) => {
      if (key.includes("price") || key.includes("qty")) {
        pricesObject[key] = value;
        return;
      }
    value = value.replace(/"/g, '');
    formObject[key] = value;
  });
    
  for (let i = 1; i <= 12; i++) {
    const qtyKey = "qty" + i;
    const priceKey = "price" + i;
    console.log(pricesObject);
    if (pricesObject[qtyKey] !== "" && pricesObject[priceKey] !== "") {
      finalPrices[parseInt(pricesObject[qtyKey])] = parseFloat(pricesObject[priceKey].replace(",", "."));
    }
  }
  formObject.prices = JSON.stringify(finalPrices);
  console.log(formObject);
  addProduct(formObject);
  drawProductTable(formObject["cat"], "productTable")
};

async function deleteProduct(ref, cat) {
  if (window.confirm("Are you sure you want to delete this ref?")){
  deleteProductAPI(ref);
  drawProductTable(cat, "productTable")
  }
};

function fillPrices(productJSON) {
  if (!productJSON) {
    productJSON = {
      150: 0,
      250: 0,
      350: 0,
      500: 0,
      750: 0,
      1000: 0,
      1500: 0,
      2500: 0,
      3500: 0,
      5000: 0,
      10000: 0

    }
  }
  let pricing = document.getElementsByClassName("pricing");
  console.log(pricing);
  let i = 0;
  for (const key in productJSON) {
    let qty = key;
    let price = productJSON[key];
    let qtySelector = pricing[i].getElementsByClassName("qty")[0];
    let priceSelector = pricing[i].getElementsByClassName("price")[0];
    qtySelector.value = qty;
    priceSelector.value = price;
    i++
  }
}