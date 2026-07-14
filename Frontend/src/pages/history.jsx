import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext"; //global box which contains functions like handleLogin,handleRegister,addToUserHistory,getHistoryOfUser
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext); // extarcting function from authContext

  const [meetings, setMeetings] = useState([]); //meetingCode:"firstmeet",   date:"2026-07-03"

  const routeTo = useNavigate();

  useEffect(() => {
    //run this code when page opens
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser(); //meeting code , date
        console.log("History data received => ", history);
        setMeetings(history); //saving date into state
      } catch (e) {
        console.log("history error:-", e);
      }
    };

    fetchHistory(); //UI update(history of user added)
  }, []);

  let formatDate = (dateString) => {
    //convert date into readable form
    const date = new Date(dateString); //now Date is an object
    const day = date.getDate().toString().padStart(2, "0"); // get date(3)=>conert to string "3" => then start with 0 and maximum 2 digits
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // in js jan=0 , feb =1 so start with +1 . now jan =1 => "1"=>01
    const year = date.getFullYear(); //print year

    return `${day}/${month}/${year}`; //12/10/2026
  };

  return (
    // home button
    <div>
      <IconButton
        onClick={() => {
          routeTo("/home");
        }}
      >
        <HomeIcon className="historyHomeIcon"/>
      </IconButton>
      {/* if history exists */}
      {meetings.length !== 0 ? (
        // show card having meeting details(each meeting)card1= abc , card2 =xyz
        meetings.map((e, i) => {
          return (
            <>
              <Card key={i} variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {/* code: abc */}
                    Code: {e.meetingCode}
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Date: {formatDate(e.date)}
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
