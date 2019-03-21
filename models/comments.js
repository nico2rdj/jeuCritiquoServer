const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    author: {
      //type: String,
      type: mongoose.Schema.Types.ObjectId,
      //required: true
      ref: "User"
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game"
    }
  },
  {
    timestamps: true
  }
);

var Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
