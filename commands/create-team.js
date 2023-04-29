const { db } = require('../lib/db');

const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	MessageActionRow,
	MessageSelectMenu,
	MessageEmbed,
	TextInputComponent,
	MessageButton,
	Modal,
} = require('discord.js');

const getAllChallenges = async () => {
	return await db.challenge.findMany();
};
module.exports = {
	data: new SlashCommandBuilder().setName('create-team').setDescription('Create a team'),
	async execute(interaction) {
		try {
			const challenges = await getAllChallenges();
			const availableChallengeOptions = [];
			//Check for created challenges
			//const disabled = challenges.length === 0;

			//There are challenges, map over all available challenges to add them to the selectMenu options.
			challenges.map(challenge => {
				let opt = {
					label: challenge.title,
					description: challenge.description,
					value: challenge.id,
				};

				availableChallengeOptions.push(opt);
			});

			// create the modal.
			const modal = new Modal().setCustomId('create-team-modal').setTitle('Create a Team!');

			// create the inputs for the modal, team name
			const teamNameInput = new TextInputComponent({
				customId: 'teamNameInput',
				label: 'What is the Team name?',
				style: 'SHORT',
			});

			const challengeSelectMenu = new MessageSelectMenu({
				customId: 'create-team-challenge-select',
				label: 'Choose a Challenge',

				options: availableChallengeOptions,
			});
			// select menu to select the challenge to join.
			// const selectMenu = new MessageSelectMenu()
			// 	.setCustomId('join-team-challenge-select')
			// 	.setPlaceholder('No Challenge Selected')
			// 	.addOptions(availableChallenges);

			// create rows
			const firstRow = new MessageActionRow().addComponents(teamNameInput);
			const secondRow = new MessageActionRow({
				components: [challengeSelectMenu],
			});

			modal.setComponents(firstRow, secondRow);

			await interaction.showModal(modal);

			// create components for ActionRow.

			// const teamNameInput = new TextInputComponent()
			// 	.setCustomId('join-team-new-team-name')
			// 	.setLabel('What is the Team name?')
			// 	.setStyle('SHORT');

			// const submitButton = new MessageButton()
			// 	.setCustomId('join-team-submit-button')
			// 	.setLabel('Create Team')
			// 	.setStyle('PRIMARY')
			// 	.setDisabled(disabled);

			// const teamNameRow = new MessageActionRow().addComponents(teamNameInput);
			// const selectRow = new MessageActionRow().addComponents(selectMenu);
			// const submitRow = new MessageActionRow().addComponents(submitButton);

			// const embed = new MessageEmbed()
			// 	.setColor('#0099ff')
			// 	.setTitle('Create a team')
			// 	.setURL('https://discord.gg/FQeJPpzMnZ')
			// 	.setDescription('Create a team name and select the challenge to join.');
			// await interaction.reply({
			// 	content: 'Create your team:',
			// 	ephemeral: true,
			// 	embeds: [embed],
			// 	components: [teamNameRow],
			// });
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
