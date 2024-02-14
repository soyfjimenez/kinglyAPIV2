import { getConnection } from "../database/database.js";

const getAllProducts = async (req, res) => {
    const { country } = req.params;
    const query = `SELECT * FROM products`;
    if (country == "fr" || country == "es") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.05));
    }
    else if (country == "en" || country == "it" || country == "de") {
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos, 1.00));
    }
    else { res.json("INVALID COUNTRY CODE") }
}

const getSocks = async (req, res) => {
    const { country } = req.params;
    const query = `SELECT * FROM products WHERE cat = "socks"`;
    if (country == "fr" || country == "es") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.05));
    }
    else if (country == "en" || country == "it" || country == "de") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.00));
    }
    else { res.json("INVALID COUNTRY CODE") }
}
const getCompactTextiles = async (req, res) => {
    const { country } = req.params;
    const query = `SELECT * FROM products WHERE cat = "compactTextiles"`;
    if (country == "fr" || country == "es") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.05));
    }
    else if (country == "en" || country == "it" || country == "de") {
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos, 1.00));
    }
    else { res.json("INVALID COUNTRY CODE") }

}
const getPackaging = async (req, res) => {
    const { country } = req.params;
    const query = `SELECT * FROM products WHERE cat = "packaging"`;
    if (country == "fr" || country == "es") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.05));
    }
    else if (country == "en" || country == "it" || country == "de") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.00));
    }
    else { res.json("INVALID COUNTRY CODE") }
}

const getKnitwear = async (req, res) => {
    const { country } = req.params;
    const query = `SELECT * FROM products WHERE cat = "knitwear"`;
    if (country == "fr" || country == "es") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.05));
    }
    else if (country == "en" || country == "it" || country == "de") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.00));
    }
    else { res.json("INVALID COUNTRY CODE") }
}

const getTowels = async (req, res) => {
    const { country } = req.params;
    const query = `SELECT * FROM products WHERE cat = "towels"`;
    if (country == "fr" || country == "es") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.05));
    }
    else if (country == "en" || country == "it" || country == "de") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.00));
    }
    else { res.json("INVALID COUNTRY CODE") }
}

