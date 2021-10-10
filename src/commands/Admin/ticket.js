const {
  Client,
  Message,
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");
module.exports = {
  name: "ticket-panel",
  P_user: ["MANAGE_MESSAGES"],
  category: "admin",
  run: async (client, message, args) => {
    message.delete()
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        message.guild.name,
        message.guild.iconURL({
          dynamic: true
        })
      )
      .setDescription(
        "__**How to make a ticket**__\n" +
          "> Click on the reaction that relates to your need\n" +
          "> Once the ticket is made you will be able to type in there"
      )
      .setTitle("Tickets")
      .setThumbnail(
        "https://media.discordapp.net/attachments/733317247522832445/767777222080725022/download-ticket-ticket-free-entertainment-icon-orange-ticket-design-0.png"
      );
    const bt = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("tic")
        .setEmoji("🎫")
        .setLabel("Create Ticket!")
        .setStyle("PRIMARY")
    );
    message.channel.send({
      embeds: [embed],
      components: [bt]
    });
  }
};
