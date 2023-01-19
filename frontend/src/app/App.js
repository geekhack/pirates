import React from 'react';
import {BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom'
import DashboardComponent from '../components/DashboardComponent';
import {PirateCreateComponent, PiratesList, PirateUpdate, PirateView} from '../components/index';
import PiratesHomeComponent from '../components/PiratesHomeComponent';

//routes definition file
function App() {

  return (
    <div className="App">
      
        <Router>
          <Routes>
            <Route path="/" element={<PiratesHomeComponent/>}></Route>
            <Route path="create" element={<PirateCreateComponent/>}></Route>
            <Route path="/list/pirate" element={<PiratesList/>} ></Route>
            <Route path="/pirate/update/:id1" element={<PirateUpdate/>} ></Route>
            <Route path="/user/profile/:id" element={<DashboardComponent/>} ></Route>
            <Route path="/pirate/:id1" element={<PirateView/>} ></Route>
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
