const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Pledge = require("../../models/User");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const upload = require("../../services/ImageUpload");
// const multer = require("multer");
// const AWS = require("aws-sdk");
// const uuidv4 = require("uuid").v4;
// const fs = require("fs");

// const upload = multer();

// const s3 = new AWS.S3({
//   accessKeyId: keys.accessKeyId,
//   secretAccessKey: keys.secretAccessKey,
// });

// const uploadImage = (file) => {
//   const params = {
//     Bucket: keys.S3Bucket,
//     Key: uuidv4(),
//     Body: file.buffer,
//     ContentType: file.mimetype,
//     ACL: "public-read",
//   };
//   const uploadPhoto = s3.upload(params).promise();
//   return uploadPhoto;
// };


//Users Pledges
router.get("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  }
);

//Users Pledges
router.get(
  "/:userId/pledges",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pledge.find({ user: req.params.userId })
      .then((pledges) => res.json(pledges))
      .catch((err) => res.status(400).json(err));
  }
);

// SignUp/Register
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user already exists with this address" });
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                handle: user.handle,
                email: user.email,
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "this user does not exist" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          handle: user.handle,
          email: user.email,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password is not correct" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
    });
  }
);

// Edit profile and add photo
router.put(
  "/:id",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.file === undefined) {
      User.findOne({ email: req.body.email })
        .then((user) => {
          user.handle = req.body.handle;
          user.name = req.body.name;
          user.image = "";

          user
            .save()
            .then((savedUser) => res.json(savedUser))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.status(400).json(err));
    } else {
      User.findOne({ email: req.body.email })
        .then((user) => {
          user.handle = req.body.handle;
          user.name = req.body.name;
          user.image = req.file.location;

          user
            .save()
            .then((savedUser) => res.json(savedUser))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.status(400).json(err));
    }
  }
);

module.exports = router;
