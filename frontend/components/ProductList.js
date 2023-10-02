import { useState, useEffect} from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography,
  Pagination,
  Stack 
} from '@mui/material';
import { fetchProducts } from '../utils/productServices';
import Link from 'next/link';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        const data = await fetchProducts(currentPage, 4);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
  
    fetchProductsList();
  }, [currentPage]);

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="grid grid-cols-2 gap-4 justify-end">
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
      </div>
  
      {/* Pagination Controls with Material-UI */}
      <div className="mt-auto mb-4">
        <Stack spacing={2} justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
}

export default ProductList;