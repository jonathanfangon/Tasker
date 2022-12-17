import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron mt-5" id="landing-cont">
      <h1 className="text-center">Welcome to Jonathan's To-DO List App!</h1>
      <h2 className="text-center my-5">Sign In and start building your todo list</h2>
      <div className="text-center my-5">
        <Link to="/login" className="btn btn-primary btn-lg">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3 btn-lg">
        Register
      </Link>
      </div>
    </div>
  );
};

export default Landing;