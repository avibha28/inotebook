import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [credential, setcredential] = useState({name: '', email: '', password: ''})
    let history = useNavigate()
    const handleChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
      }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }) // body data type must match "Content-Type" header
          });
          const res = await response.json()
          // console.log(res.authToken)
         // console.log(res)
          if (res.success) {
              localStorage.setItem('token', res.authToken)
              history("/")
          }
          else{
              alert( res.success + " invalid credentials")
          }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
                    <label htmlFor="name" className="form-label">UserName</label>
                    <input type="text" className="form-control" id="name" name='name' value={credential.name} onChange={handleChange} aria-describedby="emailHelp" required/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={handleChange} minLengh={5} required/>
                </div>
               <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup