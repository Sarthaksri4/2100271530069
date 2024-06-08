import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import Filter from './Filter';
import Sort from './Sort';
import Pagination from './Pagination';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ category: '', company: '', rating: '', minPrice: 0, maxPrice: 100000, availability: '' });
    const [sort, setSort] = useState({ sortBy: '', order: 'asc' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [filters, sort, page]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/categories/${filters.category}/products`, {
                params: {
                    top: 10,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    page,
                    sort: sort.sortBy,
                    order: sort.order
                }
            });
            console.log(response);
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSortChange = (newSort) => {
        setSort(newSort);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Top Products</Typography>
            <Filter filters={filters} onFilterChange={handleFilterChange} />
            <Sort sort={sort} onSortChange={handleSortChange} />
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item key={product.uniqueId} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://via.placeholder.com/150"
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography>{product.company}</Typography>
                                <Typography>{product.category}</Typography>
                                <Typography>${product.price}</Typography>
                                <Typography>Rating: {product.rating}</Typography>
                                <Typography>Discount: {product.discount}%</Typography>
                                <Typography>Availability: {product.availability}</Typography>
                                <Button variant="contained" color="primary" href={`/product/${product.uniqueId}`}>
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    );
};

export default ProductList;