import { getConnection } from "../database/database.js";

const getAllProducts = async(req,res) => {
    const con = await getConnection();
    res.json(await con.query(`SELECT * FROM productsEU`));
    
    }
    
    export const methods = {
        getAllProducts
    }
