import React, { useEffect, useState } from 'react'
import { formatToLocalTime } from '../Services/WeatherService';
import getFormattedWeatherData from './../Services/WeatherService';

import { ReactComponent as HeartIcon } from "../icons/heart.svg";

function TimeAndLocation({weather:{dt,timezone,name,country}, citiesList, setCitiesList}) {

  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    let isFavoriteTemp = false;
    for (let i = 0; i < citiesList.length; i++) {
      const element = citiesList[i];
      if(element.title === name) {
        isFavoriteTemp = true;
        break;
      }
    }
    setIsFavorite(isFavoriteTemp);
 }, [citiesList]);

 function addToFavorites() {
  const tempCitiesList = citiesList;
  tempCitiesList.push({
    title: name
  });
  setCitiesList([...tempCitiesList]);
  localStorage.setItem("citiesList", JSON.stringify(tempCitiesList));
 }

 function removeFromFavorites() {
  const tempCitiesList = citiesList;
    for (let i = 0; i < tempCitiesList.length; i++) {
      const element = tempCitiesList[i];
      if(element.title === name) {
        tempCitiesList.splice(i, 1);
      }
    }
    setCitiesList([...tempCitiesList]);
    localStorage.setItem("citiesList", JSON.stringify(tempCitiesList));
 }

  return (
  <div>
    <div className="flex items-center justify-center my-6">
    <p className="text-white text-xl font-extralight">
      {formatToLocalTime(dt,timezone)}
        </p>
    </div>  
   
    <div className="flex items-center justify-center my-3">
    <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
    <HeartIcon className={isFavorite ? "icon-heart filled" : "icon-heart"} onClick={() => {
      if(isFavorite) removeFromFavorites();
      else addToFavorites();
    }} />
        
    </div>
    </div>
  );
}

export default TimeAndLocation