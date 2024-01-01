import { getConnection } from "../database/database.js";

const getAllProductsSorted = async (req, res) => {
    const { sortBy } = req.query;
    const query = `SELECT * FROM products ORDER BY ${sortBy}`;
    
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}

const getCatSorted = async (req, res) => {
    const { cat } = req.params;
    const { sortBy } = req.query;
    const query = `SELECT * FROM products WHERE cat = "${cat}" ORDER BY ${sortBy}`;
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}

const getReferences = async (req, res) => {
    const refs = JSON.parse(req.body.refs);
    if (!refs){
        res.json("No refs provided")
    }
    const references_str = refs.map(ref => `'${ref}'`).join(', ');
    const query = `SELECT * FROM products WHERE ref IN (${references_str});`; 
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}

const getFullProduct = async (req, res) => {
    const { ref } = req.params;
    const query = 
    `SELECT 
    p.*,
    pt_en.productTitle AS title_en,
    pt_en.productDesc AS desc_en,
    pt_en.productComposition AS comp_en,
    pt_es.productTitle AS title_es,
    pt_es.productDesc AS desc_es,
    pt_es.productComposition AS comp_es,
    pt_fr.productTitle AS title_fr,
    pt_fr.productDesc AS desc_fr,
    pt_fr.productComposition AS comp_fr,
    pt_de.productTitle AS title_de,
    pt_de.productDesc AS desc_de,
    pt_de.productComposition AS comp_de,
    pt_it.productTitle AS title_it,
    pt_it.productDesc AS desc_it,
    pt_it.productComposition AS comp_it
FROM 
    products p
LEFT JOIN 
    productTranslations pt_en ON p.ref = pt_en.ref AND pt_en.lang = 'EN'
LEFT JOIN 
    productTranslations pt_es ON p.ref = pt_es.ref AND pt_es.lang = 'ES'
LEFT JOIN 
    productTranslations pt_fr ON p.ref = pt_fr.ref AND pt_fr.lang = 'FR'
LEFT JOIN 
    productTranslations pt_de ON p.ref = pt_de.ref AND pt_de.lang = 'DE'
LEFT JOIN 
    productTranslations pt_it ON p.ref = pt_it.ref AND pt_it.lang = 'IT'
WHERE 
    p.ref = '${ref}';
`;
    
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(datos);
}

const addProduct = async (req, res) => {
    const {
        ref,
        images,
        prices,
        cat,
        weigth,
        volumetricWeigth,
        title_en,
        desc_en,
        composition_en,
        title_es,
        desc_es,
        composition_es,
        title_fr,
        desc_fr,
        composition_fr,
        title_de,
        desc_de,
        composition_de,
        title_it,
        desc_it,
        composition_it
    } = JSON.parse(req.body.product);
    console.log(ref)

    const productQuery = `INSERT INTO products (ref, images, prices, cat, weigth, volumetricWeigth)
    VALUES ('${ref}', '${JSON.stringify(images)}', ${JSON.stringify(prices)}, '${cat}', ${weigth}, ${volumetricWeigth}) 
    ON DUPLICATE KEY UPDATE images = '${JSON.stringify(images)}', prices = ${JSON.stringify(prices)}, cat = '${cat}', weigth = ${weigth}, volumetricWeigth = ${volumetricWeigth}`;

    const enQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES ('${ref}', 'en', '${title_en}', '${desc_en}', '${composition_en}') 
    ON DUPLICATE KEY UPDATE productTitle = '${title_en}', productDesc = '${desc_en}', productComposition = '${composition_en}'`;

    const esQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES ('${ref}', 'es', '${title_es}', '${desc_es}', '${composition_es}') 
    ON DUPLICATE KEY UPDATE productTitle = '${title_es}', productDesc = '${desc_es}', productComposition = '${composition_es}'`;

    const frQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES ('${ref}', 'fr', '${title_fr}', '${desc_fr}', '${composition_fr}') 
    ON DUPLICATE KEY UPDATE productTitle = '${title_fr}', productDesc = '${desc_fr}', productComposition = '${composition_fr}'`;

    const deQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES ('${ref}', 'de', '${title_de}', '${desc_de}', '${composition_de}') 
    ON DUPLICATE KEY UPDATE productTitle = '${title_de}', productDesc = '${desc_de}', productComposition = '${composition_de}'`;

    const itQuery = `INSERT INTO productTranslations (ref, lang, productTitle, productDesc, productComposition)
    VALUES ('${ref}', 'it', '${title_it}', '${desc_it}', '${composition_it}') 
    ON DUPLICATE KEY UPDATE productTitle = '${title_it}', productDesc = '${desc_it}', productComposition = '${composition_it}'`;

    const con = await getConnection();

    // console.log(await con.query(productQuery));
    // console.log(await con.query(enQuery));
    // console.log(await con.query(esQuery));
    // console.log(await con.query(frQuery));
    // console.log(await con.query(deQuery));
    // console.log(await con.query(itQuery));

    // console.log(productQuery);
    // console.log(enQuery);
    // console.log(esQuery);
    // console.log(frQuery);
    // console.log(deQuery);
    // console.log(itQuery);
    res.json("Product added/updated succesfully")
    return res;
};


const deleteProduct = async (req, res) => {
    const { ref } = req.params;
    const query = `DELETE FROM products WHERE ref = "${ref}"`;
    const con = await getConnection();
    res = await con.query(query)
    return res;
}

function productParserToDb(products){

}
function productParserToFrontEnd(products){

}

export const methods = {
    getAllProductsSorted,
    getFullProduct,
    addProduct,
    deleteProduct,
    getReferences,
    getCatSorted
}
