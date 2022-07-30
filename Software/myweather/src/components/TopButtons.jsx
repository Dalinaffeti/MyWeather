import React, { useEffect, useState } from 'react'

function TopButtons({setQuery, citiesList}) {

  return ( 
    <div className="flex items-center justify-around my-6">
    {citiesList.map((city, index) => (
        <button key={index} className="text-white text-lg font-medium" onClick={() => setQuery ({q:city.title})}>
            {city.title}
        </button>

    ))}
  </div>
  );
  
}

export default TopButtons