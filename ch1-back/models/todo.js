const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    content: { type: String, require: true },
    isChecked: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Todo", todoSchema);

module.exports = Item;
