import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usestateContext } from '../../Context/ContextProvider';
import { ClipLoader } from 'react-spinners';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { LoginMutation, errors_login,} = usestateContext();
  const[loading,setLoading]=useState(false)

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
        valid = false;
        newErrors.email = "email is required";
    }

    if (!password) {
        valid = false;
        newErrors.password = "password is required";
    }

    setErrors(newErrors);
    return valid;
};

const handlesubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  if (validateForm()) {
      const payload = { email, password };
      LoginMutation.mutate(payload);
      setLoading(true);
  } else {
      setLoading(false);
  }
};
  return (
    <div className='login-wrapper'>
      <form onSubmit={handlesubmit} className='login-form' action="" method="post">
      <h1 className='login-h1'>Login</h1>
      <label htmlFor="email">Email Address</label>
      <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Email Adress' />
      <label htmlFor="">Password</label>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password' />
      <button className='btn-add-login'>
      {loading ? (
            <ClipLoader size={20} color={"#ffffff"} />
          ) : (
            <>Sign In</> 
          )}

      </button>
      <div className="message-wrapper">
        <p>Don't you Have an Account?</p>
        <Link to="/register">Register</Link>
      </div>
      </form>

    </div>
  )
}

export default Login