import React, { useContext, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { loginContext } from "../context/IsloginContext";

function Login(props) {
  const [isLogin, setLogin] = useContext(loginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onLogin(e) {
    e.preventDefault();
    axios({
      url: "/login",
      method: "post",
      data: { email: email, password: password },
    })
      .then((data) => {
        if (data.data === "passwordwrong") setError("Password does'nt match");
        else if (data.data === "userexist") {
          setLogin(true);
          props.history.push("/");
        }
      })
      .catch((err) => {
        setError("User not Exist");
      });
  }

  return (
    <form
      onSubmit={onLogin}
      style={{
        width: "400px",
        margin: "auto",
      }}
    >
      <p
        style={{
          color: "red",
        }}
      >
        {error}
      </p>
      <div>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          style={{
            marginBottom: "10px",
          }}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter email"
          autoComplete="off"
        ></input>
      </div>
      <div>
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          style={{
            marginBottom: "10px",
          }}
          type="password"
          value={password}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="off"
        ></input>
      </div>
      <button
        style={{
          marginBottom: "10px",
        }}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
      <p>
        New User?<Link to="/register"> Register</Link>
      </p>
    </form>
  );
}

export default Login;
