import { useRef } from "react";
import React from "react";
import axios from "../AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handlSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("register successfull,please login");
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.msg || error.message);
    }
  }
  return (
    <section>
      <form onSubmit={handlSubmit}>
        <div>
          <span>username :---</span>
          <input ref={userNameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>firstname :---</span>
          <input ref={firstNameDom} type="text" placeholder="firstname" />
        </div>
        <br />
        <div>
          <span>lastname :---</span>
          <input ref={lastNameDom} type="text" placeholder="lastname" />
        </div>
        <br />
        <div>
          <span>email :---</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>password :---</span>
          <input ref={passwordDom} type="password" placeholder="password " />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to={"/login"}> login </Link>
    </section>
  );
}

export default Register;
