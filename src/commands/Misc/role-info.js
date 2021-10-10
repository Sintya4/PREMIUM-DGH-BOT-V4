const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleinfo",
  description: "shows stats of the mentioned role",
  usage: "roleinfo <role mention/role id>",
  aliases: ["rinfo", "rolei"],
  args: true,
  category: "misc",
  run: async (client, message, args) => {
    let role = client.resolveRole(args[0], message.guild);
    if (!role) return message.channel.send("**Please Enter A Valid Role!**");
    const status = {
      false: "No",
      true: "Yes"
    };
    const permissions = role.permissions.toArray().map(perm => {
      return perm
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\w\S*/g, txt => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

    let roleembed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Role Info: \`[  ${role.name}  ]\``)
      .setThumbnail(message.guild.iconURL())
      .addField("**ID**", `\`${role.id}\``)
      .addField("**Hex**", `\`${role.hexColor}\``)
      .addField("**Color**", `\`${role.color}\``)
      .addField("**Members**", `\`${role.members.size}\``)
      .addField("**Position**", `\`${role.position}\``)
      .addField("**Permissions**", `**\`${permissions.join(", ")}\`**`)
      .addField("**Mentionable**", `\`${status[role.mentionable]}\``)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL(),
        true
      )
      .setTimestamp();

    message.channel.send({ embeds: [roleembed] });
  }
};
