//here we just write the logic of signin and signup button
// it gives handleLogin , HandleRegister

import axios from "axios"; //to connect with backend (sends user data to backend)
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({}); //creates an empty box  which holds userdata , setuserdata , handle login , handleregister
import httpStatus from "http-status";
import server from "../environment";

const client = axios.create({
  baseURL: `${server}/api/users`, // base url(just type login , signup , home after this url to visit anywhere)
});

export const AuthProvider = ({ children }) => {
  //all components of authProvider will get data access

  const [userData, setUserData] = useState(null); // after login it stores users username
  const handleRegister = async (name, username, password) => {
    //for signup
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        //if account created
        return request.data.message; //return the message "user registered successfully"
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });

      console.log(request.data);

      if (request.status === httpStatus.OK) {
        //if account exists
        localStorage.setItem("token", request.data.token); //storing that token in localstorage so that user has to login again if once refresh
        return request.data.message; // return message "login successful"(by default)
      }
    } catch (err) {
      throw err;
    }
  };

  const getHistoryOfUser = async () => {
    try {
      let request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return request.data;
    } catch (err) {
      throw err;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return request;
    } catch (e) {
      throw e;
    }
  };

  const data = {
    //these functions are used to to export so that used in every file
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>; // you can use these handlelogin, handleregister functions inAuthentication.jsx  file.
};
