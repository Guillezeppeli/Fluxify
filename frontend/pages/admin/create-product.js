import AdminDashboardLayout from '../admin/AdminDashboardLayout.js';
import CreateProduct from '../../components/CreateProduct.js';
import Categories from '../../components/Categories.js'; // Assuming you've created this component based on the earlier example

function CreateProductPage() {
  return (
    <>
      <AdminDashboardLayout>
        <CreateProduct />
        <Categories />
      </AdminDashboardLayout>
    </>
  );
}

export default CreateProductPage;
