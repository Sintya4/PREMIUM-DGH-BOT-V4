const Discord = require("discord.js");
const { inspect } = require("util");
const owner = ["740947753135243354", "767726828311543820"];
const tokenwarning = `Error: Unexpected token`;

module.exports = {
  name: "eval",
  description: "Executes JavaScript code.",
  commandOptions: [
    {
      type: 3,
      name: "code",
      description: "Code to execute",
      required: true
    }
  ],
  global: true,
   async execute(client, message, user, args){
    if (owner.includes(user.user.id) === false) {
      return message(
        `<@!${user.user.id}>, Dude only bot owner can use this command.`,
        { flags: 64 }
      );
    }
    const code = args[0].value;

    function clean(text) {
      if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 0 });
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }

    const evalEmbed = new Discord.MessageEmbed().setColor("RANDOM");
    try {
      var evaled = clean(await eval(code));
      if (evaled.startsWith("NTQ3M")) evaled = tokenwarning;
      if (evaled.constructor.name === "Promise")
        evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``);
      else evalEmbed.setDescription(`\`\`\`js\n${evaled}\n\`\`\``);
      const newEmbed = new Discord.MessageEmbed()
        .setDescription(
          `📤 Login\n\`\`\`javascript\n${code}\n\`\`\`\n📥 Exit\n\`\`\`js\n${evaled}\`\`\``
        )
        .setColor("RANDOM");
       message(null, { flags: 64, embed: newEmbed });
    } catch (err) {
      evalEmbed.addField("There was an error;", `\`\`\`js\n${err}\n\`\`\``);
      evalEmbed.setColor("#FF0000");
      message(null, { flags: 64, embed: evalEmbed});
    }
  }
};
