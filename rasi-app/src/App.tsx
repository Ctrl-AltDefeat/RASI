import './App.css';

import "./assets/fonts/Barlow-SemiBold.ttf";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Website/Home/home";
import Barra from "./components/ui/navBar/barra";
import Trayectoria from "./pages/Website/Trayectoria/Trayectoria";
import Acerca from "./pages/Website/Acerca/acerca";
import Contacto from "./pages/Website/Contacto/contacto";
import Acceso from "./pages/Website/Acceso/acceso";
import RasiApp from "./pages/App/RasiApp/RasiApp";
import React, {useEffect, useState} from 'react';
import Auth from "./Auth";
function App() {

  return (
      <>
          <div className="App">
              <Barra/>
          </div>
          <div className="content">
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path={"/trayectoria"} element={<Trayectoria/>}/>
                  <Route path={"/acerca"} element={<Acerca/>}/>
                  <Route path={"/contacto"} element={<Contacto/>}/>
                  <Route path={"/acceso"} element={<Acceso/>}/>
                  <Route path={"/app/*"} element={<Auth><RasiApp/></Auth>}/>

              </Routes>
          </div>
      </>
  );
}

export default App;
