import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    todoContent: {
      type: String,
      required: true,
    },
    isDone: {
      type: String,
      required: false,
      default: false,
    },
    todoOwner: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

todoSchema.methods.toClient = function () {
  const obj = this.toObject({ getters: true, versionKey: false }); // Convert the document to a plain JavaScript object

  // Change _id to id
  obj.id = obj._id;
  delete obj._id;

  return obj;
};

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
