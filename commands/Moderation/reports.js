const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "report",
  category: "moderation",
  description: "Report a user of your choice!",
  usage: "report <User mention>",
  botPermission: ['MANAGE_GUILD','VIEW_CHANNEL'],
  run: async (client, message, args) => {
    const bot = client;
    let User = message.mentions.users.first() || null;

    if (User == null) {
      return message.channel.send(`You did not mention a user!`);
    } else {
      let Reason = args.slice(1).join(" ")
      if (!Reason) {
        return message.channel.send(
          `You did not specify a reason for the report!`
        );
      }
      let Avatar = User.displayAvatarURL();
      let Channel = await client.data.get(`reports_${message.guild.id}`);
      if (!Channel)
        return message.channel.send(
          `Sorry there is no channel that I specified.\nPlease Settings first`
        );
      message.delete()
      client.send("Your report card has been sent to <#"+Channel+"> We will check your report in a moment", message,"dm")
      let Embed = new MessageEmbed()
        .setTitle(`New report!`)
        .setDescription(
          `The moderator \`${message.author.tag}\` has reported the user \`${User.tag}\`! `
        )
        .setColor(`RED`)
        .setThumbnail(Avatar)
        .addFields(
          { name: "Mod ID", value: `${message.author.id}`, inline: true },
          { name: "Mod Tag", value: `${message.author.tag}`, inline: true },
          { name: "Reported ID", value: `${User.id}`, inline: true },
          { name: "Reported Tag", value: `${User.tag}`, inline: true },
          { name: "Reason", value: `\`${Reason}\``, inline: true },
          {
            name: "Date (M/D/Y)",
            value: `${new Intl.DateTimeFormat("en-US").format(
              Date.now()
            )}`,
            inline: true
          }
        );
      const sender = client.channels.cache.get(Channel);

      sender.send(Embed);
    }
  }
};
