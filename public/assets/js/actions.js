
async function getProducts(cat) {
    const url = `https://digital.wearekingly.com/api/en/${cat}`;
    //const url = `http://localhost:4000/api/en/${cat}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Puedes retornar los datos si lo deseas
    } catch (error) {
        console.error('Hubo un error:', error);
        throw error; // Lanzar el error para que el llamador lo maneje
    }
} 

async function getSingleProduct(ref) {
    const url = `https://digital.wearekingly.com/api/en/ref/${ref}`;
    //const url = `http://localhost:4000/api/en/ref/${ref}`;
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Puedes retornar los datos si lo deseas
    } catch (error) {
        console.error('Hubo un error:', error);
        throw error; // Lanzar el error para que el llamador lo maneje
    }
} 

async function addProduct(productObject) {
    console.log(productObject);
    const url = `https://digital.wearekingly.com/api/`;
    //const url = `http://localhost:4000/api/`;
    

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(productObject)
          })
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error('Hubo un error:', error);
        throw error; // Lanzar el error para que el llamador lo maneje
    }
} 

async function deleteProductAPI(ref) {
    const url = `https://digital.wearekingly.com/api/${ref}`;
    //const url = `http://localhost:4000/api/${ref}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
          })
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error('Hubo un error:', error);
        throw error; // Lanzar el error para que el llamador lo maneje
    }
} 


/*async function drawProductTable (cat,targetElementID){


    
    const productJSON = await getProducts(cat);
    const target = document.getElementById(targetElementID);

    const priceNumbers = []

for (const atributo in productJSON[0]) {
    if(atributo.includes("price")){
        priceNumbers.push(atributo);
    }
}

    let pricesHeading = "";
    let tableBody = "";
    let table = `<div class="table-wrapper">
    <table class="alt">
        <thead>
            <tr>
                <th>Ref</th>
                <th>Title</th>
                <th>Description</th>
                <th>Composition</th>
                <--PRICES-->
            </tr>
        </thead>
        <tbody>
        <--PRODUCTLIST-->
        </tbody>`

priceNumbers.forEach(price =>{
    pricesHeading += `<th>Price ${price.replace("price", "")}</th>`
})
productJSON.forEach(product =>{
    tableBody += `
    <tr>
    <td>${product.ref}</td>
    <td>${product.productTitle}</td>
    <td>${product.productDesc}</td>
    <td>${product.composition}</td>
    `
    priceNumbers.forEach(price =>{
        tableBody += `<td>${product[price] != undefined ? product[price] : '-'}</td>`;

       // tableBody += `<td>${product[price]}</td>`
    })
    tableBody += "</tr>"
})
table = table.replace("<--PRICES-->",pricesHeading);
table = table.replace("<--PRODUCTLIST-->",tableBody);
target.innerHTML = table; 
}*/

async function drawProductTable(cat, targetElementID) {
    const productJSON = await getProducts(cat);
    const target = document.getElementById(targetElementID);

    const priceNumbers = [];


    let pricesHeading = "";
    let tableBody = `
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Ref</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Composition</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!--PRODUCTLIST-->
            </tbody>
        </table>
    </div>`;
    

    let productRows = "";

    productJSON.forEach(product => {

        productRows += `
        <tr>
            <td>${product.ref}</td>
            <td>${product.productTitle}</td>
            <td>${product.productDesc}</td>
            <td>${product.composition}</td>
            <td>
            <div class="d-flex">
            <button type="button" class="btn btn-outline-secondary me-2" onclick='fillModalEdit("${product.ref.trim()}")'>Edit</button>

                <button type="button" class="btn btn-outline-danger" onclick='deleteProduct("${product.ref.trim()}","${product.cat}")'>Delete</button>
            </div>
        </td>
        
        </tr>`;
    });

    tableBody = tableBody.replace("<!--PRODUCTLIST-->", productRows);
    target.innerHTML = tableBody;
}
