import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const products = [
  { id: 1, name: 'Smartphone', price: 299.99 },
  { id: 2, name: 'Tablet', price: 449.99 },
  { id: 3, name: 'Smartwatch', price: 199.99 }
];

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>${product.price}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;