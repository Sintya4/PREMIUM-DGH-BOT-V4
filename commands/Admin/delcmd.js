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
   let database = await client.data.get(`cmd_${message.guild.id}`);
    if (database) {
      let data = database.find(x => x.name === cmdname.toLowerCase());

      if (!data)
        return client.send(await client.emoji("DGH_error") +" Unable to find this command.", message);

      let value = database.indexOf(data);
      delete database[value];

      var filter = database.filter(x => {
        return x != null && x != "";
      });

      client.data.set(`cmd_${message.guild.id}`, filter);
      return client.send(await client.emoji("DGH_error") +`Deleted the **${cmdname}** Command!`, message);
    } else {
      return client.send(
       await client.emoji("DGH_error") + "Sorry but i am unable to find that command!", message
      );
    }
  }
};
