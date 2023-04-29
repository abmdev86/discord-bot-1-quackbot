const { db } = require('../lib/db');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, TextInputComponent } = require('discord.js');
const getAllChallenges = async () => {
	return await db.challenge.findMany();
};
module.exports = {
	data: new SlashCommandBuilder().setName('create-team').setDescription('Create a team'),
	async execute(interaction) {
		try {
			const challenges = await getAllChallenges();
			const availableOptions = [];

			if (challenges.length > 0) {
				challenges.map(challenge => {
					let opt = {
						label: challenge.title,
						description: challenge.description,
						value: challenge.id,
					};

					availableOptions.push(opt);
				});
			} else {
				availableOptions.push({ label: 'No Challenges Currently', description: 'Check back later', value: 0 });
			}
			const selectMenu = new MessageSelectMenu()
				.setCustomId('challenge-select')
				.setPlaceholder('No Challenge Selected')
				.addOptions(availableOptions);
			const teamNameInput = new TextInputComponent()
				.customId('new-team-name')
				.label('What is the Team name?')
				.setStyle('SHORT');

			const teamNameRow = new MessageActionRow().addComponents(teamNameInput);
			const selectRow = new MessageActionRow().addComponents(selectMenu);
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Create a team')
				.setURL('https://discord.gg/FQeJPpzMnZ')
				.setDescription('Create a team name and select the challenge to join.');
			await interaction.reply({
				content: 'Create your team:',
				ephemeral: true,
				embeds: [embed],
				components: [teamNameRow, selectRow],
			});
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
