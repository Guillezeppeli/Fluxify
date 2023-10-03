import { useState, useContext } from 'react';
import instance from '../../utils/axiosConfig.js';
import Header from '../../components/Header.js'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import CustomButton from '../../components/CustomButton.js'
import { addProductReview } from '../../utils/productServices.js';
import { CartContext } from '../../context/CartContext.js';
import { useRouter } from 'next/router';

const ProductDetail = ({ product }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { cart, setCart } = useContext(CartContext);
  const router = useRouter();
    if (!product) return <div>Loading...</div>;

const handleReviewSubmit = async () => {
  try {
    await addProductReview(product._id, { 
      rating: rating, 
      comment: comment 
    });
    alert('Review added successfully!');
    setRating(null);
    setComment('');
    router.push(`/products/${router.query.id}`);
  } catch (error) {
    console.error("Error adding review:", error.message);
    alert(error.message);
  }
};

const addToCart = (product) => {
  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item._id === product._id);
  if (existingProduct) {
    // Update quantity if product exists
    setCart(cart.map(item => 
      item._id === product._id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    ));
  } else {
    // Add product to cart if not present
    setCart([...cart, { ...product, quantity: 1 }]);
  }
};

    return (
      <div>
        <Header />
          <div className="flex justify-center items-center min-h-screen"> 
            <Card className="max-w-lg mx-auto mt-10">
            {product.imageURL && (
              <CardMedia
              component="img"
              alt={product.name}
              style={{ maxWidth: '250px', maxHeight: '250px', display: 'block', margin: 'auto' }} 
              image={product.imageURL}
              title={product.name}
              />
              )}
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Description: {product.description}
              </Typography>
              <Typography variant="body2">
                Price: ${product.price}
              </Typography>
              <Typography variant="body2">
                Stock: {product.stock}
              </Typography>
              <Typography variant="body2">
                Category: {product.category.name}
              </Typography>
              <Typography variant="body2">
                Subcategory: {product.subcategory.name}
              </Typography>
              <Typography variant="body2">
                Rating: {product.rating} / 5
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Reviews:
              </Typography>
              {product.reviews.map(review => (
                <Typography key={review._id} variant="body2">
                  {review.name}: {review.comment} (Rating: {review.rating})
                </Typography>
              ))}
              <Typography variant="h6" gutterBottom>
                Add a Review:
              </Typography>

              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rating:</Typography>
                <Rating 
                  name="product-rating"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Box>

              <TextField
                label="Comment"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <CustomButton 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '10px' }}
                onClick={handleReviewSubmit}
              >
                Submit Review
              </CustomButton>
              <CustomButton 
                variant="contained" 
                color="primary" 
                style={{ marginTop: '10px', marginLeft: '175px' }}
                onClick={() => addToCart(product)}>
                  Add to Cart
                </CustomButton>
            </CardContent>
          </Card>
        </div>
      </div>
    );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  let product = null;
  let errorMessage = null;

  try {
      const response = await instance.get(`/products/${id}`);
      product = response.data;
  } catch (error) {
      console.error("Failed to fetch product:", error);
      if (error.response) {
        // Log the server response error details
        errorMessage = error.message
        console.error("Server Response Error:", error.response.data);
    }
  }

  return {
      props: { product }
  };
}

export default ProductDetail;
