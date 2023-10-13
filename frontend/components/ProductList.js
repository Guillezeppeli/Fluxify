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
        const data = await fetchProducts(currentPage, 6);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
  
    fetchProductsList();
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Products Grid */}
      <div className="flex flex-wrap justify-center mt-4 w-full">
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <Card className="m-4" style={{ width: '300px', height: '500px', justify: 'end' }}>
              <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.imageURL}
                  title={product.name}
                  style={{ height: '280px', width: '100%', objectFit: 'cover' }}
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
      
      {/* Pagination Controls */}
      <div className="mt-2 mb-8 w-full flex justify-center">
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