import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Buy It
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50vw",
    marginTop: "15vh",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  profile: {
    position: "absolute",
    width: "4.2rem",
    height: "4.2rem",
    borderRadius: "50%",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [source, setSource] = useState();
  const history = useHistory();
  const fileRef = useRef(null);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    state: "",
    city: "",
    street: "",
    houseNo: "",
    image: "",
  });

  const handlefileChange = (e) => {
    console.log("hmm");
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSource(reader.result);
    };
  };
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source) {
      alert("Image Required");
    }
    const data = { ...userDetails, image: source };

    axios
      .post("/user", data)
      .then((res) => {
        if (res.data?.msg === "success") {
          history.go("/user/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navigation />
      <Container component="main" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className="avatar">
              {source && (
                <div className={classes.profile}>
                  <img src={source} alt="avatar" />
                </div>
              )}
              <label
                id="image"
                htmlFor="image"
                onClick={() => fileRef.current.click()}
              >
                Choose avatar
              </label>
              <input
                ref={fileRef}
                name="image"
                id="image"
                type="file"
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                onChange={handlefileChange}
              />
              {source && (
                <button
                  style={{
                    position: "absolute",
                    left: "60%",
                    border: "none",
                    padding: "0.3rem",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    fileRef.current.click();
                  }}
                >
                  Choose another
                </button>
              )}
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  type="text"
                  id="mobile"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="state"
                  label="state"
                  type="text"
                  id="state"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label="city"
                  type="text"
                  id="city"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="street"
                  label="street"
                  type="text"
                  id="street"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="houseNo"
                  label="house number"
                  type="text"
                  id="houseNo"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/user/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
