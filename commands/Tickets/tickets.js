const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ticket",
  category: "ticket",
  description: "create your ticket",
  cooldown: 5,
  permission: "",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    let btn1 = new client.button.MessageButton()
      .setStyle("blurple")
      .setLabel("🎫  Open a Ticket!")
      .setID("1");
    message.delete();
    let embed = new MessageEmbed()
      .addField(
        "Open a ticket!",
        `By reacting to this ticket, a message will be opened for you.`
      )
      .setColor("#468DFF")
      .setFooter(`Powered by dgh-bot.ddns.net`);

    client.button.send(null, {
      channel: message.channel.id,
      embed: embed,
      buttons: [[btn1]]
    });
    client.button.on("1", async button => {
      let btn2 = new client.button.MessageButton()
        .setStyle(`grey`)
        .setLabel(`🔒  Close`)
        .setID("2");
      let ch = client.db.get(
        `tickets_${message.guild.id}_${button.clicker.user.id}`
      );
      if (ch) {
        button.channel
          .send(
            "Your ticket is already there click <#" +
              ch +
              "> to see your ticket"
          )
          .then(msg => msg.delete({ timeout: 5000 }));
      }
      if (!ch) {
        const channel = await button.guild.channels.create(
          `${button.clicker.user.username} ticket`,
          {
            topic: `Common Information:
Ticket Name: ${button.clicker.user.username}
Ticket ID: ${button.clicker.user.id}`,
            permissionOverwrites: [
              {
                id: button.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
              },
              {
                id: button.clicker.user.id,
                allow: ["VIEW_CHANNEL"]
              },
              {
                id: client.user.id,
                allow: [
                  "VIEW_CHANNEL",
                  "MANAGE_CHANNELS",
                  "MANAGE_MESSAGES",
                  "SEND_MESSAGES"
                ]
              }
            ]
          }
        );
        button.channel
          .send(
            "Your ticket has been created click <#" +
              channel.id +
              "> to see your ticket"
          )
          .then(msg => msg.delete({ timeout: 5000 }));
        const embedticket = new MessageEmbed()
          .setTimestamp()
          .setTitle("General Support")
          .setFooter(`Ticket opened at`)
          .setColor(0x5865f2).setDescription(`Support will be with you soon.\nTo close this ticket, interact with 🔒`);
        client.button.send(`Welcome ${button.clicker.user}`, {
          channel: channel.id,
          embed: embedticket,
          buttons: [[btn2]]
        });
        client.db.set(
          `tickets_${message.guild.id}_${button.clicker.user.id}`,
          channel.id
        );
        client.db.set(
          `tickets_user_${message.guild.id}_${channel.id}`,
          button.clicker.user.id
        );
        client.button.on("2", async buttons => {
          let btn3 = new client.button.MessageButton()
            .setStyle(`red`)
            .setLabel(`Close`)
            .setID("3");
          client.button.send(`Are you sure you want to close this ticket?`, {
            channel: channel.id,
            buttons: [[btn3]]
          });
        });
        client.button.on("3", async buttons => {
          let chs = client.db.get(
            `tickets_user_${message.guild.id}_${buttons.channel.id}`
          );
          if (chs !== buttons.clicker.user.id) {
            buttons.channel
              .send(
                `Sorry you don't have access to delete this channel, it's only <@${chs}> only`
              )
              .then(msg => msg.delete({ timeout: 5000 }));
          }
          if (chs === buttons.clicker.user.id) {
            buttons.reply("Deleting after 5 seconds");
            setTimeout(function() {
              client.db.delete(
                `tickets_${message.guild.id}_${button.clicker.user.id}`
              );
              buttons.channel.delete();
            }, 5000);
          }
        });
      }
    });
  }
};
