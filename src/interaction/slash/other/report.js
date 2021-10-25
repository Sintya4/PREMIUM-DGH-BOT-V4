module.exports = {
  name: "report",
  description: "Report errors on bots or commands!",
  options: [
    {
      name: "bug",
      description: "Give error messages to bots or commands",
      type: "STRING",
      required: true
    }
  ],
  execute: async (client, interaction) => {
    const j = interaction.options.getString("bug");
    client.sendhook(null, {
      channel: client.config.logs.botreport,
      name: "REPORT BUGS",
      embed: [
        new client.Discord.MessageEmbed()
          .setTitle("New Report Bug")
          .addField(
            "User Name",
            `**${interaction.user.username}#${interaction.user.discriminator}**`
          )
          .addField("ID User", interaction.user.id)
          .addField("Reported", j)
          .addField("Server Name", `**${interaction.guild.name}**`)
          .addField("ID Server", `**${interaction.guild.id}**`)
          .setColor("RANDOM")
      ]
    });
    interaction.reply({
      content: "Thank you for sending bugs, we will fix it as soon as possible",
      ephemeral: true
    });
  }
};
