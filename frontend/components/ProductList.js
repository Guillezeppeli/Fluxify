import React from 'react';

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name}
          {product.price}
          {[product.category.name]}
          {[product.subcategory.name]}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;