import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputss from './components/Inputss';
import TimeAndLocation from './components/TimeAndLocation';
import TempratueAndDetails from './components/TempratueAndDetails';
import Forecast from './components/Forecast';
import getWeatherData from './Services/WeatherService';
import getFormattedWeatherData from './Services/WeatherService';
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';


function App() {
  const [query,setQuery]= useState({q: 'berlin'})
  const [units,setUnits]= useState('metric')
  const [weather,setWeather]=useState(null)

 
  useEffect(() => {
    const fetchWeather = async () => {
   await getFormattedWeatherData ({... query,units}).then(data =>
    {
      setWeather(data);
    }
    
    );
  };
    
    fetchWeather();
  }, [query, units]);

  // mt-4 py-5 px-32

  return (
   <div className=" flex flex-col h-screen py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
    <TopButtons setQuery={setQuery} />
    <Inputss setQuery units setUnits />
    {weather && (
        <div>
         <TimeAndLocation weather={weather}/>
         <TempratueAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
    
   </div>
  );
}

export default App;