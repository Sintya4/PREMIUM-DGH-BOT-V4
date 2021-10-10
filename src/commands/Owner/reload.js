module.exports = {
  name: "reload",
  description: "Reload all",
  ownerOnly: true,
  category: "owner",
  run: async (client, message, args) => {
    await client.guilds.cache.forEach(async guild => {
      let dele = await guild?.commands.fetch().catch(err => {});
      if (!dele) return;
      for (const n of dele.map(e => e.id)) {
        guild?.commands.delete(n).catch(err => {});
      }
    });
    process.exit(1)
  }
};
