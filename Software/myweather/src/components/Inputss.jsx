import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import cities from './lib/city.list.json';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { geoAPI, GEO_API_URL } from "../api";
import debounce from 'lodash.debounce';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inputss({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
 
  const handleSearchClick = () => {
    
    if (city !== '') setQuery({ q: city.label})
    else{
      toast.info ("can't fetch weather for the given city" );
      console.log("no authorization")
      
    }
    

  }

  console.log(React.version);

  const handleLocationClick = () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat, lon
        })
      })
    }
    else {
      alert("Sorry Not available!");
      toast.info ("can't fetch weather because of lack of authorization  " );
      console.log("no authorization")
  
    }
  

  }
  const [results, setResults] = useState([]);
  const handleCityInput = (selected) =>{ 
    const city = selected;
    console.log(city)
    setCity(city)
  // setQuery({q: city})
  }
    // const cit = this.e.target.value
    // setCity(cit)
    // // setQuery(input )
    // console.log(cit);
    // let matchingCities = [];
    // const value = e.currentTarget.value;
    // if (value.length > 2) {
    //   for (let city of cities) {
    //     if (matchingCities.length >= 5) {
    //       break;
    //     }

    //     const match = city.name.toLowerCase().startsWith(value.toLowerCase());

    //     if (match) {
    //       const cityData = {
    //         ...city,
    //         slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
    //       };

    //       matchingCities.push(cityData);
    //       continue;
    //     }
    //   }
    // }
    // console.log(matchingCities);
    // return setResults(matchingCities);
  // }
  
  
  const handleUnitsChange = (e) => {
    const selectedUnits = e.currentTarget.name;
    if (units !== "") setUnits(selectedUnits);
    else{
      toast.info ("can't handle units exchange  " );
    console.log("no authorization")
    }
    console.log(e.currentTarget.value)
    
  }
  const _loadOptions = (inputValue, callback) => {
    const options = []

    
      console.log(inputValue);
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      geoAPI
    )
    .then((response) => response.json())
      .then((response) => {
        
        response.data?.map((city) => {
           options.push( {
              // value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            })
            return options;
          })
          
          callback(options)
      }
      );
      
  };
  const loadOptions = debounce(_loadOptions, 6000);



  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        

        
        {/* <input type="text"
          value={city}
          //(e) => setCity(e.currentTarget.value)
          onChange={handleCityInput}
          placeholder=" Search for city..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        /> */}
       {/* {city.length > 3 && (
          <ul>
            
            {results.length > 0 ? (
              results.map((city) => {
                return (
                  <option>{city.name}</option>
                  // <li key={city.slug}>
                  //   {/* <Link href={`/location/${city.slug}`}> }
                  //     <a>
                  //       {city.name}
                  //       {city.state ? `, ${city.state}` : ""}{" "}
                  //       <span>({city.country})</span>
                  //     </a>
                  //   {/* </Link> }
                  // </li>
                );
              })
            ) : (
              <li className="search__no-results">No results found</li>
            )}
            
          </ul>
        )}
        */}
        
        <AsyncSelect 
        className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        value={city}
        autoload={true}
        key='search'
        onChange={handleCityInput}
        // {handleCityInput}
        loadOptions={_loadOptions}

        
        />
        {/* {results.length > 0 ? (
              results.map((city) => {
                return (
                  <option>{city.name}{city.state ? `, ${city.state}` : ""}{" "}       
                    <span>({city.country})</span>
                  </option>
                  // <li key={city.slug}>
                  //   {/* <Link href={`/location/${city.slug}`}> }
                  //     <a>
                  //       {city.name}
                  //       {city.state ? `, ${city.state}` : ""}{" "}
                  //       <span>({city.country})</span>
                  //     </a>
                  //   { </Link> }
                  // </li>
                );
              })
            ) : (
              <li className="search__no-results">No results found</li>
            )} */}
        
        
        <UilSearch
          size={25} className="text-white cursor-pointe transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25} className="text-white cursor-pointer transition ease-out hover:scale-125"

          onClick={handleLocationClick}
        />


      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button name="metric" className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button name="imperial" className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>

      </div>
      <ToastContainer autoClose={500} theme = 'colored' newestOnTop ={true}/>

    </div>
  )
}

export default Inputss