const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "custom",
  description: "Add custom commands",
  options: [
    {
      name: "create",
      description: "create a custom command",
      type: "SUB_COMMAND",
      options: [
        {
          name: "command",
          description: "name of the custom command",
          type: "STRING",
          required: true
        },
        {
          name: "response",
          description: "The response of the command",
          type: "STRING",
          required: true
        },
        {
          name: "type",
          description: "Embed or Default of the custom command",
          type: "STRING",
          required: true,
          choices: [
            {
              name: "Content (Default)",
              value: "content"
            }
          ]
        }
      ]
    },
    {
      name: "delete",
      type: "SUB_COMMAND",
      description: "Delete a custom command",
      options: [
        {
          name: "command",
          description: "name of the custom command",
          type: "STRING",
          required: true
        }
      ]
    }
  ],
  P_user: ["MANAGE_GUILD"],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  execute: async (client, interaction, args) => {
    const subCommand = interaction.options.getSubcommand();
    const commandName = interaction.options.getString("command");
    const customCommand = await client.data.get(`cmd_${interaction.guild.id}`);

    if (subCommand === "create") {
      const response = interaction.options.getString("response");
      const type = interaction.options.getString("type");
      const properties = {
        name: commandName,
        responce: response,
        type
      };
      if (!customCommand) {
        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setFooter(client.user.username)
          .setTitle("Custom Commands")
          .addField("Name", commandName)
          .addField("Response", response)
          .addField("Type", type);
        client.data.push(`cmd_${interaction.guild.id}`, properties);
        return interaction.reply({ embeds: [embed] });
      } else if (
        customCommand.find(x => x.name === commandName.toLowerCase())
      ) {
        let data = customCommand.find(
          x => x.name === commandName.toLowerCase()
        );
        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setFooter(client.user.username)
          .setTitle("Update Custom Commands")
          .addField("Name", commandName)
          .addField("Response", response)
          .addField("Type", type);
        let value = customCommand.indexOf(data);
        customCommand[value] = properties;
        var filter = customCommand.filter(x => {
          return x != null && x != "";
        });
        client.data.set(`cmd_${interaction.guild.id}`, filter);
        return interaction.reply({ embeds: [embed] });
      }
    } else if (subCommand === "delete") {
      let embed2 = new MessageEmbed()
        .setColor("RED")
        .setFooter(client.user.username)
        .setDescription(
          `${await client.emoji(
            "DGH_error"
          )} | No Custom Command With That Name Exist In Your Guild Data`
        );

      if (!customCommand) interaction.followUp({ embeds: [embed2] });
      let data = customCommand.find(x => x.name === commandName.toLowerCase());
      if (!data) {
        await client.data.push(`cmd_${interaction.guild.id}`);
      }
      let value = customCommand.indexOf(data);
      delete customCommand[value];

      var filter = customCommand.filter(x => {
        return x != null && x != "";
      });
      await client.data.set(`cmd_${interaction.guild.id}`, filter);

      let embed3 = new MessageEmbed()
        .setColor("GREEN")
        .setFooter(client.user.username)
        .setTitle(`Deleted`)
        .setDescription(
          `${await client.emoji("DGH_success")} | Command Deleted`
        );

      interaction.reply({
        embeds: [embed3]
      });
    }
    function findAndReplace(object, value, replacevalue) {
      for (var x in object) {
        if (typeof object[x] == typeof {}) {
          findAndReplace(object[x], value, replacevalue);
        }
        if (object[x] == value) {
          object["type"] = replacevalue;
        }
      }
    }
  }
};
