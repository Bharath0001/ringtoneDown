const mongoose = require("mongoose");

const movieCard = new mongoose.Schema({
    _id: {type: Number },
    title: { type: String, required: true },
    image: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, required: true }
    },  
    { collection: "z_movie" }); // 👈 Use existing collection

module.exports = mongoose.model("Movie", movieCard);
