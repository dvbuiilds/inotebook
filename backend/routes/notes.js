const express = require("express");
const getUser = require("../middleware/getUser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1. Get all the notes using GET "/api/notes/allnotes". Login Required.
router.get("/allnotes", getUser, async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs });
  }
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).send("Some error occured.");
  }
});

// Route 2. Add a new note using POST "/api/notes/addnote". Login Required.
router.post(
  "/addnote",
  getUser,
  [
    body("title", "Enter a title for the note.").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs });
    }
    try {
      const { title, description, tag } = req.body;
      const notes = new Notes({
        user: req.user.id,
        date: Date.now(),
        title,
        description,
        tag,
      });
      await notes.save();
      res.json(notes);
    } catch (error) {
      console.log("error.message", error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// Route 3. Update an Existing Note using PUT "/api/notes/updatenote". Login Required.
router.put(
  "/updatenote/:id",
  getUser,
  [
    body("title", "Enter a title for the note.").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs });
    }

    try {
      const { title, description, tag } = req.body;
      // verify if the right user is updating the note.
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }

      note.title = title;
      note.description = description;
      note.tag = tag;
      await note.save();
      res.json(note);
    } catch (error) {
      console.log("error.message", error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// Route 4. Delete an Existing Note using DELETE "/api/notes/deletenote/:id". Login Required.
router.delete("/deletenote/:id", getUser, async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs });
  }

  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    res.json(note);
    await Notes.findByIdAndDelete(note.id);
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).send("Some error occured.");
  }
});

module.exports = router;
