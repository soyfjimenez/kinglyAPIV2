import { getConnection } from "../database/database.js";

const getAllProducts = async (req, res) => {
    const {country} = req.params;
    const query = `SELECT * FROM products`;
    if(country == "fr" || country == "es"){
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(increasePrice(datos,1.05));
    }
    else if(country == "en" || country == "it" || country == "de"){
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos,1.00));
        }
    else{res.json("INVALID COUNTRY CODE")}
}

const getSocks = async (req, res) => {
    const {country} = req.params;
    const query = `SELECT * FROM products WHERE cat = "socks"`;
    if(country == "fr" || country == "es"){
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(increasePrice(datos,1.05));
    }
    else if(country == "en" || country == "it" || country == "de"){
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos,1.00));
        }
    else{res.json("INVALID COUNTRY CODE")}
}
const getCompactTextiles = async (req, res) => {
    const {country} = req.params;
    const query = `SELECT * FROM products WHERE cat = "compactTextiles"`;
    if(country == "fr" || country == "es"){
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(increasePrice(datos,1.05));
    }
    else if(country == "en" || country == "it" || country == "de"){
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos,1.00));
        }
    else{res.json("INVALID COUNTRY CODE")}

}
const getPackaging = async (req, res) => {
    const {country} = req.params;
    const query = `SELECT * FROM products WHERE cat = "packaging"`;
    if(country == "fr" || country == "es"){
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(increasePrice(datos,1.05));
    }
    else if(country == "en" || country == "it" || country == "de"){
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos,1.00));
        }
    else{res.json("INVALID COUNTRY CODE")}
}

const getKnitwear = async (req, res) => {
    const {country} = req.params;
    const query = `SELECT * FROM products WHERE cat = "knitwear"`;
    if(country == "fr" || country == "es"){
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(increasePrice(datos,1.05));
    }
    else if(country == "en" || country == "it" || country == "de"){
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos,1.00));
        }
    else{res.json("INVALID COUNTRY CODE")}
}

const getTowels = async (req, res) => {
    const {country} = req.params;
    const query = `SELECT * FROM products WHERE cat = "towels"`;
    if(country == "fr" || country == "es"){
    const con = await getConnection();
    let datos = (await con.query(query))
    res.json(increasePrice(datos,1.05));
    }
    else if(country == "en" || country == "it" || country == "de"){
        const con = await getConnection();
        let datos = (await con.query(query))
        res.json(increasePrice(datos,1.00));
        }
    else{res.json("INVALID COUNTRY CODE")}
}

function increasePrice(products,increase){
    products.forEach(product =>{
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

        for (const atribute in product){
            if (product[atribute] == 0 || product[atribute] == null || product[atribute] == ""){
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
    getTowels
}
