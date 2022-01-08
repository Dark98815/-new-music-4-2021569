const { Client, Message, Guild, MessageEmbed } = require("discord.js");
const ms = require("ms");
const emojis = require('../../config/emojis.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Give's You The Commands List",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */
    run: async(client, message, args, prefix, lang) => {
        try {
            const embed = new MessageEmbed()
                .setTitle(`Help Commands`)
                .setColor(0x2f3136)
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**Paris Music DataBase**\n **Play your favorite playlist with Our Bots 🎶**\n
            Version: \`3.0.0\`
            Prefix: ${prefix} , Attach With Room { 🎶・Cool }\n
            `)
            require('fs').readdir(__dirname + '/', (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    let props = require(__dirname + '/' + file);
                    embed.addFields({ name: prefix + props.name, value: props.description || "o", inline: true })
                });
            });
            message.reply({ content: emojis.loading + " | processing command...", allowedMentions: {
            repliedUser: false
        }, ephemeral: true }).then(msg => {
                setTimeout(() => { msg.edit({ content: emojis.done + " | processing complete!.", embeds: [embed], allowedMentions: {
            repliedUser: false
        }, ephemeral: true }) }, ms('1s'))
            });
        } catch {
            console.log('rexom')
        }
    }
};