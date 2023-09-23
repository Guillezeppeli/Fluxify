export async function fetchProducts() {
  const response = await fetch('http://localhost:5000/api/products');
  const products = await response.json();
  return products;
}
