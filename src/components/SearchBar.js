import React,{useState} from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterToolTip from './FilterToolTip';
import { Button, Box} from '@mui/material'
import { Search } from "@mui/icons-material";

import {
  InputAdornment,
  TextField,
} from "@mui/material";
import "./SearchBar.css"

const debounceTimeout = 0;

const SearchBar = ({debounceSearch}) => {

    const [searchText, setSearchText ] = useState("");


  return (


    <>

       <div className="search">

        <Box className="search-mobile">

    

            <TextField
                
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search for products"
                name="search"
                value={searchText}
                onChange={(e) =>{

                    setSearchText(e.target.value);
                    debounceSearch(e,debounceTimeout)

                } }

              />
             
            

        
          



        </Box>

         






          <TextField
            className="search-desktop"
            size="medium"
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for products"
            name="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              debounceSearch(e,debounceTimeout);
            }}
          />

        </div>
    
    
    </>
    
    
  )
}

export default SearchBar