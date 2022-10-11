import React from 'react'
import ProductCard from './ProductCard'

import { Grid, Box } from '@mui/material'

const Productgrid = ({data, addToCart }) => {

  // console.log("data", data);


  const productCards = data && data.map( (product,idx) => (

                <Grid item xs={6} sm ={4} md={3} key ={idx}>
                    <ProductCard key = {product.id} data= {product} handleAddToCart = { () => addToCart(product)}/>
                </Grid>
  ))





  return (
    <div>


        <Box sx={{ width: '100%', margin : '2rem' }}>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {productCards}
             </Grid>
        
        </Box>





    </div>
  )
}

export default Productgrid