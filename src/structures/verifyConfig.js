let error = false;
module.exports = config => {
  console.log("=-=-=-=-=-=-=- Config file Verification -=-=-=-=-=-=-=");
  if (!config.bot.token || config.bot.token.length === 0) {
    error = true;
    console.error("🟥 Discord Developer: No discord bot token was provided");
  }
  if (!config.dash.secret || config.dash.secret.length === 0) {
    error = true;
    console.error("🟥 Discord Developer: No discord bot secret was provided");
  }
  if (!config.dash.id || config.dash.id.length === 0) {
    error = true;
    console.error("🟥 Discord Developer: No discord bot id was provided");
  }
  if (!config.dash.url || config.dash.url.length === 0) {
    error = true;
    console.error("🟥 Req/Rep/App/Website: No url for authorized");
  }
  if (authorization(config.bot.invite) === false) {
    error = true;
    console.error("🟥 DGH BOT Source System: Give me the invite bot link");
  }
  if (!config.bot.prefix || config.bot.prefix.length > 5) {
    error = true;
    console.error("🟥 DGH BOT Source System: Prefix can only be a maximum of 5");
  }
  if (!config.bot.owners.length === 1) {
    error = true;
    console.error("🟥 DGH BOT Source System: Owner only maximum 2");
  }

  if (!error) {
    console.log("🟩 DGH BOT Source System: Config file verified!");
    console.log("🟩 DGH BOT Source System: Loading...");
    console.log(
      "🟩 DGH BOT Source System: Copyright 2021 © DGH BOT - SINTYA - FC GLITCH - Androz2091"
    );
    console.log("🟩 DGH BOT Source System: Pls Join My Server");
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
  }
  if (error) {
    console.log("🟥 DGH BOT Source System: Config file not verified!");
    console.log("🟥 DGH BOT Source System: Stop...");
    console.log(
      "🟥 DGH BOT Source System: Copyright 2021 © DGH BOT - SINTYA - FC GLITCH - Androz2091"
    );
    console.log("🟥 DGH BOT Source System: Pls Join My Server");
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    return process.exit();
  }
};
function authorization(url) {
  const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;
  if (botInvRegex.test(url)) {
    return true;
  } else {
    return false;
  }
}
