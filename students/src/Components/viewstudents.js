import React, { useEffect, useState } from 'react'
function Appm() {
  const [students, setstudents] = useState([])
  const [name, setName] = useState("");
  const [guidanceName, setguidanceName] = useState("");
  const [guidanceNo, setguidanceNo] = useState("");
  const [studentId,setstudentId]=useState(null);
  const [show,setshow]=useState(false)

  useEffect(() => {
    getstudents();
  }, [])

  function getstudents() {
    fetch("https://localhost:44390/api/StudentsApi").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setstudents(resp)
        setName(resp.name)
        setguidanceNo(resp.guidanceName)
        setguidanceName(resp.guidanceNo)
      })
    })
  }

  
  function deletestudent(id) {


    fetch(`https://localhost:44390/api/StudentsApi/${id}`,{
      method: 'DELETE',
    })
    .then(async response => {
        const data = await response.json();

        // checking for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
    })
    .catch(error => {
        // console.error('There was an error!', error);
    });
    window.location.reload();


    // fetch(`https://localhost:44390/api/StudentsApi/${id}`, {
    //   method: 'DELETE'
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     console.warn(resp);
    //     getstudents();
    //   })
    // })
  }

  //student
  function selectstudent(id) {
    fetch(`https://localhost:44390/api/StudentsApi/${id}`).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        setshow(true);
        setName(resp.name);
        setguidanceName(resp.guidanceName);
        setguidanceNo(resp.guidanceNo);
        setstudentId(id);
      })
    })
  }

  function updatestudent(e)
  {
    e.preventDefault();
    let item={
        id:studentId,
        name:name,
        guidanceName:guidanceName,
        guidanceNo:guidanceNo,
      }

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    console.log(item)
    fetch(`https://localhost:44390/api/StudentsApi/${studentId}`, requestOptions)
    .then(async response => {
        const data = await response.json();

        // checking for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
    })
    .catch(error => {
        // console.error('There was an error!', error);
    });
    window.location.reload();
  }

  return (
    <div className="App">
      <h2 className="d-flex ml-3"> Students </h2>
      <div className="d-flex justify-content-between">
      
      <table className="table table-striped text-sm-start mx-3 w-50" style={{fontSize:"0.8rem"}}>
      
        <tbody>
          <tr>
            <th>Name</th>
            <th>Guardian Name</th>
            <th>Guardian Phone</th>
            <th colSpan="2"></th>
          </tr>
          {
            students.map((item, i) =>
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.guidanceName}</td>
                <td>{item.guidanceNo}</td>
                <td><button onClick={() => deletestudent(item.id)} className="btn btn-danger">Delete</button></td>
                <td><button onClick={() => selectstudent(item.id)} className="btn btn-primary">Update</button></td>

              </tr>
            )
          }
        </tbody>
      </table>
      {
        show &&
        <form className="mx-5">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div className="mb-3">
            <label htmlFor="guidanceName" className="form-label">Guardian Name</label>
            <input type="text" className="form-control" value={guidanceName} onChange={(e)=>{setguidanceName(e.target.value)}} />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Guardian Phone</label>
            <input type="text" className="form-control" value={guidanceNo}  onChange={(e)=>{setguidanceNo(e.target.value)}} />
          </div>
          <button onClick={updatestudent} className="btn btn-primary">Update Student</button>  
        </form>
      }
      </div>
    </div>
  );
}
export default Appm;