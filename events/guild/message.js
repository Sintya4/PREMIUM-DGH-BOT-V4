let {
  Token,
  mongodb,
  Default_Prefix,
  Server_ID,
  Support
} = require("../../config.js");
let Discord = require("discord.js");
let MessageEmbed = Discord.MessageEmbed;

const format = require(`humanize-duration`);
const ms = require("pretty-ms");
const cooldowns = new Discord.Collection();

module.exports = async client => {
  //<SETUP>
  client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    const escapeRegex = str =>
      str.replace(/[.<>`•√π÷×¶∆£¢€¥*@_+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(Prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/);
    let cmd = args.shift().toLowerCase();

    let cmdx = await client.data.get(`cmd_${message.guild.id}`);
    if (cmdx) {
      let cmdy = cmdx.find(x => x.name === cmd);
      if (cmdy) message.channel.send(cmdy.responce);
    }

    let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    if (command)
      console.log(
        `${message.author.username} [${message.guild.name}] Command ${cmd}`
      );
    const yes = new client.button.MessageButton()
      .setStyle("green")
      .setLabel("Join Our Support Server!")
      .setURL(Support);
    if (command.enabled === false) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`This command is disabled.`)
        .setColor("RED")
        .setTimestamp();
      client.button.send(null, {
        channel: message.channel.id,
        embed: embed,
        buttons: [[yes]]
      });
      return;
    }
    if (command.premium === false) {
      let server = client.guilds.cache.get(Server_ID);
      if (!server) return;
      if (!server.members.cache.find(r => r.id === message.author.id)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `This command is Premium\nPlease Join Server To Get Premium Command`
          )
          .setColor("GOLD")
          .setTimestamp();
        client.button.send(null, {
          channel: message.channel.id,
          embed: embed,
          buttons: [[yes]]
        });
        return;
      }
    }
    //<COMMAND USAGE AND DESCRIPTION>
    if (command.args && !args.length) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `You didn't provide any arguments, ${
              message.author
            }!\nThe proper usage would be: \n\`\`\`html\n${command.usage ||
              "No Usage"}\n\`\`\`Description:\`\`\`html\n${command.description ||
              "No Description"}\n\`\`\``
          )
      );
    }
    //-------------------------------------------- P E R M I S S I O N -------------------------------------------
    if (command.botPermission) {
      let neededPerms = [];
      command.botPermission.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `I need ${neededPerms.join(
                ", "
              )} permission(s) to execute the command!`
            )
        );
    }
    if (command.authorPermission) {
      let neededPerms = [];
      command.authorPermission.forEach(p => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `You do not have permission to use this command.\nThis command requires ${neededPerms.join(
                ", "
              )}`
            )
        );
    }

    //-------------------------------------------- C O O L  D O W N S -------------------------------------------
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `${await client.emoji("DGH_error")} Please wait **${ms(
                timeLeft
              )}** before reusing the command again.`
            )
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (command) {
      try {
        command.run(client, message, args);
      } catch (error) {
        const errrr = new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `Something went wrong executing that command\nError Message: \`${
              error.message ? error.message : error
            }\``
          );
        return message.channel
          .send(errrr)
          .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
      }
    }
  });
};
