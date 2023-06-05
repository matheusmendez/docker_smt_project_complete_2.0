import './App.css';
import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import {BrowserRouter, Route,Routes,Navigate} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home'
import Relatorio from './components/Relatorio';
import Cadastro from './components/Cadastro'
import jwtDecode from 'jwt-decode';
import Rel_inc from './components/utils/Relat_in';

function App() {

  const [islogin, setIslogin] = useState(false)

  function login(token){
    localStorage.setItem('authToken', token);
    setIslogin(true);
  }

  function logout(token){
    localStorage.setItem('authToken', token);
    setIslogin(false);
  }



  useEffect(() => {
    const token = localStorage.getItem('authToken');
    try{
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        setIslogin(true);
      }
    }}catch{
      <Navigate to="/"/>
    }

  }, []);




  const requireAuth = (element) => {

    if (islogin) {
      return element
    } else {
      return <Login login={login} logout={logout}/>
    }
  };

  return (
    <div className="App">
      <Menu islogin={islogin} onLogout={logout}   />
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login  logout={logout} login={login}/>}/> 
              <Route path='/home' element={<Home/>} />
              <Route path='/relatorio' element={requireAuth(<Relatorio/>)}/>
              <Route path='/modify' element={requireAuth(<Cadastro />)}/>
              <Route path='/Rel_inc' element={<Rel_inc/>} />
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
