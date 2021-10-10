const mongoose = require("mongoose");
const { bot } = require("../../config");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    mongoose.connect(bot.mongourl, dbOptions).catch((err) => console.log(err));
    mongoose.connection.on("connected", () => {
      console.log("🟩 Connected to MongoDB!");
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("🟥 Disconnected from MongoDB!");
    });
  },
};