module.exports = client => {
  client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    console.log(interaction);
    try {
      const command = client.slashs.get(interaction.commandName);
      if (!command) {
        interaction.reply({
          content:
            "There was an error while executing this command, please try again and If this continues to happen talk to the bot owner.",
          ephemeral: true
        });
        return interaction.guild.commands
          .delete(interaction.commandId)
          .catch(() => {});
      }
      if (
        client.config.maintenance &&
        client.config.bot.owners.includes(interaction.user.id) === false
      ) {
        let ownerOnly = new client.Discord.MessageEmbed().setDescription(
          `*${await client.emoji(
            "DGH_error"
          )} Command is in progress, you can't use cmd Now*`
        );
        return interaction.reply({ embeds: [ownerOnly], ephemeral: true });
      }
      if (command.ownerOnly) {
        if (client.config.bot.owners.includes(interaction.user.id) === false) {
          let ownerOnly = new client.Discord.MessageEmbed().setDescription(
            `*${await client.emoji(
              "DGH_error"
            )} Only Bot Developer can use this command!*`
          );
          return interaction.reply({ embeds: [ownerOnly], ephemeral: true });
        }
      }
      if (command.P_user && command.P_user.length) {
        let neededPerms = [];
        command.P_user.forEach(p => {
          if (
            !interaction.guild.members.cache
              .get(interaction.member.user.id)
              .permissions.has(p)
          )
            neededPerms.push("`" + p + "`");
        });
        if (neededPerms.length)
          return interaction.reply({
            ephemeral: true,
            embeds: [
              new client.Discord.MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(
                  `You do not have permission to use this command.\nThis command requires ${neededPerms.join(
                    ", "
                  )}`
                )
            ]
          });
      }
      if (command.P_bot && command.P_bot.length) {
        let neededPerms = [];
        command.P_bot.forEach(p => {
          if (!interaction.guild.me.permissions.has(p))
            neededPerms.push("`" + p + "`");
        });
        if (neededPerms.length)
          return interaction.reply({
            ephemeral: true,
            embeds: [
              new client.Discord.MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(
                  `I do not have permission to use this command.\nThis command requires ${neededPerms.join(
                    ", "
                  )}`
                )
            ]
          });
      }
      await command
        .execute(client, interaction, interaction.options._hoistedOptions)
        .catch(e => {
          client.sendhook(
            `Error Slash Command\n\`${e.message ? e.message : e}\``,
            {
              channel: client.config.logs.boterror,
              name: "Notifications DGH BOT SLASH"
            }
          );
          interaction.reply({
            content:
              "There was an error while executing this command, please try again and If this continues to happen talk to the bot owner.",
            ephemeral: true
          });
          console.error(e);
        });
    } catch (error) {
      client.sendhook(
        `Error Slash Command:\n\`${error.message ? error.message : error}\``,
        {
          channel: client.config.logs.boterror,
          name: "Notifications DGH BOT SLASH"
        }
      );
      interaction.reply({
        content:
          "There was an error while executing this command, please try again and If this continues to happen talk to the bot owner.",
        ephemeral: true
      });
      console.log(error);
    }
  });

  client.on("interactionCreate", async interaction => {
    if (!interaction.isSelectMenu()) return;
    console.log(interaction);
    let buttonID = interaction.customId;
    if (!buttonID) return;
    try {
      const SelectEvent = client.selects.get(buttonID);
      if (!SelectEvent) return;
      await interaction.deferUpdate();
      await SelectEvent.execute(client, interaction).catch(e => {
        client.sendhook(`Error SELECTS:\n\`${e.message ? e.message : e}\``, {
          channel: client.config.logs.boterror,
          name: "Notifications DGH BOT SELECTS"
        });
      });
    } catch (error) {
      client.sendhook(
        `Error SELECTS:\n\`${error.message ? error.message : error}\``,
        {
          channel: client.config.logs.boterror,
          name: "Notifications DGH BOT SELECTS"
        }
      );
      interaction.followUp({
        content:
          "There was an error while executing this select event, please try again and If this continues to happen talk to the bot owner.",
        ephemeral: true
      });
      console.log(error);
    }
  });
  client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;
    console.log(interaction);
    let buttonID = interaction.customId;
    if (!buttonID) return;
    try {
      const buttonEvent = client.buttons.get(buttonID);
      if (!buttonEvent) return;
      await interaction.deferUpdate();
      await buttonEvent.execute(client, interaction).catch(e => {
        client.sendhook(`Error BUTTON:\n\`${e.message ? e.message : e}\``, {
          channel: client.config.logs.boterror,
          name: "Notifications DGH BOT BUTTONS"
        });
      });
    } catch (error) {
      client.sendhook(
        `Error BUTTON:\n\`${error.message ? error.message : error}\``,
        {
          channel: client.config.logs.boterror,
          name: "Notifications DGH BOT BUTTONS"
        }
      );
      interaction.followUp({
        content:
          "There was an error while executing this button event, please try again and If this continues to happen talk to the bot owner.",
        ephemeral: true
      });
      console.log(error);
    }
  });
};
