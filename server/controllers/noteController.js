import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const q = req.query.search || "";
  const notes = await Note.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } }
    ]
  }).sort({ updatedAt: -1 });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    },
    { new: true, runValidators: true }
  );

  res.json(note);
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
