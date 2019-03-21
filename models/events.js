const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    image: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    price: {
      type: String
    },
    author: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    startHour: {
      type: String,
      required: true
    },
    endHour: {
      type: String
    },
    postalCode: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    dateEvent: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

var Events = mongoose.model("Event", eventSchema);

module.exports = Events;
