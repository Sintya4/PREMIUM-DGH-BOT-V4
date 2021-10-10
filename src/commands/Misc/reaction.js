module.exports = {
  name: "react",
  category: "misc",
  args: true,
  usage: "react <:emoji: :emoji: ...>",
  botPermission: ["ADD_REACTIONS", "MANAGE_MESSAGES", "MANAGE_EMOJIS"],
  description: "Reaction Command Like NQN",
  run: async (client, message, args) => {
    await message.delete();
    //MADE BY FC GLITCH
    const _0xfadb43 = _0xce98;
    function _0xce98(_0x5252e0, _0x1ba2ea) {
      const _0x45fc3a = _0x45fc();
      return (
        (_0xce98 = function(_0xce9801, _0x179593) {
          _0xce9801 = _0xce9801 - 0x1e2;
          let _0x4d41fa = _0x45fc3a[_0xce9801];
          return _0x4d41fa;
        }),
        _0xce98(_0x5252e0, _0x1ba2ea)
      );
    }
    function _0x45fc() {
      const _0x4563ad = [
        "28070RraKND",
        "user",
        "222PKioYV",
        "find",
        "emoji",
        "users",
        "cache",
        "map",
        "join",
        "collect",
        "2203148RefXEB",
        "shift",
        "emojis",
        "react",
        "channel",
        "match",
        "35185dTkxyJ",
        "fetch",
        "563659ySwKUI",
        "forEach",
        "remove",
        "8djmDKB",
        "then",
        "author",
        "869BHsohQ",
        "135327BGhJdl",
        "72jisWnE",
        "109420uztPvV",
        "32100kDTshy",
        "1008rcfozC",
        "name",
        "createReactionCollector"
      ];
      _0x45fc = function() {
        return _0x4563ad;
      };
      return _0x45fc();
    }
    (function(_0x461071, _0x231c4b) {
      const _0x47e3bf = _0xce98,
        _0x1fa9da = _0x461071();
      while (!![]) {
        try {
          const _0xdc8a5d =
            parseInt(_0x47e3bf(0x1e6)) / 0x1 +
            (parseInt(_0x47e3bf(0x1e9)) / 0x2) *
              (parseInt(_0x47e3bf(0x1ed)) / 0x3) +
            -parseInt(_0x47e3bf(0x1fe)) / 0x4 +
            (-parseInt(_0x47e3bf(0x1e4)) / 0x5) *
              (-parseInt(_0x47e3bf(0x1f6)) / 0x6) +
            (parseInt(_0x47e3bf(0x1f4)) / 0x7) *
              (parseInt(_0x47e3bf(0x1f1)) / 0x8) +
            (-parseInt(_0x47e3bf(0x1ee)) / 0x9) *
              (parseInt(_0x47e3bf(0x1ef)) / 0xa) +
            (parseInt(_0x47e3bf(0x1ec)) / 0xb) *
              (-parseInt(_0x47e3bf(0x1f0)) / 0xc);
          if (_0xdc8a5d === _0x231c4b) break;
          else _0x1fa9da["push"](_0x1fa9da["shift"]());
        } catch (_0x58dae9) {
          _0x1fa9da["push"](_0x1fa9da["shift"]());
        }
      }
    })(_0x45fc, 0xa126c);
    const [...get] = args,
      get_msg = get[0x0] ? Number(get[0x0]) : ![];
    if (get_msg) get[_0xfadb43(0x1ff)]();
    const emojis = get[_0xfadb43(0x1fc)]("\x20")[_0xfadb43(0x1e3)](
      /(?<=:)([^:\s]+)(?=:)/g
    );
    if (!emojis) return;
    emojis[_0xfadb43(0x1e7)](async _0x5d9106 => {
      const _0x59a5e0 = _0xfadb43;
      let _0x4c880f = await client[_0x59a5e0(0x200)][_0x59a5e0(0x1fa)][
        _0x59a5e0(0x1f7)
      ](_0x56dd52 => _0x56dd52[_0x59a5e0(0x1f2)] === _0x5d9106);
      if (!_0x4c880f) return;
      const _0xe2e697 = (_0x5c2dc6, _0x23ae50) =>
        (_0x5c2dc6[_0x59a5e0(0x1f8)][_0x59a5e0(0x1f2)] ===
          _0x4c880f[_0x59a5e0(0x1f2)]) &
        (_0x23ae50["id"] === message[_0x59a5e0(0x1eb)]["id"]);
      if (get_msg && !isNaN(get_msg)) {
        let _0x2bd124 = get_msg - 0x1;
        message[_0x59a5e0(0x1e2)]["messages"]
          [_0x59a5e0(0x1e5)]({ limit: get_msg })
          [_0x59a5e0(0x1ea)](_0x3993e4 =>
            _0x3993e4[_0x59a5e0(0x1fb)](_0x10cf92 => _0x10cf92)
          )
          [_0x59a5e0(0x1ea)](_0x4a8ad7 => _0x4a8ad7[_0x2bd124])
          ["then"](_0x372747 => _0x372747["react"](_0x4c880f["id"]));
        const _0x14f7d4 = await message["channel"]["messages"]
          [_0x59a5e0(0x1e5)]({ limit: get_msg })
          [_0x59a5e0(0x1ea)](_0x408278 =>
            _0x408278[_0x59a5e0(0x1fb)](_0x570287 => _0x570287)
          )
          ["then"](_0x50107d => _0x50107d[_0x2bd124])
          [_0x59a5e0(0x1ea)](_0x30bd01 =>
            _0x30bd01[_0x59a5e0(0x1f3)]({ filter: _0xe2e697 })
          );
        _0x14f7d4["on"](_0x59a5e0(0x1fd), async (_0xad7151, _0x355da1) => {
          const _0x1b5284 = _0x59a5e0;
          _0xad7151["users"][_0x1b5284(0x1e8)](client[_0x1b5284(0x1f5)]["id"]);
        });
      } else {
        message[_0x59a5e0(0x1e2)]["messages"]
          [_0x59a5e0(0x1e5)]({ limit: 0x1 })
          [_0x59a5e0(0x1ea)](_0x532901 =>
            _0x532901["map"](_0x815f48 => _0x815f48)
          )
          ["then"](_0xdfa562 => _0xdfa562[0x0])
          [_0x59a5e0(0x1ea)](_0x515363 =>
            _0x515363[_0x59a5e0(0x201)](_0x4c880f["id"])
          );
        const _0x100e2c = await message[_0x59a5e0(0x1e2)]["messages"]
          [_0x59a5e0(0x1e5)]({ limit: 0x1 })
          [_0x59a5e0(0x1ea)](_0x4b883f =>
            _0x4b883f[_0x59a5e0(0x1fb)](_0x4855dc => _0x4855dc)
          )
          [_0x59a5e0(0x1ea)](_0x19e725 => _0x19e725[0x0])
          ["then"](_0x2cb7eb =>
            _0x2cb7eb[_0x59a5e0(0x1f3)]({ filter: _0xe2e697 })
          );
        _0x100e2c["on"](_0x59a5e0(0x1fd), async (_0x2361d9, _0x2f18a8) => {
          const _0x1821c5 = _0x59a5e0;
          _0x2361d9[_0x1821c5(0x1f9)][_0x1821c5(0x1e8)](
            client[_0x1821c5(0x1f5)]["id"]
          );
        });
      }
    });
  }
};
