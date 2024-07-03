import React, { useState } from 'react';

const Seperate = ({ onFilter, onSort }) => {
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [availability, setAvailability] = useState(false);

  const handleFilter = () => {
    onFilter({ category, company, rating, priceRange, availability });
  };

  const handleSort = (sortBy) => {
    onSort(sortBy);
  };

  return (
    <div>
      <h2>Filter Products</h2>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <label>Company:</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <div>
        <label>Price Range:</label>
        <input type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
      </div>
      <div>
        <label>Availability:</label>
        <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
      <h2>Sort Products</h2>
      <button onClick={() => handleSort('price')}>Sort by Price</button>
      <button onClick={() => handleSort('rating')}>Sort by Rating</button>
      <button onClick={() => handleSort('discount')}>Sort by Discount</button>
    </div>
  );
};

export default Seperate;
