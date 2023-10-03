import React, { useContext } from 'react';
import Header from '../components/Header.js';
import { CartContext } from '../context/CartContext';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const handleRemoveFromCart = (productToRemove) => {
    setCart((currentCart) => currentCart.filter(product => product._id !== productToRemove._id));
  };

  return (
    <div>
      <Header />
      <Container style={{ marginTop: '15px'}}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
          ) : (
            <List>
            {cart.map((product) => (
              <ListItem key={product._id}>
                <ListItemText
                  primary={product.name}
                  secondary={`Price: $${product.price}`}
                  />
                <Button variant="outlined" color="secondary" onClick={() => handleRemoveFromCart(product)}>
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </div>
  );
}
