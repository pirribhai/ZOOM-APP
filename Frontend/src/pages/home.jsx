//it allows user to create and join any meeting
// allows the access of meeting history
//rediret to history page
//logout option

import React, { useContext, useState } from "react"; //usestate=> to store temporary meeting code , useContext=> to access AuthContext data
import withAuth from "../utils/withAuth"; //check wether the user is logged in or not (if yes then redirect /home otherwise /auth)
import { useNavigate } from "react-router-dom"; //used to change the page
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material"; //  button wrong , Button right
import RestoreIcon from "@mui/icons-material/Restore"; //history icon library
import { AuthContext } from "../contexts/AuthContext"; // to use the function from this file like handlelogin , handleregister, addtouserhistory

function HomeComponent() {
  //component
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState(""); //meeting room

  const { addToUserHistory } = useContext(AuthContext); //extracting function from authContext
  let handleJoinVideoCall = async () => {
    //run after user press join button
    await addToUserHistory(meetingCode); //adding room code in history
    navigate(`/${meetingCode}`); //transfer user  into the meeting room  (localhost:5173/abc123)
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2> Video Call</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            onClick={() => {
              console.log("History clicked");
              navigate("/history");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <RestoreIcon />
            <p>History</p>
          </div>

          <Button
            onClick={() => {
              // removing token from temporary storage while logout
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />

              {/* meeting history save and video page open */}
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
// firstly the homeComponent goes with the security check
