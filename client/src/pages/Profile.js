import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import UserMainArea from "../components/userprofile/UserMainArea";
import { userLoggedOut } from "../features/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
  },
  sideNav: {
    backgroundColor: "white",
    position: "fixed",
    height: "100%",
    padding: "10px",
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginTop: "10px",
    margin: "0 auto",
  },
  details: {
    marginTop: theme.spacing(5),
  },
  btns: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20vh",
  },
}));

function Profile() {
  const classes = useStyles();
  const user = useSelector((state) => state?.user?.user[0]);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(userLoggedOut()).then(() => {
      history.replace("/user/sigin", history.goBack());
    });
  };
  return (
    <>
      <Navigation />
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Box className={classes.sideNav}>
            <Avatar
              alt="Remy Sharp"
              src={user?.image}
              className={classes.large}
            />
            <List component="nav" className={classes.details}>
              <ListItem button>
                <ListItemText primary={`Name: ${user?.name}`} />
              </ListItem>
              <ListItem button>
                <ListItemText primary={`Email: ${user?.email}`} />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary={`Address: ${user?.city},${user?.street}`}
                />
              </ListItem>

              <div className={classes.btns}>
                <Button onClick={logout}>Logout</Button>
                {user && user.role === "admin" ? (
                  <Button href="/admin">Dashboard</Button>
                ) : (
                  ""
                )}
              </div>
            </List>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <UserMainArea />
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
