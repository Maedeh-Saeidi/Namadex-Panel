import React from "react";
import {
  Box,
  Stack,
  CircularProgress,
  circularProgressClasses,
} from "@mui/material";

export default function AnimatedCircle({ loginProcess }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        bgcolor: "white",
        zIndex: 1000,
      }}
    >
      <Box position="relative">
        <CircularProgress
          variant="indeterminate"
          sx={{
            color: "gray",
          }}
          size={100}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          value={loginProcess}
          size={100}
          sx={{
            [`&.${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
            position: "absolute",
            left: 0,
            color: "green",
          }}
        />
      </Box>
    </Stack>
  );
}
