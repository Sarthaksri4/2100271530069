const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/ecommerce');

router.get('/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    console.log(req.params);
    const { top, minPrice, maxPrice, page = 1, sort, order } = req.query;
    try {
        const products = await getProducts(categoryname, top, minPrice, maxPrice, page, sort, order);
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:categoryname/products/:productid', async (req, res) => {
    const { productid } = req.params;
    console.log(req.params);
    try {
        const product = await getProductById(productid);
        console.log(product);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;