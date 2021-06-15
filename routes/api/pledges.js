const express = require("express");
const router = express.Router();
const passport = require("passport");
const keys = require("../../config/keys");
const Pledge = require("../../models/Pledge");
const validatePledgeInput = require("../../validation/pledge");
const User = require("../../models/User");

const upload = require("../../services/ImageUpload");
const { array } = require("../../services/ImageUpload");

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
//     Body: file.buffer ? file.buffer : null,
//     ContentType: file.mimetype,
//     ACL: "public-read",
//   };
//   const uploadPhoto = s3.upload(params).promise();
//   return uploadPhoto;
// };

// All Public Pledges
router.get("/", (req, res) => {
  Pledge.find()
    .populate("user", "handle")
    .sort({ date: -1 })
    .then((pledges) => res.json(pledges))
    .catch((err) =>
      res.status(404).json({ nopledgesfound: "No pledges found" })
    );
});

// Pledges by user
router.get("/user/:user_id", (req, res) => {
  Pledge.find({ user: req.params.user_id })
    .populate("user", "handle")
    .sort({ date: -1 })
    .then((pledges) => res.json(pledges))
    .catch((err) =>
      res
        .status(404)
        .json({ nopledgessfound: "No pledges found from that user" })
    );
});

// Pledges by id
router.get("/:id", (req, res) => {
  Pledge.findById(req.params.id)
    .populate("user", "handle")
    .then((pledge) => res.json(pledge))
    .catch((err) =>
      res.status(404).json({ nopledgefound: "No pledge found with that ID" })
    );
});

//create pledge
router.post(
  "/",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { errors, isValid } = validatePledgeInput(req.body);

      // uploadImage(req.file).then((data) => {
      //   const uploadedImageURL = data.Location;

      const newPledge = new Pledge({
        title: req.body.title,
        description: req.body.description,
        actionlist: req.body.actionlist,
        public: req.body.public,
        image: req.file ? req.file.location : "",
        user: req.user.id,
      });

      newPledge
        .save()
        .then((pledge) => res.json(pledge))
        .catch((err) => res.json(err));
    } catch (err) {
      console.log("an error occurred==>>", err);
      res.status(500).send(err);
    }
  }
);

// update
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedPledge = await Pledge.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.send(updatedPledge);
    } catch (err) {
      console.log("err==>>", err);
      res.status(500).send(err);
    }
  }
);
// delete pledge
router.delete("/:id", (req, res) => {
  Pledge.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("Pledge deleted successfully!");
    })
    .catch((err) => res.status(400).json(err));
});

//Get all comment from a pledge
router.get(
  "/:id/comments/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pledge.findById(req.params.id)
      .then((pledge) => {

        //return all comments
        return res.json(pledge.comments);
      })
      .catch((err) =>
        res.status(404).json({ pledgenotfound: "No pledge found" })
      );
  }
);

//Post comment to pledge
router.post(
  "/:id/comments/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pledge.findById(req.params.id)
      .then((pledge) => {
        console.log(req.user);
        const newComment = {
          authorId: req.user._id,
          text: req.body.text ? req.body.text : "",
          authorName: req.user.handle,
        };

        pledge.comments.push(newComment);

        pledge.save().then((pledge) => res.json(pledge));
      })
      .catch((err) =>
        res.status(404).json({ pledgenotfound: "No pledge found" })
      );
  }
);

//Get a comment from a pledge
router.get(
  "/:id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pledge.findById(req.params.id)
      .then((pledge) => {

        //find specific comment
        let comm;
        pledge.comments.forEach((comment) => {
          if(comment._id == req.params.comment_id){
            comm = comment;
          }
        })

        res.json(comm);
      })
      .catch((err) =>
        res.status(404).json({ pledgenotfound: "No comment found" })
      );
  }
);


//Edit a comment from a pledge
router.patch(
  "/:id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pledge.findById(req.params.id)
      .then((pledge) => {

        //find index of specific comment
        let comm;
        let commIdx;
        pledge.comments.forEach((comment, i) => {
          if(comment._id == req.params.comment_id){
            comm = comment;
            commIdx = i;
          }
        })
        
        //modify text of that comment IF the logged in user is the one who made the comment
        if (req.user._id.toString() === comm.authorId.toString()) {
          pledge.comments[commIdx].text = req.body.text;
        }
        
        //save the pledge back to the database and return it
        pledge.save().then((pledge) => res.json(pledge));
      })
      .catch((err) =>
        res.status(404).json({ pledgenotfound: "No pledge found" })
      );
  }
);

// Delete a comment from a pledge
router.delete("/:id/comments/:comment_id", (req, res) => {
  Pledge.findById(req.params.id)
    .then((pledge) => {
      if (
        pledge.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnoteexists: "Comment does not exist" });
      }

      const removeIndex = pledge.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      pledge.comments.splice(removeIndex, 1);

      plege.save().then((pledge) => res.json(pledge));
    })
    .catch((err) =>
      res.status(404).json({ pledgenotfound: "No pledge found" })
    );
});
// follow a pledge
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pledge.findById(req.params.id)
      .populate("user", "handle")

      .then((pledge) => {
        if (!pledge.follows.includes(req.user.id)) {
          pledge.follows.push(req.user.id);
        }

        pledge.save().then((pledge) => res.json(pledge));
      })
      .catch((err) =>
        res.status(404).json({ follownotfound: "No follow found" })
      );
  }
);

//follow delete
router.delete(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Pledge.findById(req.params.id)
      .populate("user", "handle")
      .then((pledge) => {
        let index = pledge.follows.indexOf(req.user.id);

        if (index !== -1) {
          pledge.follows.splice(index, 1);
        }

        pledge.save().then((pledge) => res.json(pledge));
      })
      .catch((err) =>
        res.status(404).json({ pledgenotfound: "No pledge found" })
      );
  }
);

module.exports = router;
