
module.exports = {
  name: "rolelist",
  category: "admin",
  description: "Check the roles for this guild ",
  run: async (client, message, args) => {
    client.ops.rolelist(message);
  }
};
