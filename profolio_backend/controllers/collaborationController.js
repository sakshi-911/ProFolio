import Collaboration from "../models/Collaboration.js";

export const createCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.create(req.body);
    res.status(201).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollaborations = async (req, res) => {
  try {
    const collaborations = await Collaboration.find();
    res.json(collaborations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(collaboration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCollaboration = async (req, res) => {
  try {
    await Collaboration.findByIdAndDelete(req.params.id);
    res.json({ message: "Collaboration deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollaborationById = async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
