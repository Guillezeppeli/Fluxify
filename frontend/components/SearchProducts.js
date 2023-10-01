import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { searchProductsByTerms } from '../utils/productServices.js';
import Link from 'next/link';

const SearchProducts = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const fetchedResults = await searchProductsByTerms(searchTerm);
      setResults(fetchedResults);
  } catch (error) {
      console.error("Error searching products:", error.message);
  }
};

return (
  <div className="flex flex-col items-center justify-center ">
      <div className="flex border rounded-md p-2 w-2/3 md:w-1/2 lg:w-1/3">
          <Autocomplete
              freeSolo
              options={results.map((option) => option.name)}
              onInputChange={(event, newInputValue) => {
                  setSearchTerm(newInputValue);
                  handleSearch();
              }}
              renderInput={(params) => (
                  <TextField 
                      {...params} 
                      variant="outlined" 
                      className="flex-grow px-2 py-1 outline-none text-black"
                      fullWidth
                      InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {params.InputProps.endAdornment}
                              <IconButton onClick={handleSearch}>
                                <SearchIcon className="text-gray-500"/>
                              </IconButton>
                            </>
                          ),
                      }}
                  />
              )}
              className='flex-grow'
          />
      </div>
      <div className="mt-4 position-center">
          {results && results.length > 0 && results.map((product, index) => (
            <div key={product._id} className="flex flex-col rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <Link href={`/products/${product._id}`} passHref></Link>
              {product.imageURL && (
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-t-lg mx-auto"
                />
              )}
              <div className="p-4">
                <h6 className="text-lg font-semibold mb-2 text-center">{product.name}</h6>
                <p className="text-gray-500 text-center">${product.price}</p>
              </div>
            </div>
          ))}
      </div>
  </div>
);
}
export default SearchProducts;
