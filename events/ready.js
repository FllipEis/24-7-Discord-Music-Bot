const { CHANNEL, STATUS, LIVE, VOLUME } = require("../config.json");

module.exports = async (client, process) => {
  client.user.setActivity(STATUS || "Radio");
  let channel =
    client.channels.cache.get(CHANNEL) ||
    (await client.channels.fetch(CHANNEL));

  if (!channel) {
    console.error(
      "The provided channel ID doesn't exist, or I don't have permission to view that channel. Because of that, I'm aborting now."
    );
    process.exit(1);
  } else if (channel.type !== "voice") {
    console.error(
      "The provided channel ID is NOT voice channel. Because of that, I'm aborting now."
    );
    process.exit(1);
  }

  try {
    const connection = await channel.join();
    connection.play(LIVE);
    connection.volume = VOLUME;
  } catch (error) {
    console.error(error);
  }

  setInterval(async function () {
    if (!client.voice.connections.size) {
      let channel =
        client.channels.cache.get(CHANNEL) ||
        (await client.channels.fetch(CHANNEL));
      if (!channel) return;
      try {
        const connection = await channel.join();
        connection.play(LIVE);
        connection.volume = VOLUME;
      } catch (error) {
        console.error(error);
      }
    }
  }, 20000);
};
