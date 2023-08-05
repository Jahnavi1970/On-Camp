import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MessageContext from "../context/message";
import { MESSAGE_TYPES } from "../constants/constant";
import StudentContext from "../context/student";
import Post from "./Post";

const MyApplications = () => {
  const [appliedPosts, setAppliedPosts] = useState([]);
  const { setMessage } = useContext(MessageContext);
  const { student } = useContext(StudentContext);

  useEffect(() => {
    const fetchAppliedPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/posts/applied/${student._id}`
        );
        const appliedPosts = res.data.posts;
        setAppliedPosts(appliedPosts);
      } catch (error) {
        setMessage({
          type: MESSAGE_TYPES.DANGER,
          description: "Error while fetching applied posts",
        });
      }
    };
    fetchAppliedPosts();
  }, []);

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
      {appliedPosts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default MyApplications;
