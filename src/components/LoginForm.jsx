import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  FormGroup,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";

export default function LoginForm({
  setStatus,
  setIsLoggedIn,
  setLoginProcess,
  setOnRequest,
}) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const onSignin = (e) => {
    e.preventDefault();
    setOnRequest(true);

    const configuration = {
      method: "post",
      url: "https://api.namadex.ir/api/v1/login",
      data: {
        username,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setStatus(true);
        console.log("logged in successfully");
      })
      .catch((error) => {
        console.log(error.message);
        setHasError(true);
        setTimeout(() => {
          setOnRequest(false);
        }, 2000);
      });
    if (status) {
      const interval = setInterval(() => {
        setLoginProcess((prev) => prev + 100 / 40);
      }, 50);
      setTimeout(() => {
        clearInterval(interval);
      }, 2000);
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 3100);
    }
  };

  return (
    <Box component="form" maxWidth={400} width="100%" onSubmit={onSignin}>
      <Stack spacing={3}>
        {!hasError && (
          <Stack spacing={3}>
            <TextField
              label="username"
              fullWidth
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
        )}
        {hasError && (
          <Stack spacing={3}>
            <TextField
              error
              id="outlined-error"
              label="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              error
              id="outlined-error-helper-text"
              label="password"
              helperText="Incorrect entry."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
        )}

        <Button type="submit" size="large" variant="contained" color="success">
          Sign in
        </Button>
        <Stack direction="row">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            ></FormControlLabel>
          </FormGroup>
          <Typography color="error" fontWeight="bold" />
        </Stack>
      </Stack>
    </Box>
  );
}
