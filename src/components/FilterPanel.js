import React, {useState,useEffect } from 'react'
import {
    FormControlLabel,
    FormControlClasses,
    FormGroup,
    FormControl,
    FormLabel,
    Checkbox,
    Box

} from '@mui/material'

const FilterPanel = ({filterFunction}) => {

    const [state , setState] = useState(
        {
            price: {
                "0-Rs250" : false,
                "Rs251-450" : false,
                "Rs451" : false
              },
              color: {
                Red : false,
                Blue: false,
                Green: false
              },
              gender: {
                Men: false,
                Women : false
              },
              type : {

                Hoodie : false,
                Basic : false,
                Polo : false

              }
        }

    )

  
    const filters = {

        color : ['Red','Blue','Green'],
        gender : ['Men','Women'],
        price : ['0-Rs250','Rs251-450','Rs451'],
        type : ['Polo','Hoodie','Basic']
    }


     /**
   * Definition for input change of filter checkboxes
   * With debounce, this is the function to be called whenever the user check or uncheck filters
   *
   * @param {{ target: { value: string } }} event 
   *    JS event object emitted from the filter checkbox input field
   *    
   *
   * @param {{String}} filterCategory
   *    String denotes flter category like Color, gender of products etc
   *
   */
    const handleChange = (event, filterCategory) => {

        console.log("state before",state);

        console.log("filter",event.target.name);

        const name  = event.target.name;

        // console.log(state.filterCategory);

        setState( (prevState) => ({
            ...prevState,
            [filterCategory] : {
                ...prevState[filterCategory],
                [name] : !prevState[filterCategory][name]

            }
        }))



    }


    // **************** Collect all keys and Filter ****************
// This function collects ALL keys that have true as a value, then create a new obj to compare to filter.
  const filteredCollected = () => {


    const collectedTrueKeys = {
      color: [],
      gender: [],
      price: [],
      type: []
    };

    const { color, gender, type, price } = state

    for (let colorKey in color) {
      if (color[colorKey]) collectedTrueKeys.color.push(colorKey);
    }

    for (let genderKey in gender) {
      if (gender[genderKey]) collectedTrueKeys.gender.push(genderKey);
    }

    for (let typeKey in type) {
      if (type[typeKey]) collectedTrueKeys.type.push(typeKey);
    }

    for (let priceKey in price) {

      if (price[priceKey]){

        priceKey = priceKey.replace("Rs",'')

        if(priceKey.includes('-')){

          let priceRange = priceKey.split("-");
          let lowValue = parseInt(priceRange[0]);
          let highValue = parseInt(priceRange[1]);

          console.log(lowValue,highValue)

          collectedTrueKeys.price.push(lowValue);
          collectedTrueKeys.price.push(highValue);
        }
        else{

          let lowValue = parseInt(priceKey);
          let highValue = Number.MAX_SAFE_INTEGER;

          collectedTrueKeys.price.push(lowValue);
          collectedTrueKeys.price.push(highValue);

        }
       
        
        
      }
    }

    return collectedTrueKeys;
  };



    let filterTrueKeys;

    useEffect(() => {

        console.log("state after",state);

        filterTrueKeys = filteredCollected();

        console.log("FilterTrueKeys", filterTrueKeys)

        filterFunction(filterTrueKeys)
   
      }
    ,[state])
    




  return (
    <div>


        <Box display = 'flex' sx={{ display: { xs : 'none', sm: 'none', md : 'block' }   }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

            

                <FormLabel component="legend">Color</FormLabel>
                <FormGroup>
                    
                    {
                        filters.color.map( (value,idx) => (

                            <FormControlLabel
                                control={
                                    <Checkbox
                                      checked={state.color.value}
                                      name = {value}
                                      onChange={(e) => {
                                        handleChange(e,"color")
                                        
                                    }}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      key = {value}  
                                  />
                                }
                               
                            label={value}
                        />


                        ))


                    }
                   
               
                </FormGroup>

                <FormLabel component="legend">Gender</FormLabel>
                <FormGroup>
                    
                    {
                        filters.gender.map( (value, idx) => (

                            <FormControlLabel
                                control={
                                    <Checkbox
                                      checked={state.color.value}
                                      name = {value}
                                      onChange={(e) => {
                                        handleChange(e,"gender")
                                        
                                    }}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      key = {value}
                                  />
                                }
                            label={value}
                        />


                        ))


                    }
                   
               
                </FormGroup>


                <FormLabel component="legend">Price</FormLabel>
                <FormGroup>
                    
                    {
                        filters.price.map( (value) => (

                            <FormControlLabel
                                control={
                                    <Checkbox
                                      checked={state.color.value}
                                      name = {value}
                                      onChange={(e) => {
                                        handleChange(e,"price")
                                      

                                    }}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      key = {value}
                                  />
                                }
                               
                            label={value}
                        />


                        ))


                    }
                   
               
                </FormGroup>


                <FormLabel component="legend">Type</FormLabel>
                <FormGroup>
                    
                    {
                        filters.type.map( (value) => (

                            <FormControlLabel
                                control={
                                    <Checkbox
                                      checked={state.color.value}
                                      name = {value}
                                      onChange={(e) => handleChange(e,"type")}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      key = {value}
                                  />
                                }
                               
                            label={value}
                        />


                        ))


                    }
                   
               
                </FormGroup>
               
            </FormControl>
            
        </Box>



    </div>
  )
}

export default FilterPanel