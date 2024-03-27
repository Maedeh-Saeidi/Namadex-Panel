import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  TextField,
} from "@mui/material";

export default function CreatePostForm({
  postTitle,
  setPostTitle,
  postDes,
  setPostDes,
  postLink,
  setPostLink,
  setPostImage,
  setPostIcon,
  setCreatePost,
}) {
  return (
    <div>
      <DialogTitle>
        <div style={{ display: "flex", gap: "10rem", marginBottom: "1rem" }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Create a post
          </Typography>
          <Button
            onClick={() => setCreatePost(false)}
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
            value={postTitle}
            fullWidth
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div style={{ margin: "1rem" }}>
          <TextField
            label="Description"
            value={postDes}
            fullWidth
            onChange={(e) => setPostDes(e.target.value)}
          />
        </div>
        <div style={{ margin: "1rem" }}>
          <TextField
            label="Link"
            value={postLink}
            fullWidth
            onChange={(e) => setPostLink(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "center",
            paddingTop: "1rem",
            paddingLeft: "1rem",
          }}
        >
          <p>Post image:</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostImage(e.target.files[0])}
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
          <p>Post icon:</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostIcon(e.target.files[0])}
            sx={{ marginLeft: "0.5rem" }}
          />
        </div>
      </DialogContent>
    </div>
  );
}
