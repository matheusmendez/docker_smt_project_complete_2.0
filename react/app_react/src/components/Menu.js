import React, { Component } from "react";
import "./style/Menu.css"
import Logo from '../multi_logo.png'




class Menu extends Component { 
    state = {clicked: false};
    handleClick = () =>{
        this.setState({clicked: !this.state.clicked})
    }
    render (){
    
    const frontURL = process.env.REACT_APP_API_FRONT_URL || "http://localhost:3000"

    const logout = () =>{
        alert("Redirecionando para página de login!")
        localStorage.clear();
    }

    return (
        <>
            <nav id="nav" className="nav">
                <div className="image">
                <img src={Logo} alt="multi" />
                <h3>Smd Thermocouple</h3>
                </div>
                <ul id="nav_list" className={this.state.clicked ? "#nav_list active" : "#nav_list"}>
                   
                    <li>
                        <a href={`${frontURL}/home`}>Home</a>
                    </li>
                    <li>
                        <a href={`${frontURL}/modify`}>Modify</a>
                    </li>
                    <li>
                        <a href={`${frontURL}/relatorio`}>Report</a>
                    </li>
                    <li>
                        <a onClick={logout} href={`${frontURL}`}>Logout</a>
                    </li>
                </ul>
                <div id="mobile" >
                    <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                
            </nav> 
            <h3 className="footer">Developed by Eng. Test MAO</h3>
        </>
    )
}}

export default Menu;