import About from "../models/About.js";

export const upsertAbout = async (req, res) => {
  try {
    const existingAbout = await About.findOne();
    if (existingAbout) {
      const updatedAbout = await About.findByIdAndUpdate(
        existingAbout._id,
        req.body,
        { new: true }
      );
      return res.json(updatedAbout);
    } else {
      const newAbout = await About.create(req.body);
      return res.status(201).json(newAbout);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about)
      return res.status(404).json({ message: "About section not found" });
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about)
      return res.status(404).json({ message: "About section not found" });

    await About.findByIdAndDelete(about._id);
    res.json({ message: "About section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
