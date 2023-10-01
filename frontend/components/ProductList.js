import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import Link from 'next/link';

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Box display="flex" flexWrap="wrap" gap={2}>
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
              <Card className="p-4" style={{ width: '300px', margin: '10px' }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.imageURL}
                  title={product.name}
                />
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
          </Link>
        ))}
      </Box>
    </div>
  );
};

export default ProductList;