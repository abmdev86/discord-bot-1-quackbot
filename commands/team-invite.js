const { SlashCommandBuilder } = require('@discordjs/builders');
const { getUserById, getUserByUserName, getAllTeamsByUserId } = require('../lib/dbHandlers');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team-invite')
		.setDescription('Invite a member to your team')
		.addStringOption(option =>
			option.setName('user').setDescription('The name of user').setRequired(true).setAutocomplete(true),
		),

	async execute(interaction) {
		try {
			console.log(interaction.user);
			const userId = interaction.user.id;

			const user = await getUserById(userId, true);

			if (user) {
				//todo
				const otherMember = interaction.options._hoistedOptions[0].value;
				const newUser = await getUserByUserName(otherMember);
				interaction.content = newUser.id;

				//todo get list of user teams
				//const getTeams = await getAllTeamsByUserId(userId);
			} else {
				interaction.reply('You must be a registered user to invite. try /register command first');
			}
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
