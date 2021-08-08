const Discord = module.require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlocks a Channel",
  usage: "unlock",
  category: "admin",
  permissions: "MANAGE_CHANNELS",
  authorPermission: ["MANAGE_CHANNELS"],
  botPermission: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        null: ["SEND_MESSAGES"]
      }
    ]);
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`🔓 ${message.channel}  has been Unlocked`)
      .setColor("RANDOM");
    await message.channel.send(embed);
    message.delete();
  }
};
