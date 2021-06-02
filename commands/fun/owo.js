const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "mantioten",
  description: "OwO",
  category: "manitence",
  run: async (client, args, message) => {
    const data = await fetch("https://rra.ram.moe/i/r?type=owo").then((res) =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](https://cdn.ram.moe/${data.path.replace(
          "/i/",
          ""
        )})`
      )
      .setImage(`https://cdn.ram.moe/${data.path.replace("/i/", "")}`)
      .setTimestamp();

    message.channel.send(embed);
  }
};
