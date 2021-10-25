let Levels = require("discord-xp");
module.exports = {
  name: "set-message",
  description: "Set Message Welcome, level",
  category: "settings",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
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
    let filter2 = i => i.author.id === message.author.id;
    let col = msg.createMessageComponentCollector({
      filter
    });
    col.on("collect", async i => {
      if (i.values[0] === "Welcome") {
        embed
          .setDescription(
            `Please Specify A Message To Be Set In ${i.values[0]}!`
          )
          .addField(
            `${i.values[0]} Variables`,
            `**{user}** - Mentions The User On Join.
**{username}** - Member Username With Tag!
**{server}** - Gives Server Name.
**{membercount}** - Gets Server Member Count.
**{member_at}** - View the time a member created an account.
**{invite}** - See which members join using what link.
**{inviter}** - Get members who invite new members.
**{inviter-username}** - Inviter Username With Tag!
**{member_join}** - See when members join the server.
**{:emoji}** - Show a server emoji by replacing with name. Ex. \`{:Alix}\``
          )
          .setFooter(client.user.username + ` | ${i.values[0]} | 20 minute!`)
          .setTimestamp();
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg1 = d1.first().content;
        client.data.set(`msg_welcome_${message.guild.id}`, msg1);
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle(
            (await client.emoji("DGH_success")) + " Welcome Message Seted!"
          )
          .setDescription(`Previous\n\`\`\`\n${msg1}\n\`\`\``);
        if (msg1) {
          msg1 = msg1.replace(/{user}/g, message.author);
          msg1 = msg1.replace(/{invite}/g, "https://discord.com/invite/<code>/");
          msg1 = msg1.replace(/{inviter}/g, client.user);
          msg1 = msg1.replace(/{inviter-username}/g, client.user.tag);
          msg1 = msg1.replace(/{server}/g, message.guild.name);
          msg1 = msg1.replace(/{membercount}/g, message.guild.memberCount);
          msg1 = msg1.replace(/{username}/g, message.author.tag);
          msg1 = msg1.replace(
            /{member_join}/g,
            `<t:${Math.floor(message.member.joinedTimestamp / 1000)}:R>`
          );
          msg1 = msg1.replace(
            /{member_at}/g,
            `<t:${Math.floor(message.member.user.createdTimestamp / 1000)}:R>`
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
        embed
          .setDescription(
            `Please Specify A Message To Be Set In ${i.values[0]}!`
          )
          .addField(
            `${i.values[0]} Variables`,
            `**{user}** - Mentions The User On Join.
**{username}** - Member Username With Tag!
**{server}** - Gives Server Name.
**{membercount}** - Gets Server Member Count.
**{member_leave}** - See when members leave the server.
**{:emoji}** - Show a server emoji by replacing with name. Ex. \`{:Alix}\``
          )
          .setFooter(client.user.username + ` | ${i.values[0]} | 20 minute!`)
          .setTimestamp();
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg1 = d1.first().content;
        client.data.set(`msg_leave_${message.guild.id}`, msg1);
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle(
            (await client.emoji("DGH_success")) + " Leave Message Seted!"
          )
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
        embed
          .setDescription(
            `Please Specify A Message To Be Set In ${i.values[0]}!`
          )
          .addField(
            `${i.values[0]} Variables`,
            `**{user}** - Mentions The User On Join.
**{username}** - Member Username With Tag!
**{server}** - Gives Server Name.
**{member_xp}** - Get a member XP.
**{member_level}** - Get a member level.
**{:emoji}** - Show a server emoji by replacing with name. Ex. \`{:Alix}\``
          )
          .setFooter(client.user.username + ` | ${i.values[0]} | 20 minute!`)
          .setTimestamp();
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg1 = d1.first().content;
        client.data.set(`msg_level_${message.guild.id}`, msg1);
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle(
            (await client.emoji("DGH_success")) + " Level Message Seted!"
          )
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
          .addField("Level Message Seted As", msg1)
          .setFooter("This Are For Example!");
        msg.edit({ embeds: [embeds], components: [] });
      }
      if (i.values[0] === "badword") {
        embed
          .setDescription(
            `Please Specify A Message To Be Set In ${i.values[0]}!`
          )
          .addField(
            `${i.values[0]} Variables`,
            `**{user}** - Mentions The User On Join.
**{username}** - Member Username With Tag!
**{server}** - Gives Server Name.
**{:emoji}** - Show a server emoji by replacing with name. Ex. \`{:Alix}\``
          )
          .setFooter(client.user.username + ` | ${i.values[0]} | 20 minute!`)
          .setTimestamp();
        msg.edit({ embeds: [embed], components: [] });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        d1.first().delete;
        let msg1 = d1.first().content;
        client.data.set(`msg_word_${message.guild.id}`, msg1);
        let embeds = new client.Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle(
            (await client.emoji("DGH_success")) + " Badword Message Seted!"
          )
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
          .addField("Badword Message Seted As", msg1)
          .setFooter("This Are For Example!");
        msg.edit({ embeds: [embeds], components: [] });
      }
    });
  }
};
