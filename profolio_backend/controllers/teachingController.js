import Teaching from "../models/Teaching.js";

export const createTeaching = async (req, res) => {
  try {
    const teaching = await Teaching.create(req.body);
    res.status(201).json(teaching);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeaching = async (req, res) => {
  try {
    const teaching = await Teaching.find();
    res.json(teaching);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeaching = async (req, res) => {
  try {
    const teaching = await Teaching.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(teaching);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeaching = async (req, res) => {
  try {
    await Teaching.findByIdAndDelete(req.params.id);
    res.json({ message: "Teaching experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeachingById = async (req, res) => {
  try {
    const teaching = await Teaching.findById(req.params.id);
    if (!teaching) {
      return res.status(404).json({ message: "Teaching not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
