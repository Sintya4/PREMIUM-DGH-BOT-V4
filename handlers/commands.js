module.exports = async client => {
  const { readdirSync } = require("fs");
  readdirSync("./commands/").forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let command = require(`../commands/${dir}/${file}`);
      if (command.name && command.category) {
        client.commands.set(command.name, command);
        console.log(`🟩 CMD: ${command.name} | ${command.category} | ${file}`
     );
      } else {
        console.warn(
          `🟥 CMD: ${command.name || "ERROR NAME"} | ${command.category || "ERROR CATEGORY"} | ${file}`
        );
        continue;
      } 
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
    }
  });
  readdirSync("./events/").forEach(dir => {
    const evals = readdirSync(`./events/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of evals) {
      let events = require(`../events/${dir}/${file}`);
      let fileName = file.substring(0, file.length - 3);
      events(client);
      console.log(
        `⬜️ Module: ${fileName} | form("${file}")`
      );
    }
  });
};
