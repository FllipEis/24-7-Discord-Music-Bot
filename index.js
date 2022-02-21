// import config files
const { TOKEN, CHANNEL } = require("./config.json");

// import events loader and node event handler functions
const { loadEvents } = require("./utility/loadEvents");
const { loadNode } = require("./utility/loadNode");

// Discord client
const { Client } = require("discord.js");

const client = new Client();

// error if no token provided, and error if channel id and yt url aren't valid
if (!TOKEN) {
  console.error("Please provide a valid Discord Bot Token.");
  process.exit(1);
} else if (!CHANNEL || isNaN(Number(CHANNEL))) {
  console.log("Please provide a valid channel ID.");
  process.exit(1);
}
// login
client.login(TOKEN).then(() => {
  console.log(` Successfully logged in as: ${client.user.username}#${client.user.discriminator}`);
})

// run events loader and node events handler functions
loadEvents(client, process);
loadNode(process);
