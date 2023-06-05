import React,{useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Rel.css"
import * as XLSX from 'xlsx';
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)


function Rel_inc () {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sensor = searchParams.get('sensor');
    const name = searchParams.get('name')


        const [uniValue, setuniValue] = useState ([]) ;
    
    
        let temp = []
        let humi = []
    
        const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"

    
        useEffect( () => {
            axios.post(`${baseURL}/resume_amb`,{
                sensor_p: sensor
            })
            .then((response) =>{
                setuniValue(response.data);
            })
        }, [] )
    
    
    uniValue.map( (res) => {
        temp.push(parseFloat(res.temp_value))
    })
    
    
    
    uniValue.map( (res) => {
        humi.push(parseFloat(res.humi_value))
    })
    
    function Media (value){
        var i = 0; var l=value.length; var s = 0;
        while(i<l){
            s = s+value[i++]
        }
        return (s / l).toFixed(2)
    }
    

    
    
    function max (value) {
        var max = Math.max(...value)
        
        return max;
    }
    
    function min (value) {
        var min = Math.min(...value)
        
        return min;
    }
    
    let mediahumi = Media(humi);
    let mediatemp = Media(temp);
    let maxtemp = max(temp)
    let maxhumi = max(humi)
    let mintemp = min(temp)
    let minhumi = min(humi)
    
    
    let vet = [...Array(temp.length).keys()]
    
    const data_temp = {
        labels: vet,
        datasets: [
            {
                Label: 'Temperatura',
                data: temp,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 2,
            },
            
        ]
    }
    const data_humi = {
        labels: vet,
        datasets: [
            {
                Label: 'Humidade',
                data: humi,
                backgroundColor: 'aqua',
                borderColor: 'aqua',
                borderWidth: 2,
            },
            
        ]
    }

    const down = () =>{
        
        const planilha = XLSX.utils.json_to_sheet(uniValue);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, planilha, 'Sheet1');
        XLSX.writeFile(workbook, 'Relatório.xlsx');
       
    }
   
    
    const options = {
            maintainAspectRatio: false,
           scales:{
            x:{
               grid:{
                display:false,
               },
            },
            y:{
                beginatero:true,
                display:true,
                grid:{
                    color: '#FAEBD7'
                    
                }
            }
           }
     }
    
    

    return(
        <>
        
        <div className="container">
        <div className="w100" >
            <p style={{fontSize: "50px", marginBottom: "3%"}}>Relatório: {name}</p>
        </div>
        <div className="w100">
        <h1>Temperatura</h1>
        <div className='canva'>
    
       
        <Line 
        className='chartBox'
            data={data_temp}
            options={options}

            />
        </div>
        </div>
        <div className="w1002">
        <h1>Humidade</h1>
        <div className='canva'>
    
    
        <Line 
        className='chartBox'
            data={data_humi}
            options={options}

            />
        </div>
        </div>

            <div className='card'>
                <h1>Máxima</h1>
                <h2>Temperatura: {maxtemp}°C</h2>
                <h2>Humi: {maxhumi} %</h2>
            </div>
            <div className='card'>
                <h1>Média</h1>
                <h2>Temperatura: {mediatemp} °C</h2>
                <h2>Humi: {mediahumi} %</h2>
            </div>
            <div className='card'>
                <h1>Mínima</h1>
                <h2>Temperatura: {mintemp}°C</h2>
                <h2>Humi: {minhumi} %</h2>
            </div>
        </div>
        </>
    )
}

export default Rel_inc