import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    cartContainer: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: '#f9f9f9',
        borderRadius: theme.spacing(1),
    },
}));

const Cart = ({ cartItems }) => {
    const classes = useStyles();

    return (
        <div className={classes.cartContainer}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            <Divider />
            {cartItems.length === 0 ? (
                <Typography variant="body1">Your cart is empty</Typography>
            ) : (
                <List>
                    {cartItems.map(item => (
                        <React.Fragment key={item.id}>
                            <ListItem>
                                <ListItemText
                                    primary={item.title}
                                    secondary={`Quantity: ${item.quantity}`}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </div>
    );
};

export default Cart;
