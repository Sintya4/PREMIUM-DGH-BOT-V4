const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const util = require("util");
const tokenwarning = `Error: Unexpected token`;
const owner = ["740947753135243354", "767726828311543820"];
module.exports = {
  name: "eval",
  description: "Evaluates js code",
  category: "owner",
  aliases: ["e"],
  args: true,
  usage: "eval <input>",
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }

    const code = args.join(" ");

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
      message.channel.send(newEmbed);
    } catch (err) {
      evalEmbed.addField("There was an error;", `\`\`\`js\n${err}\n\`\`\``);
      evalEmbed.setColor("#FF0000");
      message.channel.send(evalEmbed);
    }
  }
};
