import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <TextField
            label="Search customers..."
            variant="outlined"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            
            sx={{ border: '2px solid #21222D', backgroundColor: '#21222D', borderRadius: "8px", }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search sx={{color:'#3f51b5'}}/>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;