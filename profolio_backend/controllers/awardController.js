import Award from "../models/Award.js";

export const createAward = async (req, res) => {
  try {
    const award = await Award.create(req.body);
    res.status(201).json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAwards = async (req, res) => {
  try {
    const awards = await Award.find();
    res.json(awards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAward = async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAward = async (req, res) => {
  try {
    await Award.findByIdAndDelete(req.params.id);
    res.json({ message: "Award deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAwardById = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) {
      return res.status(404).json({ message: "Award not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
