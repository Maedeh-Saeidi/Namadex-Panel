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
  const [imageUrls, setImageUrls] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionApi = "https://api.namadex.ir/api/v1/section";
        const getSections = await axios.get(sectionApi);
        const allSections = getSections.data.data;
        setSections(allSections);

        const imageUrls = [];
        for (const section of allSections) {
          const sectionId = section.id;
          const imageApi = `https://api.namadex.ir/api/v1/section/${sectionId}/image`;
          const imageResponse = await axios.get(imageApi);
          const imageUrl = imageResponse.config.url;
          imageUrls.push(imageUrl);
        }
        setImages(imageUrls);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  {
    isLoading && console.log(images);
  }

  const handleEditClick = (id) => {
    console.log("Edit button clicked for id:", id);
  };
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
            sections.map((row, index) => (
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
  );
}
