module.exports = {
  name: "nqn",
  usage: "nqn <on/off>",
  description: "",
  category: "settings",
  args: true,
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    if (args[0] == "on") {
      await client.data.set(`nqn_${message.guild.id}`, "on");
      return client.send("NQN has been activated", message);
    }

    if (args[0] == "off") {
      await client.data.delete(`nqn_${message.guild.id}`);
      return client.send("NQN has been turned off", message);
    }
  }
};
