const backup = require("discord-backup");
const Discord = require("discord.js");
const owner = ["740947753135243354", "767726828311543820"];
backup.setStorageFolder(__dirname+"/Storages/")

module.exports = {
  name: "info-backup",
  category: "backup",
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }

    let backupID = args[0];
    if (!backupID) {
      return client.send(":x: | You must specify a valid backup ID!", message);
    }
    // Fetch the backup
    backup
      .fetch(backupID)
      .then(backupInfos => {
        const date = new Date(backupInfos.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(),
          mm = (date.getMonth() + 1).toString(),
          dd = date.getDate().toString();
        const formatedDate = `${yyyy}/${mm[1] ? mm : "0" + mm[0]}/${
          dd[1] ? dd : "0" + dd[0]
        }`;
        let embed = new Discord.MessageEmbed()
          .setAuthor("Backup Informations")
          // Display the backup ID
          .addField("Backup ID", backupInfos.id, false)
          // Displays the server from which this backup comes
          .addField("Server ID", backupInfos.data.guildID, false)
          // Display the size (in mb) of the backup
          .addField("Size", `${backupInfos.size} kb`, false)
          // Display when the backup was created
          .addField("Created at", formatedDate, false)
          .setColor("#FF0000");
        message.channel.send(embed);
      })
      .catch(err => {
        // if the backup wasn't found
        return client.send(
          ":x: | No backup found for `" + backupID + "`!",
          message
        );
      });
  }
};
