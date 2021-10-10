const backup = require("discord-backup");
backup.setStorageFolder(__dirname + "/backup-json/");
module.exports = {
  name: "create-backup",
  description: "Create Backup Servers",
  P_user: ["ADMINISTRATOR"],
  P_bot: ["ADMINISTRATOR"],
  category: "backup",
  run: async (client, message, args) => {
    let backupData = await backup.create(message.guild, {
      jsonBeautify: true,
      saveImages: "base64"
    });
    let embed = new client.Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `Server: ${message.guild.name}\nThe backup has been created! To load it, type this command on the server of your choice: \`<prefix>load-backup ${backupData.id}\``
      );
    client.send(null,{ embed: [embed], type:true, message});
  }
};
