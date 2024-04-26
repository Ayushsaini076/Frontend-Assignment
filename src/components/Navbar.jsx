import React from 'react'
import logo from '../assets/TF logo.svg'
import ametrics from '../assets/metrics.png'
import list from '../assets/list.png'
import { Link ,useLocation } from 'react-router-dom'
import metrics from '../assets/metrics-gray.png'
import alist from '../assets/list-active.png'



const Navbar = ({onChildData}) => {
    const location = useLocation();

    const current = location.pathname;
    console.log(current);

    const sendToParent=(event)=>{
        const data = event.target.value;
        onChildData(data);
    }
  return (
    <div className='nav'>
        <div>
            <img className='logo' src={logo} alt="" />
        </div>
        <div className='page'>
            <Link style={{textDecoration:'none',color:'inherit'}} to="/metrics">
            <div>
            <div className='pg'>
                {current=='/metrics'?<img className='icon' src={ametrics} alt="" />:<img className='icon' src={metrics}/>}          
                <span>Metrics</span>
            </div>
            {current=='/metrics' && <div className='bar'></div>}
            </div>
            </Link>
            <Link style={{textDecoration:'none',color:'inherit'}} to="/logs">
            <div>
            <div className='pg'>
                {current=='/logs'?<img className='icon' src={alist} alt="" />:<img className='icon' src={list} alt="" />}
                
                <span>Logs</span>
            </div>
            {current=='/logs' && <div className='bar'></div> }
            </div>

            </Link>
            
        </div>
        <div  className='dropdown'>
            <select onChange={sendToParent}>
                <option value="300000">Last 5 minutes</option>
                <option value="900000">Last 15 minutes</option>
                <option value="1800000">Last 30 minutes</option>
                <option value="3600000">Last 1 hour</option>
                <option value="10800000">Last 3 hours</option>
                <option value="21600000">Last 6 hours</option>
            </select>
        </div>
      
    </div>
  )
}

export default Navbar
