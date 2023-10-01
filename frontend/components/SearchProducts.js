import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { searchProductsByTerms } from '../utils/productServices.js';
import { useRouter } from 'next/router';

const SearchProducts = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const fetchedResults = await searchProductsByTerms(searchTerm);
      console.log("Fetched Results:", results);
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
    options={results}
    getOptionLabel={(option) => 
        option.name 
        ? `${option.name} - ${option.category?.name || ''} - ${option.subcategory?.name || ''}`
        : ""
    }
    onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
        handleSearch();
    }}
    onChange={(event, value) => {
      if (value && value._id) {
          router.push(`/products/${value._id}`);
      }
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
</div>
);
}
export default SearchProducts;