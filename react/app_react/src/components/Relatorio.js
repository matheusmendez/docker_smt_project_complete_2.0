import React,{useState,useEffect} from "react";
import "./style/Relatorio.css"
import * as XLSX from "xlsx"
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from "formik";




function Relatorio () {
    
    const [sensores, setSensores] = useState([])
    const [valores, setValores] = useState([])
    
    const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001" 

    useEffect(() =>{
        axios.get(`${baseURL}/sensores`).then(
            (res) =>{
                    setSensores(res.data)
            }
        )
        },[])
   


    const down = async (values) =>{
        console.log(values)
        await axios.post(`${baseURL}/search`,{
            data:values.data,
            sensor:values.sensor
        }).then((res) =>{
            console.log(res)
            if (res.data.length > 0)
            setValores(res.data)
            else alert("No exist data for this day/sensor!")
        }).catch((error) =>{
            if(error) alert(`${error}`)
        })
        
    }

    useEffect(( () =>{
        if(valores.length>0){
                const planilha = XLSX.utils.json_to_sheet(valores);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, planilha, 'Sheet1');
                XLSX.writeFile(workbook, 'Relatório.xlsx');
            }
           
    }), [valores])



    return(
        <>  
            <div className="container_cad">
            <h1>Report Area</h1>
            <Formik initialValues={{}} onSubmit={down}>
                <Form className="formcad" >
                    <h3>Choose the day</h3>
                    <Field type="date" name="data" />
                    <h3>Choose the sensor</h3>
                    <Field as="select" name="sensor">
                        <option></option>
                        {typeof sensores !== "undefined" && sensores.map( (sen) => {
                                return(
                                    <>
                                    <option value={sen.key_sensor}>{sen.name_sensor}</option>
                                    </>
                                )
                            })}
                        
                    </Field>
                    <button type="submit">Gerar planílha</button>
                </Form>
            </Formik>
            </div>
        </>
    )
}   

export default Relatorio