import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usestateContext } from "../../Context/ContextProvider";

function Signup() {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);

  const { SignupMutation } = usestateContext();
  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      first_name,
      last_name,
      email,
      password,
      phone,
      password_confirmation,
    };

    SignupMutation.mutate(payload);
  };
  return (
    <div className="login-wrapper">
      <form
        className="signup-form"
        onSubmit={handelSubmit}
        action=""
        method="post"
      >
        <h1 className="login-h1">Register</h1>
        <div className="first-name-wrapper">
          <div className="first-name">
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>
          <div className="first-name">
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
        </div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Adress"
        />
        
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
        />
        <button className="btn-add-login"> {loading ?(<>Loding....</>):(<>Register</>)}</button>
        <div className="message-wrapper">
          <p>Already Have an Account?</p>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
