import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";

import { Paper, FormGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const fullWidth = {
  width: "100%",
};

const PostForm = () => {
  const branches = [
    "Computer Science Engineering",
    "Artificial Intelligence",
    "Electronics Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Mechanical Engineering",
    "Humanities & Social Sciences",
    "MSC Mathematics",
    "MSC Chemistry",
    "MSC Physics",
  ];

  const navigate = useNavigate();
  const [post, setPost] = useState({
    company: "",
    location: "",
    package: "",
    requirements: [],
    website: "",
    branches: [],
    desciption: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/create-post", {
        post: post,
      });
      console.log(res.data);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <Paper elevation={3} className="form-paper">
        <div className="sign-up-header">
          <h1>Create a new opening</h1>
        </div>

        <FormGroup className="sign-up-form">
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="company"
              label="Company"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="location"
              label="Location"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="package"
              label="Package"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="requirements"
              label="Requirements"
              type="text"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="website"
              label="Website Link"
              type="link"
              variant="standard"
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <Stack
            spacing={3}
            sx={{ width: "700px", padding: "10px", alignItems: "center" }}
          >
            <Autocomplete
              className="sign-up-input"
              multiple
              id="tags-standard"
              options={branches}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  onChange={(e) =>
                    setPost((prevPost) => ({
                      ...prevPost,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  {...params}
                  variant="standard"
                  label="Branches Eligible"
                />
              )}
            />
          </Stack>
          <div className="sign-up-input">
            <TextField
              onChange={(e) =>
                setPost((prevPost) => ({
                  ...prevPost,
                  [e.target.name]: e.target.value,
                }))
              }
              style={{ ...fullWidth, minWidth: "450px" }}
              name="description"
              label="Description"
              multiline
              rows={2}
              type="text"
              variant="standard"
              //onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button variant="contained" type="submit" onClick={onSubmit}>
            Create Post
          </Button>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default PostForm;
