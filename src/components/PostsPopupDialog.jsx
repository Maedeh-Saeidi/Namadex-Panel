import React, { useEffect } from "react";
import CreatePost from "../components/CreatePost";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Typography,
  DialogContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export default function PostsPopupDialog({
  isLoading,
  dspPosts,
  setDspPosts,
  id,
  section,
  setPostId,
  setEditPost,
  setReRender,
}) {
  const [createPost, setCreatePost] = useState(false);
  const [secId, setSecId] = useState("");

  useEffect(() => {
    if (section) {
      setSecId(section.id);
    }
  }, [section]);
  return (
    <div>
      <Dialog open={dspPosts} fullWidth maxWidth="md">
        <DialogTitle>
          <div style={{ display: "flex", gap: "10rem", marginBottom: "1rem" }}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Edit Posts Details
            </Typography>
            <Button
              onClick={() => setDspPosts(false)}
              variant="contained"
              color="error"
            >
              X
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              <TableRow>
                {isLoading && id && (
                  <TableCell
                    sx={{ fontSize: "1.2rem" }}
                    colSpan={6}
                    variant="head"
                    align="center"
                  >
                    {section.title}
                  </TableCell>
                )}
              </TableRow>
              {isLoading && id ? (
                section.posts.length ? (
                  <React.Fragment>
                    <TableRow>
                      <TableCell align="left">Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="left">Link</TableCell>
                      <TableCell align="left">Image</TableCell>
                      <TableCell align="left">Icon</TableCell>
                      <TableCell align="center">Edit</TableCell>
                    </TableRow>
                    {section.posts
                      .sort((a, b) => a.id - b.id)
                      .map((post, index) => (
                        <TableRow key={post.id}>
                          <TableCell>{post.title}</TableCell>

                          <TableCell>{post.description}</TableCell>
                          <TableCell>{post.link}</TableCell>
                          <TableCell>
                            <img
                              width={100}
                              src={`https://api.namadex.ir/api/v1/section/post/${post.id}/image`}
                              alt={`Image ${post.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <img
                              width={100}
                              src={`https://api.namadex.ir/api/v1/section/post/${post.id}/icon`}
                              alt={`Icon ${post.id}`}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              color="secondary"
                              style={{
                                textTransform: "lowercase",
                                color: "purple",
                              }}
                              onClick={() => {
                                setPostId(post.id);
                                setEditPost(true);
                              }}
                            >
                              edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </React.Fragment>
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      There are no posts
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div dir="rtl">
            <Button
              color="secondary"
              style={{
                textTransform: "lowercase",
                color: "blue",
              }}
              onClick={() => setCreatePost(true)}
            >
              Create a post
            </Button>
          </div>
          <CreatePost
            secId={secId}
            createPost={createPost}
            setCreatePost={setCreatePost}
            setReRender={setReRender}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
