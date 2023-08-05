import { Button, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { MESSAGE_TYPES } from "../constants/constant";
import MessageContext from "../context/message";
import StudentContext from "../context/student";
import PostsContext from "../context/posts";

const Post = (props) => {
  const { setMessage } = useContext(MessageContext);
  const { setPosts } = useContext(PostsContext);
  const { student } = useContext(StudentContext);

  const wrap = { wordWrap: "break-word" };

  const onApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/posts/apply", {
        postId: props.post._id,
        studentId: student._id,
      });

      const res = await axios.get(`http://localhost:5000/posts/${student._id}`);
      setPosts(res.data.posts);
      setMessage({
        type: MESSAGE_TYPES.SUCCESS,
        description: "Successfully applied!",
      });
    } catch (error) {
      setMessage({
        type: MESSAGE_TYPES.DANGER,
        description: "Error while applying!",
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: "500px", fontSize: "0.9rem", padding: "20px", m: "30px" }}
    >
      <h2> {props.post.company}</h2>
      <Typography style={wrap}>
        <strong>Location:</strong> {props.post.location}
      </Typography>
      <Typography style={wrap}>
        <strong>Package:</strong> {props.post.package}
      </Typography>
      <Typography style={wrap}>
        <strong>Description:</strong> {props.post.description}
      </Typography>
      <Typography>
        <strong>Requirements:</strong>
      </Typography>
      <ul style={{ margin: 0 }}>
        {props.post.requirements.map((requirement) => (
          <li>
            <Typography style={wrap}>{requirement}</Typography>
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        {!props.post.appliedStudents.includes(student._id) && (
          <Button variant="contained" sx={{ mr: "10px" }} onClick={onApply}>
            Apply
          </Button>
        )}

        <Button variant="outlined" href={props.post.website} target="_blank">
          Visit Website
        </Button>
      </div>
    </Paper>
  );
};

export default Post;
