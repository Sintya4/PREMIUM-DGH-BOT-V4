const discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const sourcebin = require("sourcebin_js");
module.exports = {
  name: "haste",
  usage: ``,
  category: "utility",
  args: false,
  aliases: ["hastebin"],
  run: async (client, message, args) => {
    message.delete();
    var filter = m => m.author.id === message.author.id;
    let c = await message.channel
      .send(`:eight_pointed_black_star:| **Send Give the Code Name**`)
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ["time"]
          })
          .then(collected => {
            if (c.first().content === "cancel")
              return message.channel.send("Exiting setup..."); //Stops execution if command cancel is run
            let room = collected.first().content;
            collected.first().delete();
           msg
              .edit(":eight_pointed_black_star:| **Send give me the code**")
              .then(msg => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                  })
                  .then(collected => {
                      return message.channel.send("Exiting setup..."); //Stops execution if command cancel is run
                    let consten = collected.first().content;
                    collected.first().delete();
                    msg.delete();
                    message.delete();
                    sourcebin
                      .create(
                        [
                          {
                            name: "Made By " + message.author.username,
                            content: consten,
                            languageId: "JavaScript"
                          }
                        ],
                        {
                          title: room,
                          description:
                            'This code was created in "' +
                            new Intl.DateTimeFormat("en-US").format(
                              Date.now()
                            ) +
                            '"'
                        }
                      )
                      .then(src => {
                        client.db.push(
                          `hastebinlist_${message.author.id}`,
                          src.url
                        );
                        let embed = new discord.MessageEmbed()
                          .setAuthor(
                            "Sourceb.in",
                            "https://sourceb.in/icon.png"
                          )
                          .setTitle(`${room}`)
                          .setColor("RANDOM")
                          .setDescription(
                            `Code:\`\`\`kt\n${consten}\n\`\`\`\n**(${src.url})**\nThis link has been saved to the hasebinlist`
                          );
                        message.channel.send(embed);
                      });
                  });
              });
          });
      });
  }
};
