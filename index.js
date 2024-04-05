`use strict`;

const express = require(`express`);
const cors = require(`cors`);
const bodyparser = require(`body-parser`);
const productsRoutes = require(`./src/routes/products.routes.js`);
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.use(`/api`, productsRoutes.routes);

app.listen(3000, () => {
    console.log(`App is listening on port 3000...`);
});