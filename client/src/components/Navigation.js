import React, { useEffect, useRef } from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    "& .MuiBox-root": {
      zIndex: "2000",
      width: "300px",
      right: "0",
      padding: "20px",
    },
    "& .MuiAppBar-root": {
      position: "sticky",
      top: 0,
      left: 0,
      height: "10vh",
      justifyContent: "center",
      backgroundColor: "#4fc4c9",
    },
    "& .MuiAppBar-positionFixed": {
      position: "fixed",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  anchor: {
    color: "white",
    textDecoration: "none",
  },
  login: {
    fontSize: "1.2rem",
  },
  sideNav: {
    position: "fixed",
    top: "10vh",
    right: "0",
    width: "100%",
    height: "110rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundColor: "#4fc4c9",
  },
  openClose: {
    cursor: "pointer",
  },
  sidenavMenu: {
    textDecoration: "none",
    color: "black",
    margin: "0.5rem 0",
  },
}));
function Navigation() {
  const navigation = useRef();
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(null);

  const cartItems = useSelector((state) => state.cart?.items);
  const noOfcartItems = cartItems && cartItems.length;

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(true);
  };
  const closeModal = () => {
    setMobileMoreAnchorEl(false);
  };
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    setUser(loggedInUser);
    const handleClickOutside = (e) => {
      if (navigation.current && !navigation.current.contains(e.target)) {
        setMobileMoreAnchorEl(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const searchProdcs = (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    } else {
      // window.location.href = `/search?query=${search}`;
      // <Link to={`/search?query=${search}`} />;
      // <Redirect to={`/search?query=${search}`} />;
      history.push(`/search?query=${search}`);
    }
  };

  const renderItems = (
    <Box className={classes.sideNav} id="box" ref={navigation}>
      {user ? (
        <Link
          to="/user/profile"
          className={classes.anchor}
          style={{ color: "black" }}
        >
          <Typography variant="h6">Profile</Typography>
        </Link>
      ) : (
        <Link to="/user/login" className={classes.sidenavMenu}>
          <Typography variant="h6">Login</Typography>
        </Link>
      )}
      {!user && (
        <Link to="/user/signup" className={classes.sidenavMenu}>
          <Typography variant="h6" color="inherit">
            Signup
          </Typography>
        </Link>
      )}
      <Link to="/cart" className={classes.sidenavMenu}>
        <Typography variant="h6" color="inherit">
          Cart
        </Typography>
      </Link>
    </Box>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Link to="/" className={classes.anchor}>
            <Typography className={classes.title} variant="h6" noWrap>
              Buy It
            </Typography>
          </Link>
          <div className={classes.grow} />
          <form className={classes.search} onSubmit={searchProdcs}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              type="search"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleChange}
              inputProps={{ "aria-label": "search" }}
            />
          </form>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/cart" className={classes.anchor}>
              <IconButton aria-label="show cart items" color="inherit">
                <Badge badgeContent={noOfcartItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
                {/* {user ? (
                  <Badge badgeContent={noOfcartItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <ShoppingCartIcon />
                )} */}
              </IconButton>
            </Link>
            {!user && (
              <Link to="/user/signup" className={classes.anchor}>
                <IconButton color="inherit" className={classes.login}>
                  Sign Up
                </IconButton>
              </Link>
            )}
            {!user && (
              <Link to="/user/signin" className={classes.anchor}>
                <IconButton color="inherit" className={classes.login}>
                  Login
                </IconButton>
              </Link>
            )}
            {user && (
              <Link to="/user/profile" className={classes.anchor}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
            )}
          </div>
          <div className={classes.sectionMobile}>
            {!mobileMoreAnchorEl ? (
              <MenuIcon
                onClick={handleMobileMenuOpen}
                className={classes.openClose}
              />
            ) : (
              <CloseIcon onClick={closeModal} className={classes.openClose} />
            )}
          </div>
        </Toolbar>
      </AppBar>
      {mobileMoreAnchorEl ? renderItems : <></>}
    </div>
  );
}

export default Navigation;
