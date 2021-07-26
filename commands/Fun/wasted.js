const Color = "RANDOM", Random = require("srod-v2");
const Discord = require("discord.js");

module.exports = {
  name: "wasted",
  aliases: ["wtd"],
  category: "fun",
  description: "Return A Wasted Image!",
  usage: "Wasted | <Mention Or ID>",
  run: async (client, message, args) => {
    
 const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
       const Data = await Random.Wasted({ Image: Member.user.displayAvatarURL({ format: "png" }), Color: Color });

    return message.channel.send(Data);
  }
};