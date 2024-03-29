import React,{useState, useEffect} from "react";
import axios from "axios";
import "../style/Card.css"
import { Link } from 'react-router-dom'


function Card(Props){

    const[values, setValues] = useState();

    const sensor = Props.sensor;
    const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"
    const frontURL = process.env.REACT_APP_API_FRONT_URL || "http://localhost:3000"

    useEffect(() =>{
        const fetchData = async () =>{
            try{
            await axios.post(`${baseURL}/card`,{
                card: sensor
            }).then((res)=>{
                    if(res.data){
                    setValues(res.data)           
               
            }
                }
            )}catch{
                alert("Off");
                window.location.reload();
            }
            
            
        };
            fetchData(); 

            const interval = setInterval(fetchData, 10000); 

            return () => clearInterval(interval);
    },[sensor,baseURL])

    

    return(
        <>
            
                {typeof values !== "undefined" && values.map(
                    (values) =>{
                    var date = new Date(values.date_time);
            
                    var hora = date.getUTCHours();
                    var min = date.getUTCMinutes();
                
                     function teste () {
                        if(hora>12){
                            return ":00 PM";
                        }
                        else{
                            return ":00 AM";
                        }
                    }

                    var f = `${hora}:${min}${teste()}`

                     return(
                            <> 
                                    <Link to={`/rel_inc?sensor=${Props.sensor}&name=${Props.name}`} id="Link">
                                        <div className="card" id="temp"  onClick={window.open(`${frontURL}/rel_inc?sensor=${Props.sensor}`)} >
                                        <h2>{Props.name}</h2>
                                        <h2 id="temp" style={{color: parseFloat(values.temp_value) >=  parseFloat(Props.max_temp) ? "Tomato" : parseFloat(values.temp_value) <= parseFloat(Props.min_temp) ? "SkyBlue" : "White"}}>
                                            Temperatura: {values.temp_value} °C
                                        </h2>
                                        <h2 style={{color: parseFloat(values.humi_value) >=  parseFloat(Props.max_humi) ? "Tomato" : parseFloat(values.humi_value) <= parseFloat(Props.min_humi) ? "SkyBlue" : "White",}}>
                                            Umidade: {values.humi_value} %
                                        </h2>
                                        <h5>Última atualização: {f}</h5>
                                        </div>
                                    </Link>
                            </>

                     )
                    }
                )
                }
            
        </>
    )


}

export default Card;