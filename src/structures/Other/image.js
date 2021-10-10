const Canvas = require("canvas");
const GIFEncoder = require(`gifencoder`);
module.exports = {
  welcome: async (client, member) => {
    let image = await client.data.get(`welimage_${member.guild.id}`);
    const GIF = new GIFEncoder(1024, 500);
    GIF.start();
    GIF.setRepeat(0);
    GIF.setDelay(15);
    const canvas = Canvas.createCanvas(1024, 500);
    const ctx = canvas.getContext("2d");
    let img = await Canvas.loadImage(image || client.config.image.welcome);
    let avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "png", size: 1024 })
    );

    //Background
    ctx.drawImage(img, 0, 0, 1024, 500);
    ctx.font = "72px sans-serif";
    ctx.fillStyle =
      "#" +
      (
        "000000" +
        Math.random()
          .toString(16)
          .slice(2, 8)
          .toUpperCase()
      ).slice(-6);
    ctx.fillText("welcome", 360, 360);

    ctx.beginPath();
    ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();

    //Text
    (ctx.font = "42px sans-serif"), (ctx.textAlign = "center");
    ctx.fillStyle = "AQUA";
    ctx.fillText(member.user.tag.toUpperCase(), 512, 410);
    ctx.font = "32px sans serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`You are the ${member.guild.memberCount}th`, 512, 455);
    ctx.fillText("DGH BOT", 512, 485);
    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 393, 47, 238, 238);
    GIF.addFrame(ctx);
    GIF.finish();
    return GIF.out.getData();
  }
};
