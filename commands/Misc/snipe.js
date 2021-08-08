const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "snipe",
  category: "misc",
  usage: "snipe",
  description: "get deleted messages",
  botPermission: ["MANAGE_MESSAGES", "ATTACH_FILES"],
  run: async (client, message, args) => {
    const msg = client.snipe.get(message.channel.id);
    if (!msg)
      return message.channel
        .send("There are no deleted messages in this channel!")
        .then(m => {
          m.react("🔄");
        });
    const embed = new Discord.MessageEmbed()
      .setTitle("📋Snipe Message Delete📋")
      //  .setAuthor(msg.author)
      .addFiled(
        `=> Author: \`\`\`${msg.author}\`\`\``,
        `> Message Delete:\`\`\`${msg.content ||
          "Tell That No Response To Embed"}\`\`\`Clink :x: to clear this message`
      )
      .setTimestamp()
      .setColor("GREEN");
    if (msg.image) embed.setDescription(msg.name).setImage(msg.image);
    message.channel.send(embed).then(m => {
      m.react("✅");
      m.react("❌");
      const filter = (reaction, user) => {
        return (
          ["❌", "✅"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };
      m.awaitReactions(filter, { max: 1, time: 300000, errors: ["time"] }).then(
        collected => {
          const reaction = collected.array()[collected.size - 1];
          if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
          if (reaction.emoji.name === "❌") {
            m.delete();
          }
        }
      );
    });
  }
};