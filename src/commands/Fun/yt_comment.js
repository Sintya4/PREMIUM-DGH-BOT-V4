const canvacord = require("canvacord");
module.exports = {
  name: "comment",
  description: "",
  usage: "comment <text>",
  category: "fun",
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    const comment = args.join("");
    if (!comment)
      return client.send(
        `${await client.emoji("DGH_error")} Provide something to Comment!`,
        {message}
      );
    let yt = await canvacord.Canvas.youtube({
      avatar: message.author.displayAvatarURL({ format: "png" }),
      username: message.author.username,
      content: args.join(" ")
    });
    message.channel.send({ files: [{ attachment: yt, name: "comment.png" }] });
  }
};
