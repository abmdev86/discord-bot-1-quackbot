const { SlashCommandBuilder, TextInputBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu, TextInputComponent } = require('discord.js');

const { db } = require('../lib/db');

const getAllChallenges = async () => {
	return await db.challenge.findMany();
};
module.exports = {
	data: new SlashCommandBuilder().setName('create-team').setDescription('Create a team'),
	async execute(interaction) {
		const createTeamEmbed = new MessageEmbed({
			color: '#0099ff',
			title: 'Create a Team',
			url: 'https://discord.gg/FQeJPpzMnZ',
			description: 'Create a team to join the Quackathon Challenges',
			fields: [
				{
					name: 'Select a challenge for the Team',
					value: 'You can choose a challenge to join as well.',
				},
			],
		});
		// const confirmButton = new MessageButton({
		// 	customId: 'create-team-confirm',
		// 	label: 'Confirm',
		// 	style: 'PRIMARY',
		// });
		const createTeamInput = new TextInputComponent({
			customId: 'create-team-name-input',
			label: 'What will the Team be called: ',
			style: 'SHORT',
		});
		const selectMenu = new MessageSelectMenu({
			label: 'Select a Challenge',
			customId: 'create-team-chal-select',
		});
		try {
			// get all the challenges from the database
			const challenges = await getAllChallenges();

			//holds the available options for the select menu
			const challengeOptions = [];
			// iterates over the challenges and adds them as options to the challengeOptions array
			// todo (update) check for 'active' challengs.
			challenges.map(c => {
				let opt = {
					label: c.title,
					description: c.description,
					value: c.id,
				};
				challengeOptions.push(opt);
			});

			// if there are available challanges, prompt the user to creat a team
			if (challengeOptions.length > 0) {
				selectMenu.setPlaceholder('Select A Challenge');
				selectMenu.addOptions(challengeOptions);

				const teamNameRow = new MessageActionRow({
					components: [createTeamInput],
				});

				const mainRow = new MessageActionRow({
					components: [selectMenu],
				});

				await interaction.reply({
					content: 'Create a Team',
					ephemeral: true,
					embeds: [createTeamEmbed],
					components: [mainRow],
				});
			} else {
				// no challenges, no reason to create a team.
				await interaction.reply({
					content: 'There are no Challenges currently running, Try again later',
					ephemeral: true,
				});
			}
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
