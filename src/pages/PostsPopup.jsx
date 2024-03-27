import React, { useEffect, useState } from "react";

import axios from "axios";
import EditPosts from "./EditPosts";
import PostsPopupDialog from "../components/PostsPopupDialog";

export default function PostsPopup({
  dspPosts,
  setDspPosts,
  sections,
  isLoading,
  id,
  setReRender,
}) {
  const [editPost, setEditPost] = useState(false);
  const [postId, setPostId] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [iconUrls, setIconUrls] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [reRenderPosts, setreRenderPosts] = useState(false);

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
            .then((response) => {
              return response.config.url;
            });
          iconPromises.push(iconPromise);
        });
      });

      Promise.all(imagePromises).then((urls) => {
        const imageUrlsObject = sections.reduce((acc, section, index) => {
          section.posts.forEach((post, innerIndex) => {
            acc[post.id] = urls[index * section.posts.length + innerIndex];
          });
          return acc;
        }, {});
        setImageUrls(imageUrlsObject);
      });

      Promise.all(iconPromises).then((urls) => {
        const iconUrlsObject = sections.reduce((acc, section, index) => {
          section.posts.forEach((post, innerIndex) => {
            acc[post.id] = urls[index * section.posts.length + innerIndex];
          });
          return acc;
        }, {});
        setIconUrls(iconUrlsObject);
      });
    };

    fetchPostData()
      .then(() => setIsLoadingData(true))
      .catch((error) => {
        console.error("Error fetching post data:", error);
        setIsLoadingData(false);
      });
    if (reRenderPosts) {
      fetchPostData();
      setreRenderPosts(false);
    }
  }, [sections, reRenderPosts]);

  return (
    <div>
      <div>
        <PostsPopupDialog
          section={section}
          id={id}
          isLoading={isLoading}
          dspPosts={dspPosts}
          setDspPosts={setDspPosts}
          imageUrls={imageUrls}
          iconUrls={iconUrls}
          setPostId={setPostId}
          setEditPost={setEditPost}
        ></PostsPopupDialog>
      </div>
      <EditPosts
        postId={postId}
        setEditPost={setEditPost}
        editPost={editPost}
        setreRenderPosts={setreRenderPosts}
        setReRender={setReRender}
      ></EditPosts>
    </div>
  );
}
