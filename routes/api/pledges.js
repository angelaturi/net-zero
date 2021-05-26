const express = require("express");
const router = express.Router();
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
  async (req, res) => {
    try {
      const { errors, isValid } = validatePledgeInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newPledge = await Pledge.create(req.body);
      res.json(newPledge);
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
  (req, res) => {
    const { errors, isValid } = validatePledgeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Pledge.findOne(req.body._id).then((pledge) => {
      const { ownerId, title, description, state } = req.body;

      if (ownerId) {
        pledge.ownerId = ownerId;
      }

      if (title) {
        pledge.title = title;
      }

      if (description) {
        pledge.description = description;
      }

      if (state) {
        pledge.state = state;
      }

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
