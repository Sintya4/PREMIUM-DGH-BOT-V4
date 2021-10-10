module.exports = {
  name: "custom-cmd",
  description: "add / remove guild custom commands",
  category: "admin",
  P_user: ["MANAGE_MESSAGES"],
  P_bot: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    let buts = new client.Discord.MessageActionRow().addComponents(
     new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Add Cmd")
        .setCustomId("add"),
      new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Delete Cmd")
        .setCustomId("remove"),
      new client.Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("Cancel Cmd")
        .setCustomId("cancel")
    );
    let buts2 = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("Cancel")
        .setCustomId("cancel")
    );
    let buts3 = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("Done")
        .setCustomId("done")
    );
    let buts4 = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Embed")
        .setCustomId("embed"),
      new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Content")
        .setCustomId("content")
    );

    const databas = await client.data.get(`cmd_${message.guild.id}`);
    let array = [];
    if (databas && databas.length) {
      databas.forEach(m => {
        array.push({
          label: m.name || "",
          description: "",
          value: m.name || ""
        });
      });
    }

    let opt = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageSelectMenu()
        .setCustomId("opt")
        .setPlaceholder("Click Here")
        .addOptions(array)
    );

    let embed = new client.Discord.MessageEmbed()
      .setTitle("Custom Commands")
      .setDescription(
        "Choose one of the following, `add or remove or cancel?`"
      );
    let msg = await message.channel.send({
      embeds: [embed],
      components: [buts]
    });

    let filter = i => i.user.id === message.author.id;
    let filter2 = i => i.author.id === message.author.id;
    let col = msg.createMessageComponentCollector({
      filter
    });
    col.on("collect", async i => {
      if (i.customId === "cancel") {
        msg.delete().catch(a => {
          null;
        });
        client.send("Setup has been cancelled", { message });
        return;
      }
      if (i.customId === "done") {
        msg.delete().catch(a => {
          null;
        });
        return client.send("Setup has been finished", { message });
      }
      if (i.customId === "remove") {
        const database = await client.data.get(`cmd_${message.guild.id}`);
        if (database && database.length) {
          embed.setDescription(
            "Choose the Custom Command that will be deleted"
          );
          return msg.edit({
            embeds: [embed],
            components: [opt, buts2]
          });
        } else {
          embed.setDescription(`Sorry, there is no custom command`);
          return msg.edit({
            embeds: [embed],
            components: [buts2]
          });
        }
      }
      if (i.customId === "opt") {
        const database = await client.data.get(`cmd_${message.guild.id}`);
        if (database) {
          let data = database.find(x => x.name === i.values[0].toLowerCase());
          if (!data) {
            embed.setDescription(`The Custom Command has been deleted`);
            return msg.edit({
              embeds: [embed]
            });
          }
          let value = database.indexOf(data);
          delete database[value];

          var filter = database.filter(x => {
            return x != null && x != "";
          });
          client.data.set(`cmd_${message.guild.id}`, filter);
          embed.setDescription(`Deleted the **${i.values[0]}** Command!`);
          return msg.edit({
            embeds: [embed]
          });
        }
      }

      if (i.customId === "add") {
        embed.setDescription(
          "Choose Response on custom command `embed or content`"
        );
        msg
          .edit({
            embeds: [embed],
            components: [buts4, buts2]
          })
          .catch(a => {
            null;
          });
      }
      if (i.customId === "content") {
        embed.setDescription("Please give the name of the custom command");
        msg
          .edit({
            embeds: [embed],
            components: []
          })
          .catch(a => {
            null;
          });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let desc = d1.first().content;
        d1.first().delete;
        embed.setDescription("Nice, Please give a reply if the cmd is used");
        msg
          .edit({
            embeds: [embed],
            components: []
          })
          .catch(a => {
            null;
          });
        let d2 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let desc2 = d2.first().content;
        d2.first().delete;
        let data = {
          name: desc.toLowerCase(),
          responce: desc2,
          type: "content"
        };
        client.data.push(`cmd_${message.guild.id}`, data);
        embed.setDescription(
          `Done, The command has been made\n\nName Cmd: ${desc}\nResponse: ${desc2}\nType: Content`
        );
        msg
          .edit({
            embeds: [embed],
            components: [buts3]
          })
          .catch(a => {
            null;
          });
      }
      if (i.customId === "embed") {
        embed.setDescription("Please give the name of the custom command");
        msg
          .edit({
            embeds: [embed],
            components: []
          })
          .catch(a => {
            null;
          });
        let d1 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let desc = d1.first().content;
        d1.first().delete;
        embed.setDescription(
          "Go To Web [Embed Visualizer](https://embedbuilder.nadekobot.me/)\n To Generate Embed in response to Custom commands"
        );
        msg
          .edit({
            embeds: [embed],
            components: []
          })
          .catch(a => {
            null;
          });
        let d2 = await msg.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let desc2 = d2.first().content;
        d2.first().delete;
        const json = JSON.parse(desc2);
        embed.setDescription(
          `Done, The command has been made\n\nName Cmd: ${desc}\nType: Embed\nPreview:`
        );
        msg
          .edit({
            embeds: [embed, json],
            components: [buts3]
          })
          .catch(e => {
            embed.setDescription("Error: Not Vaild Embed The Json");
            msg.edit({
              embeds: [embed],
              components: [buts3]
            });
          return;
          });
        let data = {
          name: desc.toLowerCase(),
          responce: json,
          type: "embed"
        };
        client.data.push(`cmd_${message.guild.id}`, data);
      }
    });
  }
};
