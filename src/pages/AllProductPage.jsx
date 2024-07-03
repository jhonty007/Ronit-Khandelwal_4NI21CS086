import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Seperate from '../components/Seperate';
import Pagination from '../components/Pagination';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    // Fetch products from an API or use static data
    axios.get('/api/products').then(response => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  }, []);

  // Handle filtering
  const handleFilter = (filters) => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(product => product.category.toLowerCase().includes(filters.category.toLowerCase()));
    }

    if (filters.company) {
      filtered = filtered.filter(product => product.company.toLowerCase().includes(filters.company.toLowerCase()));
    }

    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= parseFloat(filters.rating));
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(price => parseFloat(price));
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    if (filters.availability) {
      filtered = filtered.filter(product => product.availability);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle sorting
  const handleSort = (sortBy) => {
    let sorted = [...filteredProducts];
    if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      sorted.sort((a, b) => b.discount - a.discount);
    }
    setFilteredProducts(sorted);
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Seperate onFilter={handleFilter} onSort={handleSort} />
      <ProductList products={currentProducts} />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default AllProductsPage;
