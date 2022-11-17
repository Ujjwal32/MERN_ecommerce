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
import { Link } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    "& .MuiBox-root": {
      zIndex: "2000",
      height: "100vh",
      width: "300px",
      top: "10vh",
      backgroundColor: "#f4f5fd",
      right: "0",
      padding: "20px",
    },
    "& .MuiAppBar-root": {
      height: "10vh",
      justifyContent: "center",
    },
    "& .MuiAppBar-positionFixed": {
      position: "relative",
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
    sideNav: {
      position: "absolute",
      height: "100vh",
      width: "300px",
      backgroundColor: "#f4f5fd",
      right: "0",
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
  sideNavclose: {
    fontSize: "1.2rem",
    width: "100%",
    textAlign: "start",
    alignItems: "start",
    justifyContent: "start",
    "&:hover": {
      backgroundColor: "#f4f5fd",
    },
    "& .MuiIconButton-label": {
      marginLeft: "-10px",
    },
    "&:active": {
      backgroundColor: "#f4f5fd",
    },
  },
  sidenavMenu: {
    textDecoration: "none",
    color: "black",
  },
}));
function Navigation(props) {
  const navigation = useRef();
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const [search, setSearch] = useState("");

  const loggedInUser = JSON.parse(sessionStorage.getItem("user-e-commerce"));
  const cartItems = useSelector((state) => state.cart?.items);
  const noOfcartItems = cartItems && cartItems.length;

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(!mobileMoreAnchorEl);
  };
  const closeModal = () => {
    setMobileMoreAnchorEl(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (navigation.current && !navigation.current.contains(e.target)) {
      setMobileMoreAnchorEl(false);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const searchProdcs = (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    } else {
      window.location.href = `/search?query=${search}`;
    }
  };

  const renderItems = (
    <Box className={classes.sideNav} id="box" ref={navigation}>
      <Link to="/user/login" className={classes.sidenavMenu}>
        <Typography variant="h6" color="inherit">
          Login
        </Typography>
      </Link>
      <Link to="/user/signup" className={classes.sidenavMenu}>
        <Typography variant="h6" color="inherit">
          Signup
        </Typography>
      </Link>
      <Link to="/cart" className={classes.sidenavMenu}>
        <Typography variant="h6" color="inherit">
          Cart
        </Typography>
      </Link>
      <IconButton
        color="inherit"
        className={classes.sideNavclose}
        onClick={closeModal}
      >
        <CloseIcon /> Close Modal
      </IconButton>
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
                {loggedInUser ? (
                  <Badge badgeContent={noOfcartItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                  <ShoppingCartIcon />
                )}
              </IconButton>
            </Link>
            {!loggedInUser && (
              <Link to="/user/signup" className={classes.anchor}>
                <IconButton color="inherit" className={classes.login}>
                  Sign Up
                </IconButton>
              </Link>
            )}
            {!loggedInUser && (
              <Link to="/user/signin" className={classes.anchor}>
                <IconButton color="inherit" className={classes.login}>
                  Login
                </IconButton>
              </Link>
            )}
            {loggedInUser && (
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
            <IconButton
              className={classes.login}
              aria-label="show more"
              //   aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {mobileMoreAnchorEl ? renderItems : ""}
    </div>
  );
}

export default Navigation;
