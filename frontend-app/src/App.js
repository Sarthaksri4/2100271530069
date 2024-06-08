import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        E-Commerce App
                    </Typography>
                </Toolbar>
            </AppBar>
          
        </Router>
    );
}

export default App;