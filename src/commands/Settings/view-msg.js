let Levels = require("discord-xp");
module.exports = {
  name: "view-message",
  description: "view Message Welcome, level",
  category: "settings",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    let embed = new client.Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription("Choose, Which tone wants to see the message")
      .setFooter(client.user.username + ` |`)
      .setTimestamp();
    let buts = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageSelectMenu()
        .setCustomId("opt")
        .setPlaceholder("Click Here")
        .addOptions([
          { label: "Welcome", value: "Welcome", description: "" },
          { label: "Leave", value: "Leave", description: "" },
          { label: "Level", value: "Level", description: "" },
          { label: "Anti Swear", value: "badword", description: "" }
        ])
    );
    let msg = await message.channel.send({
      embeds: [embed],
      components: [buts]
    });
    let filter = i => i.user.id === message.author.id;
    let col = msg.createMessageComponentCollector({
      filter
    });
    col.on("collect", async i => {
      if (i.values[0] === "Welcome") {
        let msg1 = await client.data.get(`msg_welcome_${message.guild.id}`);
        if (!msg1) {
          msg1 = "Welcome {user}";
        }
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle((await client.emoji("DGH_success")) + " Welcome Message!")
          .setDescription(`Previous\n\`\`\`\n${msg1}\n\`\`\``);
        if (msg1) {
          msg1 = msg1.replace(/{user}/g, message.author);
          msg1 = msg1.replace(/{server}/g, message.guild.name);
          msg1 = msg1.replace(/{membercount}/g, message.guild.memberCount);
          msg1 = msg1.replace(/{username}/g, message.author.tag);
          msg1 = msg1.replace(
            /{member_join}/g,
            `<t:${Math.floor(message.member.joinedTimestamp / 1000)}:R>`
          );
          msg1 = msg1.replace(
            /{member_at}/g,
            `<t:${Math.floor(message.member.createdTimestamp / 1000)}:R>`
          );
          let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
          if (!matches) matches = msg1;
          for (const match of matches) {
            const rep = await msg.guild.emojis.cache.find(
              emoji => emoji.name === match.substring(2, match.length - 1)
            );
            if (rep) msg1 = msg1.replace(match, rep);
          }
        }
        embeds
          .addField("Welcome Message Seted As", msg1)
          .setFooter("This Are For Example!");
        msg.edit({ embeds: [embeds], components: [] });
      }
      if (i.values[0] === "Leave") {
        let msg1 = await client.data.get(`msg_leave_${message.guild.id}`);
        if (!msg1) {
          msg1 = "Goodbye {user}";
        }
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle((await client.emoji("DGH_success")) + " Leave Message")
          .setDescription(`Previous\n\`\`\`\n${msg1}\n\`\`\``);
        if (msg1) {
          msg1 = msg1.replace(/{user}/g, message.author);
          msg1 = msg1.replace(/{server}/g, message.guild.name);
          msg1 = msg1.replace(/{membercount}/g, message.guild.memberCount);
          msg1 = msg1.replace(/{username}/g, message.author.tag);
          msg1 = msg1.replace(
            /{member_leave}/g,
            `<t:${Math.floor(Date.now() / 1000)}:R>`
          );
          let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
          if (!matches) matches = msg1;
          for (const match of matches) {
            const rep = await msg.guild.emojis.cache.find(
              emoji => emoji.name === match.substring(2, match.length - 1)
            );
            if (rep) msg1 = msg1.replace(match, rep);
          }
        }
        embeds
          .addField("Leave Message Seted As", msg1)
          .setFooter("This Are For Example!");
        msg.edit({ embeds: [embeds], components: [] });
      }
      if (i.values[0] === "Level") {
        let msg1 = await client.data.get(`msg_level_${message.guild.id}`);
        if (!msg1) {
          msg1 = "You Have Leveled Up To Level **{member_level}**";
        }
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle((await client.emoji("DGH_success")) + " Level Message")
          .setDescription(`Previous\n\`\`\`\n${msg1}\n\`\`\``);
        if (msg1) {
          const User = await Levels.fetch(
            message.author.id,
            message.guild.id,
            true
          );
          const newxp = Levels.xpFor(parseInt(User.level) + 1);

          msg1 = msg1.replace(/{user}/g, message.author);
          msg1 = msg1.replace(/{server}/g, message.guild.name);
          msg1 = msg1.replace(/{username}/g, message.author.tag);
          msg1 = msg1.replace(/{member_xp}/g, `${User.xp}/${newxp}`);
          msg1 = msg1.replace(/{member_level}/g, User.level);
          let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
          if (!matches) matches = msg1;
          for (const match of matches) {
            const rep = await msg.guild.emojis.cache.find(
              emoji => emoji.name === match.substring(2, match.length - 1)
            );
            if (rep) msg1 = msg1.replace(match, rep);
          }
        }
        embeds
          .addField("Level Message Seted As", `${msg1}`)
          .setFooter("This Are For Example!");
        msg.edit({ embeds: [embeds], components: [] });
      }
      if (i.values[0] === "badword") {
        let msg1 = await client.data.get(`msg_word_${message.guild.id}`);
        if (!msg1) {
          msg1 = ":x: | **{user}, The Word You said is blacklisted!**";
        }
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle((await client.emoji("DGH_success")) + " Badword Message")
          .setDescription(`Previous\n\`\`\`\n${msg1}\n\`\`\``);
        if (msg1) {
          msg1 = msg1.replace(/{user}/g, message.author);
          msg1 = msg1.replace(/{server}/g, message.guild.name);
          msg1 = msg1.replace(/{username}/g, message.author.tag);
          let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
          if (!matches) matches = msg1;
          for (const match of matches) {
            const rep = await msg.guild.emojis.cache.find(
              emoji => emoji.name === match.substring(2, match.length - 1)
            );
            if (rep) msg1 = msg1.replace(match, rep);
          }
        }
        embeds
          .addField("Badword Message Seted As", `${msg1}`)
          .setFooter("This Are For Example!");
        msg.edit({ embeds: [embeds], components: [] });
      }
    });
  }
};
