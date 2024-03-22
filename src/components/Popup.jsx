import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAccessToken from "./useAccessToken";

import axios from "axios";

export default function Popup({ openPopup, setOpenPopup, id }) {
  const [secInfo, setSecInfo] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.namadex.ir/api/v1/section/${id}`
        );
        setSecInfo(response.data.data);
        setTitle(response.data.data.title);
        setDesc(response.data.data.description);

        const imgResponse = await axios.get(
          `https://api.namadex.ir/api/v1/section/${id}/image`
        );
        setImg(imgResponse.config.url);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleFileChange = (file) => {
    if (file) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        // Update the img state with the data URL of the selected image
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log(accessToken);
    const saveData = async () => {
      try {
        console.log(id);
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", desc);

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.patch(
          `https://api.namadex.ir/api/v1/section/${id}`,
          formData,
          config
        );
        console.log("Data sent to API:", title, desc, img);
        setOpenPopup(false);
      } catch (error) {
        console.error("Error saving data", error);
      }
    };

    saveData();

    console.log(title, desc, img);
  };

  return (
    <div>
      {isLoading ? (
        <Dialog open={openPopup} fullWidth maxWidth="md">
          <DialogTitle>
            <div
              style={{ display: "flex", gap: "10rem", marginBottom: "1rem" }}
            >
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Edit Details{" "}
              </Typography>
              <Button
                onClick={() => setOpenPopup(false)}
                variant="contained"
                color="error"
              >
                X
              </Button>
            </div>
          </DialogTitle>
          <DialogContent>
            <div style={{ margin: "1rem" }}>
              <TextField
                label="Title"
                value={title}
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
            </div>
            <div style={{ margin: "1rem" }}>
              <TextField
                label="Description"
                value={desc}
                fullWidth
                multiline
                rows={4}
                onChange={(e) => setDesc(e.target.value)}
              ></TextField>
            </div>
            <div
              style={{
                margin: "1rem",
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <img src={img} alt={`Image of section ${id}`} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ margin: "1rem" }}
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
}
