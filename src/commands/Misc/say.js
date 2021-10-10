
module.exports = {
  name: "say",
  category: "misc",
  usage: "say <msg>",
  args: true,
  run: async (client, message, args) => {
    message.delete();
    message.channel.send({ content: args.join(" ") });
  }
};
