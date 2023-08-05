import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import {
  FormGroup,
  Paper,
  TextField,
  Button,
  Link,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MessageContext from "../context/message";
import { MESSAGE_TYPES } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import StudentContext from "../context/student";
import AdminContext from "../context/admin";

const fullWidth = {
  width: "100%",
};

const SignUp = () => {
  const { setStudent } = useContext(StudentContext);
  const { setAdmin } = useContext(AdminContext);
  const { setMessage } = useContext(MessageContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alignment, setAlignment] = useState("student");

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/${alignment}/sign-up`,
        {
          email: email,
          password: password,
        }
      );
      if (alignment === "student") {
        navigate("/posts");
        setStudent(res.data.student);
      } else if (alignment === "admin") {
        navigate("/create-post");
        setAdmin(res.data.admin);
      }

      setMessage({
        type: MESSAGE_TYPES.SUCCESS,
        description: "Successfully signed up",
      });
    } catch (error) {
      setMessage({
        type: MESSAGE_TYPES.DANGER,
        description: "Error while signing up",
      });
    }
  };

  return (
    <div className="sign-up-container">
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ m: "15px" }}
      >
        <ToggleButton value="admin">Admin</ToggleButton>
        <ToggleButton value="student">Student</ToggleButton>
      </ToggleButtonGroup>
      <Paper elevation={3} className="sign-up-paper">
        <div className="sign-up-header">
          <h1>Sign Up</h1>
        </div>
        <FormGroup className="sign-up-form">
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="email"
              label="Email"
              type="email"
              variant="standard"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="sign-up-input">
            <TextField
              style={fullWidth}
              name="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="sign-up-button">
            <Button variant="contained" type="submit" onClick={onSubmit}>
              Sign Up
            </Button>
          </div>
          <div className="sign-up-button">
            Already have an account?{" "}
            <Link href="/sign-in" underline="always">
              Sign In
            </Link>
          </div>
        </FormGroup>
      </Paper>
    </div>
  );
};

export default SignUp;
