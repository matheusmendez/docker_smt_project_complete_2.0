import React,{useEffect, useState} from "react";
import "./style/Cadastro.css"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import axios from "axios";
import jwtDecode from "jwt-decode";


function Cadastro () {

    const [sensor,setSensor] = useState([]);
    const [sensores, setSensores] = useState([])

    const usuario = jwtDecode(localStorage.getItem('authToken'))
    var user = usuario.userId
    console.log(user)

    const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001" 

    useEffect(() =>{
        axios.get(`${baseURL}/sensores`).then(
            (res) =>{
                    setSensores(res.data)
            }
        )
        },[baseURL])

    const inputvalues = async (name,id_sensor,loc,max, min,max_humi,min_humi) =>{
        try{
        await axios.post(`${baseURL}/cad_sensores`,{
            id_sensor: id_sensor,
            name: name,
            loc: loc,
            max: max,
            min: min,
            max_humi: max_humi,
            min_humi: min_humi,
            responsavel: user
        }).then((res) =>{
            console.log(res)
            alert(res.data.msg)
            
            window.location.reload();
        })
        setSensor("");
    }catch{
            alert("Servidor offline. Contatar engenharia de teste!");

    }}

    const cadSensor = (values) =>{
        console.log(values)
        var name = "Sensor " + values.nome_sensor
        var id_sensor = values.id_sensor
        var loc = values.loc_sensor
        var max = values.max
        var min = values.min
        var max_humi = values.max_humi
        var min_humi = values.min_humi
        
        console.log(max, min)

        inputvalues(name,id_sensor,loc, max, min,max_humi,min_humi);
    }   

    const delValues = (values) => {
        console.log(values)
        let sensor = values.del_sensor;
        try{
            axios.post(`${baseURL}/del_sensores`,{
                sensor: sensor
                
            }).then(
                (res) =>{
                    alert(res.data.msg);
                    window.location.reload();
                }
            )
        }catch{
            console.log("erro")
        }
    }

    const updateSensor = (values) => {
        console.log(values)
        try{
        axios.post(`${baseURL}/cal_sensores`,{
            sensor: values.del_sensor,
            loss_temp: values.loss_temp,
            loss_humi: values.loss_humi,
            responsavel: user
        }).then((res) => {
            alert(res.data.msg)
            window.location.reload();
        }).catch((error) =>{
            alert("Servidor offline")
        })}catch{
            alert("Servidor offline!")
        }
    }
/*
    const validationSensor = yup.object().shape({
        nome_sensor: yup.string().required("Este campo é obrigatório!"),
        loc_sensor: yup.string().required("Este campo é obrigatório!"),
        id_sensor: yup.string().required("Este campo é obrigatório!"),
        max: yup.number().required("Este campo é obrigatório!"),
        min: yup.number().required("Este campo é obrigatório!"),
        max_humi: yup.number().required("Este campo é obrigatório!"),
        min_humi: yup.number().required("Este campo é obrigatório!"),

    })

*/


    const activeFormCad = () =>{
        desactivateFormDel();
        desactivateFormCal();
        let teste = document.getElementById("form_cad");
        teste.style.display = "block";
    }

    const activeFormDel = () =>{
        desactivateFormCad();
        desactivateFormCal();
        let teste = document.getElementById("form_del");
        teste.style.display = "block";
    }

    const activeFormCal = () =>{
        desactivateFormCad();
        desactivateFormDel();
        let teste = document.getElementById("form_up");
        teste.style.display = "block";
    }

    function desactivateFormCad () {
        let teste = document.getElementById("form_cad");
        teste.style.display = "none";
    }

    function desactivateFormDel() {
        let teste = document.getElementById("form_del");
        teste.style.display = "none";
    }

    function desactivateFormCal() {
        let teste = document.getElementById("form_up");
        teste.style.display = "none";
    }



    return(
        <>
            <div className="container_cad">
                <h1>Choose the action to perform</h1>
                <div className="select_box">
                    <button className="button_cad" onClick={activeFormCad}>Register</button>
                    <button className="button_cad" onClick={activeFormDel}>Delete</button>
                    <button className="button_cad" onClick={activeFormCal}>Update</button>
                </div>
                <div className="form_cad" id="form_cad">
                    <Formik initialValues={{}} onSubmit={cadSensor}>
                        <Form className="formcad" >
                            <h3>Inserção de sensor</h3>
                            <h5>Nome do sensor</h5>
                            <Field type='text' value={sensor.name}   name="nome_sensor" id="nome_sensor" placeholder="Nome"/>
                            <ErrorMessage component="a" name="nome_sensor" className="form-error"/>
                            <h5>Localização</h5>
                            <Field type="text" value={sensor.loc} name="loc_sensor" id="loc_sensor" placeholder="Localização"/>
                            <ErrorMessage component="spam" name="loc_sensor" className="form-error"/>
                            <h5>ID banco de dados</h5>
                            <Field type="text" value={sensor.id_db} name="id_sensor" id="id_sensor" placeholder="Id"/>
                            <ErrorMessage component="spam" name="id_sensor" className="form-error"/>
                            <h5>Limite superior</h5>
                            <Field type="text" value={sensor.max} name="max" id="max" placeholder="Max"/>
                            <ErrorMessage component="spam" name="max" className="form-error"/>
                            <h5>Limite inferior</h5>
                            <Field type="text" value={sensor.min} name="min" id="min" placeholder="Min"/>
                            <ErrorMessage component="spam" name="min" className="form-error"/>
                            <h5>Limite superior</h5>
                            <Field type="text" value={sensor.max_humi} name="max_humi" id="max_humi" placeholder="max_humi"/>
                            <ErrorMessage component="spam" name="max_humi" className="form-error"/>
                            <h5>Limite inferior</h5>
                            <Field type="text" value={sensor.min_humi} name="min_humi" id="min_humi" placeholder="min_humi"/>
                            <ErrorMessage component="spam" name="min_humi" className="form-error"/>
                            <button type="submit">Cadastrar</button>
                        </Form>
                    </Formik>
                </div>
                <div className="form_del" id="form_del">
                    <Formik initialValues={{}} onSubmit={delValues}>
                            <Form className="formcad" >
                            <h3>Selecione o sensor à ser deletado</h3>
                            <Field as='select' name="del_sensor" id="del_sensor"> 
                            <option value=""></option>
                            {typeof sensores !== "undefined" && sensores.map( (sen) => {
                                return(
                                    <>
                                    <option value={sen.key_sensor}>{sen.name_sensor}</option>
                                    </>
                                )
                            })}
                            </Field>
                            <button type="submit">Deletar</button>
                        </Form>
                    </Formik>
                </div>
                <div className="form_up" id="form_up">
                    <Formik initialValues={{}} onSubmit={updateSensor}>
                        <Form className="formcad" >
                            <h3>Escolha o sensor</h3>

                            <Field as='select' name="del_sensor" id="del_sensor"> 
                            <option value=""></option>
                            {typeof sensores !== "undefined" && sensores.map( (sen) => {
                                return(
                                    <>
                                    <option value={sen.key_sensor}>{sen.name_sensor}</option>
                                    </>
                                )
                            })}
                            </Field>
                            <h5>Temperature loss</h5>
                            <Field type="text" value={sensor.loss_temp} name="loss_temp" id="loss_temp" placeholder="Ex: 3"/>
                            <ErrorMessage component="spam" name="loss_temp" className="form-error"/>
                            <h5>Humidity loss</h5>
                            <Field type="text" value={sensor.loss_humi} name="loss_humi" id="loss_humi" placeholder="Ex: 3"/>
                            <ErrorMessage component="spam" name="loss_temp" className="form-error"/>
                            
                            <button type="submit">Calibrate</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Cadastro;