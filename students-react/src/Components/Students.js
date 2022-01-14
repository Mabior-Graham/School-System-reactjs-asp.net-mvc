import React, { useState } from 'react'
import Viewstudent from './viewstudents';
import Addstudent from './Addstudent';

function App() {
  const [showadd,setshowadd]=useState(false)
  return (
    <div className="App">
      <button type="button" className="btn btn-primary float-right mt-5" onClick={() => setshowadd(true)}>Add new Student</button>
      {
        showadd && <Addstudent/>
      }
      <Viewstudent/>

    </div>
  );
}

export default App;
