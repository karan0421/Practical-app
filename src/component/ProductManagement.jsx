import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://fakestoreapi.com/products";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleFilterChange(selectedCategory, searchTerm);
  }, [products, searchTerm, selectedCategory]);

  const getData = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
      setFilteredProducts(response.data);
      const uniqueCategories = [
        "All",
        ...new Set(response.data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products!");
    }
  };

  const handleFilterChange = (category, search = searchTerm) => {
    setSelectedCategory(category);
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setIsUpdate(false);
  };

  const handleUpdate = (product) => {
    setNewProduct(product);
    setShowModal(true);
    setIsUpdate(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${newProduct.id}`,
        newProduct
      );
      toast.success("Product updated successfully!");
      setProducts((prev) =>
        prev.map((prod) => (prod.id === newProduct.id ? response.data : prod))
      );
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product!");
    } finally {
      setShowModal(false);
      setIsUpdate(false);
    }
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setNewProduct({
      title: "",
      price: "",
      description: "",
      category: "",
    });
    setShowModal(true);
    setIsUpdate(false);
  };

  const handleCreateSubmit = async () => {
    try {
      const response = await axios.post(API_BASE_URL, newProduct);
      const newProductWithId = {
        ...newProduct,
        id: response.data.id || Math.random().toString(36).substring(2, 9),
      };

      setProducts((prev) => [...prev, newProductWithId]);
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product!");
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${productId}`);
      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product!");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button variant="success" onClick={handleCreate}>
            Create Product
          </Button>
          <DropdownButton
            title={`Filter by Category: ${selectedCategory}`}
            onSelect={(category) => handleFilterChange(category)}
          >
            {categories.map((category) => (
              <Dropdown.Item key={category} eventKey={category}>
                {category}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <input
            type="text"
            className="form-control w-50 ms-3"
            placeholder="Search by product title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleView(product)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdate(product)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdate
              ? "Update Product"
              : selectedProduct
              ? "View Product"
              : "Create Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && !isUpdate ? (
            <div>
              <p>
                <strong>Title:</strong> {selectedProduct.title}
              </p>
              <p>
                <strong>Price:</strong> {selectedProduct.price}
              </p>
              <p>
                <strong>Description:</strong> {selectedProduct.description}
              </p>
              <p>
                <strong>Category:</strong> {selectedProduct.category}
              </p>
            </div>
          ) : (
            <form>
              <div className="mb-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={newProduct.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={newProduct.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={newProduct.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={newProduct.category}
                  onChange={handleChange}
                />
              </div>
            </form>
          )}
        </Modal.Body>
        {(!selectedProduct || isUpdate) && (
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={isUpdate ? handleUpdateSubmit : handleCreateSubmit}
            >
              {isUpdate ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      <ToastContainer />
    </>
  );
}

export default ProductManagement;
