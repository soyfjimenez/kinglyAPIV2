

document.addEventListener('DOMContentLoaded', function() {
    const sockSelector = document.getElementById('sockSelector');
    const compactTextilesSelector = document.getElementById('compactTextilesSelector');
    const packagingSelector = document.getElementById('packagingSelector');
    const knitwearSelector = document.getElementById('knitwearSelector');
    const towelsSelector = document.getElementById('towelsSelector');
    const newProductButton = document.getElementById('newProductButton');

  
    sockSelector.addEventListener('click', function() {
      drawProductTable("socks", "productTable");
      styleSelected(this);
     });
  
    compactTextilesSelector.addEventListener('click', function() {
      drawProductTable("compactTextiles", "productTable");
      styleSelected(this);
    });
  
    packagingSelector.addEventListener('click', function() {
      drawProductTable("packaging", "productTable");
      styleSelected(this);
    });

    knitwearSelector.addEventListener('click', function() {
        drawProductTable("knitwear", "productTable");
        styleSelected(this);
      });

    towelsSelector.addEventListener('click', function() {
      drawProductTable("towels", "productTable");
      styleSelected(this);
    });

    newProductButton.addEventListener('click', function() {
    fillModalEdit();
  });
});
  







function styleSelected(element){
    document.querySelectorAll(".categorySelector .cat").forEach(button =>{
        button.classList.remove("btn-primary");
        button.classList.add("btn-outline-primary");
    })
    element.classList.remove("btn-outline-primary");
    element.classList.add("btn-primary");
}


async function fillModalEdit(ref){
  const productModal = new bootstrap.Modal(document.getElementById('productModal'));
  if (ref == null){
    productModal.show();
    const form = document.getElementById("productModal");
  const formInputs = form.querySelectorAll("input, textarea");

  formInputs.forEach(input => {
    if (input.type !== "submit" && input.type !== "button") {
      input.value = "";
    }});
    return;
  }
 
  const productJSON = await getSingleProduct(ref);
  productModal.show();
  document.getElementById("staticBackdropLabel").innerHTML = productJSON[0].productTitle;

  document.getElementById("reference").value = productJSON[0].ref;
  document.getElementById("title").value = productJSON[0].productTitle;
  document.getElementById("description").value = productJSON[0].productDesc;
  document.getElementById("composition").value = productJSON[0].composition;

  // Campo de selección
  document.getElementById("cat").value = productJSON[0].cat;

  // Campos de precio
  document.getElementById("price150").value = productJSON[0].price150 ? productJSON[0].price150 : "";
  document.getElementById("price250").value = productJSON[0].price250 ? productJSON[0].price250 : "";
  document.getElementById("price350").value = productJSON[0].price350 ? productJSON[0].price350 : "";
  document.getElementById("price500").value = productJSON[0].price500 ? productJSON[0].price500 : "";
  document.getElementById("price750").value = productJSON[0].price750 ? productJSON[0].price750 : "";
  document.getElementById("price1000").value = productJSON[0].price1000 ? productJSON[0].price1000 : "";
  document.getElementById("price1500").value = productJSON[0].price1500 ? productJSON[0].price1500 : "";
  document.getElementById("price2500").value = productJSON[0].price2500 ? productJSON[0].price2500 : "";
  document.getElementById("price3500").value = productJSON[0].price3500 ? productJSON[0].price3500 : "";
  document.getElementById("price5000").value = productJSON[0].price5000 ? productJSON[0].price5000 : "";
  document.getElementById("price10000").value = productJSON[0].price10000 ? productJSON[0].price10000 : "";
  
}

async function updateProduct(){
  const productModal = new bootstrap.Modal(document.getElementById('productModal'));

    const form = document.getElementById("productForm");
    let formData = new FormData(form);
  
    let formObject = {};
    formData.forEach((value, key) => {
      value =   value.replace(/"/g, '');
      formObject[key] = value;
    });
  console.log(formObject);
    addProduct(formObject);
    drawProductTable(formObject["cat"], "productTable")
  };

  async function deleteProduct(ref,cat){
      deleteProductAPI(ref);
      drawProductTable(cat, "productTable")
    };