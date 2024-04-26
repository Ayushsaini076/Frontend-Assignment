import logo from './logo.svg';
import './App.css';
import Metrics from './components/Metrics';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logs from './components/Logs';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';


function App() {
  const [time,setTime]=useState('300000');
  const [startT,setStartT]=useState(Date.now()-time);
  const [endT,setEndT]=useState(Date.now())

  

  useEffect(()=>{
    setStartT(Date.now()-time);
    setEndT(Date.now());
  },[time]);

  const handleChildData = (data)=>{
    setTime(data);
  }
  console.log(endT-startT);
  return (
    <BrowserRouter>
    <Navbar onChildData={handleChildData}/>
    <Routes>
      <Route path='/metrics' element={<Metrics startT={startT} endT={endT}/>}/>
      <Route path='/logs' element={<Logs startT={startT} endT={endT}/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
