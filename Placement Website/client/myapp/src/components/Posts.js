import React, { useContext, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import PostsContext from "../context/posts";
import StudentContext from "../context/student";

const Posts = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const { student } = useContext(StudentContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/posts/${student._id}`
        );
        setPosts(res.data.posts);
      } catch (error) {}
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Posts;
