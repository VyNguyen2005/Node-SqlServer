`use strict`;

const sql = require(`mssql`);

const dbSettings = {
    user:"sa",
    password:"musawir",
    server:"localhost",
    database:"webdev",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

const getConnection = async() => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {getConnection};