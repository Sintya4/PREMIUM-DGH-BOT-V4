const { MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");
const Canvas = require("canvas");
module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  category: "levels",
  run: async (client, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
    if (rawLeaderboard.length < 1)
      return client.send("Nobody's in leaderboard yet.", { message });
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    );
    const lb = leaderboard.map(
      e =>
        `__**${e.position}.**__ ** ${e.username}#${
          e.discriminator
        } » Level: \`${e.level}\` » XP: \`${e.xp.toLocaleString()}\`**`
    ); // We map the outputs.
    
    //don't edit the bottom, okay!
    //Made By Sintya
    const _0x33dc85 = _0x1b5e;
    function _0x1b5e(_0x18effb, _0x1bdf20) {
      const _0x251f28 = _0x251f();
      return (
        (_0x1b5e = function(_0x1b5e9b, _0x5ed40d) {
          _0x1b5e9b = _0x1b5e9b - 0x1b7;
          let _0x1303f2 = _0x251f28[_0x1b5e9b];
          return _0x1303f2;
        }),
        _0x1b5e(_0x18effb, _0x1bdf20)
      );
    }
    (function(_0x28d2c3, _0x79ba3c) {
      const _0x433183 = _0x1b5e,
        _0x28c4e2 = _0x28d2c3();
      while (!![]) {
        try {
          const _0x2405a5 =
            -parseInt(_0x433183(0x1c9)) / 0x1 +
            -parseInt(_0x433183(0x1c6)) / 0x2 +
            (parseInt(_0x433183(0x1cf)) / 0x3) *
              (parseInt(_0x433183(0x1c2)) / 0x4) +
            (-parseInt(_0x433183(0x1cc)) / 0x5) *
              (-parseInt(_0x433183(0x1c4)) / 0x6) +
            (-parseInt(_0x433183(0x1d7)) / 0x7) *
              (-parseInt(_0x433183(0x1c3)) / 0x8) +
            (-parseInt(_0x433183(0x1cd)) / 0x9) *
              (-parseInt(_0x433183(0x1b8)) / 0xa) +
            (-parseInt(_0x433183(0x1bb)) / 0xb) *
              (-parseInt(_0x433183(0x1da)) / 0xc);
          if (_0x2405a5 === _0x79ba3c) break;
          else _0x28c4e2["push"](_0x28c4e2["shift"]());
        } catch (_0x161b81) {
          _0x28c4e2["push"](_0x28c4e2["shift"]());
        }
      }
    })(_0x251f, 0xc81e3);
    const us = [];
    leaderboard[_0x33dc85(0x1dc)](_0x995d5d => {
      const _0x5d0680 = _0x33dc85;
      _0x995d5d["username"][_0x5d0680(0x1d0)] > 0x8
        ? us["push"]({
            pos: _0x995d5d[_0x5d0680(0x1d1)],
            us:
              "\x20" +
              _0x995d5d[_0x5d0680(0x1bf)][_0x5d0680(0x1d9)](0x0, 0x8) +
              _0x5d0680(0x1c8) +
              _0x995d5d["xp"][_0x5d0680(0x1ca)]()
          })
        : us[_0x5d0680(0x1d6)]({
            pos: _0x995d5d[_0x5d0680(0x1d1)],
            us:
              "\x20" +
              _0x995d5d[_0x5d0680(0x1bf)] +
              _0x5d0680(0x1b9) +
              _0x995d5d["xp"][_0x5d0680(0x1ca)]()
          });
    });
    const canvas = Canvas["createCanvas"](0x2b2, 0x2fb),
      ctx = canvas[_0x33dc85(0x1ba)]("2d"),
      background = await Canvas[_0x33dc85(0x1d5)](
        client[_0x33dc85(0x1c1)]["image"][_0x33dc85(0x1d2)]
      ),
      line = await Canvas["loadImage"](
        "https://media.discordapp.net/attachments/875962088156192768/881748826828980264/20210820_113413.png"
      );
    ctx[_0x33dc85(0x1c5)](
      background,
      0x0,
      0x0,
      canvas[_0x33dc85(0x1ce)],
      canvas[_0x33dc85(0x1d4)]
    ),
      (ctx[_0x33dc85(0x1d8)] = "bold\x2037px\x20Genta");
    us[_0x33dc85(0x1d0)] > 0x0 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0x28, 0x29e, 0x3c),
      (ctx["fillStyle"] = _0x33dc85(0x1c7)),
      ctx[_0x33dc85(0x1db)]("1", 0x1b, 0x55),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c0)),
      ctx["fillText"](us[0x0]["us"] || _0x33dc85(0x1bc), 0x64, 0x55));
    us[_0x33dc85(0x1d0)] > 0x1 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0x6e, 0x29e, 0x3c),
      (ctx["fillStyle"] = _0x33dc85(0x1c7)),
      ctx[_0x33dc85(0x1db)]("2", 0x1b, 0x9b),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c0)),
      ctx[_0x33dc85(0x1db)](us[0x1]["us"] || _0x33dc85(0x1bc), 0x64, 0x9b));
    us[_0x33dc85(0x1d0)] > 0x2 &&
      (ctx["drawImage"](line, 0xa, 0xb4, 0x29e, 0x3c),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c7)),
      ctx[_0x33dc85(0x1db)]("3", 0x1b, 0xdc),
      (ctx["fillStyle"] = _0x33dc85(0x1c0)),
      ctx[_0x33dc85(0x1db)](
        us[0x2]["us"] || "Invaild\x20User\x20»\x200",
        0x64,
        0xdc
      ));
    us["length"] > 0x3 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0xfa, 0x29e, 0x3c),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c7)),
      ctx[_0x33dc85(0x1db)]("4", 0x1b, 0x127),
      (ctx[_0x33dc85(0x1cb)] = "WHITE"),
      ctx[_0x33dc85(0x1db)](us[0x3]["us"] || _0x33dc85(0x1bc), 0x64, 0x127));
    us["length"] > 0x4 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0x140, 0x29e, 0x3c),
      (ctx["fillStyle"] = _0x33dc85(0x1c7)),
      ctx["fillText"]("5", 0x1b, 0x16d),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c0)),
      ctx["fillText"](
        us[0x4]["us"] || "Invaild\x20User\x20»\x200",
        0x64,
        0x16d
      ));
    us[_0x33dc85(0x1d0)] > 0x5 &&
      (ctx["drawImage"](line, 0xa, 0x186, 0x29e, 0x3c),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c7)),
      ctx[_0x33dc85(0x1db)]("6", 0x1b, 0x1b3),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c0)),
      ctx[_0x33dc85(0x1db)](us[0x5]["us"] || _0x33dc85(0x1bc), 0x64, 0x1b3));
    us[_0x33dc85(0x1d0)] > 0x6 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0x1cc, 0x29e, 0x3c),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c7)),
      ctx[_0x33dc85(0x1db)]("7", 0x1b, 0x1f9),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c0)),
      ctx[_0x33dc85(0x1db)](us[0x6]["us"] || _0x33dc85(0x1bc), 0x64, 0x1f9));
    us[_0x33dc85(0x1d0)] > 0x7 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0x212, 0x29e, 0x3c),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c7)),
      ctx[_0x33dc85(0x1db)]("8", 0x1b, 0x23f),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c0)),
      ctx["fillText"](us[0x7]["us"] || _0x33dc85(0x1bc), 0x64, 0x23f));
    function _0x251f() {
      const _0x5dcb5a = [
        "beginPath",
        "height",
        "loadImage",
        "push",
        "7wGVhTe",
        "font",
        "slice",
        "204756QcZoMh",
        "fillText",
        "map",
        "closePath",
        "835410uEqdcn",
        "\x20»\x20",
        "getContext",
        "572mZQpeZ",
        "Invaild\x20User\x20»\x200",
        "clip",
        "arc",
        "username",
        "WHITE",
        "config",
        "4ucmovj",
        "8190664YTgwRe",
        "12Jmroti",
        "drawImage",
        "2977362miBoTn",
        "BLACK",
        "...\x20»\x20",
        "854281zDuCwG",
        "toLocaleString",
        "fillStyle",
        "424920bTASMN",
        "9YvbfeF",
        "width",
        "2994081PPpEWt",
        "length",
        "position",
        "leaderboard"
      ];
      _0x251f = function() {
        return _0x5dcb5a;
      };
      return _0x251f();
    }
    us[_0x33dc85(0x1d0)] > 0x8 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0x258, 0x29e, 0x3c),
      (ctx["fillStyle"] = "BLACK"),
      ctx[_0x33dc85(0x1db)]("9", 0x1b, 0x285),
      (ctx[_0x33dc85(0x1cb)] = "WHITE"),
      ctx[_0x33dc85(0x1db)](us[0x8]["us"] || _0x33dc85(0x1bc), 0x64, 0x285));
    us[_0x33dc85(0x1d0)] > 0x9 &&
      (ctx[_0x33dc85(0x1c5)](line, 0xa, 0x29e, 0x29e, 0x3c),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c7)),
      ctx["fillText"]("10", 0xf, 0x2cb),
      (ctx[_0x33dc85(0x1cb)] = _0x33dc85(0x1c0)),
      ctx["fillText"](us[0x9]["us"] || _0x33dc85(0x1bc), 0x64, 0x2cb));
    ctx[_0x33dc85(0x1d3)](),
      ctx[_0x33dc85(0x1be)](
        0x13b,
        canvas["height"] / 0x2,
        0xfa,
        0x0,
        Math["PI"] * 0x2,
        !![]
      ),
      ctx[_0x33dc85(0x1b7)](),
      ctx[_0x33dc85(0x1bd)]();
    //==================================================
    const embed = new MessageEmbed()
      .setTitle(`**Leaderboard ${message.guild.name}**`)
      .setColor("#efcb83")
      .setDescription(`${lb.join("\n")}\n\n**IMAGE »**`)
      .setImage("attachment://Leaderboard.png");
    message.channel.send({
      embeds: [embed],
      files: [{ attachment: canvas.toBuffer(), name: "Leaderboard.png" }]
    });
  }
};
