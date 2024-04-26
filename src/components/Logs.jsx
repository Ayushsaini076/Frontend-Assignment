import React, { useEffect, useState } from 'react'
import { MimicLogs } from '../actions/api'
import spinner from '../assets/Spinner.svg'


const Logs = ({startT,endT}) => {
    const [arr,setArr]=useState([]);
    const [formattedLogs, setFormattedLogs] = useState([]);
    useEffect(()=>{
        const Logs = MimicLogs.fetchPreviousLogs({startTs:startT,endTs:endT,limit:100});
        Logs.then((result)=>{
            const array = result;
            setArr(array);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{
        const formattedLogs = arr.map(log=>{
            const logDate = new Date(log.timestamp);
            const formattedtime = `${logDate.getMonth() + 1}  ${logDate.getDate()}  ${logDate.getHours()}:${logDate.getMinutes()}:${logDate.getSeconds()}  [info] `;
            const formattedmsg = log.message;
            return {formattedtime,formattedmsg};
        })
        setFormattedLogs(formattedLogs)
    },[arr]);
    const st = new Date(startT);
    const end = new Date(endT)
  return (
    <div>
        <span className='interval'>{`Showing Logs for ${st.getDate()}/${st.getMonth()}/${st.getFullYear()} ${st.getHours()}:${st.getMinutes()} -> ${end.getDate()}/${end.getMonth()}/${end.getFullYear()} ${end.getHours()}:${end.getMinutes()}`}</span>
        <div className='logs'>
        <div className='lheading'>
            <img className='spinner' src={spinner} alt="" />
            <h5 >Loading previous 100 Logs</h5>
        </div>
        
      {formattedLogs && formattedLogs.map((log)=>{
        return(
            <div className='log'>
                <div className='v-bar'></div>
                <div>
                <span className='timestamp'>{log.formattedtime}</span>
                <span className='msg'>{log.formattedmsg}</span>
                </div>
                
            </div>
        )
      })}
    </div>

    </div>
    
  )
}

export default Logs
