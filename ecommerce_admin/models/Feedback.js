import mongoose, { model, Schema } from "mongoose";


const FeedbackSchema = new Schema({
  feedback:  String,
  date: String,
  rate: {type: Number},
});

export const Feedback = mongoose.models?.Feedback || model('Feedback', FeedbackSchema);


