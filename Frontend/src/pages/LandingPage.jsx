import React from "react";
import { useNavigate } from "react-router-dom";

import "../App.css"; //necessary to use if using any class name
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Priyanshu's ZOOM APP</h2>
        </div>
        <div className="navlist">
          <p
            onClick={() => {
              navigate("/guest");
            }}
          >
            Join as Guest
          </p>

          <p
            onClick={() => {
              navigate("/auth");
            }}
          >
            Register
          </p>

          <p
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login
          </p>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved
            once
          </h1>

          <p>Cover a distance by our video call App</p>
          <div role="button">
            <a href="/auth">Get Started</a>
          </div>
        </div>

        <div>
          <img src="/mobile.png" />
        </div>
      </div>
    </div>
  );
}
