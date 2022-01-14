import React from "react";
import { useState } from "react";

function Addstudent(){
  const [name, setName] = useState("");
  const [guidanceName, setguidanceName] = useState("");
  const [guidanceNo, setguidanceNo] = useState("");
  const [message, setMessage] = useState("");


  function poststudent(e)
  {
    e.preventDefault();
    let item={name,guidanceNo,guidanceName}
    console.warn("item",item)
    fetch(`https://localhost:44390/api/StudentsApi`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        // getstudents()
        window.location.reload();
      })
    })
  }


      return (

        <form className="m-5" onSubmit={poststudent}>
            <h2>Add New student</h2>
        <div className="form-group">
          <label htmlFor="name" className="float-left">student Name</label><br/>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group flex-row">
          <label htmlFor="guidanceName" className="float-left">Guidance Name</label><br/>
          <input 
            type="text" 
            className="form-control" 
            id="guidanceName" 
            placeholder="Enter Guidance name"
            value={guidanceName}
            onChange={(e) => setguidanceName(e.target.value)}/>
        </div>
        <div className="form-group flex-row">
          <label htmlFor="guidanceNo" className="float-left">Guidance PhoneNo.</label><br/>
          <input 
            type="text" 
            className="form-control" 
            id="guidanceNo" 
            placeholder="e.g 078857574"
            onChange={(e) => setguidanceNo(e.target.value)}
            />
            
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block mt-3">Add</button>

      </form>
      );
    }

  export default Addstudent;