const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  logChannelID: String,
  webhookid: String,
  webhooktoken: String
});

module.exports = mongoose.model("Log", logSchema, "log");