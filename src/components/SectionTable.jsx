import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

export default function SectionTable({
  isLoading,
  sections,
  imageUrls,
  setOpenPopup,
  setId,
}) {
  const handleEditClick = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  return (
    <div>
      {isLoading ? (
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
              {sections.map((row, index) => (
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
                  <TableCell>
                    {<img src={imageUrls[index]} alt={`Image ${index}`} />}
                  </TableCell>

                  <TableCell>
                    <Button
                      key={row.id}
                      style={{ textTransform: "lowercase" }}
                      onClick={() => handleEditClick(row.id)}
                    >
                      edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1 className=" text-[1.5rem]">Loading...</h1>
      )}
    </div>
  );
}
