const Discord = require("discord.js");
const emojis = require("../../emoji/emoji.js");

module.exports = {
  name: "rradd2",
  category: "reactio",
  bot: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"
  ],
  author:
    "VIEW_CHANNEL" ||
    "EMBED_LINKS" ||
    "ATTACH_FILES" ||
    "MANAGE_CHANNELS" ||
    "MANAGE_GUILD" ||
    "MANAGE_ROLES",
 
  run: async (client, message, args) => {
    message.delete();
    const response = await client.awaitReply(
      message,
      `:x: | **Specify The ChannelID or mention The Channel**`,
      180000,
      true
    );
    if (!response)
      return message.channel.send("No response was given, Exiting setup..."); //Stops execution if no response
    if (response.content === "cancel")
      return message.channel.send("Exiting setup..."); //Stops execution if command cancel is run
    let channel =
      response.mentions.channels.first() ||
      message.guild.channels.cache.get(response.content);
    if (!channel) return message.channel.send(`:x: | **Channel Not Found**`);
    await response.delete();

    const response2 = await client.awaitReply(
      message,
      `:x: | **Specify The messageID**`,
      180000,
      true
    );
    if (!response2)
      return message.channel.send("No response was given, Exiting setup..."); //Stops execution if no response
    if (response2.content === "cancel")
      return message.channel.send("Exiting setup..."); //Stops execution if command cancel is run
    let msg = await channel.messages.fetch(response2.content);
    if (!msg) return message.channel.send(`:x: | **Message Not Found**`);
    await response2.delete();

    const response3 = await client.awaitReply(
      message,
      `:x: | **Specify The roleID or mention The Role**`,
      180000,
      true
    );
    if (!response3)
      return message.channel.send("No response was given, Exiting setup..."); //Stops execution if no response
    if (response3.content === "cancel")
      return message.channel.send("Exiting setup..."); //Stops execution if command cancel is run
    let role =
      response3.mentions.roles.first() ||
      message.guild.roles.cache.get(response3.content);
    if (!role) return message.channel.send(`:x: | **Role Not Found**`);
    await response3.delete();

    const response4 = await client.awaitReply(
      message,
      `:x: | **Specify The emoji**`,
      180000,
      true
    );
    if (!response4)
      return message.channel.send("No response was given, Exiting setup..."); //Stops execution if no response
    if (response4.content === "cancel")
      return message.channel.send("Exiting setup..."); //Stops execution if command cancel is run

    let emoji = await Discord.Util.parseEmoji(response4.content);
    if (!emoji && !emojis.includes(response4.content))
      return message.channel.send(":x: | **Specify a valid Emoji**");
    if (emoji && !emojis.includes(response4.content)) {
      let checking = await client.emojis.cache.find(x => x.id === emoji.id);
      if (!checking) return message.channel.send(`:x: | **Invalid Emoji**`);
    }
    await response4.delete();

    let pog = client.db.get(`reactions_${message.guild.id}_${msg.id}`);
    if (pog && pog.find(x => x.emoji == response4.content)) {
      let embed = new Discord.MessageEmbed();
      embed.setAuthor(message.guild.name, message.guild.iconURL());
      embed.setTitle("Error");
      embed.setDescription(
        `:x: | **The emoji is already being used in The message for reaction Roles!**`
      );
      embed.setFooter(
        message.author.tag + " | made by 𝙁𝘾 么 Glitch Editz",
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      return message.channel.send({
        embed: embed
      });
    }
    await msg.react(response4.content);
    client.db.push(`reactions_${message.guild.id}_${msg.id}`, {
      emoji: response4.content,
      roleId: role.id
    });

    let embed = new Discord.MessageEmbed();
    embed.setAuthor(message.guild.name, message.guild.iconURL());
    embed.setTitle("Success");
    embed.setThumbnail(message.guild.iconURL());
    embed.setDescription(`**The Reaction Role has been Set up**`);
    embed.setFooter(
      message.author.tag + " | made by 𝙁𝘾 么 Glitch Editz",
      message.author.displayAvatarURL({ dynamic: true })
    );
    embed.setColor("RANDOM");
    embed.setTimestamp();
    return message.channel.send({
      embed: embed
    });
  }
};
