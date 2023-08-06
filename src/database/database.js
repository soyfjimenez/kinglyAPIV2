import mysql from "promise-mysql";

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});
export const getConnection = () => {
    return connection;
};
export default getConnection;
