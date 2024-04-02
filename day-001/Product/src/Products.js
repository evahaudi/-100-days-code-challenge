import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Grid, Card, CardContent, CardMedia,Dialog,DialogActions, DialogContent,DialogTitle, Typography, Button, useTheme } from '@mui/material';
import { tokens } from './theme';
import Cart from './Cart';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: '30px',
        marginRight: '30px',
        position: 'relative', 
    },
    cardMedia: {
        height: 140,
    },
    cartButton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999,
    },
}));

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                const productsData = response.data.products;
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        console.log('Adding product to cart:', product);
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <div className={classes.root}>
            <h1>Best Products</h1>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.thumbnail}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rating: {product.rating}
                                </Typography>
                                <Button variant="contained" style={{
                                    color: colors.white[100],
                                    backgroundColor: colors.blueAccent[500],
                                }} onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={showCart} onClose={toggleCart} aria-labelledby="cart-dialog-title">
                <DialogTitle id="cart-dialog-title"><b/>Order Items</DialogTitle>
                <DialogContent>
                    <Cart cartItems={cartItems} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleCart} style={{
                                    color: colors.white[100],
                                    backgroundColor: colors.greenAccent[200],
                                }} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Button className={classes.cartButton} variant="contained" style={{
                                    color: colors.white[100],
                                    backgroundColor: colors.greenAccent[200],
                                }} onClick={toggleCart}>
                Cart ({cartItems.length})
            </Button>
        </div>
    );
};

export default Products;
