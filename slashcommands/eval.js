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
  async execute(client, interaction) {
    if (owner.includes(interaction.member.user.id) === false) {
      return client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              flags: 64,
              content: `<@!${interaction.member.user.id}>, Dude only bot owner can use this command.`
            }
          }
        });
    }
    const code = interaction.data.options[0].value;

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
        .addField("📤 Login", `\`\`\`javascript\n${code}\n\`\`\``)
        .addField("📥 Exit", `\`\`\`js\n${evaled}\`\`\``)
        .setColor("RANDOM");
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            flags: 64,
            embeds: [newEmbed]
          }
        }
      });
    } catch (err) {
      evalEmbed.addField("There was an error;", `\`\`\`js\n${err}\n\`\`\``);
      evalEmbed.setColor("#FF0000");
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            flags: 64,
            embeds: [evalEmbed]
          }
        }
      });
    }
  }
};
