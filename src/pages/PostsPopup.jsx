import React, { useEffect, useState } from "react";
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

  let section;
  if (id) {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].id === id) {
        section = sections[i];
        break;
      }
    }
  }
  return (
    <div>
      <div>
        <PostsPopupDialog
          section={section}
          id={id}
          isLoading={isLoading}
          dspPosts={dspPosts}
          setDspPosts={setDspPosts}
          setPostId={setPostId}
          setEditPost={setEditPost}
          setReRender={setReRender}
        />
      </div>
      <EditPosts
        postId={postId}
        setEditPost={setEditPost}
        editPost={editPost}
        setReRender={setReRender}
      />
    </div>
  );
}
