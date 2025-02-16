const mongoose = require("mongoose");

const Ringtone = new mongoose.Schema(
    {
      movieId: { type: Number, ref: "Movie", required: true }, 
      name: { type: String, required: true },
      audioUrl: { type: String, required: true }, 
      clicks: { type: Number, default: 0 },
      createdAt: { type: Date, required: true }, // Manually add this in ISO format when inserting
    },
    { collection: "z_ringtone"}
  );
  
  module.exports = mongoose.model("Ringtone", Ringtone);
  