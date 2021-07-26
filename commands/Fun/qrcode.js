const Color = "RANDOM", Discord = require("discord.js");

module.exports = {
  name: "qr",
  aliases: ["qrcode"],
  category: "fun",
  args:true,
  description: "Return A Qr Image!",
  usage: "Qr <Message>",
  run: async (client, message, args) => {
    const Msg = args.join("+");
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://chart.googleapis.com/chart?chl=${Msg}&chs=200x200&cht=qr&chld=H%7C0`))
    .setTimestamp();
    message.delete()

    return message.channel.send(Embed);
  }
};