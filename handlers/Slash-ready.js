const fs = require("fs");

module.exports = async client => {
  const commandFiles = fs
    .readdirSync("./slashcommands")
    .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`../slashcommands/${file}`);
    if (command.global == true) {
      client.api.applications(client.user.id).commands.post({
        data: {
          name: command.name,
          description: command.description,
          options: command.commandOptions
        }
      });
    }
    client.slashcommands.set(command.name, command);
    console.log(`🟩 Command POST: ${command.name} | Global | ${file}`);
  }
  console.log("");

  let cmdArrGlobal = await client.api
    .applications(client.user.id)
    .commands.get();
  cmdArrGlobal.forEach(element => {
    console.log(
      "🟩 Global command loaded : " + element.name + " (" + element.id + ")"
    );
  });
  console.log("");
};
