import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credential, setcredential] = useState({email: '', password: ''})
    let history = useNavigate()
    const handleChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
      }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }) // body data type must match "Content-Type" header
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
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={handleChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={handleChange} />
                </div>
               <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login