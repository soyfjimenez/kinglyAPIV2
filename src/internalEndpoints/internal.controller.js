import { getConnection } from "../database/database.js";
import mysql from 'mysql'
 
const getLanguages = async (req, res) => {
    const query = `SELECT * FROM languages`;
        const con = await getConnection();
        const datos = await con.query(query);
        console.log(datos);
        res.json(datos);
}

const getProductFields = async (req, res) => {
    const query = `SELECT * FROM fullProductView LIMIT 1`;
    
    const con = await getConnection();
    let datos = (await con.query(query))
    const keys = Object.keys(datos[0]);
    const keysFilter = ["composition", "product", "price"]
    const filteredKeys = keys.filter(string => !keysFilter.some(word => string.includes(word)));
    filteredKeys.push("prices")
    res.json(filteredKeys);
}
const getAllProductsSorted = async (req, res) => {
    let { sortBy } = req.query;
    if (!sortBy){
        sortBy = "ref"
    }
    const query = `SELECT * FROM products ORDER BY ${sortBy}`;
    
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}


const getProductIndex = async (req, res) => {
    let { sortBy } = req.query;
    if (!sortBy){
        sortBy = "ref"
    }
    const con = await getConnection();
    const query = `SELECT ref,cat,title_en FROM fullProductView;`;
    const query2 = `SELECT DISTINCT cat from fullProductView;`;
    
    let products = (await con.query(query))
    let cats = (await con.query(query2))
    let index = processData(products,cats);

    function processData(products,cats) {
        const result = [];
        
        // Iteramos sobre los elementos principales
        cats.forEach((category, index) => {
          const children = [];
          
          // Filtramos los elementos hijos correspondientes a este elemento principal

          const childItems = []
          products.forEach((product) => {
            console.log(product)
            if(product.cat == category.cat){
                childItems.push(
                    {
                        display: `${product.ref}: ${product.title_en}`,
                        ref: product.ref
                    }
                   )
            }
          })

          // Iteramos sobre los elementos hijos
          childItems.forEach((child, childIndex) => {
            children.push({
              key: `${index}-${childIndex}`,
              label: child.display,
              data: child.ref,
            });
          });
          
          // Agregamos el elemento principal y sus hijos al resultado
          result.push({
            key: index.toString(),
            label: category.cat,
            data: null,
            children: children,
          });
        });
        
        return result;
      }



      res.json(index);
}



const getCatSorted = async (req, res) => {
    const { cat } = req.params;
    let { sortBy } = req.query;
    if (!sortBy){
        sortBy = "ref"
    }
    const query = `SELECT * FROM fullProductView WHERE cat = "${cat}" ORDER BY ${sortBy}`;
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}

const getReferences = async (req, res) => {
    let refs
    let query = ""
    let categories
    try{refs = JSON.parse(req.body.refs)}
    catch{refs = "*"};
    try{categories = JSON.parse(req.body.categories)}
    catch{categories = "*"}
    console.log(req.body.refs)
    if (refs == "*" & categories == "*"){
        query = `SELECT * FROM fullProductView`; 
    }
    else{
    const references_str = refs.map(ref => `'${ref}'`).join(', ');
    query = `SELECT * FROM fullProductView WHERE ref IN (${references_str});`; 
    }
    console.log(query)
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}

const getFullProduct = async (req, res) => {
    const { ref } = req.params;
    const query = 
    `SELECT * FROM fullProductView WHERE ref = '${ref}';`;
    
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}

const addProduct = async (req, res) => {
    const fields = [
        'ref',
        'images',
        'prices',
        'cat',
        'weight',
        'volumetricWeight',
        'title_en',
        'desc_en',
        'comp_en',
        'title_es',
        'desc_es',
        'comp_es',
        'title_fr',
        'desc_fr',
        'comp_fr',
        'title_de',
        'desc_de',
        'comp_de',
        'title_it',
        'desc_it',
        'comp_it'
    ];

    let productData = JSON.parse(req.body.product)
    // productData.prices = JSON.parse(productData.prices)
    productData.images = {images: ["None"]}
    for (let atributo of fields) {
        if (!productData[atributo]){
            productData[atributo] = "-"
      }
        if (typeof(productData[atributo]) == "string"){
        productData[atributo] = mysql.escape(productData[atributo])
        }
        
    }
    const {
        ref,
        images,
        prices,
        cat,
        weight,
        volumetricWeight,
        title_en,
        desc_en,
        comp_en,
        title_es,
        desc_es,
        comp_es,
        title_fr,
        desc_fr,
        comp_fr,
        title_de,
        desc_de,
        comp_de,
        title_it,
        desc_it,
        comp_it
    } = productData;

    const productQuery = `INSERT INTO products (ref, images, prices, cat, weigth, volumetricWeigth)
    VALUES (${ref}, '${JSON.stringify(images)}', '${JSON.stringify(prices)}', ${cat}, ${weight}, ${volumetricWeight}) 
    ON DUPLICATE KEY UPDATE images = '${JSON.stringify(images)}', prices = '${JSON.stringify(prices)}', cat = ${cat}, weigth = ${weight}, volumetricWeigth = ${volumetricWeight}`;

    const enQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES (${ref}, 'en', ${title_en}, ${desc_en}, ${comp_en}) 
    ON DUPLICATE KEY UPDATE productTitle = ${title_en}, productDesc = ${desc_en}, productComposition = ${comp_en}`;

    const esQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES (${ref}, 'es', ${title_es}, ${desc_es}, ${comp_es}) 
    ON DUPLICATE KEY UPDATE productTitle = ${title_es}, productDesc = ${desc_es}, productComposition = ${comp_es}`;

    const frQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES (${ref}, 'fr', ${title_fr}, ${desc_fr}, ${comp_fr}) 
    ON DUPLICATE KEY UPDATE productTitle = ${title_fr}, productDesc = ${desc_fr}, productComposition = ${comp_fr}`;

    const deQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES (${ref}, 'de', ${title_de}, ${desc_de}, ${comp_de}) 
    ON DUPLICATE KEY UPDATE productTitle = ${title_de}, productDesc = ${desc_de}, productComposition = ${comp_de}`;

    const itQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES (${ref}, 'it', ${title_it}, ${desc_it}, ${comp_it}) 
    ON DUPLICATE KEY UPDATE productTitle = ${title_it}, productDesc = ${desc_it}, productComposition = ${comp_it}`;

    const con = await getConnection();
    console.log(await con.query(productQuery));
    console.log(await con.query(enQuery));
    console.log(await con.query(esQuery));
    console.log(await con.query(frQuery));
    console.log(await con.query(deQuery));
    console.log(await con.query(itQuery));
    
    res.json("Product added/updated succesfully")
    return res;
};


const deleteProduct = async (req, res) => {
    console.log("Quiero borrar")
    const { ref } = req.params;
    const query = `DELETE FROM products WHERE ref = "${ref}"`;
    const con = await getConnection();
    let data = await con.query(query)
    res.json("Done")
    return res;
}


export const methods = {
    getAllProductsSorted,
    getFullProduct,
    addProduct,
    deleteProduct,
    getReferences,
    getCatSorted,
    getLanguages,
    getProductIndex,
    getProductFields
}
