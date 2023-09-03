const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
  },

  {
    timestamps: true,
  }
);
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    answers: { type: [AnswerSchema], default: [] },
    show: { type: Boolean, required: true, default: false },
    openToReply: { type: Boolean, default: true },
  },

  {
    timestamps: true,
  }
);

module.exports = {
  commentSchema,
};
