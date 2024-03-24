import React, { useEffect, useState } from "react";
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
import axios from "axios";

export default function PostsPopup({
  dspPosts,
  setDspPosts,
  sections,
  isLoading,
  id,
}) {
  const [imageUrls, setImageUrls] = useState([]);
  const [iconUrls, setIconUrls] = useState([]);

  let section;
  if (id) {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].id === id) {
        section = sections[i];
        break;
      }
    }
  }

  useEffect(() => {
    const fetchPostData = async () => {
      const imagePromises = [];
      const iconPromises = [];

      sections.forEach((section) => {
        section.posts.forEach((post) => {
          const imagePromise = axios
            .get(`https://api.namadex.ir/api/v1/section/post/${post.id}/image`)
            .then((response) => response.config.url);
          imagePromises.push(imagePromise);

          const iconPromise = axios
            .get(`https://api.namadex.ir/api/v1/section/post/${post.id}/icon`)
            .then((response) => response.config.url);
          iconPromises.push(iconPromise);
        });
      });

      Promise.all(imagePromises).then((urls) => setImageUrls(urls));
      Promise.all(iconPromises).then((urls) => setIconUrls(urls));
    };

    fetchPostData();
  }, [sections]);
  console.log("imageurls:", imageUrls, "iconUrls:", iconUrls);
  section.posts.map((post, index) => console.log("index", index));

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
                        <Typography variant="h6">Delete</Typography>
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
                            src={`${imageUrls[index]}`}
                            alt={`Image ${index}`}
                          />
                        </TableCell>
                        <TableCell>
                          <img src={iconUrls[index]} alt={`Icon ${index}`} />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
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
