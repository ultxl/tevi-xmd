const events = process.env.EVENTS || 'false';
const botname = process.env.BOTNAME || '𝐒𝐏𝐈𝐃𝐄𝐘 𝐌𝐃';

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363266249040649@newsletter',
            newsletterName: '𝐒𝐏𝐈𝐃𝐄𝐘 𝐌𝐃',
            serverMessageId: 143
        }
    };
};

const Events = async (client, spidey) => {
    const Myself = await client.decodeJid(client.user.id);

    try {
        let metadata = await client.groupMetadata(spidey.id);
        let participants = spidey.participants;
        let desc = metadata.desc || "No Description";
        let groupMembersCount = metadata.participants.length;

        for (let num of participants) {
            let dpuser;

            try {
                dpuser = await client.profilePictureUrl(num, "image");
            } catch {
                dpuser = "https://i.imgur.com/iEWHnOH.jpeg";
            }

            if (spidey.action === "add") {
                let userName = num;

                let Welcometext = `Hey @${userName.split("@")[0]} 👋\n\nWelcome to ${metadata.subject}.\n\nYou are now ${groupMembersCount} members in this group🙏.\n\nPlease read the group description to avoid being removed:\n${desc}\n\n*Regards Spidey Tech*.\n\nPowered by ${botname}.`;
                if (events === 'true') {
                    await client.sendMessage(spidey.id, {
                        image: { url: dpuser },
                        caption: Welcometext,
                        mentions: [num],
                        contextInfo: getContextInfo({sender: Myself})
                    });
                }
            } else if (spidey.action === "remove") {
                let userName2 = num;

                let Lefttext = `Goodbye to a \n\nanother fallen soldier \n@${userName2.split("@")[0]} !You will be remembered. \n\nWe are now ${groupMembersCount} members in this group😭.`;
                if (events === 'true') {
                    await client.sendMessage(spidey.id, {
                        image: { url: dpuser },
                        caption: Lefttext,
                        mentions: [num],
                        contextInfo: getContextInfo({sender: Myself})
                    });
                }
            } else if (spidey.action === "demote" && events === 'true') {
                await client.sendMessage(
                    spidey.id,
                    {
                        text: `@${(spidey.author).split("@")[0]}, has demoted @${(spidey.participants[0]).split("@")[0]} from admin 👀`,
                        mentions: [spidey.author, spidey.participants[0]],
                        contextInfo: getContextInfo({sender: Myself})
                    }
                );
            } else if (spidey.action === "promote" && events === 'true') {
                await client.sendMessage(
                    spidey.id,
                    {
                        text: `@${(spidey.author).split("@")[0]} has promoted @${(spidey.participants[0]).split("@")[0]} to admin. 👀`,
                        mentions: [spidey.author, spidey.participants[0]],
                        contextInfo: getContextInfo({sender: Myself})
                    }
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = Events;
