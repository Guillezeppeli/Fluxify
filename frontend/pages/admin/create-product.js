import Header from '../../components/Header.js';
import AdminDashboardLayout from '../admin/AdminDashboardLayout.js';
import CreateProduct from '../../components/CreateProduct'; // Assuming you've created this component based on the earlier example

function CreateProductPage() {
  return (
    <>
      <Header />
      <AdminDashboardLayout>
        <h1>Create New Product</h1>
        <CreateProduct />
      </AdminDashboardLayout>
    </>
  );
}

export default CreateProductPage;
