import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ProductList = ({ products }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {products.map((product) => (
        <Card key={product.id} style={{ width: '300px', margin: '10px' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Price: ${product.price}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Category: {product.category.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Subcategory: {product.subcategory.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProductList;