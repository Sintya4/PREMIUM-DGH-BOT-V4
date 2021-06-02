const Discord = require("discord.js");
const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const category = new Discord.Collection();
category.set("misc", "**Misc Commands**");
category.set("utility", "**Utility Commands**");
category.set("moderation", "**Moderation Commands**");
category.set("settings", "**Settings Commands**");
category.set("ticket", "**Ticket Commands**");
category.set("reaction", "**ReactionRoles Commands**");
category.set("anti-swear", "**ReactionRoles Commands**");
category.set("admin", "**Admin Commands**");
category.set("music", "**Music Commands For Member**");
category.set("search", "**Search Commands**");
category.set("fun", "**Fun Commands**");
module.exports = {
  name: "help",
  description:
    "List all of my commands or show information about a specific command.",
  category: "utility",
  usage: "help [command | category]",
  cooldown: 5,
  run: async (client, message, args) => {
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    const prefix = db.get(`Prefix_${message.guild.id}`);
    message.delete().catch(O_o => {}); // eslint-disable-line
    const cc = args[0];
    if (args.length) {
      if (category.has(cc)) {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(cc)}\n\`\`\`xl\nhelp [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.commands
              .filter(command => command.category.includes(cc))
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          );
        return message.channel.send(embed);
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
        .setDescription(`\`${command.description || "No Description"}\``)
        .addField(`Category`, `• \`${command.category || "--"}\``, true)
        .addField(
          `Aliases`,
          `\`\`\`html\n${"No Aliases" ||
            command.aliases.join(", ") ||
            "No Aliases"}\n\`\`\``,
          true
        )
        .addField(
          `Required Permission`,
          `\`\`\`html\n${command.permissions ||command.permission ||command.botPermission || "No Permission"}\n\`\`\``,
          false
        )
        .addField(
          `Usage`,
          `\`\`\`html\n${command.usage || "No Usage"}\n\`\`\``,
          false
        );
      return message.channel.send(embed);
    }

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Commands")
        .setDescription(
          `🛡️ Join our for help and updates!\n\`\`\`xl\n${prefix ||
            "!"}help [Category]\n\`\`\``
        )
        .addField(
          `${client.emotes.moderation || "⚙️"} Moderation`,
          `\`moderation\``,
          true
        )
        .addField(
          `${client.emotes.settings || "🔧"} Settings`,
          `\`settings\``,
          true
        )
        .addField(`${client.emotes.admin || "🔗"} Admin`, `\`admin\``, true)
        .addField(`${client.emotes.ticket || "🎟️"} Ticket`, `\`ticket\``, true)
        .addField(
          `${client.emotes.utility || "📜"} Utility`,
          `\`utility\``,
          true
        )
        .addField(`${client.emotes.search || "🔍"} Search`, `\`search\``, true)
        .addField(`${client.emotes.misc || "📋"} Misc`, `\`misc\``, true)
        .addField(`${client.emotes.music || "🎶"} Music`, `\`music\``, true)
        .addField(
          `${client.emotes.add || "✅"} Reaction Roles`,
          `\`reaction\``,
          true
        )
        .addField(`🤐 Anti Swear`, `\`anti-swear\``, true)
        .addField(`${client.emotes.fun || "😂"} Fun`, `\`fun\``, true)
        .setImage(
          "https://cdn.discordapp.com/attachments/805596756251115571/833288688468623400/350kb.gif"
        )
        .setTimestamp()
    );
  }
};
