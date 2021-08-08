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
category.set("yt_poster","** YT Poster Commands**");
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
    const prefix = await client.data.get(`Prefix_${message.guild.id}`);
    message.delete().catch(O_o => {}); // eslint-disable-line
    let database = await client.data.get(`cmd_${message.guild.id}`);
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
    if (args[0] === "custom") {
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
      return message.channel.send(embed);
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
      return message.channel.send(embed);
    }
    let em = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Commands")
      .setDescription(
        `🛡️ Join our for help and updates!\n\`\`\`xl\n${prefix || "!"}help [Category]\n\`\`\``
      )
      .addField(
        `${await client.emoji("DGH_mod")} Moderation`,
        `\`moderation\``,
        true
      )
      .addField(
        `${await client.emoji("DGH_setting")} Settings`,
        `\`settings\``,
        true
      )
      .addField(`${await client.emoji("DGH_admin")} Admin`, `\`admin\``, true)
      .addField(`${await client.emoji("DGH_ticket")} Ticket`, `\`ticket\``, true)
      .addField(`${await client.emoji("DGH_util")} Utility`, `\`utility\``, true)
      .addField(`${await client.emoji("DGH_search")} Search`, `\`search\``, true)
      .addField(`${await client.emoji("DGH_misc")} Misc`, `\`misc\``, true)
      .addField(`${await client.emoji("DGH_music")} Music`, `\`music\``, true)
      .addField(
        `${await client.emoji("DGH_rr")} Reaction Roles`,
        `\`reaction\``,
        true
      )
      .addField(
        `${await client.emoji("DGH_yt")} Youtube Poster`,
        `\`yt_poster\``,
        true
      )
      .addField(`🤐 Anti Swear`, `\`anti-swear\``, true)
      .addField(`${await client.emoji("DGH_fun")} Fun`, `\`fun\``, true);
     if (database && database.length) {
       em.addField("➖ Custom Commands", `\`custom\``, true);
    }
    em.setImage(
      "https://cdn.discordapp.com/attachments/829696536396955649/856380297851830272/standard_6.gif"
    ).setTimestamp();
  
const web = new client.button.MessageButton()
        .setStyle("green")
        .setLabel("Websites")
        .setURL("https://dgh-bot.ddns.net");
   const invite = new client.button.MessageButton()
        .setStyle("green")
        .setLabel("Invite Me")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=849903077690572800&permissions=261929959351&redirect_uri=https%3A%2F%2Fdgh-bot.ddns.net%2Flogin&response_type=code&scope=applications.commands%20bot%20identify%20guilds%20guilds.join");
   
    return client.button.send(null, {
      channel: message.channel.id,
      embed: em,
      buttons: [[invite, web]]
    });
  }
};