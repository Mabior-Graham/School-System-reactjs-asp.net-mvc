import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Students from './Components/Students';

function App() {
  const [showadd,setshowadd]=useState(false)
  return (
    <div className="App">
      <Navbar/>
      <Students/>
    </div>
  );
}

export default App;
