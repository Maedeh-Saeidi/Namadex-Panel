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
import useAccessToken from "../components/useAccessToken";

import axios from "axios";

export default function Popup({ openPopup, setOpenPopup, id, setReRender }) {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [img, setImg] = useState(null);
  const [newImg, setNewImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.namadex.ir/api/v1/section/${id}`
        );
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

  const handleSave = () => {
    const saveData = async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", desc);
        if (newImg !== null) {
          formData.append("img", newImg);
        }

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
        console.log("Data sent to API:", title, desc, newImg);
        setOpenPopup(false);
        setReRender(true);
      } catch (error) {
        console.error("Error saving data", error);
      }
    };
    saveData();
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
                Edit Details
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
              <img src={img} width={100} alt={`Image of section ${id}`} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImg(e.target.files[0])}
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
