const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: {
        name: 'badge',
        description: "User badge",
        options: [
            {
                name: 'give',
                description: 'Gives the Active Develoer Badge to the user (Takes 1 day to get the badge)',
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: 'help',
                description: 'Questions about the badge.',
                type: ApplicationCommandOptionType.Subcommand,
            },
        ],
    },

    run: async ({ interaction, client, handler }) => {
        if (!interaction.inGuild()) {
            await interaction.reply({ content: ':x: | This command can only be used in a server.', ephemeral: true });
        }

        const { guild, options } = interaction;

        const sub = options.getSubcommand()

        await interaction.deferReply();

        try {
            switch (sub) {
                case 'give': {
                    const successEmbed = new EmbedBuilder()
                        .setColor(0x00ff00)
                        .setTitle("Success!")
                        .setDescription("You have given the Active Developer Badge!")

                    await interaction.editReply({ embeds: [successEmbed] });
                    break;
                };
                case 'help': {
                    const pages = [
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 1 / Page 11')
                            .addFields(
                                {
                                    name: `What Is The Active Developer Badge?`,
                                    value: `Discord want to acknowledge the hard work and creativity of our developer community, and that's **why Discord are offering a brand new badge for all Developers!**\n**While the badge will be available for the foreseeable future, Discord do expect apps to remain active in some capacity in order to maintain eligibility. See the Maintaining Eligibility page (Page 11) for more info.**`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 2 / Page 11')
                            .addFields(
                                {
                                    name: `Am I Eligible?`,
                                    value: `The Active Developer Badge is available to any developer or team that owns at least one active application (app), verified and unverified, alike!\nFor your app to be considered active, it will need to have executed an **[application command](<https://discord.com/developers/docs/interactions/application-commands>)** in the last 30 days. \nDon't have an active app yet? You can create one, **[here](<https://discord.com/developers/applications>)**!`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 3 / Page 11')
                            .setDescription(`**Where Do I Get One?**\nIf you or your team have an active app, head to the **[Developer Portal](https://discord.com/developers/active-developer)** to grab your badge! There, you should find a prompt to join the Active Developer Program and claim your badge, by following these steps:`)
                            .addFields(
                                {
                                    name: `Select An Active App`,
                                    value: `First, select an app from the dropdown. Any active app will be eligible, as long as it has received a command within the past 30 days.\nIf you have an active app and feel you should be eligible for the Active Developer Badge, please allow at least 24 hours for your app's activity status to be updated.`,
                                },
                                {
                                    name: `Designate A Community Server`,
                                    value: `Next, designate your official server for your app (for example, your App Support Server, App Community Server or App Development Server).\nIn order for a server to appear in the server selection menu, it needs to be set as a **Community Server**, and you need to have Admin permission in that server.\nIf you don't see any servers in the Support Server list, make sure the one you are looking for is set as a Community Server. Here is more information on how to **[enable the community feature](<https://support.discord.com/hc/en-us/articles/360047132851-Enabling-Your-Community-Server>)**.`,
                                },
                                {
                                    name: `Choose A Developer News Channel`,
                                    value: `Finally, select the channel within the designated server for the Developer News channel to appear in. This will allow for updates about Discord API and Developer News to be sent right to your server's channel.\nOnce these steps are complete, you should see your new Active Developer Badge on your Profile! **Congratulations!**`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 4 / Page 11')
                            .addFields(
                                {
                                    name: `I'm On A Team, But Can't Claim The Badge`,
                                    value: `If an app is not owned by you, but you're a team member working on the application, you can claim the badge only if it's owned by a Developer Team in the Developer Portal. If the bot is currently owned by an individual, they'll need to transfer it to a Developer Team and invite you to that team in order to claim the badge.`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 5 / Page 11')
                            .addFields(
                                {
                                    name: `What Kinds Of Commands Qualify?`,
                                    value: `Only application commands qualify. This typically refers to slash commands and context menu commands. Legacy prefix-based commands do not count, nor do other kinds of API interactions such as OAuth calls.`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 6 / Page 11')
                            .addFields(
                                {
                                    name: `I Ran An Application Command, But It's Still Ineligible`,
                                    value: `In order for Discord to detect command usage, you or at least one person on the team that owns the app needs to have "Use data to improve Discord" enabled within User Settings > Privacy & Safety. At least 24 hours need to pass after Discord detect a command, so make sure to wait at least 24 hours after enabling this setting before trying again.`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 7 / Page 11')
                            .addFields(
                                {
                                    name: `I Am Eligible. When Will I Receive The Badge?`,
                                    value: `The badge is not distributed automatically. In order to claim the Active Developer Badge, you must visit the **[Developer Portal](<https://discord.com/developers/active-developer>)** to claim it as documented at **Page 3**.`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 8 / Page 11')
                            .addFields(
                                {
                                    name: `I Claimed My Badge, But I Don't Have It`,
                                    value: `If you successfully claimed your Active Developer Badge, but you don't see it on your Profile, try restarting/refreshing your client.`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 9 / Page 11')
                            .addFields(
                                {
                                    name: `How Do I Switch My Active App?`,
                                    value: `Active status will be maintained by any active apps you own or are owned by a team you are on. So there is actually no need to switch apps!`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 10 / Page 11')
                            .addFields(
                                {
                                    name: `How Do I Remove The Badge?`,
                                    value: `If you revisit the **[Developer Portal](<https://discord.com/developers/active-developer>)** page where you first obtained the badge, you can click the 'Remove Badge' button. This will remove your badge immediately and if you refresh your Discord client, you will see the badge is no longer on your profile.`,
                                },
                            ),
                        new EmbedBuilder()
                            .setColor(0x0000ff)
                            .setTitle('Page 11 / Page 11')
                            .addFields(
                                {
                                    name: `Maintaing Eligibility`,
                                    value: `Eligibility for the Active Developer Badge, as listed at **Page 2**, will need to be maintained in order to keep the badge. If a bot does not remain active, the badge will be lost. After 30 days of inactivity, you’re at risk of losing eligibility. Discord will send you an email giving you 30 more days to fix any issues before removing the badge from your profile, so keep an eye on your inbox!`,
                                },
                            ),
                    ];

                    let currentPage = 0;

                    const row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('prev')
                            .setLabel('Previous')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(currentPage === 0),
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel('Next')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(currentPage === pages.length - 1),
                    );

                    const message = await interaction.editReply({
                        embeds: [pages[currentPage]],
                        components: [row],
                        fetchReply: true
                    });

                    const filter = (i) => i.user.id === interaction.user.id;
                    const collector = message.createMessageComponentCollector({
                        filter,
                        time: 60000
                    });

                    collector.on('collect', async (interaction) => {
                        if (interaction.customId === 'next') {
                            currentPage++;
                        } else if (interaction.customId === 'prev') {
                            currentPage--;
                        };

                        await interaction.update({
                            embeds: [pages[currentPage]],
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('prev')
                                        .setLabel('Previous')
                                        .setStyle(ButtonStyle.Primary)
                                        .setDisabled(currentPage === 0),
                                    new ButtonBuilder()
                                        .setCustomId('next')
                                        .setLabel('Next')
                                        .setStyle(ButtonStyle.Primary)
                                        .setDisabled(currentPage === pages.length - 1),
                                ),
                            ],
                        });
                    });

                    collector.on('end', async () => {
                        const disabledRow = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('prev')
                                .setLabel('Previous')
                                .setStyle(ButtonStyle.Primary)
                                .setDisabled(true),
                            new ButtonBuilder()
                                .setCustomId('next')
                                .setLabel('Next')
                                .setStyle(ButtonStyle.Primary)
                                .setDisabled(true),
                        );

                        await message.edit({ components: [disabledRow] });
                    });
                    break;
                };
            };
        } catch (err) {
            const errorEmbed = new EmbedBuilder()
                .setColor(0xff0000)
                .setTitle("Error!")
                .setDescription("An error occurred while processing your command, please try again.")

                try {
                    if (interaction.replied || interaction.deferred) {
                        await interaction.editReply({ embeds: [errorEmbed] });
                    } else {
                        await interaction.reply({ embeds: [errorEmbed] });
                    }
                } catch (err) {
                    console.error(`Failed to reply with error message: ${replyError.message}`);
                }

            console.log(`Server [${guild?.name} | ${guild?.id}] - ❌ | An error occurred when trying to execute the badge command:\n`, err)
        }
    }
}