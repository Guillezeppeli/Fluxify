import React, { useState } from 'react';
import { 
  TextField, 
  InputAdornment, 
  InputBase, 
  IconButton, 
  List, 
  ListItem, 
  Divider 
} from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const SearchProducts = ({ onSearch }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const searchStyles = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: '5px 10px',
    borderRadius: theme.shape.borderRadius,
  }

  const handleSearch = async () => {
    const searchResults = await onSearch(searchTerm);
    setResults(searchResults);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <InputBase
        style={searchStyles}
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon color='action' />
            </IconButton>
          </InputAdornment>
        )}
      />
      {results && results.length > 0 && (
        <TextField>
        {results.map((product, index) => (
          <React.Fragment key={product._id}>
            <ListItem 
              button 
              onClick={() => {
                // Handle what happens when a product is clicked
              }}
              style={{ 
                padding: '10px 20px',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              {product.imageURL && (
                <img 
                  src={product.imageURL} 
                  alt={product.name} 
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '5px', 
                    marginRight: '15px' 
                  }} 
                />
              )}
              <div style={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">${product.price}</Typography>
              </div>
            </ListItem>
            {index !== results.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </TextField>
      
      )}
    </div>
  )
}
export default SearchProducts;
