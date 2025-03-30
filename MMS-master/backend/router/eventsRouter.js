import express from "express";
import { getAllEvents, createEvents, deleteEvent, editEvent, getEventsCount } from "../controllers/eventsController.js";

const router = express.Router();

router.get('/getall', getAllEvents);
router.post('/', createEvents);
router.delete('/:id', deleteEvent);
router.get('/count', getEventsCount);
router.put('/:id', editEvent);

export default router;
