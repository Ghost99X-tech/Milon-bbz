const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info",
    aliases: ["admininfo", "botinfo", "milon", "ownerinfo"],
    version: "1.4",
    author: "MILON",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Show bot & owner info" },
    longDescription: { en: "Display detailed information about the bot and owner" },
    category: "owner",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ message }) {

    // OWNER INFO
    const authorName = "MD MILoN SARKAR";
    const ownAge = "23+";
    const messenger = "m.me/100081225144815";
    const authorFB = "https://www.facebook.com/share/1CEgVwabm8/";
    const authorNumber = "+8801830981279";
    const Status = "Pure Single";

    // SAFE CATBOX VIDEO LINK
    const videoLink = "https://files.catbox.moe/a03xbs.mp4";

    // BANGLADESH TIME
    const now = moment().tz("Asia/Dhaka");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");

    // BOT UPTIME
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / 3600) % 24);
    const days = Math.floor(uptime / 86400);

    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const text =
`✨《 BOT & OWNER INFORMATION 》🎀

🤖 Bot Name: ${global.GoatBot.config.nickNameBot}
👾 Prefix: ${global.GoatBot.config.prefix}

💙 Owner Name: ${authorName}
📝 Age: ${ownAge}
💕 Relationship: ${Status}

📞 WhatsApp: ${authorNumber}
🌍 Facebook: ${authorFB}

🗓 Date: ${date}
⏰ Time: ${time}

🔰 Contact Owner: ${messenger}
📛 Bot Uptime: ${uptimeString}

==============================`;

    return message.reply({
      body: text,
      attachment: await global.utils.getStreamFromURL(videoLink)
    });
  },

  onChat: async function ({ event, message }) {
    if (event.body?.toLowerCase() === "info") {
      return this.onStart({ message });
    }
  }
};
