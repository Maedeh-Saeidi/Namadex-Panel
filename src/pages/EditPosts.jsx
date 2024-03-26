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

export default function EditPosts({ editPost, setEditPost, postId }) {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.namadex.ir/api/v1/section/post/${postId}`
        );
        setPostData(response.data.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    if (postId) {
      fetchData();
    }
  }, [postId]);

  return (
    <div>
      <Dialog open={editPost}>
        <DialogTitle>
          <div style={{ display: "flex", gap: "10rem", marginBottom: "1rem" }}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Edit Details
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
        <DialogContent>
          {postData && (
            <>
              <TextField
                label="Title"
                fullWidth
                value={postData.title}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                value={postData.description}
                InputProps={{ readOnly: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
