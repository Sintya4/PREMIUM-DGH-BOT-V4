let Discord = require("discord.js");
const emojis = require("../emoji/emoji.js");

module.exports = {
  name: "rradd",
  description: "Reaction Roles",
  commandOptions: [
    {
      type: 7,
      name: "channel",
      description: "Specify The ChannelID or mention The Channel",
      required: true
    },
    {
      type: 3,
      name: "message_id",
      description: "Specify The messageID",
      required: true
    },
    {
      type: 8,
      name: "roles",
      description: "Specify The Roles id or mention The Roles",
      required: true
    },
    {
      type: 3,
      name: "emoji",
      description: "Specify The Emoji or Custom The Emoji",
      required: true
    }
  ],
  global: true,
  async execute(client, message, user, args) {
    user.type();
    user.premium();
    user.perms(["MANAGE_ROLES", "MANAGE_MESSAGES"]);
    user.botperms(["ADD_REACTIONS","MANAGE_ROLES", "MANAGE_MESSAGES"]);
    let channel = user.guild.channels.cache.get(args[0].value);

    let msg = await channel.messages.fetch(args[1].value);
    if (!msg) return message(`:x: | **Message Not Found**`, { flags: 64 });
    let role = user.guild.roles.cache.get(args[2].value);
    let emoji = await Discord.Util.parseEmoji(args[3].value);
    if (!emoji && !emojis.includes(args[3]))
      return message(":x: | **Specify a valid Emoji**", { flags: 64 });
    if (emoji && !emojis.includes(args[3].value)) {
      let checking = await client.emojis.cache.find(x => x.id === emoji.id);
      if (!checking) return message(`:x: | **Invalid Emoji**`, { flags: 64 });
    }
    let pog = await client.data.get(`reactions_${user.guild.id}_${msg.id}`);
    if (pog && pog.find(x => x.emoji == args[3].value)) {
      let embed = new client.discord.MessageEmbed();
      embed.setAuthor(user.guild.name, user.guild.iconURL());
      embed.setTitle("Error");
      embed.setDescription(
        `:x: | **The emoji is already being used in The message for reaction Roles!**`
      );
      embed.setFooter(
        user.user.tag,
        user.user.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      embed.setThumbnail(user.user.displayAvatarURL({ dynamic: true }));
      return message(null, {
        embed: embed,
        flags: 64
      });
    }
    await msg.react(args[3].value)
    client.data.push(`reactions_${user.guild.id}_${msg.id}`, {
      emoji: args[3].value,
      roleId: role.id
    });

    let embed = new client.discord.MessageEmbed();
    embed.setAuthor(user.guild.name, user.guild.iconURL());
    embed.setTitle("Success");
    embed.setThumbnail(user.guild.iconURL());
    embed.setDescription(`**The Reaction Role has been Set up**`);
    embed.setFooter(
      user.user.tag,
      user.user.displayAvatarURL({ dynamic: true })
    );
    embed.setColor("RANDOM");
    embed.setTimestamp();
    message(null, {
      embed: embed,
      flags: 64
    });
  }
};
