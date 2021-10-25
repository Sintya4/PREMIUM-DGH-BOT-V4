const { readdirSync } = require("fs");
const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`);
module.exports = {
  name: "help",
  description:
    "List all of my commands or show information about a specific command.",
  category: "utility",
  usage: "help [command | category]",
  cooldown: 5,
  run: async (client, message, args) => {
    const prefix = await client.data.get(`Prefix_${message.guild.id}`);
    const database = await client.data.get(`cmd_${message.guild.id}`);
    const c_private = ["owner"];
    const category = new Discord.Collection();
    const menus = [];
    const c_cmd = {
      fun: await client.emoji("DGH_fun"),
      utility: await client.emoji("DGH_util"),
      info: await client.emoji("DGH_info"),
      levels: await client.emoji("DGH_level_up"),
      admin: await client.emoji("DGH_admin"),
      settings: await client.emoji("DGH_setting"),
      moderation: await client.emoji("DGH_mod"),
      misc: await client.emoji("DGH_misc"),
      games: await client.emoji("DGH_games"),
      search: await client.emoji("DGH_search"),
      custom: await client.emoji("DGH_add"),
      slash: await client.emoji("DGH_SLASH_CMD"),
      backup: await client.emoji("DGH_backup"),
      anti_swear: "🤬"
    };
    readdirSync("./src/commands/").forEach(dir => {
      if (c_private.includes(dir.toLowerCase())) return;
      if (!c_cmd[dir.toLowerCase()]) return;
      category.set(
        dir.toLowerCase(),
        `${c_cmd[dir.toLowerCase()]} **\`${dir
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })}\`** Command`
      );
      const name = `${c_cmd[dir.toLowerCase()]} ${dir
        .toUpperCase()
        .split("_")
        .join(" ")}`;
      menus.push({
        label: `${dir
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\w\S*/g, txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          })} Category`,
        description: `${dir.toLowerCase()} Commands`,
        value: dir.toLowerCase(),
        emoji: c_cmd[dir.toLowerCase()] || null
      });
    });
    if (database && database.length) {
      let array = [];
      database.forEach(m => {
        array.push("`" + m?.name ? m.name : "null" + "`");
      });
      category.set("custom", `${c_cmd["custom"]} **\`Custom\`** Command`);
      menus.push({
        label: `Custom Category`,
        description: `Custom Commands`,
        value: `custom`,
        emoji: c_cmd["custom"] || null
      });
    }
    category.set("slash", `${c_cmd["slash"]} **\`Slash\`** Command`);
    menus.push({
      label: `Slash Command Category`,
      description: `Slash Commands`,
      value: `slash`,
      emoji: c_cmd["slash"] || null
    });

    if (args.length) {
      if (database && database.length && args[0] === "custom") {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(args[0])}\n\`\`\`xl\n${prefix ||
              client.config.bot.prefix}help [Command]\n\`\`\``
          );
        let array = [];
        database.forEach(m => {
          array.push("`" + m.name + "`");
        });
        embed.addField("Commands:", array.join(", ") || `\u200b`).setFooter(
          `Total Of: - ${array.size} Commands`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        );
        return message.channel.send({ embeds: [embed] });
      } else if (args[0] === "slash") {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(args[0])}\n\`\`\`xl\n${prefix ||
              client.config.bot.prefix}help [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.slashs
              .map(command => `\`/${command.name}\``)
              .join(", ")}` || `\u200b`
          )
          .setFooter(
            `Total Of: - ${client.commands.size} Commands`,
            message.author.displayAvatarURL({
              dynamic: true
            })
          );
        return message.channel.send({ embeds: [embed] });
      } else if (category.has(args[0])) {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(args[0])}\n\`\`\`xl\n${prefix ||
              client.config.bot.prefix}help [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.commands
              .filter(command => command.category.includes(args[0]))
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          )
          .setFooter(
            `Total Of: - ${
              client.commands.filter(command =>
                command.category.includes(args[0])
              ).size
            } Commands`,
            message.author.displayAvatarURL({
              dynamic: true
            })
          );
        return message.channel.send({ embeds: [embed] });
      }
    }
    const name = args[0];
    const command =
      client.commands.get(name) ||
      client.commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) {
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**\`${command.name}\`** Command`)
        .setDescription(
          `\`${command.description ? command.description : "No Description"}\``
        )

        .addField(
          `Category`,
          `• \`${command.category ? command.category : "No Category"}\``,
          true
        )
        .addField(
          `Aliases`,
          `\`\`\`html\n${
            command.aliases ? command.aliases.join(", ") : "No Aliases"
          }\n\`\`\``,
          true
        )
        .addField(
          `Required Permission`,
          `\`\`\`html\n${
            command.P_bot ? command.P_bot.join(", ") : "No Permission"
          }\n\`\`\``,
          false
        )
        .addField(
          `Usage`,
          `\`\`\`html\n${command.usage ? command.usage : "No Usage"}\n\`\`\``,
          false
        )
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }
    let em = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Choose your option!")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `**TYPE Recommends for full list of commands\n${await client.emoji(
          "DGH_arrow"
        )} [Support](${client.config.server.invite})\n${await client.emoji(
          "DGH_arrow"
        )} [Invite Me](${client.config.bot.invite})\n${await client.emoji(
          "DGH_arrow"
        )} [My Source](https://github.com/Sintya4/PREMIUM-DGH-BOT-V3)\n**`
      )
      .setImage(client.config.image.help)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();
    let raw = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder(`Choose the command category`)
        .addOptions(menus)
    );
    let button_for_owner = new MessageActionRow().addComponents(
      new client.Discord.MessageButton()
        .setCustomId("owner")
        .setStyle("PRIMARY")
        .setLabel("Help Owner")
    );
    let msg;
    if (client.config.bot.owners.includes(message.author.id) === true) {
      msg = await message.channel.send({
        embeds: [em],
        components: [raw, button_for_owner]
      });
    } else {
      msg = await message.channel.send({
        embeds: [em],
        components: [raw]
      });
    }
    let filter = i => i.user.id === message.author.id;
    let col = msg.createMessageComponentCollector({
      filter,
      time: 60000
    });
    col.on("collect", async i => {
      if (i.customId === "owner") {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${await client.emoji(
              "DGH_owner_guild"
            )}**\`Owner\`** Command\n\`\`\`xl\n${prefix ||
              client.config.bot.prefix}help [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.commands
              .filter(command => command.category.includes(i.customId))
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          )
          .setFooter(
            `Total Of: - ${
              client.commands.filter(command =>
                command.category.includes(i.customId)
              ).size
            } Commands`,
            message.author.displayAvatarURL({
              dynamic: true
            })
          );
        return msg.edit({ embeds: [embed] });
      }
      if (i.customId === "help-menu") {
        if (i.values[0] === "slash") {
          let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(
              `${category.get(i.values[0])}\n\`\`\`xl\n${prefix ||
                client.config.bot.prefix}help [Command]\n\`\`\``
            )
            .addField(
              `Commands:`,
              `${client.slashs
                .map(command => `\`/${command.name}\``)
                .join(", ")}` || `\u200b`
            )
            .setFooter(
              `Total Of: - ${client.commands.size} Commands`,
              message.author.displayAvatarURL({
                dynamic: true
              })
            );
          return msg.edit({ embeds: [embed] });
        } else if (database && database.length && i.values[0] === "custom") {
          let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(
              `${category.get(i.values[0])}\n\`\`\`xl\n${prefix ||
                client.config.bot.prefix}help [Command]\n\`\`\``
            );
          let array = [];
          database.forEach(m => {
            array.push("`" + m.name + "`");
          });
          embed.addField("Commands:", array.join(", ") || `\u200b`).setFooter(
            `Total Of: - ${array.size} Commands`,
            message.author.displayAvatarURL({
              dynamic: true
            })
          );
          return msg.edit({ embeds: [embed] });
        } else if (category.has(i.values[0])) {
          let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(
              `${category.get(i.values[0])}\n\`\`\`xl\n${prefix ||
                client.config.bot.prefix}help [Command]\n\`\`\``
            )
            .addField(
              `Commands:`,
              `${client.commands
                .filter(command => command.category.includes(i.values[0]))
                .map(command => `\`${command.name}\``)
                .join(", ")}` || `\u200b`
            )
            .setFooter(
              `Total Of: - ${
                client.commands.filter(command =>
                  command.category.includes(i.values[0])
                ).size
              } Commands`,
              message.author.displayAvatarURL({
                dynamic: true
              })
            );
          return msg.edit({ embeds: [embed] });
        }
      }
    });
    col.on("end", async i => {
      raw.components[0].setDisabled(true);
      return msg.edit({ embeds: [em], components: [raw] });
    });
  }
};
