import { getConnection } from "../database/database.js";

const getAllProducts = async (req, res) => {
    const { country } = req.params;
    const query = `SELECT * FROM fullProductView`;
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

const getCat = async (req, res) => {
    const { country, cat } = req.params;
    const query = `SELECT * FROM fullProductView WHERE cat = '${cat}'`;
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
    const query = `SELECT * FROM fullProductView WHERE ref = "${ref}"`;
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


function increasePrice(products, increase) {
    products.forEach(product => {
        let newPrices = JSON.parse(product.prices)
        console.log(newPrices)
        for (let price in newPrices){
            // price = price * increase
            newPrices[price]["price"] = (newPrices[price]["price"] * increase).toFixed(2)
        }
        product.prices = newPrices
    })
    return products;
}
export const methods = {
    getAllProducts,
    getCat,
    getSingleProduct
}
