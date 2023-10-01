import instance from '../../utils/axiosConfig.js';
import Header from '../../components/Header.js'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Rating
} from '@mui/material';

const ProductDetail = ({ product }) => {
    if (!product) return <div>Loading...</div>;

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
                Category: {product.category.name}  {/* Assuming category is populated */}
              </Typography>
              <Typography variant="body2">
                Subcategory: {product.subcategory.name}  {/* Assuming subcategory is populated */}
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
