module.exports = {
  name: "set-channel",
  description: "set channel welcome, level, mod-log, server-log, starboard",
  category: "settings",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    let embed = new client.Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription("Choose, Which one do you want to set?");
    let buts = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageSelectMenu()
        .setCustomId("opt")
        .setPlaceholder("Click Here")
        .addOptions([
          { label: "Welcome", value: "wel", description: "" },
          { label: "Leave", value: "lev", description: "" },
          { label: "Level", value: "lvl", description: "" },
          { label: "Moderation-log", value: "M-L", description: "" },
          { label: "Server-log", value: "S-L", description: "" },
          { label: "Starboard", value: "S-B", description: "" }
        ])
    );
    var array = [];
    let channels = await message.guild.channels.cache.filter(
      x => x.type === "GUILD_TEXT"
    );
    if (channels) {
      let c = channels.map(c => c);

      for (const channel of c) {
        array.push({ label: "#" + channel.name, value: channel.id });
      }
    }

    let buts_channel = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageSelectMenu()
        .setCustomId("opt")
        .setPlaceholder("Choose the Channel")
        .addOptions(array)
    );
    let msg = await message.channel.send({
      embeds: [embed],
      components: [buts]
    });
    let filter = i => i.user.id === message.author.id;
    let col = msg.createMessageComponentCollector({
      filter
    });
    let type = null;
    col.on("collect", async i => {
      if (i.values[0] === "wel") {
        embed.setDescription("Choose the channel for welcome");
        msg.edit({ embeds: [embed], components: [buts_channel] });
        type = "wel";
      }
      if (i.values[0] === "lev") {
        embed.setDescription("Choose the channel for leave");
        msg.edit({ embeds: [embed], components: [buts_channel] });
        type = "lev";
      }
      if (i.values[0] === "lvl") {
        embed.setDescription("Choose the channel for level");
        msg.edit({ embeds: [embed], components: [buts_channel] });
        type = "lvl";
      }
      if (i.values[0] === "S-L") {
        embed.setDescription("Choose the channel for Server Logs");
        msg.edit({ embeds: [embed], components: [buts_channel] });
        type = "S-L";
      }
      if (i.values[0] === "M-L") {
        embed.setDescription("Choose the channel for Moderation Logs");
        msg.edit({ embeds: [embed], components: [buts_channel] });
        type = "modlog";
      }
      if (i.values[0] === "S-B") {
        embed.setDescription("Choose the channel for Starboard Logs");
        msg.edit({ embeds: [embed], components: [buts_channel] });
        type = "starboard";
      }

      if (message.guild.channels.cache.get(i.values[0])) {
        if (type === "modlog") {
          client.data.set(`${type}_${message.guild.id}`, i.values[0]);
        } else {
          client.data.set(`${type}_channel__${message.guild.id}`, i.values[0]);
        }
        embed.setDescription(`Done, I will send on channel <#${i.values[0]}>`);
        msg.edit({ embeds: [embed], components: [] });
      } else {
        null;
      }
    });
  }
};
