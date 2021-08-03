const Discord = require("discord.js");
const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const { readdirSync } = require("fs");
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
category.set("yt_poster", "** YT Poster Commands**");
module.exports = {
  name: "help",
  description:
    "List all of my commands or show information about a specific command.",
  commandOptions: [
    {
      name: "command",
      description: "Get information on a specific command",
      value: "command",
      type: 3,
      required: false
    }
  ],
  global: true,
  async execute(client, message, user, args) {
    user.type();
    const prefix = await client.data.get(`Prefix_${user.guild.id}`);
    let database = await client.data.get(`cmd_${user.guild.id}`);
    if (!args) {
      let em = new Discord.MessageEmbed()
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
        .addField(
          `${client.emotes.yt || "📣"} Youtube Poster`,
          `\`yt_poster\``,
          true
        )
        .addField(`🤐 Anti Swear`, `\`anti-swear\``, true)
        .addField(`${client.emotes.fun || "😂"} Fun`, `\`fun\``, true);
      if (database && database.length) {
        em.addField("➖ Custom Commands", `\`custom\``, true);
      }
      em.setImage(
        "https://cdn.discordapp.com/attachments/829696536396955649/856380297851830272/standard_6.gif"
      ).setTimestamp();

      const web = new client.SlashButton()
        .setStyle("green")
        .setLabel("Websites")
        .setURL("https://dgh-bot.ddns.net");
      const invite = new client.SlashButton()
        .setStyle("green")
        .setLabel("Invite Me")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=849903077690572800&permissions=261929959351&redirect_uri=https%3A%2F%2Fdgh-bot.ddns.net%2Flogin&response_type=code&scope=applications.commands%20bot%20identify%20guilds%20guilds.join"
        );

      return message(null, {
        embed: em,
        buttons: [[invite, web]]
      });
    } else {
      const cc = args[0].value;
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
          return message(null, { flags: 64, embed });
        }
      }
      if (args[0].value === "custom") {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(`Custom Command\n\`\`\`xl\nhelp [Command]\n\`\`\``);
        if (database && database.length) {
          let array = [];
          database.forEach(m => {
            array.push("`" + m.name + "`");
          });
          embed.addField("Commands:", array.join(", ") || `\u200b`);
        }
        return message(null, { flags: 64, embed });
      }

      const name = args[0].value;
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
            `\`\`\`html\n${command.permissions ||
              command.permission ||
              command.botPermission ||
              "No Permission"}\n\`\`\``,
            false
          )
          .addField(
            `Usage`,
            `\`\`\`html\n${command.usage || "No Usage"}\n\`\`\``,
            false
          );
        return message(null, { flags: 64, embed: embed });
      }
    }
  }
};
