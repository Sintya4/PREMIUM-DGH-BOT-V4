module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_responce>",
  description: "add guild custom commands",
  category: "admin",
  args: true,
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    let cmdname = args[0];
    let cmdresponce = args.slice(1).join(" ");
    if (!cmdresponce)
      return client.send(
        `${await client.emoji("DGH_error")} You have to give command cmd responce, \`addcmd <cmd_name> <cmd_responce>\``
      , message);
    let database = await client.data.get(`cmd_${message.guild.id}`);
    if (database && database.find(x => x.name === cmdname.toLowerCase()))
      return client.send(
        `${await client.emoji("DGH_error")} This command name is already added in guild custom commands.`
      , message);
    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    };
    client.data.push(`cmd_${message.guild.id}`, data);
    return client.send(
     await client.emoji("DGH_success") + " Added **" + cmdname.toLowerCase() + "** as a custom command in guild."
    , message);
  }
};
