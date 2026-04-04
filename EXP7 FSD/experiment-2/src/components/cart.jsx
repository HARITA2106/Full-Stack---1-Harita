import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Paper
} from '@mui/material';

function Cart() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Product</b></TableCell>
            <TableCell><b>Price</b></TableCell>
            <TableCell><b>Quantity</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.quantity}
                  size="small"
                  onChange={(e) =>
                    dispatch(updateQuantity({
                      id: item.id,
                      quantity: Number(e.target.value)
                    }))
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h5" sx={{ mt: 3, textAlign: 'right' }}>
        Total: ${total.toFixed(2)}
      </Typography>
    </Paper>
  );
}

export default Cart;