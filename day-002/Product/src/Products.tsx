import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Theme  } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: '30px',
        marginRight: '30px',
        // padding: theme.spacing(2),
    },
    cardMedia: {
        height: 140,
    },
}));

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
                const productsData = response.data.products;
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Products;
