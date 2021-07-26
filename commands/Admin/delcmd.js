module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "admin",
  args: true,
   authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
 run: async (client, message, args) => {
    let cmdname = args[0];

    if (!cmdname)
      return message.channel.send(
        ":x: Gimm me commmand name, `delcmd <cmd_name>`"
      );

    let database = await client.data.get(`cmd_${message.guild.id}`);

    if (database) {
      let data = database.find(x => x.name === cmdname.toLowerCase());

      if (!data)
        return message.channel.send(":x: Unable to find this command.");

      let value = database.indexOf(data);
      delete database[value];

      var filter = database.filter(x => {
        return x != null && x != "";
      });

      client.data.set(`cmd_${message.guild.id}`, filter);
      return message.channel.send(`Deleted the **${cmdname}** Command!`);
    } else {
      return message.channel.send(
        ":x: Sorry but i am unable to find that command!"
      );
    }
  }
};
