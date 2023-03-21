import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log('first');
        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password})
            }
        );
        const res = await response.json();
        // console.log('response', res);
        if(res.success){
            localStorage.setItem("token", res.authToken);
            history.push('/');
        } else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                <form onSubmit={handleSubmit}>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">Email address</label>
                        <input type="email" id="form2Example1" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                    </div>
                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2" >Password</label>
                        <input type="password" id="form2Example2" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    {/* <!-- 2 column grid layout for inline styling --> */}
                    <div className="row mb-4">
                        <div className="col">
                        {/* <!-- Simple link --> */}
                        <a href="/">Forgot password?</a>
                        </div>
                    </div>
                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-4" >Sign in</button>
                    {/* <!-- Register buttons --> */}
                    <div className="text-center">
                        <p>Not a member? <a href="/">Register</a></p>
                        <p>or sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                        </button>
                    </div>
                </form>
                </div>
                <div className='col-md-3'></div>
            </div>
            
        </div>
    </>
  );
}
