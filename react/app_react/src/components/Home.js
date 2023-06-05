import React,{useState,useEffect} from "react";
import "./style/Home.css"
import Card from "./utils/Card";
import axios from "axios";





function Home (){

    const [sensor, setSensor] = useState([]);

    const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001" 


    useEffect(() =>{
    axios.get(`${baseURL}/sensores`).then(
        (res) =>{
                setSensor(res.data)

        }
    )
    },[])

  

    return(
        <>
            <div className="container">

                {typeof sensor !== "undefined" && sensor.map(
                    (sensor) =>{
                        return(
                            <>
                                <Card sensor={sensor.key_sensor} max={sensor.max} min={sensor.min} max_humi={sensor.max_humi} min_humi={sensor.min_humi} className="cardcon" name={sensor.name_sensor}/>
                            </>
                        )
                    }
                )}

                
            </div>
        </>
    )
}

export default Home;