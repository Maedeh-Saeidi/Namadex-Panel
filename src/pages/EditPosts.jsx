import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import useAccessToken from "../components/useAccessToken";

export default function EditPosts({
  editPost,
  setEditPost,
  postId,
  setreRenderPosts,
  setReRender,
}) {
  const [pImg, setpImg] = useState(null);
  const [icon, setIcon] = useState(null);
  const [newpImg, setNewpImg] = useState(null);
  const [newIcon, setNewIcon] = useState(null);
  const [pTitle, setpTitle] = useState("");
  const [pDesc, setpDesc] = useState("");
  const [pLink, setpLink] = useState("");
  const accessToken = useAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.namadex.ir/api/v1/section/post/${postId}`
        );
        setpTitle(response.data.data.title);
        setpDesc(response.data.data.description);
        setpLink(response.data.data.link);
        const imageResponse = await axios.get(
          `https://api.namadex.ir/api/v1/section/post/${postId}/image`
        );
        setpImg(imageResponse.config.url);
        const iconResponse = await axios.get(
          `https://api.namadex.ir/api/v1/section/post/${postId}/icon`
        );
        setIcon(iconResponse.config.url);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    if (postId) {
      fetchData();
    }
  }, [postId]);
  const handleSavePost = () => {
    const saveData = async () => {
      try {
        const formData = new FormData();
        formData.append("title", pTitle);
        formData.append("description", pDesc);
        formData.append("link", pLink);
        if (newpImg !== null) {
          formData.append("img", newpImg);
        }
        if (newIcon !== null) {
          formData.append("icon", newIcon);
        }
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.patch(
          `https://api.namadex.ir/api/v1/section/post/${postId}`,
          formData,
          config
        );
        console.log(
          "Post's data sent to API:",
          pTitle,
          pDesc,
          pLink,
          newpImg,
          newIcon
        );
        setEditPost(false);
        setreRenderPosts(true);
        setReRender(true);
      } catch (error) {
        console.error("Error saving data", error);
      }
    };
    saveData();
  };
  const handleDeletePost = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isConfirmed) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios
        .delete(`https://api.namadex.ir/api/v1/section/post/${postId}`, config)
        .then((response) => {
          console.log(`Post with ID ${postId} deleted successfully`);
          setEditPost(false);
          setreRenderPosts(true);
          setReRender(true);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    } else {
      console.log("Deletion cancelled by user");
    }
  };
  return (
    <div>
      <Dialog open={editPost}>
        <DialogTitle>
          <div style={{ display: "flex", gap: "10rem", marginBottom: "1rem" }}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Edit Post
            </Typography>
            <Button
              onClick={() => setEditPost(false)}
              variant="contained"
              color="error"
            >
              X
            </Button>
          </div>
        </DialogTitle>
        <DialogContent sx={{ padding: "1rem" }}>
          <div style={{ margin: "1rem" }}>
            <TextField
              label="Title"
              value={pTitle}
              fullWidth
              onChange={(e) => setpTitle(e.target.value)}
            ></TextField>
          </div>
          <div style={{ margin: "1rem" }}>
            <TextField
              label="Description"
              value={pDesc}
              fullWidth
              onChange={(e) => setpDesc(e.target.value)}
            ></TextField>
          </div>
          <div style={{ margin: "1rem" }}>
            <TextField
              label="Link"
              value={pLink}
              fullWidth
              onChange={(e) => setpLink(e.target.value)}
            ></TextField>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "center",
              paddingLeft: "1rem",
            }}
          >
            <img
              src={`https://api.namadex.ir/api/v1/section/post/${postId}/image`}
              width={100}
              alt={`Image of post ${postId}`}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewpImg(e.target.files[0])}
              sx={{ marginLeft: "0.5rem" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "center",
              paddingTop: "2rem",
              paddingLeft: "1rem",
            }}
          >
            <img src={icon} width={100} alt={`Icon of post ${postId}`} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewIcon(e.target.files[0])}
              sx={{ marginLeft: "0.5rem" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: "0.5rem" }}
            variant="contained"
            color="primary"
            onClick={handleSavePost}
          >
            Save
          </Button>
          <Button
            style={{ margin: "0.5rem" }}
            variant="contained"
            color="error"
            onClick={handleDeletePost}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