const getSingleProduct = async (req, res) => {
    const { country, ref } = req.params;
    const query = `SELECT * FROM products WHERE ref = "${ref}"`;
    if (country == "fr" || country == "es") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.05));
    }
    else if (country == "en" || country == "it" || country == "de") {
        const con = await getConnection();
        let datos = (await con.query(query))

        res.json(increasePrice(datos, 1.00));
    }
    else { res.json("INVALID COUNTRY CODE") }
}
// const addProduct = async (req, res) => {
//     const { ref, cat, productTitle, productDesc, composition, price150, price250, price350, price500, price750, price1000, price1500, price2500, price3500, price5000, price10000 } = req.body;
//     const query = `INSERT INTO products (ref, cat, productTitle, productDesc, composition, price150, price250, price350, price500, price750, price1000, price1500, price2500, price3500, price5000, price10000) VALUES ("${req.body.ref}", "${req.body.cat}", "${req.body.productTitle}", "${req.body.productDesc}", "${req.body.composition}", "${req.body.price150}", "${req.body.price250}", "${req.body.price350}", "${req.body.price500}", "${req.body.price750}", "${req.body.price1000}", "${req.body.price1500}", "${req.body.price2500}", "${req.body.price3500}", "${req.body.price5000}", "${req.body.price10000}") ON DUPLICATE KEY UPDATE productTitle=VALUES(productTitle), productDesc=VALUES(productDesc), composition=VALUES(composition), price150=VALUES(price150), price250=VALUES(price250), price350=VALUES(price350), price500=VALUES(price500), price750=VALUES(price750), price1000=VALUES(price1000), price1500=VALUES(price1500), price2500=VALUES(price2500), price3500=VALUES(price3500), price5000=VALUES(price5000), price10000=VALUES(price10000), cat=VALUES(cat)`;
//     const con = await getConnection();
//     res = await con.query(query)
//     return res;
// }
const addProduct = async (req, res) => {
    const {
        ref,
        cat,
        productTitle,
        productDesc,
        composition,
        price150,
        price250,
        price350,
        price500,
        price750,
        price1000,
        price1500,
        price2500,
        price3500,
        price5000,
        price10000,
        productTitleSpanish,
        productDescSpanish,
        compositionSpanish,
        productTitleFrench,
        productDescFrench,
        compositionFrench,
        productTitleGerman,
        productDescGerman,
        compositionGerman,
        productTitleItalian,
        productDescItalian,
        compositionItalian,
        morePriceBreaks,
        weigth,
        volumetricWeigth
    } = req.body;

    const query = `
        INSERT INTO products (
            ref, 
            cat, 
            productTitle, 
            productDesc, 
            composition, 
            price150, 
            price250, 
            price350, 
            price500, 
            price750, 
            price1000, 
            price1500, 
            price2500, 
            price3500, 
            price5000, 
            price10000,
            productTitleSpanish,
            productDescSpanish,
            compositionSpanish,
            productTitleFrench,
            productDescFrench,
            compositionFrench,
            productTitleGerman,
            productDescGerman,
            compositionGerman,
            productTitleItalian,
            productDescItalian,
            compositionItalian,
            prices,
            weigth,
            volumetricWeigth
        ) VALUES (
            "${req.body.ref}", 
            "${req.body.cat}", 
            "${req.body.productTitle}", 
            "${req.body.productDesc}", 
            "${req.body.composition}", 
            "${req.body.price150}", 
            "${req.body.price250}", 
            "${req.body.price350}", 
            "${req.body.price500}", 
            "${req.body.price750}", 
            "${req.body.price1000}", 
            "${req.body.price1500}", 
            "${req.body.price2500}", 
            "${req.body.price3500}", 
            "${req.body.price5000}", 
            "${req.body.price10000}",
            "${req.body.productTitleSpanish}",
            "${req.body.productDescSpanish}",
            "${req.body.compositionSpanish}",
            "${req.body.productTitleFrench}",
            "${req.body.productDescFrench}",
            "${req.body.compositionFrench}",
            "${req.body.productTitleGerman}",
            "${req.body.productDescGerman}",
            "${req.body.compositionGerman}",
            "${req.body.productTitleItalian}",
            "${req.body.productDescItalian}",
            "${req.body.compositionItalian}",
            '${req.body.prices}',
            '${req.body.weigth}',
            '${req.body.volumetricWeigth}'
        ) ON DUPLICATE KEY UPDATE
        productTitle=VALUES(productTitle),
        productDesc=VALUES(productDesc),
        composition=VALUES(composition),
        price150=VALUES(price150),
        price250=VALUES(price250),
        price350=VALUES(price350),
        price500=VALUES(price500),
        price750=VALUES(price750),
        price1000=VALUES(price1000),
        price1500=VALUES(price1500),
        price2500=VALUES(price2500),
        price3500=VALUES(price3500),
        price5000=VALUES(price5000),
        price10000=VALUES(price10000),
        cat=VALUES(cat),
        productTitleSpanish=VALUES(productTitleSpanish),
        productDescSpanish=VALUES(productDescSpanish),
        compositionSpanish=VALUES(compositionSpanish),
        productTitleFrench=VALUES(productTitleFrench),
        productDescFrench=VALUES(productDescFrench),
        compositionFrench=VALUES(compositionFrench),
        productTitleGerman=VALUES(productTitleGerman),
        productDescGerman=VALUES(productDescGerman),
        compositionGerman=VALUES(compositionGerman),
        productTitleItalian=VALUES(productTitleItalian),
        productDescItalian=VALUES(productDescItalian),
        compositionItalian=VALUES(compositionItalian),
        prices=VALUES(prices),
        weigth=VALUES(weigth),
        volumetricWeigth=VALUES(volumetricWeigth)
    `;

    const con = await getConnection();
    const result = await con.query(query);
    console.log(query)
    return result;
};



const deleteProduct = async (req, res) => {
    const { ref } = req.params;
    const query = `DELETE FROM products WHERE ref = "${ref}"`;
    const con = await getConnection();
    res = await con.query(query)
    return res;
}

function increasePrice(products, increase) {
    products.forEach(product => {
        product.price150 = parseFloat((product.price150 * increase).toFixed(2));
        product.price250 = parseFloat((product.price250 * increase).toFixed(2));
        product.price350 = parseFloat((product.price350 * increase).toFixed(2));
        product.price500 = parseFloat((product.price500 * increase).toFixed(2));
        product.price750 = parseFloat((product.price750 * increase).toFixed(2));
        product.price1000 = parseFloat((product.price1000 * increase).toFixed(2));
        product.price1500 = parseFloat((product.price1500 * increase).toFixed(2));
        product.price2500 = parseFloat((product.price2500 * increase).toFixed(2));
        product.price3500 = parseFloat((product.price3500 * increase).toFixed(2));
        product.price5000 = parseFloat((product.price5000 * increase).toFixed(2));
        product.price10000 = parseFloat((product.price10000 * increase).toFixed(2));

        for (const atribute in product) {
            if (product[atribute] == 0 || product[atribute] == null || product[atribute] == "") {
                delete product[atribute];
            }
        }
    })
    return products;
}
export const methods = {
    getAllProducts,
    getSocks,
    getCompactTextiles,
    getPackaging,
    getKnitwear,
    getTowels,
    getSingleProduct,
    addProduct,
    deleteProduct
}