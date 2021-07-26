const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/Storages/")
const { Default_Prefix, Color } = require("../../config.js");
const owner = ["740947753135243354", "767726828311543820"];

module.exports = {
  name: "create-backup",
  usage: "none",
  description: "create backup",
  category: "backup",
 /* botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],
*/
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }
backup.create(message.guild, {
jsonBeautify: true
}).then((backupData) => {
 // And send informations to the backup owner
  client.send("Server: "+ message.guild.name+ "\nThe backup has been created! To load it, type this command on the server of your choice: `" + Default_Prefix + "load-backup " + backupData.id + "`!", message,"dm");
  client.send("The backup has been created! To load it, type this command on the server of your choice: `" + Default_Prefix + "load-backup " + backupData.id + "`!", message,"dms");
 // client.send(":white_check_mark: Backup successfully created. Back up id sended in your DMs!", message);
});
  }
}