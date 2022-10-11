import React from 'react'
import {Box ,Typography, Stack, Button, Badge } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link} from 'react-router-dom'
import "./Header.css"
import { CartState } from "../context/Context";

const Header = ({cartHeader}) => {

    const {
        state: { cart },
        dispatch,
      } = CartState();
    

    // const history = useHistory();

  return (

        <Box className= "header">

        
             <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <Typography variant="h5" gutterBottom>
                        TeeRex Store
                </Typography>
              </Link>
             

              <Box sx={{ display : 'flex',  justifyContent: 'flex-end' }}>

              <Typography variant="h6" display="block" gutterBottom>
                 { cartHeader ? "Shopping Cart" : "Products" }
              </Typography>

                <Link to="/cart" >
                        <Button
                            >
                            <Badge badgeContent={cart.length} color="primary">
                                <AddShoppingCartIcon />
                                
                            </Badge> 

                        </Button>
                    
                    </Link>     


              </Box>
                
            
            {/* </Stack> */}
         </Box>
       
  )


}

export default Header