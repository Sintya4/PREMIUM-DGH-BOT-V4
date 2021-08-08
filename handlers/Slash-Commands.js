let {
  Token,
  mongodb,
  Default_Prefix,
  Server_ID,
  Support
} = require("../config.js");
module.exports = async client => {
  client.ws.on("INTERACTION_CREATE", async interaction => {
    if (!client.slashcommands.has(interaction.data.name)) return;
    let command = client.slashcommands.get(interaction.data.name);
    if (!command) return;
    let func = {
      id: interaction.guild_id
        ? interaction.member.user.id
        : interaction.user.id,
      user: client.users.resolve(
        interaction.guild_id ? interaction.member.user.id : interaction.user.id
      ),
      channel: client.channels.cache.get(interaction.channel_id),
      guild: interaction.guild_id
        ? client.guilds.cache.get(interaction.guild_id)
        : undefined,
      member: interaction.guild
        ? interaction.guild.members.resolve(interaction.member.user.id)
        : undefined,
      premium: async () => {
        let server = client.guilds.cache.get(Server_ID);
        if (!server) return;
        if (
          !server.members.cache.find(r => r.id === interaction.member.user.id)
        ) {
          const yes = new client.button.MessageButton()
            .setStyle("green")
            .setLabel("Join Our Support Server!")
            .setURL(Support);
          const embed = new client.discord.MessageEmbed()
            .setDescription(
              `This command is Premium\nPlease Join Server To Get Premium Command`
            )
            .setColor("GOLD")
            .setTimestamp();
          message(null, {
            embed: embed,
            buttons: [[yes]],
            flags: 64
          });
          return;
        }
      },
      type: async () => {
        if (client.channels.cache.get(interaction.channel_id).type === "dm") {
          let embed = new client.discord.MessageEmbed()
            .setTitle("⚠️ Error")
            .setDescription(
              "This command can **only** be used **inside a server**."
            );

          const yes = new client.button.MessageButton()
            .setStyle("green")
            .setLabel("Join Our Support Server!")
            .setURL("https://discord4bots.ddns.net/mincoder");

          const web = new client.button.MessageButton()
            .setStyle("green")
            .setLabel("Dashboard")
            .setURL("https://dgh-bot.ddns.net");
          return message(null, {
            flags: 64,
            embed: embed,
            buttons: [[yes, web]]
          });
        }
      },
      botperms: async function(Perms) {
        let NeededPerms = [];
        Perms.forEach(p => {
          if (
            !client.guilds.cache.get(interaction.guild_id).me.hasPermission(p)
          )
            NeededPerms.push("`" + p + "`");
        });
        if (NeededPerms.length)
          return message(null, {
            flags: 64,
            embed: new client.discord.MessageEmbed()
              .setColor("RED")
              .setTimestamp()
              .setDescription(
                `I need ${NeededPerms.join(
                  ", "
                )} permission(s) to execute the command!`
              )
          });
      },
      perms: async function(perms) {
        let neededPerms = [];
        perms.forEach(p => {
          if (
            !interaction.guild.members
              .resolve(interaction.member.user.id)
              .hasPermission(p)
          )
            neededPerms.push("`" + p + "`");
        });
        if (neededPerms.length)
          return message(null, {
            flags: 64,
            embed: new client.discord.MessageEmbed()
              .setColor("RED")
              .setTimestamp()
              .setDescription(
                `You do not have permission to use this command.\nThis command requires ${neededPerms.join(
                  ", "
                )}`
              )
          });
      }
    };
    try {
      command.execute(client, message, func, interaction.data.options);
    } catch (error) {
      console.error(
        `🟥 Error Slash Command: ${interaction.data.name} | ${error.message}`
      );
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            flags: 64,
            content: `Sorry, there was an error executing that command!`
          }
        }
      });
    }
    async function message(
      content,
      {
        embed,
        files,
        tts,
        allowed_mentions,
        flags,
        ephemeral,
        buttons = []
      } = {}
    ) {
      let components = [];
      for (let buttonArray of buttons) {
        components.push({ type: 1, components: buttonArray });
      }
      return client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content,
              embeds: [embed],
              files,
              tts,
              allowed_mentions,
              flags: ephemeral ? 64 : flags,
              components
            }
          }
        });
    }
  });
};
/*

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            flags: 64,
            embed: embed,
            buttons: [[yes, web]]
          }
        }
      });
    }*/
