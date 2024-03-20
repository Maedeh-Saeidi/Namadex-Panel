import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import AnimatedCircle from "../components/AnimatedCircle";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const [onRequest, setOnRequest] = useState(false);
  const [loginProcess, setLoginProcess] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState(false);

  if (status) {
    return <Navigate to="dashboard" replace={true} />;
  }
  return (
    <Box
      position={"relative"}
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      <Box
        sx={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "70%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(images/loginbg.jpg)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          height: "100%",
          width: isLoggedIn
            ? "100%"
            : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: isLoggedIn ? 0 : 1,
            transition: "all 0.3s ease-in-out",
            height: "100%",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 5,
            }}
          >
            <img src="images/Namadex.svg" alt="Logo" height={60} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "::webkit-scrollbar": { display: "none" },
            }}
          >
            <LoginForm
              setStatus={setStatus}
              setIsLoggedIn={setIsLoggedIn}
              setLoginProcess={setLoginProcess}
              setOnRequest={setOnRequest}
            />
          </Box>
          {onRequest && <AnimatedCircle loginProcess={loginProcess} />}
        </Box>
      </Box>
    </Box>
  );
}
