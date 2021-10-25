module.exports = {
  name: "set-auto",
  description: "Setting Auto Roles, Nickname",
  category: "settings",
  P_user: ["MANAGE_CHANNELS", "MANAGE_NICKNAMES", "MANAGE_ROLES"],
  P_bot: ["MANAGE_CHANNELS", "MANAGE_NICKNAMES", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    let embed = new client.Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription("Choose, Which one do you want to set?")
      .setFooter(client.user.username + ` |`)
      .setTimestamp();
    let buts = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageSelectMenu()
        .setCustomId("opt")
        .setPlaceholder("Click Here")
        .addOptions([
          { label: "Auto Roles", value: "roles", description: "" },
          { label: "Auto Nickname", value: "nick", description: "" }
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
      if (i.values[0] === "roles") {
        embed.setDescription(
          "Please Give Roles For Member Join Later\nExample: @roles,@roles,@roles etc..."
        );
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg2 = d1.first().content;
        let msg1 = msg2
          .match(/<(@&(\d{17,21}))\d+>/g)
          .map(x => x.match(/^<@&!?(\d+)>$/)[1]);
        if (message.guild.roles.cache.get(msg1[0])) {
          client.data.set(`roles_auto_${message.guild.id}`, msg1);
          embed.setDescription(
            `Done, Now Auto Roles has been set with ${msg1.map(x =>
              x ? `<@&${x}>` : ""
            )}`
          );
          msg.edit({ embeds: [embed], components: [] });
        } else {
          null;
        }
      }
      if (i.values[0] === "nick") {
        embed.setDescription(
          `Please give a message for the nickname when members join later\n{username} - Displays the username`
        );
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg1 = d1.first().content;
        client.data.set(`nick_auto_${message.guild.id}`, msg1);
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setDescription(`Previous\n\`\`\`\n${msg1}\n\`\`\``);
        if (msg1) {
          msg1 = msg1.replace(/{username}/g, message.author.tag);
          embeds.addField("NickName", msg1).setFooter("This Are For Example!");
          msg.edit({ embeds: [embeds], components: [] });
        }
      }
    });
  }
};
