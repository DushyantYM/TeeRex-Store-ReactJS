import React , {useState, useEffect }from 'react'
import ProductGrid from "./ProductGrid"
import { Stack, Box} from "@mui/material"
import { config } from '../App';
import axios from 'axios';
import FilterPanel from './FilterPanel'
import SearchBar from './SearchBar';
import Header from './Header';
import FilterToolTip from './FilterToolTip';
import "./LandingPage.css"
import { useSnackbar } from "notistack";



// Definition of Data Structures used
/**
 * @typedef {Object} products - array of product objects
 * @property {string} name - The name or title of the product
 *  @property {type} type - The type of the product
 * @property {number} price - The price to buy the product
 * @property {string} imageURL - Contains URL for the product image
 * @property {string} id - Unique ID for the product
 * @property {string} color: color of product
 * @property {string} gender: gender for product
 * @property {Number} quantity: Total quantity of product
 * 
 * 
 */


const LandingPage = () => {

    const {enqueueSnackbar} = useSnackbar();

    const [allProducts , setAllProducts] = useState([]);

    const [products , setProducts ] = useState([]);
    const [searchTextLP , setSearchTextLP ] = useState("");

    // const [filteredProducts , setFilteredProducts]  = useState([])

    const [debounceTimeout , setDebounceTimeout] = useState(0);


    const filters = {
      color: [],
      gender: [],
      price: [],
      type: []
    };

    /**
   * Definition to check product's price is in range
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
   
    const checkPriceInRange = (priceArray, productPrice) => {

        let minPrice = Math.min(...priceArray);
        let maxPrice = Math.max(...priceArray);

        return (productPrice>= minPrice && productPrice <= maxPrice);

    }

    /**
   * Definition for global filter function
   * This is the function that is called to filter products based on collected filter
   *
   * @param {Object} filters
   *    object containing filters of different categories selected by user
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * 
   *
   */
  

    const filterFunction = (filters) => {
     
      let filterCount = 0;

      console.log(filters,"filters")

      const filterKeys = Object.keys(filters);

      console.log(filterKeys,"filterKeys")
      // console.log(filterKeys[0])

      console.log(products, "products");
      //
      let filterOnProducts = searchTextLP.length > 0 ? products : allProducts ;
      console.log("searchtext",searchTextLP);

      let filteredProducts = filterOnProducts.filter( (product) => {

        return filterKeys.every( (key) => {
          
          if(filters[key].length > 0){

             filterCount++;

            // console.log("typeof key")

              if(key === "price"){
                   
                console.log("hello in price ")
                return checkPriceInRange(filters[key],product[key])
                  
              }
              return filters[key].includes(product[key]);
            
          }
          return true;
          
          
        });

      })
      if(filterCount === 0){
        setProducts(allProducts);
      }
      else{

        console.log("after apply filter",filteredProducts);

        setProducts(filteredProducts)

      }

      
      

    }
   
    // **************** SEARCH Filter ****************

    /**
   * Definition for search filter function
   * This is the function that is called to perform serach on products
   *
   * @param {String} searchText
   *    object containing filters of different categories selected by user
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products based on searchText
   *
   * 
   *
   */
    const performSearch = (searchText) => {

      
  

      if(searchText.length > 0){

        searchText = searchText.toLowerCase();

        console.log("searchtext",searchText);
        let searchFilteredProducts = [];

        if(products.length > 0){
            
            searchFilteredProducts = products.filter( (product) => {

              return product.name.toLowerCase().includes(searchText) ||
              product.color.toLowerCase().includes(searchText) || 
              product.type.toLowerCase().includes(searchText)

            });
          
        }
        else{

          searchFilteredProducts =  products.filter( (product) => {

            return product.name.toLowerCase().includes(searchText) ||
            product.color.toLowerCase().includes(searchText) || 
            product.type.toLowerCase().includes(searchText)

          })


        }

        // searchFilteredProducts.length ? setFilteredProducts(searchFilteredProducts) : setProducts(searchFilteredProducts);
        setProducts(searchFilteredProducts);
        console.log(searchFilteredProducts);

      }

      if(searchText === ''){
        setProducts(allProducts);
      }

      setSearchTextLP(searchText);


    }


    /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
    const debounceSearch = (event, debounceTimeout) => {

      if(debounceTimeout !== 0){
        clearTimeout(debounceTimeout);

      }

      const timerId = setTimeout( () => {

          performSearch(event.target.value)


        },500)

      setDebounceTimeout(timerId)
    

    }
 



    useEffect(() => {

        const apiCall = async () => {

          try{

            const res = await axios.get(`${config.endpoint}`);

            console.log("API res",res)

            const data = res.data;

            setProducts(data);
            setAllProducts(data);


          }
          catch(error){

            if(error.response){
              enqueueSnackbar(error.response.data,{ variant:'error'});
      
            }
            else{
              enqueueSnackbar("Server error",{ variant:'error'});
      
            }

          }

            

        }

        apiCall();



    }, [])





  return (
    <div>

      <Header />

      {/* Search Bar */}
      <Box display = "flex" justifyContent = "center" className = "filter-section"  >
       

          <SearchBar debounceSearch={debounceSearch}/>
          <Box className = "filter-btn">
            <FilterToolTip filterFunction = {filterFunction} />
          </Box>
          

      </Box>
      

      <Stack 
       direction="row"
       justifyContent="space-between"
      //  alignItems="center"
       spacing={2}
      
      >
        <Box className = "filter-panel">

          <FilterPanel filterFunction={filterFunction}/>

        </Box>

         



        <ProductGrid data = {products}
  
        />



      </Stack>

        
    </div>
  )
}

export default LandingPage