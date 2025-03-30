import mongoose from "mongoose";
import validator from "validator";

const classSchema = new mongoose.Schema({
  cardID: {
    type: String,
    required: true
  },
});


export const Class = mongoose.model('Classes', classSchema);





