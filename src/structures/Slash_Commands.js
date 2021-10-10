const fs = require("fs");
module.exports = async client => {
  fs.readdirSync("./src/interaction/slash/").forEach(async dir => {
    const commands = fs
      .readdirSync(`./src/interaction/slash/${dir}/`)
      .filter(file => file.endsWith(".js"));
    for (const file of commands) {
      const command = require(`../interaction/slash/${dir}/${file}`);
      if (command.name) {
        client.slashs.set(command.name + "slash", command);
        findAndReplace(command.options, "STRING", "3");
        findAndReplace(command.options, "INTEGER", "4");
        findAndReplace(command.options, "BOOLEAN", "5");
        findAndReplace(command.options, "USER", "6");
        findAndReplace(command.options, "CHANNEL", "7");
        findAndReplace(command.options, "ROLE", "8");
        findAndReplace(command.options, "NUMBER", "10");
        client.api.applications(client.user.id).commands.post({
          data: {
            name: command.name,
            description: command.description,
            options: command.options
          }
        });
      }
      console.log(`🟩 Command POST: ${command.name} | Global | ${file}`);
    }
  });
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
function findAndReplace(object, value, replacevalue) {
  for (var x in object) {
    if (typeof object[x] == typeof {}) {
      findAndReplace(object[x], value, replacevalue);
    }
    if (object[x] == value) {
      object["type"] = replacevalue;
    }
  }
}
