const glob = require("glob");
const path = require("path");
module.exports = async client => {
  const SlashFiles = glob.sync("./src/interaction/slash/**/**/*.js");
  for (const file of SlashFiles) {
    const SlashEvents = require(path.resolve(file));
    client.slashs.set(SlashEvents.name, SlashEvents);
    findAndReplace(SlashEvents.options, "STRING", "3");
    findAndReplace(SlashEvents.options, "INTEGER", "4");
    findAndReplace(SlashEvents.options, "BOOLEAN", "5");
    findAndReplace(SlashEvents.options, "USER", "6");
    findAndReplace(SlashEvents.options, "CHANNEL", "7");
    findAndReplace(SlashEvents.options, "ROLE", "8");
    findAndReplace(SlashEvents.options, "NUMBER", "10");
    findAndReplace(SlashEvents.options, "SUB_COMMAND", "1");
    client.api.applications(client.user.id).commands.post({
      data: {
        name: SlashEvents.name,
        description: SlashEvents.description,
        options: SlashEvents.options
      }
    });
    console.log(`🟩 Command POST: ${SlashEvents.name} | Global`);
  }
  let cmdArrGlobal = await client.api
    .applications(client.user.id)
    .commands.get();
  cmdArrGlobal.forEach(element => {
    console.log(
      "🟩 Global command loaded : " + element.name + " (" + element.id + ")"
    );
  });
  console.log("");

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
};
