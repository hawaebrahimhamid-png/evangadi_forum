import React from "react";
import { useRef } from "react";
import axios from "../AxiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handlSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      alert("login successfull");
      localStorage.setItem("token", data.token);
      // navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.msg || error.message);
    }
  }

  return (
    <section>
      <form onSubmit={handlSubmit}>
        <div>
          <span>email :---</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>password :---</span>
          <input ref={passwordDom} type="password" placeholder="password " />
        </div>
        <button type="submit">login</button>
      </form>
      <Link to={"/register"}> Register </Link>
    </section>
  );
}

export default Login;
