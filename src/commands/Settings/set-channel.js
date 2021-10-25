module.exports = {
  name: "set-channel",
  description: "set channel welcome, level, mod-log, server-log, starboard",
  category: "settings",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    let embed = new client.Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription("Choose, Which one do you want to set?").setFooter(client.user.username + ` |`)
          .setTimestamp();
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
    let msg = await message.channel.send({
      embeds: [embed],
      components: [buts]
    });
    let filter = i => i.user.id === message.author.id;
    let filter2 = i => i.author.id === message.author.id;
    let col = msg.createMessageComponentCollector({
      filter
    });
    col.on("collect", async i => {
      if (i.values[0] === "wel") {
        embed.setDescription("Please provide a channel for welcome");
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg2 = d1.first().content;
        let msg1 = msg2?.match(/^<#!?(\d+)>$/)
          ? msg2.match(/^<#!?(\d+)>$/)[1]
          : null;
        if (message.guild.channels.cache.get(msg1)) {
          client.data.set(`wel_channel__${message.guild.id}`, msg1);
          embed.setDescription(`Done, I will send on channel <#${msg1}>`);
          msg.edit({ embeds: [embed], components: [] });
        } else {
          embed.setDescription("Error: Invalid Channel");
          msg.edit({ embeds: [embed], components: [] });
        }
      }
      if (i.values[0] === "lev") {
        embed.setDescription("Please provide a channel for leave");
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg2 = d1.first().content;
        let msg1 = msg2?.match(/^<#!?(\d+)>$/)
          ? msg2.match(/^<#!?(\d+)>$/)[1]
          : null;
        if (message.guild.channels.cache.get(msg1)) {
          client.data.set(`lev_channel__${message.guild.id}`, msg1);
          embed.setDescription(`Done, I will send on channel <#${msg1}>`);
          msg.edit({ embeds: [embed], components: [] });
        } else {
          embed.setDescription("Error: Invalid Channel");
          msg.edit({ embeds: [embed], components: [] });
        }
      }
      if (i.values[0] === "lvl") {
        embed.setDescription("Please provide a channel for level");
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg2 = d1.first().content;
        let msg1 = msg2?.match(/^<#!?(\d+)>$/)
          ? msg2.match(/^<#!?(\d+)>$/)[1]
          : null;
        if (message.guild.channels.cache.get(msg1)) {
          client.data.set(`lvl_channel__${message.guild.id}`, msg1);
          embed.setDescription(`Done, I will send on channel <#${msg1}>`);
          msg.edit({ embeds: [embed], components: [] });
        } else {
          embed.setDescription("Error: Invalid Channel");
          msg.edit({ embeds: [embed], components: [] });
        }
      }
      if (i.values[0] === "S-L") {
        embed.setDescription("Please provide a channel for Server logs");
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg2 = d1.first().content;
        let msg1 = msg2?.match(/^<#!?(\d+)>$/)
          ? msg2.match(/^<#!?(\d+)>$/)[1]
          : null;
        if (message.guild.channels.cache.get(msg1)) {
          client.data.set(`S-L_channel__${message.guild.id}`, msg1);
          embed.setDescription(`Done, I will send on channel <#${msg1}>`);
          msg.edit({ embeds: [embed], components: [] });
        } else {
          embed.setDescription("Error: Invalid Channel");
          msg.edit({ embeds: [embed], components: [] });
        }
      }
      if (i.values[0] === "M-L") {
        embed.setDescription("Please provide a channel for Moderation logs");
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg2 = d1.first().content;
        let msg1 = msg2?.match(/^<#!?(\d+)>$/)
          ? msg2.match(/^<#!?(\d+)>$/)[1]
          : null;
        if (message.guild.channels.cache.get(msg1)) {
          client.data.set(`modlog_${message.guild.id}`, msg1);
          embed.setDescription(`Done, I will send on channel <#${msg1}>`);
          msg.edit({ embeds: [embed], components: [] });
        } else {
          embed.setDescription("Error: Invalid Channel");
          msg.edit({ embeds: [embed], components: [] });
        }
      }
      if (i.values[0] === "S-B") {
        embed.setDescription("Please provide a channel for starboard");
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg2 = d1.first().content;
        let msg1 = msg2?.match(/^<#!?(\d+)>$/)
          ? msg2.match(/^<#!?(\d+)>$/)[1]
          : null;
        if (message.guild.channels.cache.get(msg1)) {
          client.data.set(
            `starboard_channel__${message.guild.id}`,
            msg1
          );
          embed.setDescription(`Done, I will send on channel <#${msg1}>`);
          msg.edit({ embeds: [embed], components: [] });
        } else {
          embed.setDescription("Error: Invalid Channel");
          msg.edit({ embeds: [embed], components: [] });
        }
      }
    });
  }
};
