import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputss from './components/Inputss';
import TimeAndLocation from './components/TimeAndLocation';
import TempratueAndDetails from './components/TempratueAndDetails';
import Forecast from './components/Forecast';
import getWeatherData from './Services/WeatherService';
import getFormattedWeatherData from './Services/WeatherService';
import { useEffect, useState, treshhold } from 'react';
import { data } from 'autoprefixer';
import Map from "./components/Map";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query,setQuery]= useState({q: 'berlin'})
  const [citiesList, setCitiesList]= useState([])
  const [units,setUnits]= useState('metric')
  const [weather,setWeather]=useState(null)
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js";
    script.integrity = "sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
    script.async = true;
    script.crossOrigin = ""

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

 
  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'
      toast.info ('fetching weather for ' + message)
   await getFormattedWeatherData ({... query,units}).then(data =>
    {
      setWeather(data);
    }
    
    );

    const favoritesList = localStorage.getItem("citiesList");
    console.log(favoritesList);
      if(favoritesList !== null) {
         setCitiesList(JSON.parse(favoritesList));
      }
  };
    
    fetchWeather();
  }, [query, units]);

  // mt-4 py-5 px-32
  const formatBackground = () => {
    if(!weather) return  'from-cyan-700 to-blue-700'
    const threshold = units === "metric" ? 20 : 60 ;
    if(weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  }
  return (
   <div className= {`flex flex-col h-screen py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400
   ${formatBackground()}
   `}>
    <TopButtons setQuery={setQuery} citiesList={citiesList} />
    <Inputss setQuery={setQuery}  units={units} setUnits={setUnits}  />
    {weather && (
        <div>
         <TimeAndLocation weather={weather} citiesList={citiesList} setCitiesList={setCitiesList} />
         <TempratueAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
          <Map weather={weather}/>

        </div>
      )}


    <ToastContainer autoClose={500} theme = 'colored' newestOnTop ={true}/>
   </div>
           

  );
}

export default App;