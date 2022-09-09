import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext/AppContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getDoc, collection, Timestamp } from "@firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const LoginPage = () => {
  const { setAdminAccess } = useAppContext();
  useEffect(() => {
    setAdminAccess(false);
    window.sessionStorage.removeItem("authAccess");
  }, []);
  const navigate = useNavigate();
  const { adminLogin, adminObj } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  async function handleClick() {
    setIsLogging(true);
    setError("");
    if (email.length === 0 || password.length === 0) {
      setError("Both Fields are necessary");
    } else {
      //("Email and Pass are", email, password)
      adminLogin(email, password).then(async (res) => {
        console.log("Arguments returned ", res);
        if (res[0] === true) {
          console.log("Access iss", res[1]);
          setError("");
          console.log("User has been logged in successfully");
          window.sessionStorage.setItem("authAccess", true);
          window.sessionStorage.setItem("accessType", res[1].accessType);
          setIsLogging(false);

          navigate("/admin-panel");
        } else {
          // if (
          //   res.message === "Firebase: Error (auth/wrong-password)." ||
          //   res.message === "Firebase: Error (auth/invalid-email)."
          // ) {
          setIsLogging(false);
          setError("You have entered wrong email/password");
          // }

          //(res.message)
        }
      });
    }
  }
  function setShowHidePass() {}

  return (
    <Box style={styles.pageContainer}>
      <Typography sx={styles.title}>Agent Login</Typography>
      <Box sx={styles.box}>
        <Box sx={styles.loginContainer}>
          <Typography sx={styles.subTitle}>
            Login to your agent account
          </Typography>

          <TextField
            inputProps={{
              underline: {
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              },
            }}
            style={{
              width: "100%",
              padding: 0,
              border: "none",
              margin: "5px 0px",
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass === true ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
              underline: {
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              },
            }}
            style={{
              width: "100%",
              padding: 0,
              border: "none",
              margin: "5px 0px",
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            type={showPass === true ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography style={styles.errorText}> {error}</Typography>
          {isLogging ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              sx={styles.loginButton}
              onClick={handleClick}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingBottom: "50px",
  },
  box: {
    width: "100%",
    minHeight: "400px",
    maxWidth: "900px",
    height: "100%",

    backgroundColor: "#F8F8F8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: 5,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px",
    height: "100%",
    backgroundColor: "#F8F8F8",

    // minHeight: "300px",
  },
  title: {
    textAlign: "center",
    color: "#000e31",
    fontWeight: "bolder",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "10px",
    marginTop: "20px",
    lineHeight: { lg: "70px", md: "70px", sm: "70px", xs: "50px" },
    fontSize: { lg: 60, md: 50, sm: 45, xs: 30 },
    textShadow: "1px 1px 5px #148a78",
  },
  subTitle: {
    fontSize: { lg: 26, md: 26, sm: 26, xs: 20 },
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
    height: "100%",
    minHeight: "56px",
    marginTop: "10px",
    backgroundColor: "#000e31",
    fontWeight: "bold",
    fontSize: "20px",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
};

export default LoginPage;
