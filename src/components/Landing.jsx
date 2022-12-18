import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="my-5" id="landing-cont">
      <h1 className="text-center">Welcome to Jonathan's To-Do List App!</h1>
      <div className="text-center my-5">
        <div id="login-landing">
          <h2 className="text-center my-5">Login and start making your to-do list</h2>
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
        </div>
        <div id="register-landing">
          <h3 className="my-5">Don't have an account? Register <Link to="/register">
              here
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Landing;