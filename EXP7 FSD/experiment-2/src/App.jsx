import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/cart';
import { Container } from '@mui/material';

function App() {
  return (
    <Container sx={{ py: 4 }}>
      <ProductList />
      <Cart />
    </Container>
  );
}

export default App;