const { MessageEmbed } = require("discord.js");

const math = require("mathjs");

const Color = `RANDOM`;

module.exports = {
  name: "math",
  category: "misc",
  usage: "math 1+1",
  args: true,
  
  run: async (client, message, args) => {
    message.delete();
    try {
      if (!args[0]) return message.channel.send("Please Give Me Equation!");

      const embed = new MessageEmbed()
        .setColor(`${Color}`)
        .setTitle(`Result`)
        .setDescription(math.evaluate(args.join(" ")))
        .setTimestamp();
      message.channel.send(embed).then(m => {
        m.react("798526789114134548");

        m.react("798526823976796161");
      });
    } catch (error) {
      message.channel
        .send(`Please Give Me Valid Equation | Try Again Later!`)
        .then(() => console.log(error));

    }
  }
};
