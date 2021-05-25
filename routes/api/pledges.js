const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const passport = require("passport");

const Pledge = require("../../models/Pledge");
const validatePledgeInput = require("../../validation/pledge");

router.get("/", (req, res) => {
  Pledge.find()
    .sort({ date: -1 })
    .then((pledges) => res.json(pledges))
    .catch((err) =>
      res.status(404).json({ nopledgesfound: "No pledges found" })
    );
});

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

router.get("/:id", (req, res) => {
  Pledge.findById(req.params.id)
    .then((pledge) => res.json(pledge))
    .catch((err) =>
      res.status(404).json({ nopledgefound: "No pledge found with that ID" })
    );
});

//create
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
      ownerId: req.user.id,
    });

    newPledge.save().then((pledge) => res.json(pledge));
  }
);
// update
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePledgeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Pledge.findOne(req.body._id).then((pledge) => {
      pledge.ownerId = req.body.ownerId;
      pledge.title = req.body.title;
      pledge.description = req.body.description;

      pledge.save().then((savedPledge) => res.json(savedPledge));
    });
  }
);
// delete
router.delete("/:id", (req, res) => {
  Pledge.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("Pledge deleted successfully!");
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
