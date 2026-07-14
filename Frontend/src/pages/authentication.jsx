//use this path to get the below code
//material UI:- https://github.com/mui/material-ui/blob/v5.15.2/docs/data/material/getting-started/templates/sign-in-side/SignInSide.js

import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; //MUI imports all above 5

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext"; //important (it gives the usernme and passord  to authcontext to check the id and password)
import Snackbar from "@mui/material/Snackbar";
import loginBg from "./login background.avif";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme(); //provide theme to page of MUI

export default function Authentication() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(); //wrong password error store
  const [message, setMessage] = React.useState("");

  const [formState, setformState] = React.useState(0); //0 means login , 1 means register
  const [open, setOpen] = React.useState(false); //shows popup(i cant understand)

  const { handleRegister, handleLogin } = React.useContext(AuthContext); //using functions(handleregister , login) of authcontext

  let handleAuth = async () => {
    //a function which decides => login or register and then sends request to the backend
    try {
      if (formState === 0) {
        //apply for login
        let result = await handleLogin(username, password);
        setMessage(result);
        setOpen(true);
        navigate("/home");
        // console.log("Login Result:", result);
        // console.log("Token:", localStorage.getItem("token"));
      }
      if (formState == 1) {
        //apply for register
        let result = await handleRegister(name, username, password);
        // console.log(result);
        // setUsername("");
        setMessage(result);
        setOpen(true);
        // setError("");
        setformState(0);
        // setPassword("");

      }
    } catch (err) {
      // console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
      setOpen(true);
    }
  };

  return (
    // apply common theme in complete login page
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "../assets/login-background.avif",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={12}
          sx={{
            background: "linear-gradient(145deg,#1E293B,#0F172A)",
            color: "white",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#2563eb",
                width: 65,
                height: 65,
                boxShadow: "0 8px 25px rgba(37,99,235,.4)",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                mb: 3,
              }}
            >
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setformState(0)}
              >
                Sign In
              </Button>

              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setformState(1)}
              >
                Sign Up
              </Button>
            </Box>

            <>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#FFFFFF",
                  textShadow: "0 0 18px rgba(255,255,255,0.35)",
                  letterSpacing: "0.5px",
                  mb: 1,
                }}
              >
                Welcome Back 👋
              </Typography>

              <Typography
                sx={{
                  color: "#60A5FA",
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Sign in to continue your meetings
              </Typography>
            </>

            <Box
              component="form"
              noValidate
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              {/* <p>{name}</p> */}
              {formState === 1 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="Full Name"
                  autoFocus
                  variant="outlined"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#94A3B8",
                      fontWeight: 600,
                    },

                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#60A5FA",
                    },

                    "& .MuiOutlinedInput-root": {
                      color: "#FFFFFF",

                      "& fieldset": {
                        borderColor: "#334155",
                      },

                      "&:hover fieldset": {
                        borderColor: "#3B82F6",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#3B82F6",
                        borderWidth: "2px",
                      },
                    },
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <></>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus
                variant="outlined"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#94A3B8",
                    fontWeight: 600,
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#60A5FA",
                  },

                  "& .MuiOutlinedInput-root": {
                    color: "#FFFFFF",

                    "& fieldset": {
                      borderColor: "#334155",
                    },

                    "&:hover fieldset": {
                      borderColor: "#3B82F6",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                      borderWidth: "2px",
                    },
                  },
                }}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#94A3B8",
                    fontWeight: 600,
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#60A5FA",
                  },

                  "& .MuiOutlinedInput-root": {
                    color: "#FFFFFF",

                    "& fieldset": {
                      borderColor: "#334155",
                    },

                    "&:hover fieldset": {
                      borderColor: "#3B82F6",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                      borderWidth: "2px",
                    },
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p style={{ color: "red" }}>{error}</p>

              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.6,
                  fontSize: "16px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg,#2563eb,#3b82f6)",

                  "&:hover": {
                    background: "linear-gradient(90deg,#1d4ed8,#2563eb)",
                    transform: "translateY(-2px)",
                    transition: ".3s",
                  },
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Log In" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message={message}
        />
      </Grid>
    </ThemeProvider>
  );
}
