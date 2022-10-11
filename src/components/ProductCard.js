import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import { CartState } from "../context/Context";


const ProductCard = ({data, handleAddToCart}) => {

  const {
    state: { cart },
    dispatch,
  } = CartState();

  // console.log("datain card",data);
  const { name, price , id , imageURL } = data;
  return (
    <Card className="card">

      <CardMedia
          component="img"
          alt={name}
          height="140"
          image={imageURL}
        />
        <CardContent>
          <Stack
             direction="row"
             justifyContent="space-between"
             alignItems="center"
             spacing={2} 
          >
             
              <Typography gutterBottom variant="h6" component="div">
                {name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {"Rs."+price}
              </Typography>

          </Stack>
         
         
          
          <CardActions>
          {cart.some((p) => p.id === data.id) ? (
            <Button
            variant="outlined" color="error"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: data,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: data,
                })
              }
              
            >
              {"Add to Cart"}
            </Button>
          )}
          
           </CardActions>
          

        </CardContent>


    </Card>
  );
};

export default ProductCard;
