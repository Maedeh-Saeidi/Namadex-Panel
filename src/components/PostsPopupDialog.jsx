import React from "react";
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
  TextField,
} from "@mui/material";

export default function PostsPopupDialog({
  isLoading,
  dspPosts,
  setDspPosts,
  id,
  section,
  imageUrls,
  iconUrls,
  setPostId,
  setEditPost,
}) {
  const handleEditePost = (id) => {
    setPostId(id);
    setEditPost(true);
  };

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
                    colSpan={5}
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
                      <TableCell>
                        <Typography variant="h6">Title</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Description</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Link</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Image</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Icon</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">Edit</Typography>
                      </TableCell>
                    </TableRow>
                    {section.posts.map((post, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            value={post.title}
                            label="Title"
                            fullWidth
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={post.description}
                            label="Description"
                            fullWidth
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={post.link}
                            label="Link"
                            fullWidth
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <img
                            width={100}
                            src={`${imageUrls[post.id]}`}
                            alt={`Image ${post.id}`}
                          />
                        </TableCell>
                        <TableCell>
                          <img
                            width={100}
                            src={iconUrls[post.id]}
                            alt={`Icon ${post.id}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ textTransform: "lowercase" }}
                            onClick={() => handleEditePost(post.id)}
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
