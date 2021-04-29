import React, { useState, useContext } from "react";
import axios from "../axios";
import { loginContext } from "../context/IsloginContext";

function Register(props) {
  const [isLogin, setLogin] = useContext(loginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function onRegister(e) {
    e.preventDefault();

    axios({
      url: "/register",
      method: "post",
      data: {
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        name: name,
      },
    })
      .then((data) => {
        switch (data.data) {
          case "usercreated":
            setLogin(true);
            props.history.push("/");
            break;
          case "notemail":
            setError("Email not valid");
            break;
          case "minlength5":
            setError("password must be greater then 5 charectors");
            break;
          case "passwordnotmatching":
            setError("Password and confirm password doesn't match");
            break;

          default:
            setError("Something went wrong");
            break;
        }
      })
      .catch((err) => {
        // console.log(err.message);
        setError("Something went wrong");
      });
  }

  return (
    <form
      onSubmit={onRegister}
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
        <label htmlFor="exampleInputName">Name</label>
        <input
          style={{
            marginBottom: "10px",
          }}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="form-control"
          id="exampleInputName"
          placeholder="Name"
          autoComplete="off"
        ></input>
      </div>
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
      <div>
        <label htmlFor="exampleInputCPassword1">Confirm Password</label>
        <input
          style={{
            marginBottom: "10px",
          }}
          type="password"
          value={confirmpassword}
          className="form-control"
          id="exampleInputCPassword1"
          placeholder="confirm Password"
          onChange={(e) => {
            setConfirmpassword(e.target.value);
          }}
          autoComplete="off"
        ></input>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Register;
