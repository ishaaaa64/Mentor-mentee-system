import express from "express";
import { getAllAnnouncements, createAnnouncement, deleteAnnouncement, getAnnouncementCount } from "../controllers/announcementConroller.js";

const router = express.Router();

router.get('/getall', getAllAnnouncements);
router.post('/', createAnnouncement);
router.delete('/:id', deleteAnnouncement); 
router.get('/count', getAnnouncementCount);

export default router; 
