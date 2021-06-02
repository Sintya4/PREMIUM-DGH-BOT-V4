const ms = require("ms");
const discord = require("discord.js");

module.exports = {
  name: "time",
  usage: `time <time> <s/m/h>`,
  category: "utility",
  description: "information from time",
  args: true,
  cooldown: 2,
  permission: "",
  run: async (client, message, args) => {
    //code
    let time = args.join(" ");
    //###############
    let embed = new discord.MessageEmbed()
      .addField("Timer the result", `\`${ms(time)}\``, true)
      .setColor("RANDOM");
    message.channel.send(embed);
  }
};
