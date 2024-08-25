const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'about',
        description: 'Information about the project.',
    },
    run: async ({ interaction, client, handler }) => {

        const version = "v2.0.4" // Change this before update

        const embed = new EmbedBuilder()
            .setTitle('About')
            .setDescription('This project is created by [ItzKeyYT](<https://github.com/ItzKeyYT>) and is open-source and available on [GitHub](<https://github.com/ItzKeyYT/BadgeGiver>).\nThe sole reason of creating this project is to help people obtain the Active Developer Badge without any coding skills.')
            .addFields(
                [
                    {
                        name: `Name`,
                        value: `[Badge Giver](<https://github.com/ItzKeyYT/BadgeGiver>)`,
                    },
                    {
                        name: `Version`,
                        value: `[${version}](<https://github.com/ItzKeyYT/BadgeGiver/releases/tag/${version}>)`,
                        inline: true,
                    },
                    {
                        name: `Author`,
                        value: `[ItzKeyYT](<https://github.com/ItzKeyYT>)`,
                        inline: true,
                    },
                ],
            )
            .setFooter({ text: `Requested by ` + interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
}