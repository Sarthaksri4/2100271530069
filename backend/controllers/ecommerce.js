const axios = require('axios');
const { log } = require('console');
const crypto = require('crypto');

const API_URL = 'http://20.244.56.144/test/companies'; 
const ACCESS_TOKEN = process.env.TOKEN;

const getProducts = async (category, top, minPrice, maxPrice, page, sort, order) => {
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    const limit = Math.min(top, 10);
    const offset = (page - 1) * limit;

    try {
        const requests = companies.map(company => 
            axios.get(`${API_URL}/${company}/categories/${category}/products`, {
                params: {
                    top,
                    minPrice,
                    maxPrice
                },
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            })
        );

        const responses = await Promise.all(requests);
        console.log(responses.data);
        let products = responses.flatMap(response => response.data);
        products = products.map(product => ({
            ...product,
            uniqueId: generateUniqueId(product)
        }));

        if (sort) {
            products.sort((e, f) => {
                if (order === 'desc') {
                    return f[sort] - e[sort];
                }
                return e[sort] - f[sort];
            });
        }

        // Pagination logic
        const paginatedProducts = products.slice(offset, offset + limit);

        return paginatedProducts;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

const getProductById = async (id) => {
    try {
        const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
        const requests = companies.map(company => 
            axios.get(`${API_URL}/${company}/categories/Laptop/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            })
        );
        console.log(requests);
        const responses = await Promise.all(requests);
        const product = responses.find(response => response.data.uniqueId === id);
        return product.data;
    } catch (error) {
        throw new Error('Error fetching product by ID');
    }
};

const generateUniqueId = (product) => {
    return crypto.createHash('md5').update(JSON.stringify(product)).digest('hex');
};

module.exports = {
    getProducts,
    getProductById
};
