import React from 'react'
import { LayersControl, MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import { iconUrlFromCode, API_KEY } from "../Services/WeatherService";
import { UilTear, UilTemperature, UilWind } from "@iconscout/react-unicons";

/*
Add you api key here
 */
const zoom = 10

function MapHelper({lat, lon}) {
  const map = useMap()
  map.setView([lat, lon], zoom)
  return null
}

function Map({weather}) {
  const {lat, lon, ...rest} = weather
  if (lat === undefined || lon === undefined) {
    return null
  }
  return (
    <div>
      <MapContainer
        className="w-100 h-96"
        center={[lat, lon]}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
      >
        <MapHelper lat={lat} lon={lon}/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Temperature">
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />

          </LayersControl.Overlay>
          <LayersControl.Overlay name="Wind">
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />

          </LayersControl.Overlay>
          <LayersControl.Overlay name="Pressure">
            <TileLayer
              url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />

          </LayersControl.Overlay>
          <LayersControl.Overlay name="Precipitation">
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />

          </LayersControl.Overlay>
          <LayersControl.Overlay name="Clouds">
            <TileLayer
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />

          </LayersControl.Overlay>
        </LayersControl>
        <Marker position={[lat, lon]}>
          <Tooltip direction="right" offset={[0, 30]} permanent>
            <img src={iconUrlFromCode(rest?.icon)} alt="" className="w-20"/>
            <div className="flex flex-col space-y-2">

              <div className="flex font-light text-sm items-center justify-center">
                <UilTemperature size={18} className="mr-1"/>
                Real feel:
                <span className="font-medium ml-1">{`${rest?.feels_like.toFixed()}°`}</span>
              </div>

              <div className="flex font-light text-sm items-center justify-center">
                <UilTear size={18} className="mr-1"/>
                Huimidity:
                <span className="font-medium ml-1">{`${rest.humidity.toFixed()}%`}</span>
              </div>

              <div className="flex font-light text-sm items-center justify-center">
                <UilWind size={18} className="mr-1"/>
                Wind:
                <span className="font-medium ml-1">{`${rest.speed.toFixed()}km/h`}</span>
              </div>
            </div>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>

  );
}

export default Map