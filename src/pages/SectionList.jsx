import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button } from "@mui/material";
import "../fonts/IRANSans 400.ttf";

export default function SectionList() {
  const [sections, setSections] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const configuration = {
      method: "Get",
      url: "https://api.namadex.ir/api/v1/section",
    };
    axios(configuration)
      .then((result) => {
        setSections(result.data.data);
        console.log(sections);
        setIsLoading(true);
      })
      .catch((Response) => {
        console.log(Response.message);
      });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ padding: "30px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading &&
            sections.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell sx={{ fontFamily: "font-IRANSans" }} align="left">
                  {row.title}
                </TableCell>

                <TableCell sx={{ fontFamily: "font-IRANSans" }} align="left">
                  {row.description}
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell>
                  <Button style={{ textTransform: "lowercase" }}>edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
