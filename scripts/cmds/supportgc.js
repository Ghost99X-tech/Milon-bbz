module.exports = {
  config: {
    name: "supportgc",
    aliases: ["supportbox"],
    version: "1.8",
    author: "MOHAMMAD AKASH",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add user to support group",
    },
    longDescription: {
      en: "This command adds the user to the admin support group, notifies the support group, and sends a copy to the admin inbox.",
    },
    category: "supportgc",
    guide: {
      en: "To use this command, type /supportgc",
    },
  },

  onStart: async function ({ api, event }) {
    const supportGroupId = "737267832805258"; // Support group ID
    const commandThreadID = event.threadID; // যে গ্রুপ থেকে কমান্ড দেওয়া হয়েছে
    const adminUID = "100081225144815"; // আপনার UID
    const userID = event.senderID;

    // Get user info for name + ID
    const userInfo = await api.getUserInfo(userID);
    const userName = userInfo[userID].name;

    // Fetch participants in support group
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;

    if (participantIDs.includes(userID)) {
      // Already in support group → only command group notification
      api.sendMessage(
        `📌 𝐀ᴅᴍɪɴ Sᴜᴘᴘᴏʀᴛ Gʀᴏᴜᴘ\n\n🤖 Nᴏᴛɪᴄᴇ: ${userName}, you are already a member of the support group.\n📩 Check spam or message requests if not visible.`,
        commandThreadID
      );
    } else {
      // Add user
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          // Error → command group notification
          api.sendMessage(
            `📌 𝐀ᴅᴍɪɴ Sᴜᴘᴘᴏʀᴛ Gʀᴏᴜᴘ\n\n⚠️ Eʀʀᴏʀ: Unable to add ${userName} (ID: ${userID}).\n❗ Account might be private or message requests blocked.`,
            commandThreadID
          );
        } else {
          // Success → command group (light notification)
          api.sendMessage(
            `✅ ${userName} (ID: ${userID}) has been added to the support group.`,
            commandThreadID
          );

          // Full notification message
          const notificationMessage = `📌 𝐀ᴅᴍɪɴ Sᴜᴘᴘᴏʀᴛ Gʀᴏᴜᴘ\n\n👤 New user added: ${userName} (ID: ${userID})\n✅ Please approve or check the user in the support group.`;

          // Send to support group
          api.sendMessage(notificationMessage, supportGroupId);

          // Send the same to admin inbox
          api.sendMessage(notificationMessage, adminUID);
        }
      });
    }
  },
};
