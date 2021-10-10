module.exports = {
  name: "avatar",
  description: "Avatar Of Discord User!",
  options: [
    {
      type: "USER",
      name: "target",
      description: "Target User (ID or @user)",
      required: false
    }
  ],
  async execute(client, interaction) {
    let user = await interaction.options.getUser("target");
    if (!user) user = interaction.user;
    const target = await client.resolveUser(user.id);
    let embed = new client.Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${target.username}'s Avatar`, client.user.displayAvatarURL())
      .setImage(`${target.displayAvatarURL({ dynamic: true })}?size=256`);
    interaction.reply({
      embeds: [embed]
    });
  }
};
