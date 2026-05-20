module.exports = {
  config: {
    name: "owner info",
    version: "1.0.4",
    author: "Milon",
    role: 0,
    shortDescription: "Milon Profile (No Image)",
    category: "Information",
    guide: {
      en: "type owner info"
    }
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    const msg = event.body?.toLowerCase();
    if (!msg || msg !== "mamun") return;

    const profileText = 
`╔════════════════════════════════════════╗
║ 🌌✨ 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 𝗖𝗔𝗥𝗗 ✨🌌 ║
╠════════════════════════════════════════╣
║ 🌟 Name       : MD MILON SARKAR
║ 🎂 Age        : 23+
║ 💌 Status     :pure single
║ 📍 Location   : Kurigram, Bangladesh
║ 🎮 Hobbies    : phone | Coding 💻 |  grouping 
╠════════════════════════════════════════╣
║ 🔗 Social Links:
║ • Facebook  : https://www.facebook.com/share/1BYq7qn8Rz/
║ • WhatsApp  : 016******14
╚════════════════════════════════════════╝`;

    api.sendMessage(profileText, event.threadID, event.messageID);
  }
};
