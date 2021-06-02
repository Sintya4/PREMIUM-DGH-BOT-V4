const ms = require("ms");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "stopwh",
  usage: `stopwatch <time> <second / minute / hour / day>`,
  category: "utity",
  description: "",
  args: true,
  permission: "",
  cooldown: 1,

  run: async (client, message, args) => {
    var remainingTime = args[0].replace("s","").replace("h","").replace("m","").replace("d", "");
    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField("Loading-Time", `**${dm(ms(args[0]))}**`)
        .setColor("RANDOM")
    );
    let clock = setInterval(() => {
      let time = remainingTime--;
      let s = time * ms(args[0]);
      countdown.edit(
        new Discord.MessageEmbed()
          .addField("Start-Time", `**${dm(s)}**`)
          .setColor("RANDOM")
      );
      if (remainingTime == 0) {
        status = "⏱️";
        clearInterval(clock);
        countdown.delete();
        message.channel.send(
          new Discord.MessageEmbed()
            .addField("Done-Time", `Done **${dm(ms(args[0]))}**`)
            .setColor("RANDOM")
        );
      }
    }, 1000);
  }
};

function dm(ms) {
  let days, daysms, hours, hoursms, minutes, minutesms, sec;
  days = Math.floor(ms / (24 * 60 * 60 * 1000));
  daysms = ms % (24 * 60 * 60 * 1000);
  hours = Math.floor(daysms / (60 * 60 * 1000));
  hoursms = ms % (60 * 60 * 1000);
  minutes = Math.floor(hoursms / (60 * 1000));
  minutesms = ms % (60 * 1000);
  sec = Math.floor(minutesms / 1000);

  return days + ": " + hours + ": " + minutes + ": " + sec;
}
