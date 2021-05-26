const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Pledge = require("../../models/Pledge");
const validatePledgeInput = require("../../validation/pledge");
const User = require("../../models/User");

// All Pledges
router.get("/", (req, res) => {
  Pledge.find()
    .sort({ date: -1 })
    .then((pledges) => res.json(pledges))
    .catch((err) =>
      res.status(404).json({ nopledgesfound: "No pledges found" })
    );
});

// Pledges by user
router.get("/user/:user_id", (req, res) => {
  Pledge.find({ user: req.params.user_id })
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
    .then((pledge) => res.json(pledge))
    .catch((err) =>
      res.status(404).json({ nopledgefound: "No pledge found with that ID" })
    );
});

//create pledge
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePledgeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPledge = new Pledge({
      title: req.body.title,
      description: req.body.description,
      //   address: req.body.address,
      //   city: req.body.city,
      //   state: req.body.state,
      // ownerId: req.user.id,
    });

    newPledge.save().then((pledge) => res.json(pledge));
  }
);
// update pledge
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePledgeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Pledge.findOne(req.body._id).then((pledge) => {
      // pledge.ownerId = req.body.ownerId;
      pledge.title = req.body.title;
      pledge.description = req.body.description;

      pledge.save().then((savedPledge) => res.json(savedPledge));
    });
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

//Add comment to pledge
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePledgeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Pledge.findById(req.params.id)
      .then((pledge) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
        };

        pledge.comments.unshift(newComment);

        pledge.save().then((pledge) => res.json(pledge));
      })
      .catch((err) =>
        res.status(404).json({ pledgenotfound: "No pledge found" })
      );
  }
);

// Delete a comment
router.delete("/comment/:id/:comment_id", (req, res) => {
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
      .then((pledge) => {
        const newFollow = {
          count: req.body.count,
        };

        pledge.follows.unshift(newFollow);

        pledge.save().then((pledge) => res.json(pledge));
      })
      .catch((err) =>
        res.status(404).json({ follownotfound: "No follow found" })
      );
  }
);

//unfollow
router.post(
  "/unfollow/:id",

  (req, res) => {
    User.findOne({ user: req.user.id }).then((user) => {
      Pledge.findById(req.params.id)
        .then((pledge) => {
          if (
            pledge.follows.filter(
              (follow) => follow.user.toString() === req.user.id
            ).length === 0
          ) {
            return res
              .status(400)
              .json({ notfollowed: "You have not yet followed this pledge" });
          }

          const removeIndex = pledge.follows
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          pledge.follows.splice(removeIndex, 1);

          pledge.save().then((pledge) => res.json(pledge));
        })
        .catch((err) =>
          res.status(404).json({ pledgenotfound: "No pledge found" })
        );
    });
  }
);

module.exports = router;
