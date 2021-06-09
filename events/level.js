let Levels = require("discord-xp");
let fs = require("fs");

module.exports = async client => {
  client.on("message", async message => {
    const Level_Roles_Storage = fs.readFileSync("Storages/Level-Roles.json");
    const Level_Roles = JSON.parse(Level_Roles_Storage.toString());
    const Guild_Check = Level_Roles.find(guild => {
      return guild.guildID === `${message.guild.id}`;
    });
    if (!Guild_Check) return;
    const Guild_Roles = Level_Roles.filter(guild => {
      return guild.guildID === `${message.guild.id}`;
    });
    //For Loop Works for Checking
    for (let i = 0; i < Guild_Roles.length; i++) {
      const User = await Levels.fetch(message.author.id, message.guild.id);
      if (User.level == parseInt(Guild_Roles[i].Level_To_Reach)) {
        const AuthorID = message.guild.members.cache.get(message.author.id);
        const Given_Level_Role = Guild_Roles[i].Level_Role_ID;
        return AuthorID.roles.add(Given_Level_Role).then(console.log('success'))
      }
    }
  });
};
