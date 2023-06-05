import React,{useState} from "react"
import "./style/Login.css"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


function Login ({login, logout}){



const navigate = useNavigate();

const [log, setLog] = useState([])

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001" 


const handleClickLogin = (values) => {
    console.log(values);
    Axios.post(`${baseURL}/login`,{
        user: values.email,
        senha: values.password,
    }).then((res) =>{

        if(res.data.token){
            const token = res.data.token
            login(token)
            navigate('/modify')
            setLog("")
        }
        else{
            alert("Usuário e/ou senha incorretos!")
            logout()
        }
    })

}

const validationLogin = yup.object().shape({
    email: yup.string().min(5,"Usuário inválido").required("Este campo é obrigatório!"),
    password: yup.string().min(3,"Senha inválida!").required("Este campo é obrigatório!"),
})

    return(
        <>  
            <div className="container_cad">

                <h1>Autenticação necessária!</h1>

                <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
                    <Form className="form" >
                        <h3>Login</h3>
                        <Field type='text' value={log.usuario} name="email" id="usuario" placeholder="Usuário"/>
                        <ErrorMessage component="spam" name="email" className="form-error"/>
                        <Field type="password" value={log.senha} name="password" id="senha" placeholder="Senha"/>
                        <ErrorMessage component="spam" name="password" className="form-error"/>
                        <button type="submit" >Entrar</button>
                        
                        <h4 className="h42">Esqueceu sua senha?</h4>
                    </Form>
                </Formik>
            </div>
        </>
    )
    
}

export default Login;