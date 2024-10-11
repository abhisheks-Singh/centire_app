import React, { useState, useEffect } from 'react';
import './SearchPage.css';

export function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products/all', { // Fetch all products initially
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setProducts(data.data); // Assuming 'data.data' holds the products array
      setFilteredProducts(data.data); // Initially, show all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  useEffect(() => {
    // Filter products based on the search term in title, description, and vendor
    if (searchTerm) {
      const results = products.filter(product => {
        const title = product.title?.toLowerCase() || ''; // Safeguard against null/undefined
        const description = product.body_html?.toLowerCase() || ''; // Safeguard against null/undefined
        const vendor = product.vendor?.toLowerCase() || ''; // Safeguard against null/undefined
        return (
          title.includes(searchTerm.toLowerCase()) ||
          description.includes(searchTerm.toLowerCase()) ||
          vendor.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products); // If no search term, show all products
    }
  }, [searchTerm, products]);

  return (
    <div className="search-page">
      <h1>Search Products</h1>
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a product..."
        />
        <button type="submit">Search</button>
      </form>
      {filteredProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Vendor</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td dangerouslySetInnerHTML={{ __html: product.body_html }}></td>
                <td>
                  {product.variants.length > 0 && product.variants[0].price} {/* Displaying the first variant price */}
                </td>
                <td>
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0].src}
                      alt={product.title}
                      style={{ width: '100px' }}
                    />
                  )}
                </td>
                <td>{product.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
