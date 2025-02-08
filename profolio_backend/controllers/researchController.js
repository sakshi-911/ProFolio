import Research from "../models/Research.js";

export const createResearch = async (req, res) => {
  try {
    const research = await Research.create(req.body);
    res.status(201).json(research);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResearch = async (req, res) => {
  try {
    const research = await Research.find();
    res.json(research);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(research);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResearch = async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.json({ message: "Research deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) {
      return res.status(404).json({ message: "Research not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
