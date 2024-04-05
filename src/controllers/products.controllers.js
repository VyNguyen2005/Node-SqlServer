`use strict`;

const { getConnection } = require(`../database/connection.js`);
const sql = require(`mssql`);

// GET
const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM products');
        res.json(result.recordset);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}
// POST
const createProducts = async (req, res) => {
    try {
        const data = req.body;
        const pool = await getConnection();
        const created = await pool.request()
            .input(`name`, sql.NVarChar, data.name)
            .input(`description`, sql.Text, data.description)
            .input(`quantity`, sql.Int, data.quantity)
            .input(`price`, sql.Decimal, data.price)
            .query("INSERT INTO products(name, description, quantity, price) VALUES(@name, @description, @quantity, @price); SELECT SCOPE_IDENTITY() AS id;");
        res.json({
            id: created.recordset[0].id,
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            price: data.price
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}
// GET byID
const getProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input(`id`, sql.Int, req.params.id)
        .query("SELECT * FROM products WHERE id = @id");
    if (result.rowsAffected[0] === 0) {
        return res.status(400).json({ message: "Product not found" });
    }
    return res.json(result.recordset[0]);
}
const deleteProduct = async (req, res) => {
    const pool = await getConnection();
    const deleted = await pool.request()
                            .input("id", sql.Int, req.params.id)
                            .query("DELETE FROM products WHERE id = @id");
    if(deleted.rowsAffected[0] === 0){
        return res.status(400).json({ message: "Product not found" });
    }
    return res.json({message: "Product deleted"});
}
const updateProduct = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    const pool = await getConnection();
    const updated = await pool.request()
                                .input(`id`, sql.Int, id)
                                .input(`name`, sql.NVarChar, data.name)
                                .input(`description`, sql.Text, data.description)
                                .input(`quantity`, sql.Int, data.quantity)
                                .input(`price`, sql.Decimal, data.price)
                                .query("UPDATE products SET name=@name, description=@description, quantity=@quantity, price=@price WHERE id=@id");
    if(updated.rowsAffected[0] === 0){
        return res.status(400).json({message: "Product not found"});
    }
    return res.json({
        id: id,
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.price
    });
}
module.exports = { getProducts, createProducts, getProduct, deleteProduct, updateProduct};