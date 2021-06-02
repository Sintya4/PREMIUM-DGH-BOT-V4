module.exports = {
  name: "nqn",
  usage: "nqn <on/off>",
  description: "add guild custom commands",
  category: "admin",
  args: true,
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
  run:async (client, message, args) => {
    
  let nqn = await client.data.get(`nqn_${message.guild.id}`);
  
  if(args[0] == "on") {
    if(nqn == "on") nyaretu
      
    let n = client.data.set(`nqn_${message.guild.id}`,"on")
    
  }
  
    
    
    
  }
};
