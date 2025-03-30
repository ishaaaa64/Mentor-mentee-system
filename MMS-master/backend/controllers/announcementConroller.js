import {Announcement} from "../models/announcementSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAnnouncement = async (req, res, next) => {
  console.log(req.body);
  const { announcement } = req.body;
  try {
      if (!announcement ) {
        return res.status(400).json({ success: false, message: "Please fill the forms" });
  }
  await Announcement.create({ announcement});
  res.status(200).json({
    success: true,
    message: "Announcement Created!",
  });
  } catch (err) {
    next(err);
  }
};

export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({
    success: true,
    announcements,
  }); 
  } catch (err) {
    next(err);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const getAnnouncementCount = async (req, res, next) => {
  try {
    const count = await Announcement.countDocuments();
    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    next(err);
  }
};
