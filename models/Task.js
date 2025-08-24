import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    require: true,
  },
  priority:{
    type:String,
    enum:['Baja','Media', 'Alta'],
    require: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.model("Task",taskSchema);
export default Task;