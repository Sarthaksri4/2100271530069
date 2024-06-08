import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    const fetchProductDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/categories/categoryname/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details', error);
        }
    };

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    height="400"
                    image="https://via.placeholder.com/400" // Random placeholder image
                    alt={product.name}
                />
                <CardContent>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography>{product.company}</Typography>
                    <Typography>{product.category}</Typography>
                    <Typography>${product.price}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                    <Typography>Discount: {product.discount}%</Typography>
                    <Typography>Availability: {product.availability}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetail;