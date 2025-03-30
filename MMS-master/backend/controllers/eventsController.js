import { Events } from "../models/eventsSchema.js";
//import { handleValidationError } from "../middlewares/errorHandler.js";

export const createEvents = async (req, res, next) => {
  console.log(req.body);
  
  
  try {
    const { event } = req.body;

    if (!event ) {
      return res.status(400).json({ success: false, message: "Please fill the forms" });
    }

    const newEvent = await Events.create({ event });

    return res.status(200).json({
      success: true,
      message: "Event is Created!",
      event: newEvent,
  });    
  }  catch (err) {
    next(err);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {

   const eventList = await Events.find();

  if (!eventList.length) {
    return res.status(400).json({ success: false, message: "Please fill the forms" });
  }

   return res.status(200).json({
    success: true,
    events: eventList,
  });   
}  catch (err) {
  next(err);
}
};
 
export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Events.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (err) {
    next(err);
  }
};

export const getEventsCount = async (req, res, next) => {
  try {
    const count = await Events.countDocuments();
    res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    next(err);
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { event } = req.body;

    if (!event) {
      return res.status(400).json({ success: false, message: "Event text is required" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, { event }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
