const backup = require("discord-backup");
const owner = ["740947753135243354", "767726828311543820"];
backup.setStorageFolder(__dirname+"/Storages/")

module.exports = {
  name: "load-backup",
  usage: "<your backup id>",
  description: "load a saved backup, yeah some of them may not saved",
  category: "backup",
/*  botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],*/
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }

    let backupID = args[0];
    if (!backupID) {
      return client.send(":x: | You must specify a valid backup ID!", message);
    }
    // Fetching the backup to know if it exists
    backup
      .fetch(backupID)
      .then(async () => {
        // If the backup exists, request for confirmation
        client.send(
          ":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! Type `confirm` to confirm!",
          message
        );
        await message.channel
          .awaitMessages(
            m => m.author.id === message.author.id && m.content === "confirm",
            {
              max: 1,
              time: 20000,
              errors: ["time"]
            }
          )
          .catch(err => {
            // if the author of the commands does not confirm the backup loading
            return client.send(
              ":x: | Time's up! Cancelled backup loading!",
              message
            );
          });
        // When the author of the command has confirmed that he wants to load the backup on his server
        client.send(
          ":white_check_mark: | Start loading the backup!",
          message,
          "dm"
        );
        // Load the backup
        backup
          .load(backupID, message.guild)
          .then(() => {
            // When the backup is loaded, delete them from the server
          })
          .catch(err => {
            // If an error occurred
            return client.send(
              ":x: | Sorry, an error occurred... Please check that I have administrator permissions!",
              message
            );
          });
      })
      .catch(err => {
        console.log(err);
        // if the backup wasn't found
        return client.send(
          ":x: | No backup found for `" + backupID + "`!",
          message
        );
      });
  }
};
