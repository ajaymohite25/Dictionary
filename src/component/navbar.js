import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { loginContext } from "../context/IsloginContext";

function Navbar() {
  const [isLogin, setLogin] = useContext(loginContext);

  return (
    <nav
      className="navbar navbar-light"
      style={{
        backgroundColor: "#e3f2fd",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          marginLeft: "2rem",
        }}
      >
        Home
      </Link>
      {isLogin ? (
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            onClick={() => {
              setLogin(false);
            }}
            style={{
              marginRight: "2rem",
            }}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Sign Out
          </button>
        </Link>
      ) : (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              marginRight: "2rem",
            }}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Sign in
          </button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
