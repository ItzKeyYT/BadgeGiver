const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'about',
        description: 'Information about the bot/project.',
    },
    run: async ({ interaction, client, handler }) => {

        const embed = new EmbedBuilder()
            .setTitle('About')
            .setDescription('This bot was created by [ItzKeyYT](https://github.com/ItzKeyYT) and is open-source and available on [GitHub](https://github.com/ItzKeyYT/BadgeGiver).')
            .addFields(
                [
                    {
                        name: `Name`,
                        value: 'Badge Giver - New Edition',
                    },
                    {
                        name: 'Version',
                        value: '2.0.0',
                        inline: true,
                    },
                    {
                        name: 'Author',
                        value: 'ItzKeyYT',
                        inline: true,
                    },
                ],
            )
            .setFooter({ name: `Requested by ` + interaction.user.author, iconURL: interaction.user.displayAvatarURL() })
    }
}