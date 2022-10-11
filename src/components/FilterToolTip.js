import React from 'react'
import FilterPanel from './FilterPanel'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Button, Tooltip, Box }  from '@mui/material';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Header from './Header';
import './FilterToolTip.css'

const FilterToolTip = ({filterFunction}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
   


    return (

        <>

               <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
                   <FilterAltIcon />
                </Button>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                }}
               
                >
                    <Box sx={{ height : '25rem', width : '10rem'  }} className = "filter-panel-small">

                      <FilterPanel filterFunction={filterFunction}/>


                    </Box>
                 
                </Popover>

        
        
        </>
        

    
    
        );

       




  
}

export default FilterToolTip