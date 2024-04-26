import React from 'react'
import {MimicMetrics} from "../actions/api";
import { registerables, Chart, Ticks, scales, Legend, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState,useEffect } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// import { type } from '@testing-library/user-event/dist/type';
Chart.register(...registerables);



const Metrics = ({startT,endT}) => {
    const [chartData,setChartData]=useState(null);
    const [chartData2,setChartData2]=useState(null);
    const [chartData3,setChartData3]=useState(null);
    const [chartData4,setChartData4]=useState(null);

    const [styr,setStyr]=useState('');
    const [stmonth,setMonth]=useState('');
    const [stday,setDay]=useState('');
    const [sthrs,setHrs]=useState('');
    const [stmin,setMin]=useState('');

    const [endyr,setEndyr]=useState('');
    const [endmonth,setEndMonth]=useState('');
    const [endday,setEndDay]=useState('');
    const [endhrs,setEndHrs]=useState('');
    const [endmin,setEndMin]=useState('');
    
    useEffect(()=>{
        const fetchData = async()=>{
            
            const startDate = new Date(startT);
            const endDate = new Date(endT);

            setStyr(startDate.getFullYear())  
            setMonth(startDate.getMonth() + 1) ; 
            setDay(startDate.getDate()) ; 
            setHrs(startDate.getHours()) ; 
            setMin(startDate.getMinutes()) ; 

            setEndyr(endDate.getFullYear())  
            setEndMonth(endDate.getMonth() + 1) ; 
            setEndDay(endDate.getDate()) ; 
            setEndHrs(endDate.getHours()) ; 
            setEndMin(endDate.getMinutes()) ; 


            try {
                // const {startT,endT}={startT:Date.now()-3000000 , endT:Date.now()};
                
                const metrics = await MimicMetrics.fetchMetrics({startTs:startT,endTs:endT})
                // console.log({startT,endT})

                const mapdata = metrics.map(graph=>({
                    labels:graph.name,
                    datasets:graph.graphLines.map(line=>({
                        label:line.name,
                        data:line.values.map(d=>({
                            x: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            y:d.value,
                            yAxisID: 'right'
                        })),
                        tension:0.3,
                        padding:20,
                        fill:graph.name==='Disk IOPS'?true:false,
                        // pointBackgroundColor:'rgba(75, 192, 192, 1)',
                        
                        
                    })),
                    
                }))

                console.log(mapdata)
               
                const chartData = {
                    datasets:mapdata[0].datasets,
                }
                const chartData2={
                    
                    datasets:mapdata[1].datasets,
                }
                const chartData3={
                    
                    datasets:mapdata[2].datasets,
                }
                const chartData4={
                    datasets:mapdata[3].datasets,
                }
                setChartData(chartData)
                setChartData2(chartData2)
                setChartData3(chartData3)
                setChartData4(chartData4)
                console.log(chartData)
                // setDataSet1(datasets[0])
                
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    },[startT])
    const [aray,setAray]=useState([]);
    
    const handleChartClick = (event, chartElements) => {
        
        const position = chartElements[0].element.x;
        console.log(position)

        // setAray([...aray,position]);

        const clickedElement = chartElements[0];
        
        const datasetIndex = clickedElement.datasetIndex;
        
        const index = clickedElement.index;
        
        console.log(datasetIndex);
        console.log(index);
        
        chartData3.datasets[datasetIndex].data[index].pointBackgroundColor = '#F97316';
        console.log(chartData3.datasets[datasetIndex].data[index]);
        
        setChartData3(chartData3);
    };

    const options = {
        onClick: handleChartClick,
        plugins: {
          filler: {
            propagate: true,
          },
          legend:{
            position:'bottom',
            align:'start'
          },
          tooltip:true
        },
        scales:{
            y:{
                type:'linear',
                position:'right',
                
            }
            
        }
    }


    console.log(aray);
    
  return (
    <div className='metrics'>
        <div className='m-box' >
        <div className='mtop'>
        <h2 className='mheading'>Metrics</h2>
        <span className='date'>{`${stday}/${stmonth}/${styr} ${sthrs}:${stmin} -->${endday}/${endmonth}/${endyr} ${endhrs}:${endmin} `}</span>
        </div>
        <div className='charts'>
        <div className='chart' >
            <h6 className='c-heading'>CPU Usage</h6>
            {chartData && <Line  data={chartData} options={options} />}
        </div>
        <div className='chart' >
            <h6 className='c-heading'>Memory Usage</h6>
            {chartData2 && <Line  data={chartData2} options={options} />}
        </div>
        <div className='chart' >
            <h6 className='c-heading'>Network Usage</h6>
            {chartData3 && <Line  data={chartData3} options={options}/>}
        </div>
        <div className='chart' >
            <h6 className='c-heading'>Disk IOPS</h6>
            {chartData4 && <Line  data={chartData4} options={options}/>}
        </div>
    </div>
    </div>

    </div>
    
  )
}

export default Metrics
