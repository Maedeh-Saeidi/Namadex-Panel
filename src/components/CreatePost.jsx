import React, { useState } from "react";
import { Dialog, DialogActions, Button } from "@mui/material";
import CreatePostForm from "./CreatePostForm";
import useAccessToken from "../components/useAccessToken";
import axios from "axios";

export default function CreatePost({
  createPost,
  setCreatePost,
  secId,
  setReRender,
  setreRenderPosts,
}) {
  const [postTitle, setPostTitle] = useState("");
  const [postDes, setPostDes] = useState("");
  const [postLink, setPostLink] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postIcon, setPostIcon] = useState(null);
  const accessToken = useAccessToken();

  const handleCreatePost = () => {
    const createPost = async () => {
      try {
        const formData = new FormData();
        formData.append("title", postTitle);
        formData.append("description", postDes);
        formData.append("link", postLink);
        if (postImage !== null) {
          formData.append("img", postImage);
        }
        if (postIcon !== null) {
          formData.append("icon", postIcon);
        }
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(
          `https://api.namadex.ir/api/v1/section/${secId}/post`,
          formData,
          config
        );
        setCreatePost(false);
        setreRenderPosts(true);
        setReRender(true);
      } catch (error) {
        console.error("Error saving data", error);
      }
    };
    createPost();
  };

  return (
    <Dialog open={createPost} fullWidth>
      <CreatePostForm
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postDes={postDes}
        setPostDes={setPostDes}
        postLink={postLink}
        setPostLink={setPostLink}
        setPostImage={setPostImage}
        setPostIcon={setPostIcon}
        setCreatePost={setCreatePost}
      />
      <DialogActions>
        <Button
          style={{ margin: "0.5rem" }}
          variant="contained"
          color="primary"
          onClick={handleCreatePost}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
