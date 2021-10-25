let Levels = require("discord-xp");

module.exports = async client => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    let level = await client.data.get(`level_role_${message.guild.id}`);
    if (!level) return;
    for (let i = 0; i < level.length; i++) {
      const User = await Levels.fetch(message.author.id, message.guild.id);
      if (User.level == parseInt(level[i].Level_To_Reach)) {
        const AuthorID = message.guild.members.cache.get(message.author.id);
        const Given_Level_Role = level[i].Level_Role_ID;
        if(!Given_Level_Role) return;
        const Roles_name = message.guild.roles.cache.get(Given_Level_Role);
        if(!Roles_name) return;
        let embed = new client.Discord.MessageEmbed()
        .setTitle("⬆️ Level UP ⬆️")
        .setDescription(`Congratulations you have got Roles ${Roles_name} Because you have level ${User.Level}`);
        AuthorID.send({embeds:[embed]});
        return AuthorID.roles.add(Given_Level_Role);//.then(console.log('success'))
      }
    }
  });
};