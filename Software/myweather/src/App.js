import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputss from './components/Inputss';
import TimeAndLocation from './components/TimeAndLocation';
import TempratueAndDetails from './components/TempratueAndDetails';

function App() {
  return (
    <div className=" flex flex-col h-screen py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
    <TopButtons/>
    <Inputss/>
    <TimeAndLocation/>
    <TempratueAndDetails/>
    <Forecast title="hourly forecast"/>
    <Forecast title="daily Forecast"/>
   
    </div>
  );
}

export default App;
