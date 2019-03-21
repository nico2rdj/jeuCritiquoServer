const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    price: {
      type: Currency,
      required: true,
      min: 0
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    playingTime: {
      type: Number,
      min: 0
    },
    playerMin: {
      type: Number,
      min: 1
    },
    playerMax: {
      type: Number,
      min: 1
    },
    ageMin: {
      type: Number,
      min: 1
    },
    language: {
      type: String
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

var Games = mongoose.model("Game", gameSchema);

module.exports = Games;
