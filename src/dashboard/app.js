const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const path = require("path");
const ejs = require("ejs");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const { version } = require("discord.js");
const moment = require("moment");
const Levels = require("discord-xp");

module.exports = async client => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.engine("html", ejs.renderFile);
  app.set("view engine", "ejs");
  const templateDir = path.resolve(
    `${process.cwd()}${path.sep}src/dashboard/src`
  );

  const render = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.user || null,
      uptime: moment
        .duration(client.uptime)
        .format(" D [days], H [hours], m [minutes], s [seconds]"),
      version: version
    };
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };
  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };
  app.use(
    "/css",
    express.static(path.resolve(`${templateDir}${path.sep}assets/css`))
  );
  app.use(
    "/js",
    express.static(path.resolve(`${templateDir}${path.sep}assets/js`))
  );
  app.use(
    session({
      secret: "DGH_BOT_DASHBOARD",
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(
    new Strategy(
      {
        clientID: client.config.dash.id,
        clientSecret: client.config.dash.secret,
        callbackURL: client.config.dash.url,
        scope: ["identify", "guilds"]
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        process.nextTick(function() {
          return done(null, profile);
        });
      }
    )
  );
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- RENDER WEB =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  app.get("/login", (req, res) => {
    render(res, req, "embed/login.ejs");
  });
  app.get(
    "/callback",
    passport.authenticate("discord", {
      failureRedirect: "/?error=true&message=Error Login To Discord"
    }),
    async function(req, res) {
      if (!req.user.id || !req.user.guilds) {
        res.redirect("/");
      } else res.redirect(req.session.backURL || "/");
    }
  );
  app.get("/logout", async function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });

  app.listen(process.env.PORT, rr => {
    console.log("✅ DASHBOARD DGH BOT READY");
  });
  app.get("/", (req, res) => {
    render(res, req, "index");
  });
  app.get("/stats", (req, res) => {
    render(res, req, "stats");
  });
  app.get("/invite", (req, res) => {
    render(res, req, "embed/invite");
  });
  app.get("/servers", checkAuth, (req, res) => {
    render(res, req, "./manage/servers", {
      guilds: req.user.guilds.filter(
        u => (u.permissions & 2146958591) === 2146958591
      )
    });
  });

  app.get("/server/:guildID/:value", checkAuth, async (req, res) => {
    let server = client.guilds.cache.get(req.params.guildID);
    if (
      !server &&
      req.user.guilds
        .filter(u => (u.permissions & 2146958591) === 2146958591)
        .map(u => u.id)
        .includes(req.params.guildID)
    ) {
      return res.redirect(
        `${client.config.bot.invite}&guild_id=${req.params.guildID}`
      );
    } else if (!server) {
      return res.redirect(
        `/servers?error=true&message=Invalid Guild&url=servers`
      );
    }
    if (
      req.params.value === "invite" &&
      req.user.guilds
        .filter(u => (u.permissions & 2146958591) === 2146958591)
        .map(u => u.id)
        .includes(req.params.guildID)
    ) {
      return res.redirect(
        `${client.config.bot.invite}&guild_id=${req.params.guildID}`
      );
    }
    let settings = {
      prefix:
        (await client.data.get(`Prefix_${req.params.guildID}`)) ||
        client.config.bot.prefix,
      welmsg:
        (await client.data.get(`msg_wel_${req.params.guildID}`)) || "None",
      levmsg:
        (await client.data.get(`msg_lev_${req.params.guildID}`)) || "None",
      levelmsg:
        (await client.data.get(`msg_lvl_${req.params.guildID}`)) || "None",
      welch:
        (await client.data.get(`channel_wel_${req.params.guildID}`)) || "None",
      levch:
        (await client.data.get(`channel_lev_${req.params.guildID}`)) || "None",
      levelch:
        (await client.data.get(`channel_lvl_${req.params.guildID}`)) || "None",
      modch:
        (await client.data.get(`channel_mod_${req.params.guildID}`)) || "None",
      logch:
        (await client.data.get(`channel_log_${req.params.guildID}`)) || "None",
      imglev:
        (await client.data.get(`img_lev_${req.params.guildID}`)) ||
        client.config.image.leave,
      imgwel:
        (await client.data.get(`img_wel_${req.params.guildID}`)) ||
        client.config.image.welcome,
      imglevel:
        (await client.data.get(`img_level_${req.params.guildID}`)) ||
        client.config.image.level
    };
    let raw = true;
    const rawLeaderboard = await Levels.fetchLeaderboard(server.id, 10); // We grab top 10 users with most xp in the current server.
    if (rawLeaderboard.length < 1) raw = false;
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    );
    render(res, req, "./manage/setting", {
      guild: server,
      value: req.params.value,
      leaderboard,
      raw,
      settings,
      createdAt: moment(req.user.createdAt).format("lll")
    });
  });
  app.post("/server/:guildID/:value", checkAuth, async (req, res) => {
    let server = client.guilds.cache.get(req.params.guildID);
    if (!server)
      return res.redirect(
        `/servers?error=true&message=Invalid Guild&url=servers`
      );
    if (
      !client.guilds.cache
        .get(req.params.guildID)
        .members.cache.get(req.user.id)
        .permissions.has("MANAGE_GUILD")
    )
      return res.redirect(
        `/servers?error=true&message=You do not have MANAGE_GUILD permissions.&url=servers`
      );
    let data = req.body;
    let settings = {
      prefix:
        (await client.data.get(`Prefix_${req.params.guildID}`)) ||
        client.config.bot.prefix,
      welmsg:
        (await client.data.get(`msg_wel_${req.params.guildID}`)) || "None",
      levmsg:
        (await client.data.get(`msg_lev_${req.params.guildID}`)) || "None",
      levelmsg:
        (await client.data.get(`msg_lvl_${req.params.guildID}`)) || "None",
      welch:
        (await client.data.get(`channel_wel_${req.params.guildID}`)) || "None",
      levch:
        (await client.data.get(`channel_lev_${req.params.guildID}`)) || "None",
      levelch:
        (await client.data.get(`channel_lvl_${req.params.guildID}`)) || "None",
      modch:
        (await client.data.get(`channel_mod_${req.params.guildID}`)) || "None",
      logch:
        (await client.data.get(`channel_log_${req.params.guildID}`)) || "None",
      imglev:
        (await client.data.get(`img_lev_${req.params.guildID}`)) ||
        client.config.image.leave,
      imgwel:
        (await client.data.get(`img_wel_${req.params.guildID}`)) ||
        client.config.image.welcome,
      imglevel:
        (await client.data.get(`img_level_${req.params.guildID}`)) ||
        client.config.image.level
    };
    if (req.params.value === "home") {
      if (data.hasOwnProperty("prefix")) {
        let newprefix;
        if (data.prefix.length > 0) newprefix = data.prefix;
        if (newprefix)
          client.data.set(`Prefix_${req.params.guildID}`, newprefix);
      }
      await res.redirect(`?success=true&message=saved successfully&url=home`);
    }
  });
  app.use((req, res) => {
    res.status(404).redirect("/?error=true&message=404 Not Found");
  });
};
