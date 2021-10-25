const glob = require("glob");
const path = require("path");
module.exports = async client => {
  const { readdirSync } = require("fs");
  readdirSync("./src/commands/").forEach(dir => {
    const commands = readdirSync(`./src/commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let command = require(`../commands/${dir}/${file}`);
      if (command.name && command.category) {
        client.commands.set(command.name, command);
        console.log(`🟩 CMD: ${command.name} | ${command.category} | ${file}`);
      } else {
        console.warn(
          `🟥 CMD: ${command.name || "ERROR NAME"} | ${command.category ||
            "ERROR CATEGORY"} | ${file}`
        );
        continue;
      }
      if (command.aliases && command.aliases.length) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
    }
  });

  readdirSync("./src/events/").forEach(dir => {
    const evals = readdirSync(`./src/events/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of evals) {
      let events = require(`../events/${dir}/${file}`);
      let fileName = file.substring(0, file.length - 3);
      events(client);
      console.log(`⬜️ Events: ${fileName} | form("${file}")`);
    }
  });

  const buttonCommandsFiles = glob.sync("./src/interaction/buttons/**/**/*.js");
  for (const file of buttonCommandsFiles) {
    const buttonCommand = require(path.resolve(file));
    client.buttons.set(buttonCommand.name, buttonCommand);
  }
  const selectEventFiles = glob.sync("./src/interaction/selects/**/**/*.js");
  for (const file of selectEventFiles) {
    const selectEvent = require(path.resolve(file));
    client.selects.set(selectEvent.name, selectEvent);
  }
};
