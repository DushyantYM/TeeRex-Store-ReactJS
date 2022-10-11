
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Header from "./Header";
import { Button, IconButton, Stack , Box} from "@mui/material";
import { CartState } from "../context/Context";
import "./Cart.css"



// Definition of Data Structures used
/**
 * @typedef {Object} products - array of product objects
 * @property {string} name - The name or title of the product
 *  @property {String} type - The type of the product
 * @propery {Object} cart - Array of products in cart
 * @property {number} price - The price to buy the product
 * @property {string} imageURL - Contains URL for the product image
 * @property {string} id - Unique ID for the product
 * @property {string} color: color of product
 * @property {string} gender: gender for product
 * @property {Number} quantity: Total quantity of product
 * 
 * 
 */

const Cart = () => {

  const {enqueueSnackbar}  = useSnackbar();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  // console.log("cart",cart)


  /**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */

const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete
}) => {

 
  return (
     
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
   
  );
   
};


  /**
   * Definition to handle product valid quatity
   * This is the function that is called on price filter
   *
   * @param {{Array , Number}} priceArray, product price
   *    Array of price contains value of price range
   *    Nummber is product price
   *
   * @returns { boolean value }
   *      boolean value if product price in a range
   *
   *
   *
   */



const chechValidQty = (qty , quantity) => {

  if(qty >= quantity){

    enqueueSnackbar("Can't add more products", {variant : 'error'})
    return false;

  }
  return true;


}




  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);



  return (
   
    <Box className="cart">

      <Header cartHeader ={true}/>     

      { 
       
       cart.map(({imageURL, price , name ,qty , id, quantity}) => {

          return (

            <Box display="flex" alignItems="flex-start" padding="1rem">
              <Box className="image-container">
                <img
                    // Add product image
                    src={imageURL}
                    // Add product name as alt eext
                    alt={name}
                    width="100%"
                    height="100%"
                />
             </Box>
             <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"

             >
              <Box flexDirection="row">

                <div>{name}</div>
                <Box padding="0.5rem" fontWeight="700">
                      INR {price}
                </Box>

              </Box>
               
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                {
                  (<ItemQuantity
                    // Add required props by checking implementation
                   
                    value = {qty}

                    // onClick={() =>
                      //                   dispatch({
                      //                     type: "REMOVE_FROM_CART",
                      //                     payload: prod,
                      //                   })
                      //                 }
                  
                    handleAdd = {
                      () => {

                      if(chechValidQty(qty, quantity)){

                        dispatch({
                          type : "CHANGE_CART_QTY",
                          payload : {
                            id : id,
                            qty : qty +1
                          }
                        })

                      }
                        
                      
                      


                      }

                      
                     
                    }
                    handleDelete = {

                      () => dispatch({
                        type : "CHANGE_CART_QTY",
                        payload : {
                          id : id,
                          qty : qty - 1
                        }
                      })
                 
                    }
                    
                    />)
                
                   

                }
          

               
               
              </Box>
            </Box>

          <Box sx={{ display : 'flex', alignItems :"center", justifyContent : 'center'}}>

            <Button variant="outlined" startIcon={<DeleteIcon />}

            onClick = { () => {
              dispatch({
                type : "REMOVE_FROM_CART",
                payload : {
                  id : id
                }
                  
                  
              })
            }}
            
            >
                Delete
            </Button>

          </Box>

            

        </Box>


          )

       })

          

      }

      <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            INR {total}
          </Box>
        </Box>



    </Box>

    




  );
};

export default Cart;
