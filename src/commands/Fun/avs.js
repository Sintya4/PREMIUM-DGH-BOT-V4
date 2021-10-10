const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
module.exports = {
  name: "avatarfusion",
  category: "fun",
  aliases: ["avs"],
  description: "",
  args: true,
  usage:
    "[first mention | first username | first ID | first nickname] <second mention | second username | second ID | second nickname> ",
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    if (!args[0])
      return client.send(
        "**Which User Would You Like To Be The Base?**",
        {message}
      );
    if (!args[1])
      return client.send(
        "**Which User Would You Like To Put Over The Base?**",
        {message}
      );
    let base =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName === args[0].toLocaleLowerCase()
      );
    if (!base) return client.send("**Base User Not Found!**", {message});
    let overlay =
      message.mentions.members.first(2)[1] ||
      message.guild.members.cache.get(args[1]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[1].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName === args[1].toLocaleLowerCase()
      );
    if (!overlay) return client.send("**Overlay User Not Found!**", {message});
    const baseAvatarURL = base.user.displayAvatarURL({
      format: "png",
      size: 512
    });
    const overlayAvatarURL = overlay.user.displayAvatarURL({
      format: "png",
      size: 512
    });
    try {
      const baseAvatarData = await request.get(baseAvatarURL);
      const baseAvatar = await loadImage(baseAvatarData.body);
      const overlayAvatarData = await request.get(overlayAvatarURL);
      const overlayAvatar = await loadImage(overlayAvatarData.body);
      const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
      const ctx = canvas.getContext("2d");
      ctx.globalAlpha = 0.5;
      ctx.drawImage(baseAvatar, 0, 0);
      ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
      return message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "avatarfusion.png" }]
      });
    } catch (err) {
      return client.send(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`,
        {message}
      );
    }
  }
};
