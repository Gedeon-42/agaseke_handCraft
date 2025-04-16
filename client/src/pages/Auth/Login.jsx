import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usestateContext } from '../../Context/ContextProvider';
import { ClipLoader } from 'react-spinners';
import { FiLogIn } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";

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
    <div className="bg-white p-8 flex flex-col rounded shadow-md w-96">
    <div className="flex flex-col items-center justify-center bg-green-600 p2 w-10 h-10 rounded m-auto text-white font-bold text-2xl mb-4"> 
    <FiLogIn className="text-white text-center text-[20px]"/>
</div>
<div className="flex flex-col gap-[10px] items-center justify-center mb-[20px]">
    <h1 className="text-gray-950 text-2xl"> Sign in With Email</h1>
    <p className="text-[gray] text-[14px] text-center">
        secure your account with a strong password and keep it safe.
    </p>

</div>
<form onSubmit={handlesubmit} className="flex flex-col gap-[20px]"  action="" method="post">
<div className="relative flex items-center">
    <MdOutlineEmail  className="absolute left-[10px]" />
    <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="bg-gray-300 w-full pl-[30px] pt-[7px] pb-[7px] rounded-[5px] border-[1px] border-[lightgrey]" />
    </div>
    <div className="relative flex items-center">
    <FaUnlockAlt   className="absolute left-[10px]"  />
    <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="bg-gray-300 w-full pl-[30px] pt-[7px] pb-[7px] rounded-[5px] border-[1px] border-[lightgrey]" />
    </div>

  
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


    </div>
  )
}

export default Login