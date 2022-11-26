const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cloudinary = require("../util/cloudinary");

const signUp = async (req, res) => {
  try {
    const { email, password, image } = req.body;
    let avatar = null;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw "User already exists!";
    } else {
      if (!image) {
        avatar =
          "https://res.cloudinary.com/dm3x42mup/image/upload/v1623664734/buy-it/users/rklpvwk5q2xu79pd8srz.png";
      } else {
        avatar = await Cloudinary.upload(image, "users", {
          height: 600,
          width: 600,
        });
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const user = {
            ...req.body,
            password: hash,
            image: avatar,
          };
          const newUser = await User.create(user);
          res.status(201).json({
            msg: "success",
            result: {
              user: newUser,
            },
          });
        });
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json({
        msg: "User doesn't exist",
      });
    } else {
      const hash = userExists.password;
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          return res.json({
            msg: err,
          });
        }
        if (result) {
          const user = {
            id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            role: userExists.role,
            image: userExists.image,
            mobile: userExists.mobile,
            state: userExists.state,
            city: userExists.city,
            street: userExists.street,
            houseNo: userExists.houseNo,
          };
          const token = jwt.sign(
            user,
            "thisis-a-secret",
            { algorithm: "HS256" },
            { expiresIn: "1h" }
          );
          req.user = token;
          return res.json({
            msg: "success",
            token,
            user,
          });
        } else {
          res.json({
            msg: "Password or email mismatched!",
          });
        }
      });
    }
  } catch (err) {}
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({
      msg: "User deleted Sucessfully!",
      result: {
        user: deletedUser,
      },
    });
  } catch (err) {
    res.json({});
  }
};

const updateUser = async (req, res) => {
  const { password } = req.body;
  console.log(req.body);
  try {
    if (password) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
          );
          res.status(201).json({
            msg: "User updated successfully!",
            result: {
              user: updatedUser,
            },
          });
        });
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true, runValidators: true }
      );
      res.status(201).json({
        msg: "User updated successfully!",
        result: {
          user: updatedUser,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Something went wrong",
      error: err,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      msg: "Successful",
      result: {
        user: users,
      },
    });
  } catch (err) {
    res.status(503).json({
      msg: "Something went wrong",
      error: err,
    });
  }
};
module.exports = {
  signUp,
  logIn,
  deleteUser,
  updateUser,
  getUsers,
};
