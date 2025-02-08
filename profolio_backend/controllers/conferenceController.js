import Conference from "../models/Conference.js";

export const createConference = async (req, res) => {
  try {
    const conference = await Conference.create(req.body);
    res.status(201).json(conference);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConferences = async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConference = async (req, res) => {
  try {
    const conference = await Conference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(conference);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteConference = async (req, res) => {
  try {
    await Conference.findByIdAndDelete(req.params.id);
    res.json({ message: "Conference deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConferenceById = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);
    if (!conference) {
      return res.status(404).json({ message: "Conference not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
